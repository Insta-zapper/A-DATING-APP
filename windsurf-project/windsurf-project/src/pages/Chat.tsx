import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Send, Phone, Video, MoreVertical } from 'lucide-react';
import { useMatch } from '../contexts/MatchContext';

const Chat: React.FC = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const { matches, getMessages, sendMessage, markMessagesAsRead } = useMatch();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentMatch = matches.find(m => m.id === matchId);

  useEffect(() => {
    if (matchId) {
      const matchMessages = getMessages(matchId);
      setMessages(matchMessages);
      markMessagesAsRead(matchId);
    }
  }, [matchId, getMessages, markMessagesAsRead]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && matchId) {
      sendMessage(matchId, message.trim());
      setMessage('');
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  if (!currentMatch) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Match not found</h2>
        <p className="text-gray-600 mb-6">This match may have been removed</p>
        <Link to="/matches" className="btn-primary">
          Back to Matches
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-200px)] flex flex-col">
      {/* Chat Header */}
      <div className="bg-white rounded-t-xl shadow-lg p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link to="/matches" className="text-gray-600 hover:text-gray-800">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <img
            src={currentMatch.photos[0] || 'https://picsum.photos/50/50?random=' + currentMatch.id}
            alt={currentMatch.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-800">
              {currentMatch.name}, {currentMatch.age}
            </h3>
            <p className="text-sm text-green-600">Active now</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
            <Video className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 bg-gray-50 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Start the conversation</h3>
            <p className="text-gray-600">Send a message to break the ice!</p>
            
            {/* Conversation Starters */}
            <div className="mt-6 space-y-2">
              <p className="text-sm text-gray-500 mb-3">Conversation starters:</p>
              {[
                "Hey! How's your day going?",
                "What do you like to do for fun?",
                "Seen any good movies lately?",
                "What's your favorite type of cuisine?"
              ].map((starter, index) => (
                <button
                  key={index}
                  onClick={() => setMessage(starter)}
                  className="block w-full text-left p-3 bg-white rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors text-sm"
                >
                  {starter}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.senderId === 'current-user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  msg.senderId === 'current-user'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-800 border border-gray-200'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <p className={`text-xs mt-1 ${
                  msg.senderId === 'current-user' ? 'text-primary-200' : 'text-gray-500'
                }`}>
                  {formatTime(msg.timestamp)}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSend} className="bg-white rounded-b-xl shadow-lg p-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className="p-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>

      {/* Safety Tips */}
      <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-sm text-amber-800">
          <strong>Safety Tip:</strong> Keep conversations on the platform until you feel comfortable. Never share financial information.
        </p>
      </div>
    </div>
  );
};

export default Chat;
