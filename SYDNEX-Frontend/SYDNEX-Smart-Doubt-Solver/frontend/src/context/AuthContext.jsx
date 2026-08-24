import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({
    xp: 0,
    badges: [],
    streak: 0,
    doubtsAsked: 0,
    doubtsAnswered: 0,
    role: 'student' // Default role
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        // Load user profile from localStorage or API
        const savedProfile = localStorage.getItem(`profile_${user.uid}`);
        if (savedProfile) {
          setUserProfile(JSON.parse(savedProfile));
        } else {
          // Set default role for new users
          const defaultProfile = {
            xp: 0,
            badges: [],
            streak: 0,
            doubtsAsked: 0,
            doubtsAnswered: 0,
            role: 'student'
          };
          setUserProfile(defaultProfile);
          localStorage.setItem(`profile_${user.uid}`, JSON.stringify(defaultProfile));
        }
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserProfile({
        xp: 0,
        badges: [],
        streak: 0,
        doubtsAsked: 0,
        doubtsAnswered: 0,
        role: 'student'
      });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const updateUserProfile = (updates) => {
    const newProfile = { ...userProfile, ...updates };
    setUserProfile(newProfile);
    if (user) {
      localStorage.setItem(`profile_${user.uid}`, JSON.stringify(newProfile));
    }
  };

  const setUserRole = (role) => {
    updateUserProfile({ role });
  };

  const addXP = (points) => {
    const newXP = userProfile.xp + points;
    const newBadges = [...userProfile.badges];
    
    // Award badges based on XP milestones
    if (newXP >= 100 && !newBadges.includes('First Steps')) {
      newBadges.push('First Steps');
    }
    if (newXP >= 500 && !newBadges.includes('Knowledge Seeker')) {
      newBadges.push('Knowledge Seeker');
    }
    if (newXP >= 1000 && !newBadges.includes('Doubt Master')) {
      newBadges.push('Doubt Master');
    }

    updateUserProfile({ xp: newXP, badges: newBadges });
  };

  const value = {
    user,
    userProfile,
    loading,
    logout,
    updateUserProfile,
    setUserRole,
    addXP
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};