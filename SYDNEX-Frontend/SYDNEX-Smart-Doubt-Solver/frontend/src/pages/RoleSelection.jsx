import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Users } from 'lucide-react';
import { useAuth } from '../context/useAuth';

export const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const { setUserRole } = useAuth();
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    setUserRole(role);
    
    if (role === 'student') {
      navigate('/student/dashboard');
    } else {
      navigate('/teacher/dashboard');
    }
  };

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4">Welcome to SYDNEX</h1>
          <p className="text-xl text-gray-600">Choose your role to get started</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Student Role */}
          <div 
            onClick={() => handleRoleSelection('student')}
            className="glass-card p-8 text-center cursor-pointer hover:scale-105 transition-transform duration-300 hover:shadow-xl"
          >
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Student</h3>
            <ul className="text-gray-600 space-y-2 text-left">
              <li>• Ask doubts with AI-powered answers</li>
              <li>• Upload images for OCR text extraction</li>
              <li>• Get teacher evaluations on AI answers</li>
              <li>• Join live Q&A sessions</li>
              <li>• Earn XP and badges</li>
              <li>• Track learning progress</li>
            </ul>
          </div>

          {/* Teacher Role */}
          <div 
            onClick={() => handleRoleSelection('teacher')}
            className="glass-card p-8 text-center cursor-pointer hover:scale-105 transition-transform duration-300 hover:shadow-xl"
          >
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-10 h-10 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Teacher</h3>
            <ul className="text-gray-600 space-y-2 text-left">
              <li>• Evaluate AI-generated answers</li>
              <li>• Mark answers as Right/Wrong</li>
              <li>• Respond to live student questions</li>
              <li>• View student analytics</li>
              <li>• Monitor learning progress</li>
              <li>• Provide personalized guidance</li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            You can change your role anytime from your profile settings
          </p>
        </div>
      </div>
    </div>
  );
};