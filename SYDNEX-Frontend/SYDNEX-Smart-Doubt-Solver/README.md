# SYDNEX - Smart Doubt Solver with Teacher Evaluation & Live Q&A

A fully responsive, AI-powered educational platform with role-based authentication, teacher evaluation system, and real-time communication built with React, Vite, TailwindCSS, and Socket.io.

## 🚀 New Features

### Role-Based System
- **Student Role**: Ask doubts, get AI answers, receive teacher evaluations, join live Q&A
- **Teacher Role**: Evaluate AI answers, respond to live questions, monitor student progress

### Teacher Evaluation System
- Teachers can mark AI answers as "Right" or "Wrong"
- Real-time evaluation status updates for students
- Pending evaluation queue for teachers

### Live Q&A
- Real-time chat between students and teachers using Socket.io
- Role-based messaging with visual indicators
- Persistent message history

## 🛠️ Tech Stack

### Frontend
- React 18 + Vite
- TailwindCSS for styling
- Framer Motion for animations
- Firebase Authentication
- Socket.io Client for real-time communication
- Axios for API calls
- React Router for navigation
- Lucide React for icons
- Tesseract.js for OCR text extraction

### Backend
- Node.js + Express.js
- Socket.io for real-time communication
- Gemini AI API integration
- Firebase Admin SDK
- Multer for file uploads
- CORS enabled
- JWT authentication

## 📁 Project Structure

```
SYDNEX-Smart-Doubt-Solver/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── LiveQnA.jsx
│   │   │   └── ImageUpload.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── AskDoubt.jsx
│   │   │   ├── Answer.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── RoleSelection.jsx
│   │   │   ├── StudentDashboard.jsx
│   │   │   ├── TeacherDashboard.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── History.jsx
│   │   │   └── About.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── useAuth.js
│   │   ├── firebase/
│   │   │   └── config.js
│   │   ├── api/
│   │   │   └── api.js
│   │   └── styles/
│   │       └── global.css
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
└── backend/
    ├── server.js
    ├── .env
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SYDNEX-Smart-Doubt-Solver
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Environment Setup**
   
   The backend `.env` file is configured with:
   ```env
   PORT=5000
   GEMINI_API_KEY=your_gemini_api_key
   FIREBASE_API_KEY=your_firebase_api_key
   FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
   FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   FIREBASE_APP_ID=your_app_id
   JWT_SECRET=supersecretkey123
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm start
   ```
   Server will run on http://localhost:5000

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on http://localhost:5173

## 🎮 How to Use

### For Students:
1. **Sign Up/Login**: Create account or sign in with Google
2. **Select Role**: Choose "Student" role
3. **Ask Doubts**: 
   - Type questions or use voice input
   - Upload images for OCR text extraction
   - Get AI-powered answers
4. **View Evaluations**: See teacher feedback on AI answers
5. **Join Live Q&A**: Chat with teachers in real-time
6. **Track Progress**: Monitor XP, badges, and learning streaks

### For Teachers:
1. **Sign Up/Login**: Create account or sign in with Google
2. **Select Role**: Choose "Teacher" role
3. **Evaluate Answers**: Review and mark AI answers as Right/Wrong
4. **Live Q&A**: Respond to student questions in real-time
5. **Monitor Progress**: View student analytics and engagement

## 🏆 Features

### Core Features
✅ AI-powered doubt solving with Gemini API  
✅ OCR text extraction from images  
✅ Voice input using Web Speech API  
✅ Firebase Authentication (Email + Google)  
✅ Role-based access control  
✅ Real-time live Q&A with Socket.io  
✅ Teacher evaluation system  
✅ XP and badge gamification  
✅ Responsive glassmorphism UI  
✅ Smooth animations with Framer Motion  

### New Role-Based Features
✅ Student Dashboard with evaluation status  
✅ Teacher Dashboard with evaluation interface  
✅ Real-time evaluation updates  
✅ Live chat with role indicators  
✅ Pending evaluation queue  
✅ Role selection interface  

## 🔧 API Endpoints

### Student Endpoints
- `POST /api/ask` - Submit question and get AI answer
- `GET /api/history?userId=&role=student` - Get student's question history
- `GET /api/live-qna` - Get live Q&A messages

### Teacher Endpoints
- `GET /api/pending-evaluations` - Get questions pending evaluation
- `POST /api/evaluate` - Evaluate AI answer as right/wrong
- `GET /api/history` - Get all questions for evaluation

### Real-time Events (Socket.io)
- `join-room` - Join live Q&A room
- `send-message` - Send message in live Q&A
- `new-message` - Receive new messages
- `evaluation-update` - Receive evaluation status updates

## 🎨 Design Features

- **Role-Based UI**: Different dashboards for students and teachers
- **Real-time Updates**: Live evaluation status and chat messages
- **Glassmorphism Cards**: Translucent cards with backdrop blur
- **Gradient Themes**: Blue to violet gradients throughout
- **Smooth Animations**: Page transitions and hover effects
- **Responsive Layout**: Mobile-first design approach
- **Modern Typography**: Inter font family
- **Interactive Elements**: Hover states and micro-interactions

## 🌐 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Backend (Render/Railway)
1. Push backend code to GitHub
2. Create new service on Render/Railway
3. Add environment variables
4. Deploy with Socket.io support

## 📱 User Roles & Permissions

### Student Role
- Ask doubts with text, voice, or image input
- View AI-generated answers
- See teacher evaluation status (Pending/Right/Wrong)
- Participate in live Q&A sessions
- Track XP, badges, and learning progress
- View personal doubt history

### Teacher Role
- Review AI-generated answers
- Mark answers as Right or Wrong
- Respond to student questions in live Q&A
- View all student questions and evaluations
- Monitor student engagement and progress
- Access teacher-specific analytics

## 🔒 Security Features

- Firebase Authentication with JWT tokens
- Role-based route protection
- Secure API endpoints
- Input validation and sanitization
- CORS configuration for cross-origin requests

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For support and questions, please open an issue in the repository.

---

**Built with ❤️ for education by the SYDNEX Team**

**New Features**: Role-based authentication, Teacher evaluation system, Live Q&A with Socket.io, Real-time updates, Enhanced dashboards