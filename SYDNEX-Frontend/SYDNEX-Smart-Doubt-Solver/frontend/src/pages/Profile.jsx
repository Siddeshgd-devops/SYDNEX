import { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { Camera, Crown, BadgeCheck, Edit3, Save, UserRound } from 'lucide-react';
import { updateUserProfile as updateProfileApi } from '../api/api';

export const Profile = () => {
  const { user, userProfile, updateUserProfile } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [role, setRole] = useState(userProfile.role || 'student');
  const [saving, setSaving] = useState(false);

  const saveProfile = async () => {
    setSaving(true);
    try {
      updateUserProfile({ role });
      await updateProfileApi({ xp: userProfile.xp, badges: userProfile.badges, streak: userProfile.streak });
    } catch (e) {
      console.error('Failed to save profile', e);
    } finally {
      setSaving(false);
    }
  };

  const avatarUrl = user?.photoURL || null;

  return (
    <div className="min-h-screen pt-16 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-8">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center text-white shadow-lg overflow-hidden" aria-label="Profile avatar">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="avatar" className="w-24 h-24 rounded-full object-cover" />
                ) : (
                  <span className="text-base font-extrabold tracking-wider">SYDNEX</span>
                )}
              </div>
              <button className="absolute -bottom-2 -right-2 p-2 rounded-full bg-white shadow hover:shadow-md">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <input
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder={user?.email || 'Your name'}
                  className="text-2xl font-bold bg-transparent border-b border-transparent focus:border-blue-400 outline-none px-1"
                />
                <Edit3 className="w-4 h-4 text-gray-400" />
              </div>
              <p className="text-gray-600 mt-1">{user?.email}</p>
              <div className="mt-2 flex items-center space-x-3">
                <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700 uppercase">{role}</span>
                {userProfile.xp >= 1000 && (
                  <span className="inline-flex items-center space-x-1 text-yellow-600 text-sm">
                    <Crown className="w-4 h-4" /> <span>Doubt Master</span>
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={saveProfile}
              disabled={saving}
              className="glass-button flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="glass-card p-6">
              <p className="text-sm text-gray-500">XP</p>
              <p className="text-3xl font-bold text-gray-800">{userProfile.xp}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div className="bg-gradient-primary h-2 rounded-full" style={{ width: `${Math.min(100, (userProfile.xp % 1000) / 10)}%` }} />
              </div>
            </div>
            <div className="glass-card p-6">
              <p className="text-sm text-gray-500">Streak</p>
              <p className="text-3xl font-bold text-gray-800">{userProfile.streak} days</p>
            </div>
            <div className="glass-card p-6">
              <p className="text-sm text-gray-500">Role</p>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-2 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-3">Badges</h3>
            {userProfile.badges.length === 0 ? (
              <p className="text-gray-500">No badges yet. Keep learning and earning XP!</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {userProfile.badges.map((badge) => (
                  <div key={badge} className="glass-card p-4 flex items-center space-x-2">
                    <BadgeCheck className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium">{badge}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


