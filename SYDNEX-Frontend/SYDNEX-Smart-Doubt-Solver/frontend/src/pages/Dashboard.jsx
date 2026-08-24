import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Zap, Target } from 'lucide-react';
import { useAuth } from '../context/useAuth';
import { getLeaderboard } from '../api/api';

export const Dashboard = () => {
  const { user, userProfile } = useAuth();
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getLeaderboard();
        setLeaderboard(data.leaderboard);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };
    fetchLeaderboard();
  }, []);

  const badges = [
    { name: 'First Steps', icon: '🎯', description: 'Asked your first question' },
    { name: 'Knowledge Seeker', icon: '🔍', description: 'Earned 500 XP' },
    { name: 'Doubt Master', icon: '🏆', description: 'Earned 1000 XP' },
  ];

  return (
    <div className="min-h-screen pt-16 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl font-bold gradient-text mb-8">Dashboard</h1>
          
          {/* User Stats */}
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Badges Section */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4">Your Badges</h2>
              <div className="space-y-4">
                {badges.map((badge, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-4 p-3 rounded-lg ${
                      userProfile.badges.includes(badge.name)
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-gray-50 border border-gray-200 opacity-50'
                    }`}
                  >
                    <span className="text-2xl">{badge.icon}</span>
                    <div>
                      <h3 className="font-semibold">{badge.name}</h3>
                      <p className="text-sm text-gray-600">{badge.description}</p>
                    </div>
                    {userProfile.badges.includes(badge.name) && (
                      <span className="ml-auto text-green-600 font-semibold">Earned!</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Leaderboard */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4">Leaderboard</h2>
              <div className="space-y-3">
                {leaderboard.map((user, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        index === 0 ? 'bg-yellow-500' :
                        index === 1 ? 'bg-gray-400' :
                        index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                      }`}>
                        {index + 1}
                      </span>
                      <span className="font-medium">{user.name}</span>
                    </div>
                    <span className="text-blue-600 font-semibold">{user.xp} XP</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};