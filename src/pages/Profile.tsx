import React, { useState } from 'react';
import { User, Camera, Edit2, Heart, MapPin, Calendar, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { DISTANCE_OPTIONS, COMMON_INTERESTS } from '../utils/constants';

const Profile: React.FC = () => {
  const { user, profile, logout, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    bio: profile?.bio || '',
    hobbies: profile?.hobbies || '',
    interests: profile?.interests || [],
    location: profile?.location || '',
    pronouns: profile?.pronouns || '',
    ageRangeMin: profile?.ageRangeMin || 18,
    ageRangeMax: profile?.ageRangeMax || 65,
    maxDistance: profile?.maxDistance || 20
  });

  const handleSave = async () => {
    await updateProfile(editData);
    setIsEditing(false);
  };

  const toggleInterest = (interest: string) => {
    setEditData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };


  if (!user || !profile) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Profile</h1>
        <p className="text-gray-600">Manage your dating profile and preferences</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="md:col-span-1">
          <div className="card p-6">
            <div className="text-center">
              {/* Profile Photo */}
              <div className="relative inline-block mb-4">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
                  <User className="w-16 h-16 text-gray-400" />
                </div>
                <button className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                {profile.name}
              </h2>
              <p className="text-gray-600 mb-4">
                {profile.age} • {profile.gender}
              </p>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {profile.location || 'Location not set'}
                </div>
                <div className="flex items-center justify-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Joined {new Date().toLocaleDateString()}
                </div>
                <div className="flex items-center justify-center">
                  <Heart className="w-4 h-4 mr-2 text-red-500" />
                  {profile.datingIntent === 'serious' ? 'Seeking serious relationship' : 'Ready for marriage'}
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <button className="btn-secondary w-full flex items-center justify-center">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </button>
                <button 
                  onClick={logout}
                  className="w-full flex items-center justify-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="md:col-span-2 space-y-6">
          {/* Bio Section */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800">About Me</h3>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-primary-600 hover:text-primary-700"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <textarea
                  value={editData.bio}
                  onChange={(e) => setEditData(prev => ({ ...prev, bio: e.target.value }))}
                  className="input-field resize-none"
                  rows={4}
                  placeholder="Tell us about yourself..."
                  maxLength={500}
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="btn-primary"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-700">
                {profile.bio || 'No bio added yet. Tell others about yourself!'}
              </p>
            )}
          </div>

          {/* Hobbies Section */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Hobbies</h3>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-primary-600 hover:text-primary-700"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <textarea
                  value={editData.hobbies}
                  onChange={(e) => setEditData(prev => ({ ...prev, hobbies: e.target.value }))}
                  className="input-field resize-none"
                  rows={3}
                  placeholder="What do you do for entertainment?"
                  maxLength={300}
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="btn-primary"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-700">
                {profile.hobbies || 'No hobbies added yet. Share what you enjoy doing!'}
              </p>
            )}
          </div>

          {/* Interests Section */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Interests & Hobbies</h3>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-primary-600 hover:text-primary-700"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  {COMMON_INTERESTS.map((interest: string) => (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`p-2 rounded-lg border text-sm transition-all ${
                        editData.interests.includes(interest)
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="btn-primary"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {profile.interests.length > 0 ? (
                  COMMON_INTERESTS.map((interest: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">No interests added yet</p>
                )}
              </div>
            )}
          </div>

          {/* Dating Preferences */}
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Dating Preferences</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Interested in:</span>
                <span className="font-medium">
                  {profile.interestedIn.length > 0 ? profile.interestedIn.join(', ') : 'Not specified'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Looking for:</span>
                <span className="font-medium">
                  {profile.datingIntent === 'serious' ? 'Serious relationship' : 'Marriage'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">
                  {profile.pronouns ? `${profile.pronouns} • ` : ''}
                  {profile.age} • {profile.gender}
                </span>
                <span className="font-medium">
                  {profile.datingIntent === 'serious' ? 'Serious relationship' : 'Marriage'}
                </span>
              </div>
            </div>
          </div>

          {/* Discovery Preferences */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Discovery Preferences</h3>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-primary-600 hover:text-primary-700"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-4">
                {/* Age Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age Range: {editData.ageRangeMin} - {editData.ageRangeMax === 65 ? '65+' : editData.ageRangeMax}
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="18"
                      max="65"
                      value={editData.ageRangeMin}
                      onChange={(e) => {
                        const newMin = parseInt(e.target.value);
                        const maxAge = Math.max(newMin + 2, editData.ageRangeMax);
                        setEditData(prev => ({ ...prev, ageRangeMin: newMin, ageRangeMax: maxAge }));
                      }}
                      className="w-full"
                    />
                    <input
                      type="range"
                      min="18"
                      max="65"
                      value={editData.ageRangeMax}
                      onChange={(e) => {
                        const newMax = parseInt(e.target.value);
                        const minAge = Math.min(editData.ageRangeMin, newMax - 2);
                        setEditData(prev => ({ ...prev, ageRangeMin: minAge, ageRangeMax: newMax }));
                      }}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Distance */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Distance: {editData.maxDistance} miles
                  </label>
                  <select
                    value={editData.maxDistance}
                    onChange={(e) => setEditData(prev => ({ ...prev, maxDistance: parseInt(e.target.value) }))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    {DISTANCE_OPTIONS.map((distance: number) => (
                      <option key={distance} value={distance}>
                        {distance} miles
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="btn-primary"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Age Range:</span>
                  <span className="font-medium">
                    {profile.ageRangeMin || 18} - {profile.ageRangeMax === 65 ? '65+' : (profile.ageRangeMax || 65)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Max Distance:</span>
                  <span className="font-medium">
                    {profile.maxDistance || 20} miles
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Account Stats */}
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Account Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-primary-600">0</div>
                <div className="text-sm text-gray-600">Matches</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-primary-600">0</div>
                <div className="text-sm text-gray-600">Conversations</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
