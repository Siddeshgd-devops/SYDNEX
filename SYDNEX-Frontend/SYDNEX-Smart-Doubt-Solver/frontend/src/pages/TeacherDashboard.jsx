import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, MessageCircle, Users, BarChart3, Clock } from 'lucide-react';
import { useAuth } from '../context/useAuth';
import { getPendingEvaluations, evaluateAnswer } from '../api/api';
import { LiveQnA } from '../components/LiveQnA';

export const TeacherDashboard = () => {
  const { user } = useAuth();
  const [pendingQuestions, setPendingQuestions] = useState([]);
  const [showLiveQnA, setShowLiveQnA] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPendingEvaluations();
  }, []);

  const fetchPendingEvaluations = async () => {
    try {
      const data = await getPendingEvaluations();
      setPendingQuestions(data.questions);
    } catch (error) {
      console.error('Error fetching pending evaluations:', error);
    }
  };

  const handleEvaluation = async (questionId, evaluation) => {
    setLoading(true);
    try {
      await evaluateAnswer(questionId, evaluation, user.uid);
      // Remove evaluated question from pending list
      setPendingQuestions(prev => prev.filter(q => q.id !== questionId));
      alert(`Answer marked as ${evaluation}!`);
    } catch (error) {
      console.error('Error evaluating answer:', error);
      alert('Failed to save evaluation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text">Teacher Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome, {user?.displayName || user?.email}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-card p-6 text-center">
            <Clock className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-800">{pendingQuestions.length}</h3>
            <p className="text-gray-600">Pending Reviews</p>
          </div>
          <div className="glass-card p-6 text-center">
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-800">0</h3>
            <p className="text-gray-600">Approved Today</p>
          </div>
          <div className="glass-card p-6 text-center">
            <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-800">0</h3>
            <p className="text-gray-600">Active Students</p>
          </div>
          <div className="glass-card p-6 text-center">
            <BarChart3 className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-800">0</h3>
            <p className="text-gray-600">Total Evaluations</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-3">
            <div className="glass-card p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={() => setShowLiveQnA(true)}
                  className="glass-button text-center py-4 bg-green-500 hover:bg-green-600"
                >
                  Join Live Q&A
                </button>
                <button 
                  onClick={fetchPendingEvaluations}
                  className="glass-button text-center py-4"
                >
                  Refresh Pending Reviews
                </button>
              </div>
            </div>

            {/* Pending Evaluations */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4">Pending AI Answer Evaluations</h2>
              
              {pendingQuestions.length === 0 ? (
                <div className="text-center py-8">
                  <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No pending evaluations. Great job!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {pendingQuestions.map((question) => (
                    <div key={question.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="mb-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-800">Student Question:</h4>
                          <span className="text-sm text-gray-500">
                            {new Date(question.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-gray-700 bg-blue-50 p-3 rounded-lg">
                          {question.question}
                        </p>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2">AI Generated Answer:</h4>
                        <div className="text-gray-700 bg-gray-50 p-3 rounded-lg max-h-48 overflow-y-auto">
                          <pre className="whitespace-pre-wrap font-sans">
                            {question.answer}
                          </pre>
                        </div>
                      </div>

                      <div className="flex space-x-4">
                        <button
                          onClick={() => handleEvaluation(question.id, 'right')}
                          disabled={loading}
                          className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                        >
                          <CheckCircle size={20} />
                          <span>Mark as Correct</span>
                        </button>
                        <button
                          onClick={() => handleEvaluation(question.id, 'wrong')}
                          disabled={loading}
                          className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                        >
                          <XCircle size={20} />
                          <span>Mark as Incorrect</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Live Q&A Modal */}
        {showLiveQnA && (
          <LiveQnA 
            userRole="teacher" 
            userId={user.uid}
            onClose={() => setShowLiveQnA(false)} 
          />
        )}
      </div>
    </div>
  );
};