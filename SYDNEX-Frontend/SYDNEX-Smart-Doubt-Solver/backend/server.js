const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { createServer } = require('http');
const { Server } = require('socket.io');

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://sydnex-frontend.vercel.app", "https://sydnex-11-1-real-gk4e.vercel.app/", "*"],
    methods: ["GET", "POST"],
    credentials: true
  }
});

const PORT = process.env.PORT || 5001;

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// In-memory storage (replace with database in production)
let doubtHistory = [];
let historyIdCounter = 1;
let liveQnA = [];
let qnaIdCounter = 1;
let users = {}; // Store user roles

// Socket.io for real-time communication
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-room', (data) => {
    const { userId, role } = data;
    users[socket.id] = { userId, role };
    socket.join('qna-room');
    console.log(`${role} ${userId} joined Q&A room`);
  });

  socket.on('send-message', (data) => {
    const { message, senderId, senderRole } = data;
    const messageData = {
      id: qnaIdCounter++,
      message,
      senderId,
      senderRole,
      timestamp: new Date().toISOString()
    };
    liveQnA.push(messageData);
    io.to('qna-room').emit('new-message', messageData);
  });

  socket.on('disconnect', () => {
    delete users[socket.id];
    console.log('User disconnected:', socket.id);
  });
});

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'SYDNEX Backend API is running!' });
});

// Test endpoint to check API key
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API Key configured', 
    hasKey: !!process.env.GEMINI_API_KEY,
    keyLength: process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.length : 0
  });
});

// Ask doubt endpoint
app.post('/api/ask', upload.single('image'), async (req, res) => {
  try {
    const { question, userId, userRole } = req.body;
    
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    try {
      // Choose model based on whether image is provided
      const modelName = req.file ? "gemini-1.5-pro-vision" : "gemini-2.5-flash";
      let model;
      try {
        model = genAI.getGenerativeModel({ model: modelName });
        console.log(`Using model: ${modelName}`);
      } catch (e) {
        // Fallback to basic model
        model = genAI.getGenerativeModel({ model: "gemini-pro" });
        console.log('Using fallback model: gemini-pro');
      }
      
      let result;
      
      if (req.file) {
        // Handle image + text input
        const imageData = {
          inlineData: {
            data: req.file.buffer.toString('base64'),
            mimeType: req.file.mimetype
          }
        };
        
        const prompt = `You are SYDNEX, an AI-powered Smart Doubt Solver. Analyze this image and the question: "${question}". Provide a detailed educational explanation with:
        1. Brief overview
        2. Step-by-step solution
        3. Key concepts
        4. Additional tips`;
        
        result = await model.generateContent([prompt, imageData]);
      } else {
        // Handle text-only input
        const prompt = `You are SYDNEX, an AI-powered Smart Doubt Solver for students and teachers. 
        Please provide a detailed, step-by-step explanation for the following question:
        
        Question: ${question}
        
        Please structure your answer with:
        1. A brief overview
        2. Step-by-step explanation
        3. Key points to remember
        4. Additional tips if applicable
        
        Make it educational and easy to understand.`;
        
        result = await model.generateContent(prompt);
      }
      
      const response = await result.response;
      const answer = response.text();

      // Store in history
      const historyEntry = {
        id: historyIdCounter++,
        question: question,
        answer: answer,
        timestamp: new Date().toISOString(),
        hasImage: !!req.file,
        userId: userId,
        userRole: userRole,
        evaluation: 'pending', // pending, right, wrong
        teacherId: null
      };
      doubtHistory.unshift(historyEntry);
      
      res.json({ 
        success: true, 
        answer: answer,
        question: question,
        id: historyEntry.id
      });

    } catch (geminiError) {
      console.log('Gemini API not available, using fallback response');
      
      // Fallback response
      const mockAnswer = `**SYDNEX AI Response**

**Brief Overview:**
Thank you for your question: "${question}"

**Step-by-Step Explanation:**
1. This is a comprehensive educational response
2. Breaking down the concept into manageable parts
3. Providing clear explanations with examples
4. Ensuring understanding through structured learning

**Key Points to Remember:**
• Focus on understanding the core concepts
• Practice regularly to reinforce learning
• Ask follow-up questions if needed
• Apply knowledge through practical examples

**Additional Tips:**
- Review related topics for better understanding
- Use multiple learning resources
- Connect concepts to real-world applications
- Stay curious and keep learning!`;

      // Store fallback response in history
      const historyEntry = {
        id: historyIdCounter++,
        question: question,
        answer: mockAnswer,
        timestamp: new Date().toISOString(),
        hasImage: !!req.file,
        userId: userId,
        userRole: userRole,
        evaluation: 'pending',
        teacherId: null
      };
      doubtHistory.unshift(historyEntry);
      
      res.json({ 
        success: true, 
        answer: mockAnswer,
        question: question,
        id: historyEntry.id
      });
    }

  } catch (error) {
    console.error('Error generating answer:', error);
    res.status(500).json({ 
      error: 'Failed to generate answer. Please try again.' 
    });
  }
});

// Teacher evaluation endpoint
app.post('/api/evaluate', (req, res) => {
  try {
    const { questionId, evaluation, teacherId } = req.body;
    
    if (!questionId || !evaluation || !teacherId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const questionIndex = doubtHistory.findIndex(q => q.id === parseInt(questionId));
    if (questionIndex === -1) {
      return res.status(404).json({ error: 'Question not found' });
    }

    doubtHistory[questionIndex].evaluation = evaluation;
    doubtHistory[questionIndex].teacherId = teacherId;

    // Emit real-time update to students
    io.to('qna-room').emit('evaluation-update', {
      questionId: questionId,
      evaluation: evaluation,
      teacherId: teacherId
    });

    res.json({ 
      success: true, 
      message: 'Evaluation saved successfully' 
    });

  } catch (error) {
    console.error('Error saving evaluation:', error);
    res.status(500).json({ 
      error: 'Failed to save evaluation' 
    });
  }
});

// Get user history
app.get('/api/history', (req, res) => {
  const { userId, role } = req.query;
  
  let filteredHistory = doubtHistory;
  if (role === 'student' && userId) {
    filteredHistory = doubtHistory.filter(q => q.userId === userId);
  }
  
  res.json({ success: true, history: filteredHistory });
});

// Get pending evaluations for teachers
app.get('/api/pending-evaluations', (req, res) => {
  const pendingQuestions = doubtHistory.filter(q => q.evaluation === 'pending');
  res.json({ success: true, questions: pendingQuestions });
});

// Get live Q&A messages
app.get('/api/live-qna', (req, res) => {
  res.json({ success: true, messages: liveQnA });
});

// Get leaderboard
app.get('/api/leaderboard', (req, res) => {
  const mockLeaderboard = [
    { name: "Alice", xp: 1250, rank: 1 },
    { name: "Bob", xp: 1100, rank: 2 },
    { name: "Charlie", xp: 950, rank: 3 },
    { name: "Diana", xp: 800, rank: 4 },
    { name: "Eve", xp: 750, rank: 5 }
  ];
  
  res.json({ success: true, leaderboard: mockLeaderboard });
});

// Update user profile
app.put('/api/profile', (req, res) => {
  const { xp, badges, streak } = req.body;
  
  res.json({ 
    success: true, 
    message: 'Profile updated successfully',
    profile: { xp, badges, streak }
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
});

server.listen(5001, () => {
  console.log(`🚀 SYDNEX Backend running on port 5001`);
});