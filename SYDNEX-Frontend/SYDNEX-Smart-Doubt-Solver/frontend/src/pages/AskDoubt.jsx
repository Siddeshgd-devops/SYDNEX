import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Upload, Send, Image, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { askDoubt } from '../api/api';
import { useAuth } from '../context/useAuth';
import { Loader } from '../components/Loader';
import Tesseract from 'tesseract.js';

export const AskDoubt = () => {
  const [question, setQuestion] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ocrLoading, setOcrLoading] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, userProfile, addXP } = useAuth();

  // Reset form when navigated from "Ask Another Question"
  useEffect(() => {
    if (location.state && location.state.reset) {
      setQuestion('');
      setSelectedImage(null);
      setImagePreview(null);
      setExtractedText('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      // Clear the state to prevent repeated resets
      navigate('/ask', { replace: true });
    }
  }, [location.state, navigate]);

  const startRecording = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsRecording(true);
      recognition.onend = () => setIsRecording(false);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuestion(prev => prev + ' ' + transcript);
      };

      recognition.start();
    } else {
      alert('Speech recognition not supported in this browser');
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedImage(file);
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    // Extract text using OCR
    setOcrLoading(true);
    try {
      const result = await Tesseract.recognize(file, 'eng', {
        logger: m => console.log(m)
      });
      const text = result.data.text.trim();
      setExtractedText(text);

      // Add extracted text to question if it exists
      if (text) {
        setQuestion(prev => (prev ? `${prev}\n\n${text}` : text));
      }
    } catch (error) {
      console.error('OCR Error:', error);
      alert('Failed to extract text from image. Please try again.');
    } finally {
      setOcrLoading(false);
    }
  };
  
  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setExtractedText('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim() && !selectedImage) return;

    setLoading(true);
    try {
      const response = await askDoubt(question, selectedImage, user.uid, userProfile.role);
      addXP(10); // Award XP for asking a question
      navigate('/answer', { state: { question: question || "Image-based question", answer: response.answer, questionId: response.id } });
    } catch (error) {
      console.error('Error asking doubt:', error);
      alert('Failed to get answer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="glass-card p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Please Login</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to ask doubts</p>
          <button
            onClick={() => navigate('/login')}
            className="glass-button"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-8">
          <h1 className="text-3xl font-bold gradient-text mb-8 text-center">Ask Your Doubt</h1>
          
          {loading ? (
            <Loader text="Getting your answer..." />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Question Image (OCR Enabled)
                </label>
                
                {!selectedImage ? (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                  >
                    <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Click to upload an image</p>
                    <p className="text-sm text-gray-500">Supports JPG, PNG, GIF (Max 10MB)</p>
                    <p className="text-xs text-blue-600 mt-2">✨ Text will be automatically extracted using OCR</p>
                  </div>
                ) : (
                  <div className="glass-card p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-700">Uploaded Image</h4>
                      <button
                        type="button"
                        onClick={removeImage}
                        className="p-1 text-red-500 hover:text-red-700"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    {imagePreview && (
                      <div className="mb-4">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="max-w-full h-48 object-contain rounded-lg border"
                        />
                      </div>
                    )}

                    {ocrLoading && (
                      <div className="text-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                        <p className="text-sm text-blue-600">Extracting text from image...</p>
                      </div>
                    )}

                    {extractedText && !ocrLoading && (
                      <div className="mt-4">
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Extracted Text:</h5>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-gray-700">
                          {extractedText}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {/* Question Text Area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Question
                </label>
                <div className="relative">
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Type your question here, use voice input, or upload an image..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-32"
                    required
                  />
                  <button
                    type="button"
                    onClick={startRecording}
                    className={`absolute bottom-4 right-4 p-2 rounded-full transition-colors ${
                      isRecording 
                        ? 'bg-red-500 text-white animate-pulse' 
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                  >
                    {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
                  </button>
                </div>
                {extractedText && (
                  <p className="text-xs text-green-600 mt-1">✅ Text extracted from image and added above</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full glass-button flex items-center justify-center space-x-2"
                disabled={(!question.trim() && !selectedImage) || loading || ocrLoading}
              >
                <Send size={20} />
                <span>Get AI Answer</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};