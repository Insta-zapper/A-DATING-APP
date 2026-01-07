import React, { useState } from 'react';
import { MapPin, Check, Camera } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.simple';

const ProfileSetup: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    age: 25,
    bio: '',
    gender: '',
    pronouns: '',
    interestedIn: [] as string[],
    location: '',
    interests: [] as string[],
    datingIntent: 'serious' as 'serious' | 'marriage',
    photos: [] as string[]
  });

  const genderOptions = ['Male', 'Female', 'Non-binary'];
  const interestOptions = ['Male', 'Female', 'Non-binary', 'Everyone'];
  const datingIntentOptions = [
    { value: 'serious', label: 'Serious Relationship', description: 'Looking for long-term commitment' },
    { value: 'marriage', label: 'Marriage', description: 'Ready to settle down' }
  ];
  const commonInterests = [
    'Travel', 'Cooking', 'Music', 'Movies', 'Reading', 'Fitness', 
    'Photography', 'Art', 'Dancing', 'Hiking', 'Gaming', 'Sports',
    'Technology', 'Fashion', 'Food', 'Wine', 'Coffee', 'Pets'
  ];

  const handleNext = async () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      await handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await updateProfile(profileData);
    } catch (error) {
      console.error('Profile update failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleInterest = (interest: string) => {
    setProfileData(prev => ({
      ...prev,
      interestedIn: prev.interestedIn.includes(interest)
        ? prev.interestedIn.filter(i => i !== interest)
        : [...prev.interestedIn, interest]
    }));
  };

  const toggleHobby = (hobby: string) => {
    setProfileData(prev => ({
      ...prev,
      interests: prev.interests.includes(hobby)
        ? prev.interests.filter(i => i !== hobby)
        : [...prev.interests, hobby]
    }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Basic Information</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                className="input-field"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
              <input
                type="number"
                value={profileData.age}
                onChange={(e) => setProfileData(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                className="input-field"
                min="18"
                max="100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <div className="grid grid-cols-3 gap-3">
                {genderOptions.map(gender => (
                  <button
                    key={gender}
                    onClick={() => setProfileData(prev => ({ ...prev, gender }))}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      profileData.gender === gender
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {gender}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pronouns</label>
              <select
                value={profileData.pronouns}
                onChange={(e) => setProfileData(prev => ({ ...prev, pronouns: e.target.value }))}
                className="input-field"
              >
                <option value="">Select pronouns</option>
                <option value="he/him">He/Him</option>
                <option value="she/her">She/Her</option>
                <option value="they/them">They/Them</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={profileData.location}
                  onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                  className="input-field pl-10"
                  placeholder="City, Country"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Dating Intent & Preferences</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">What are you looking for?</label>
              <div className="space-y-3">
                {datingIntentOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setProfileData(prev => ({ ...prev, datingIntent: option.value as any }))}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      profileData.datingIntent === option.value
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold text-gray-800">{option.label}</div>
                    <div className="text-sm text-gray-600 mt-1">{option.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Interested in dating</label>
              <div className="grid grid-cols-2 gap-3">
                {interestOptions.map(interest => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`p-3 rounded-lg border-2 transition-all flex items-center justify-between ${
                      profileData.interestedIn.includes(interest)
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span>{interest}</span>
                    {profileData.interestedIn.includes(interest) && (
                      <Check className="w-5 h-5" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">About You</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea
                value={profileData.bio}
                onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                className="input-field resize-none"
                rows={4}
                placeholder="Tell us about yourself, your passions, and what makes you unique..."
                maxLength={500}
              />
              <div className="text-sm text-gray-500 mt-1">
                {profileData.bio.length}/500 characters
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Interests & Hobbies</label>
              <div className="grid grid-cols-3 gap-2">
                {commonInterests.map(hobby => (
                  <button
                    key={hobby}
                    onClick={() => toggleHobby(hobby)}
                    className={`p-2 rounded-lg border text-sm transition-all ${
                      profileData.interests.includes(hobby)
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {hobby}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Photos</h2>
            
            <div className="text-center text-gray-600">
              <Camera className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p>Add at least one photo to complete your profile</p>
              <p className="text-sm mt-2">Photos help others get to know you better</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                  <Camera className="w-8 h-8 text-gray-400" />
                </div>
              ))}
            </div>

            <button className="btn-secondary w-full">
              Add Photos
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    i <= step ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {i <= step ? <Check className="w-4 h-4" /> : i}
                  </div>
                  {i < 4 && (
                    <div className={`w-full h-1 mx-2 ${
                      i < step ? 'bg-primary-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {renderStep()}

          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={step === 1}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={loading || (step === 1 && (!profileData.name || !profileData.gender))}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : step === 4 ? 'Complete Profile' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
