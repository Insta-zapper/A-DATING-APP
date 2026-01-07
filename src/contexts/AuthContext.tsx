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
  hobbies: string;
  gender: string;
  pronouns: string;
  interestedIn: string[];
  photos: string[];
  location: string;
  interests: string[];
  datingIntent: 'serious' | 'marriage';
  ageRangeMin: number;
  ageRangeMax: number;
  maxDistance: number;
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
    try {
      const savedUser = localStorage.getItem('user');
      const savedProfile = localStorage.getItem('profile');
      
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      }
      if (savedProfile) {
        const parsedProfile = JSON.parse(savedProfile);
        setProfile(parsedProfile);
        setProfileComplete(true);
      } else if (savedUser) {
        // Create default profile for logged in users
        const parsedUser = JSON.parse(savedUser);
        const defaultProfile: UserProfile = {
          id: parsedUser.id,
          name: parsedUser.name,
          age: 25,
          bio: '',
          hobbies: '',
          gender: '',
          pronouns: '',
          interestedIn: [],
          photos: [],
          location: '',
          interests: [],
          datingIntent: 'serious',
          ageRangeMin: 18,
          ageRangeMax: 65,
          maxDistance: 20
        };
        setProfile(defaultProfile);
        setProfileComplete(true);
        localStorage.setItem('profile', JSON.stringify(defaultProfile));
      }
    } catch (error) {
      console.error('AuthContext initialization error:', error);
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
      
      // Create default profile immediately after login
      const defaultProfile: UserProfile = {
        id: newUser.id,
        name: newUser.name,
        age: 25,
        bio: '',
        hobbies: '',
        gender: '',
        pronouns: '',
        interestedIn: [],
        photos: [],
        location: '',
        interests: [],
        datingIntent: 'serious',
        ageRangeMin: 18,
        ageRangeMax: 65,
        maxDistance: 20
      };
      setProfile(defaultProfile);
      setProfileComplete(true);
      localStorage.setItem('profile', JSON.stringify(defaultProfile));
      
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
      
      // Create default profile immediately after signup
      const defaultProfile: UserProfile = {
        id: newUser.id,
        name: newUser.name,
        age: 25,
        bio: '',
        hobbies: '',
        gender: '',
        pronouns: '',
        interestedIn: [],
        photos: [],
        location: '',
        interests: [],
        datingIntent: 'serious',
        ageRangeMin: 18,
        ageRangeMax: 65,
        maxDistance: 20
      };
      setProfile(defaultProfile);
      setProfileComplete(true);
      localStorage.setItem('profile', JSON.stringify(defaultProfile));
      
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
        hobbies: profileData.hobbies || '',
        gender: profileData.gender || '',
        pronouns: profileData.pronouns || '',
        interestedIn: profileData.interestedIn || [],
        photos: profileData.photos || [],
        location: profileData.location || '',
        interests: profileData.interests || [],
        datingIntent: profileData.datingIntent || 'serious',
        ageRangeMin: profileData.ageRangeMin || 18,
        ageRangeMax: profileData.ageRangeMax || 65,
        maxDistance: profileData.maxDistance || 20
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
