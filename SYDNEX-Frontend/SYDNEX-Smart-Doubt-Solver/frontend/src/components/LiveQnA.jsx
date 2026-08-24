import { useState, useEffect, useRef } from 'react';
import { X, Send, MessageCircle } from 'lucide-react';
import io from 'socket.io-client';

export const LiveQnA = ({ userRole, userId, onClose }) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [connected, setConnected] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io('https://sydnex-backend1.onrender.com', {
      transports: ['websocket', 'polling'],
      timeout: 20000,
      forceNew: true
    });
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Socket connected');
      setConnected(true);
      newSocket.emit('join-room', { userId, role: userRole });
    });

    newSocket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      setConnected(false);
    });

    newSocket.on('new-message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    newSocket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
      setConnected(false);
    });

    // Load existing messages
    fetch('https://sydnex-backend1.onrender.com/api/live-qna')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMessages(data.messages);
        }
      })
      .catch(err => console.error('Error loading messages:', err));

    return () => {
      newSocket.close();
    };
  }, [userId, userRole]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !socket || !connected) return;

    socket.emit('send-message', {
      message: newMessage,
      senderId: userId,
      senderRole: userRole
    });

    setNewMessage('');
  };

  const getRoleColor = (role) => {
    return role === 'teacher' ? 'text-purple-600' : 'text-blue-600';
  };

  const getRoleBadge = (role) => {
    return role === 'teacher' ? 
      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Teacher</span> :
      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Student</span>;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl h-96 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold">Live Q&A</h3>
            <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm text-gray-500">
              {connected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-br from-white to-blue-50 dark:from-transparent dark:to-transparent">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((message) => {
              const isSelf = message.senderId === userId;
              return (
                <div key={message.id} className={`flex flex-col ${isSelf ? 'items-end' : 'items-start'}`}>
                  <div className="flex items-center space-x-2 mb-1">
                    {!isSelf && (
                      <span className={`font-medium text-xs ${getRoleColor(message.senderRole)}`}>
                        {message.senderId.substring(0, 6)}
                      </span>
                    )}
                    {getRoleBadge(message.senderRole)}
                    <span className="text-[10px] text-gray-400">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className={`${isSelf ? 'bg-blue-600 text-white' : message.senderRole === 'teacher' && userRole === 'student' ? 'bg-green-100 text-green-800 border-2 border-green-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'} rounded-2xl px-4 py-2 max-w-[75%] shadow`}> 
                    <p className="whitespace-pre-wrap break-words">{message.message}</p>
                    {message.senderRole === 'teacher' && userRole === 'student' && (
                      <div className="text-xs text-green-600 mt-1 font-medium">✓ Answer from Teacher</div>
                    )}
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <form onSubmit={sendMessage} className="p-4 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={`Type your ${userRole === 'teacher' ? 'answer' : 'question'}...`}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={!connected}
            />
            <button
              type="submit"
              disabled={!newMessage.trim() || !connected}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};