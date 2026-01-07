import React, { useState } from 'react';
import { Heart, X, Star, MapPin } from 'lucide-react';
import { useMatch } from '../contexts/MatchContext';

// Mock data for demonstration
const mockProfiles = [
  {
    id: '1',
    name: 'Sarah',
    age: 28,
    bio: 'Adventure seeker, coffee enthusiast, and dog lover. Looking for someone to explore new places with!',
    photos: ['https://picsum.photos/400/600?random=1'],
    location: '10 miles away',
    interests: ['Travel', 'Coffee', 'Dogs', 'Hiking'],
    datingIntent: 'serious'
  },
  {
    id: '2',
    name: 'Michael',
    age: 32,
    bio: 'Tech geek by day, chef by night. Love trying new restaurants and cooking experiments.',
    photos: ['https://picsum.photos/400/600?random=2'],
    location: '5 miles away',
    interests: ['Technology', 'Cooking', 'Movies', 'Music'],
    datingIntent: 'serious'
  },
  {
    id: '3',
    name: 'Emma',
    age: 26,
    bio: 'Yoga instructor and wellness coach. Seeking balance and meaningful connections.',
    photos: ['https://picsum.photos/400/600?random=3'],
    location: '8 miles away',
    interests: ['Yoga', 'Wellness', 'Meditation', 'Reading'],
    datingIntent: 'serious'
  }
];

const Discover: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { addMatch } = useMatch();

  const currentProfile = mockProfiles[currentIndex];

  const handleLike = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Simulate match logic
    const isMatch = Math.random() > 0.5; // 50% chance of match for demo
    
    if (isMatch && currentProfile) {
      addMatch({
        userId: currentProfile.id,
        name: currentProfile.name,
        age: currentProfile.age,
        bio: currentProfile.bio,
        photos: currentProfile.photos
      });
      
      // Show match notification
      setTimeout(() => {
        alert(`It's a match! You and ${currentProfile.name} liked each other!`);
      }, 300);
    }
    
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setIsAnimating(false);
    }, 300);
  };

  const handlePass = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setIsAnimating(false);
    }, 300);
  };

  const handleSuperLike = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Higher chance of match with super like
    const isMatch = Math.random() > 0.2; // 80% chance of match for demo
    
    if (isMatch && currentProfile) {
      addMatch({
        userId: currentProfile.id,
        name: currentProfile.name,
        age: currentProfile.age,
        bio: currentProfile.bio,
        photos: currentProfile.photos
      });
      
      setTimeout(() => {
        alert(`It's a super match! ${currentProfile.name} super liked you back!`);
      }, 300);
    }
    
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setIsAnimating(false);
    }, 300);
  };

  if (currentIndex >= mockProfiles.length) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <Heart className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No more profiles</h2>
        <p className="text-gray-600 mb-6">Check back later for more potential matches!</p>
        <button 
          onClick={() => setCurrentIndex(0)}
          className="btn-primary"
        >
          Start Over
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Discover</h1>
        <p className="text-gray-600">Find meaningful connections</p>
      </div>

      <div className="relative">
        {/* Profile Card */}
        <div 
          className={`card transition-all duration-300 transform ${
            isAnimating 
              ? currentIndex < mockProfiles.length - 1 
                ? 'scale-95 opacity-0' 
                : 'scale-100 opacity-100'
              : 'scale-100 opacity-100'
          }`}
        >
          {/* Photo Section */}
          <div className="relative h-96 bg-gray-200">
            <img 
              src={currentProfile.photos[0]} 
              alt={currentProfile.name}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <div className="flex items-center justify-between text-white">
                <div>
                  <h2 className="text-2xl font-bold">
                    {currentProfile.name}, {currentProfile.age}
                  </h2>
                  <div className="flex items-center mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{currentProfile.location}</span>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-sm font-medium">
                    {currentProfile.datingIntent === 'serious' ? '🎯 Serious' : '💍 Marriage'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="p-6">
            <p className="text-gray-700 mb-4">{currentProfile.bio}</p>
            
            {/* Interests */}
            <div className="flex flex-wrap gap-2 mb-4">
              {currentProfile.interests.map((interest, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={handlePass}
            disabled={isAnimating}
            className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <X className="w-8 h-8 text-red-500" />
          </button>
          
          <button
            onClick={handleSuperLike}
            disabled={isAnimating}
            className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <Star className="w-8 h-8 text-blue-500" />
          </button>
          
          <button
            onClick={handleLike}
            disabled={isAnimating}
            className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <Heart className="w-8 h-8 text-green-500" />
          </button>
        </div>

        {/* Button Labels */}
        <div className="flex justify-center items-center gap-8 mt-2 text-sm text-gray-600">
          <span>Pass</span>
          <span>Super Like</span>
          <span>Like</span>
        </div>
      </div>
    </div>
  );
};

export default Discover;
