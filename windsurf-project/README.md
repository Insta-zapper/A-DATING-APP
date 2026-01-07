# Connect - Modern Dating App

A modern dating application focused on genuine connections and meaningful relationships. Built with React, TypeScript, and TailwindCSS.

## Features

### 🎯 Dating Intent Verification
- All users must verify their dating intentions (Serious or Marriage)
- Ensures everyone is genuinely looking for connections
- Reduces time-wasters and improves match quality

### 💝 Smart Matching System
- Swipe-based discovery interface
- Super like feature for higher match probability
- Matching algorithm based on preferences and interests
- Real-time match notifications

### 💬 Integrated Messaging
- Real-time chat with matches
- Conversation starters to break the ice
- Message read receipts
- Safety tips and guidelines

### 👤 Comprehensive Profiles
- Multi-step profile setup process
- Bio, interests, and dating preferences
- Photo management
- Profile editing and customization

### 🎨 Modern UI/UX
- Beautiful, responsive design
- Smooth animations and transitions
- Mobile-friendly interface
- Intuitive navigation

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: TailwindCSS with custom design system
- **Routing**: React Router
- **Icons**: Lucide React
- **Build Tool**: Vite

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dating-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Navbar.tsx
├── contexts/           # React contexts for state management
│   ├── AuthContext.tsx
│   └── MatchContext.tsx
├── pages/              # Page components
│   ├── Auth.tsx
│   ├── ProfileSetup.tsx
│   ├── Discover.tsx
│   ├── Matches.tsx
│   ├── Chat.tsx
│   └── Profile.tsx
├── App.tsx            # Main app component
├── main.tsx           # App entry point
└── index.css          # Global styles
```

## Key Features Explained

### Authentication Flow
1. **Sign Up**: Users create an account with email verification
2. **Profile Setup**: Multi-step process to collect dating preferences
3. **Dating Intent**: Users specify what they're looking for (Serious/Casual/Marriage)

### Discovery System
- Swipe right to like, left to pass
- Super like for higher visibility
- Match when both users like each other
- Location-based matching

### Chat Features
- Real-time messaging
- Read receipts
- Conversation starters
- Safety guidelines

### Profile Management
- Edit bio and interests
- Upload and manage photos
- Update dating preferences
- View match statistics

## Safety Features

- **Dating Intent Verification**: All users must specify their dating intentions
- **Profile Moderation**: Automated and manual review systems
- **Reporting System**: Easy way to report inappropriate behavior
- **Safety Tips**: Built-in dating safety guidelines
- **Privacy Controls**: Control who can see your profile

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Future Enhancements

- [ ] Video chat integration
- [ ] Advanced matching algorithms
- [ ] Event-based matching
- [ ] Premium features
- [ ] Mobile app development
- [ ] AI-powered conversation starters
- [ ] Background verification system

## Support

For support, please contact support@connect-dating.app or create an issue in the repository.

---

**Connect** - Where meaningful relationships begin ❤️
