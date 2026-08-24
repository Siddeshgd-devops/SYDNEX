import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Share } from 'lucide-react';
import { useEffect } from 'react';
import { useAuth } from '../context/useAuth';

export const Answer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addXP } = useAuth();
  const { question, answer } = location.state || {};

  useEffect(() => {
    if (answer) {
      addXP(5); // Award XP for viewing answer
    }
  }, [answer, addXP]);

  if (!question || !answer) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="glass-card p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">No Answer Found</h2>
          <p className="text-gray-600 mb-6">Please ask a question first</p>
          <button
            onClick={() => navigate('/ask')}
            className="glass-button"
          >
            Ask a Question
          </button>
        </div>
      </div>
    );
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`Q: ${question}\n\nA: ${answer}`);
    alert('Answer copied to clipboard!');
  };

  const shareAnswer = () => {
    if (navigator.share) {
      navigator.share({
        title: 'SYDNEX Answer',
        text: `Q: ${question}\n\nA: ${answer}`,
      });
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="min-h-screen pt-16 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-6"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>

          <div className="glass-card p-8 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Question:</h2>
            <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{question}</p>
          </div>

          <div className="glass-card p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold gradient-text">AI Answer:</h2>
              <div className="flex space-x-2">
                <button
                  onClick={copyToClipboard}
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                  title="Copy Answer"
                >
                  <Copy size={20} />
                </button>
                <button
                  onClick={shareAnswer}
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                  title="Share Answer"
                >
                  <Share size={20} />
                </button>
              </div>
            </div>
            
            <div className="prose max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {answer}
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/ask', { state: { reset: true } })}
              className="glass-button"
            >
              Ask Another Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};