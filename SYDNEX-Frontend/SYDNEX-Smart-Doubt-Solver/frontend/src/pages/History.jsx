import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, MessageCircle } from 'lucide-react';
import { getUserHistory } from '../api/api';
import { useAuth } from '../context/useAuth';

export const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getUserHistory();
        setHistory(data.history);
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchHistory();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="glass-card p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Please Login</h2>
          <p className="text-gray-600">You need to be logged in to view your history</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl font-bold gradient-text mb-8">Your Doubt History</h1>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading your history...</p>
            </div>
          ) : history.length === 0 ? (
            <div className="glass-card p-8 text-center">
              <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-600 mb-2">No doubts yet</h2>
              <p className="text-gray-500">Start asking questions to build your history!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {history.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="glass-card p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Question #{item.id}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {new Date(item.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">Your Question:</h4>
                    <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                      {item.question}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">AI Answer:</h4>
                    <div className="text-gray-600 bg-blue-50 p-3 rounded-lg">
                      {item.answer.length > 200 
                        ? `${item.answer.substring(0, 200)}...` 
                        : item.answer
                      }
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};