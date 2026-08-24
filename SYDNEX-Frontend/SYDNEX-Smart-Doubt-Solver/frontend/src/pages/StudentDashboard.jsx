import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Star, Zap, Target, MessageCircle, Clock } from 'lucide-react';
import { useAuth } from '../context/useAuth';
import { getUserHistory } from '../api/api';
import { LiveQnA } from '../components/LiveQnA';

export const StudentDashboard = () => {
  const { user, userProfile } = useAuth();
  const [recentDoubts, setRecentDoubts] = useState([]);
  const [showLiveQnA, setShowLiveQnA] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getUserHistory(user.uid, 'student');
        setRecentDoubts(data.history.slice(0, 3)); // Show last 3 doubts
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    if (user) {
      fetchHistory();
    }
  }, [user]);

  const getEvaluationBadge = (evaluation) => {
    switch (evaluation) {
      case 'right':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">✓ Correct</span>;
      case 'wrong':
        return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">✗ Incorrect</span>;
      default:
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">⏳ Pending Review</span>;
    }
  };

  return (
    <div className="min-h-screen pt-16 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text">Student Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user?.displayName || user?.email}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-card p-6 text-center">
            <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-800">{userProfile.xp}</h3>
            <p className="text-gray-600">Total XP</p>
          </div>
          <div className="glass-card p-6 text-center">
            <Star className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-800">{userProfile.badges.length}</h3>
            <p className="text-gray-600">Badges Earned</p>
          </div>
          <div className="glass-card p-6 text-center">
            <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-800">{userProfile.streak}</h3>
            <p className="text-gray-600">Day Streak</p>
          </div>
          <div className="glass-card p-6 text-center">
            <Trophy className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-800">{userProfile.doubtsAsked}</h3>
            <p className="text-gray-600">Doubts Asked</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="glass-card p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link to="/ask" className="glass-button text-center py-4">
                  Ask New Doubt
                </Link>
                <button 
                  onClick={() => setShowLiveQnA(true)}
                  className="glass-button text-center py-4 bg-green-500 hover:bg-green-600"
                >
                  Join Live Q&A
                </button>
              </div>
            </div>

            {/* Recent Doubts */}
            <div className="glass-card p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Recent Doubts</h2>
                <Link to="/history" className="text-blue-600 hover:text-blue-800 text-sm">
                  View All
                </Link>
              </div>
              
              {recentDoubts.length === 0 ? (
                <div className="text-center py-8">
                  <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No doubts yet. Start asking questions!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentDoubts.map((doubt) => (
                    <div key={doubt.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-800 truncate flex-1">
                          {doubt.question.substring(0, 80)}...
                        </h4>
                        {getEvaluationBadge(doubt.evaluation)}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {new Date(doubt.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Badges Section */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4">Your Badges</h2>
            <div className="space-y-4">
              {['First Steps', 'Knowledge Seeker', 'Doubt Master'].map((badge, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-3 rounded-lg ${
                    userProfile.badges.includes(badge)
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-gray-50 border border-gray-200 opacity-50'
                  }`}
                >
                  <span className="text-2xl">
                    {index === 0 ? '🎯' : index === 1 ? '🔍' : '🏆'}
                  </span>
                  <div>
                    <h3 className="font-semibold text-sm">{badge}</h3>
                    <p className="text-xs text-gray-600">
                      {index === 0 ? 'Asked first question' : 
                       index === 1 ? 'Earned 500 XP' : 'Earned 1000 XP'}
                    </p>
                  </div>
                  {userProfile.badges.includes(badge) && (
                    <span className="ml-auto text-green-600 font-semibold text-xs">Earned!</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Q&A Modal */}
        {showLiveQnA && (
          <LiveQnA 
            userRole="student" 
            userId={user.uid}
            onClose={() => setShowLiveQnA(false)} 
          />
        )}
      </div>
    </div>
  );
};