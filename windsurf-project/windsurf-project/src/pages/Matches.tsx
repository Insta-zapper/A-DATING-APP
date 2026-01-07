import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Clock } from 'lucide-react';
import { useMatch } from '../contexts/MatchContext';

const Matches: React.FC = () => {
  const { matches } = useMatch();

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  if (matches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <Heart className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No matches yet</h2>
        <p className="text-gray-600 mb-6">Start discovering people to find your perfect match!</p>
        <Link to="/discover" className="btn-primary">
          Start Discovering
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Matches</h1>
        <p className="text-gray-600">People who liked you back</p>
      </div>

      <div className="space-y-4">
        {matches.map((match) => (
          <Link
            key={match.id}
            to={`/chat/${match.id}`}
            className="card p-4 hover:shadow-xl transition-all duration-200 block"
          >
            <div className="flex items-center space-x-4">
              {/* Profile Photo */}
              <div className="relative">
                <img
                  src={match.photos[0] || 'https://picsum.photos/100/100?random=' + match.id}
                  alt={match.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <Heart className="w-3 h-3 text-white fill-current" />
                </div>
              </div>

              {/* Match Info */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {match.name}, {match.age}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {formatTime(match.matchedAt)}
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                  {match.bio}
                </p>

                {match.lastMessage && (
                  <div className="flex items-center mt-2">
                    <MessageCircle className="w-4 h-4 text-gray-400 mr-2" />
                    <p className="text-sm text-gray-600 truncate">
                      {match.lastMessage}
                    </p>
                    {match.unreadCount && match.unreadCount > 0 && (
                      <span className="ml-2 bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                        {match.unreadCount}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Arrow */}
              <div className="text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Tips Section */}
      <div className="mt-8 p-6 bg-primary-50 rounded-lg">
        <h3 className="font-semibold text-primary-800 mb-2">💡 Matching Tips</h3>
        <ul className="text-sm text-primary-700 space-y-1">
          <li>• Be genuine in your conversations</li>
          <li>• Ask about their interests and hobbies</li>
          <li>• Share your own passions and goals</li>
          <li>• Be respectful and kind at all times</li>
        </ul>
      </div>
    </div>
  );
};

export default Matches;
