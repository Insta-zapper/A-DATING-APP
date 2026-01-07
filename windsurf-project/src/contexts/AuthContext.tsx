import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  verified: boolean;
}

interface UserProfile {
  id: string;
  name: string;
  age: number;
  bio: string;
  gender: string;
  pronouns: string;
  interestedIn: string[];
  photos: string[];
  location: string;
  interests: string[];
  datingIntent: 'serious' | 'marriage';
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  profileComplete: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileComplete, setProfileComplete] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedProfile = localStorage.getItem('profile');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
      setProfileComplete(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    if (email && password) {
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name: email.split('@')[0],
        verified: true
      };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    // Simulate API call with dating intent verification
    if (email && password && name) {
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        verified: false // Would be verified through email/SMS
      };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setProfile(null);
    setProfileComplete(false);
    localStorage.removeItem('user');
    localStorage.removeItem('profile');
  };

  const updateProfile = async (profileData: Partial<UserProfile>): Promise<boolean> => {
    if (user) {
      const updatedProfile: UserProfile = {
        id: user.id,
        name: profileData.name || user.name,
        age: profileData.age || 25,
        bio: profileData.bio || '',
        gender: profileData.gender || '',
        pronouns: profileData.pronouns || '',
        interestedIn: profileData.interestedIn || [],
        photos: profileData.photos || [],
        location: profileData.location || '',
        interests: profileData.interests || [],
        datingIntent: profileData.datingIntent || 'serious'
      };
      
      setProfile(updatedProfile);
      setProfileComplete(true);
      localStorage.setItem('profile', JSON.stringify(updatedProfile));
      return true;
    }
    return false;
  };

  const value: AuthContextType = {
    user,
    profile,
    profileComplete,
    login,
    signup,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
