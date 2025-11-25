# 🌸 Bloom Sanctuary

> A privacy-centric mental health companion for children and adolescents

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## 📖 Overview

**Bloom Sanctuary** is a mobile-first web application designed to help children and adolescents build emotional resilience through gamification. The app features a digital pet companion ("Bloom") that evolves based on user engagement with evidence-based coping skills and mental health check-ins.

### Key Features

- 🌱 **Evolving Digital Pet**: Bloom grows from Egg → Baby → Child → Adult
- 🎮 **XP & Leveling System**: Earn experience points and level up
- 👤 **Dynamic Avatar**: Visual upgrades with every level (10+ tiers)
- 🎯 **Skill-Building Quests**: CBT/DBT-based activities
- 📊 **Gamified Assessments**: PHQ-9 and GAD-7 disguised as games
- 💾 **Privacy-First**: All data stored locally, never sent to servers
- 📱 **Mobile-First Design**: Responsive, touch-friendly interface
- ✨ **Premium Aesthetics**: Glassmorphism, gradients, smooth animations

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/bloom-sanctuary.git
cd bloom-sanctuary

# Install dependencies
npm install

# Set up the database
npx prisma generate
npx prisma migrate dev

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

### Build for Production

```bash
npm run build
npm start
```

## 🎮 Features

### 1. The Sanctuary (Home)
- Animated Bloom Pet with breathing and blinking effects
- Dynamic avatar showing current level
- XP progress bar
- Pet interaction menu (Feed, Pet, Breathe)
- Quick access to quests and stats

### 2. Activities

#### Quests (30 XP each)
- **Box Breathing**: 4-second breathing cycles with visual guidance
- **Gratitude Journal**: 3 reflection prompts for positive thinking
- **Worry Dragon**: CBT-based cognitive restructuring quest
- **Mindfulness Moment**: Guided sensory awareness journey

#### Daily Check-Ins (50 XP each)
- **Sparkle Check**: Gamified PHQ-9 depression screening
- **Energy Meter**: Gamified GAD-7 anxiety screening

### 3. Leveling System
- **Exponential XP Curve**: 100 × 1.5^(level-1)
- **Automatic Evolution**: Pet evolves at levels 3, 7, and 12
- **Level-Up Bonus**: +50 evolution points
- **Persistent Progress**: Saved to localStorage

### 4. Avatar Upgrades
- **Level 1-2**: Blue gradient, simple border
- **Level 3**: Crown unlocked 👑
- **Level 5**: Purple-pink gradient, golden border
- **Level 7**: Sparkle particles ✨
- **Level 10**: Enhanced glow and pulse
- **Level 12**: Floating stars ⭐
- **Level 15**: Orange-yellow gradient
- **Level 18**: Ethereal aura 🌟
- **Level 20**: Rainbow gradient border
- **Level 25+**: Lightning bolt ⚡

### 5. Stats Page
- Level and XP progress
- Health and happiness meters
- Activity completion counts
- Milestone achievements

## 🏗️ Tech Stack

### Core
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3
- **UI Components**: Shadcn/UI
- **Animations**: Framer Motion

### Data & State
- **Database**: Prisma ORM + SQLite
- **State Management**: Zustand with persist middleware
- **Storage**: Browser localStorage

### Development
- **Linting**: ESLint
- **Formatting**: Prettier (via ESLint)
- **Package Manager**: npm

## 📁 Project Structure

```
bloom-sanctuary/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── page.tsx             # Sanctuary (home)
│   │   ├── quests/page.tsx      # Activities page
│   │   └── stats/page.tsx       # Stats & achievements
│   ├── components/
│   │   ├── sanctuary/           # Sanctuary components
│   │   │   ├── BloomPet.tsx
│   │   │   ├── UserAvatar.tsx
│   │   │   ├── LevelDisplay.tsx
│   │   │   └── ...
│   │   ├── quests/              # Quest components
│   │   │   ├── BreathingGame.tsx
│   │   │   ├── GratitudeJournal.tsx
│   │   │   ├── WorryDragon.tsx
│   │   │   └── MindfulnessMoment.tsx
│   │   ├── assessments/         # Mental health assessments
│   │   │   ├── SparkleCheck.tsx
│   │   │   └── EnergyMeter.tsx
│   │   └── ui/                  # Shadcn UI components
│   ├── lib/
│   │   ├── store.ts             # Zustand state management
│   │   ├── prisma.ts            # Prisma client
│   │   └── utils.ts             # Utility functions
│   └── generated/
│       └── client/              # Prisma generated client
├── prisma/
│   ├── schema.prisma            # Database schema
│   └── migrations/              # Database migrations
├── public/
│   └── manifest.json            # PWA manifest
├── LEVELING_SYSTEM.md           # Leveling documentation
├── AVATAR_SYSTEM.md             # Avatar documentation
└── package.json
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue-100 to Purple-200 (backgrounds)
- **Accents**: Yellow, Orange, Pink, Green
- **Text**: Slate-700 (headings), Slate-600 (body)
- **Cards**: White with 80% opacity + backdrop blur

### Visual Effects
- **Glassmorphism**: Translucent cards with blur
- **Gradients**: Smooth multi-color transitions
- **Rounded Corners**: Friendly, approachable shapes
- **Micro-animations**: Framer Motion for all transitions
- **Shadows**: Soft, layered depth

## 🔒 Privacy & Security

### Data Storage
- **Local Only**: All data stored in browser localStorage
- **No External APIs**: No data transmitted to servers
- **No Tracking**: No analytics or third-party services
- **No Authentication**: No user accounts or passwords

### Mental Health Assessments
- **Hidden Scoring**: Clinical scores calculated but not shown to children
- **Age-Appropriate Language**: No clinical terminology
- **Positive Framing**: "How much sparkle?" vs "How depressed?"
- **Emoji-Based**: Visual communication for accessibility

### Intended Use
⚠️ **Important**: This app is for resilience-building and emotional literacy, **not** for diagnosis or treatment. It should complement, not replace, professional mental health care.

## 📊 Mental Health Tools

### Sparkle Check (PHQ-9 Adaptation)
- 9 questions about "sparkle" and "brightness"
- Maps to standard PHQ-9 depression screening
- Score range: 0-27 (inverted scoring)
- Rewards: 50 XP + 30 evolution points

### Energy Meter (GAD-7 Adaptation)
- 7 questions about "calm" and "energy"
- Maps to standard GAD-7 anxiety screening
- Score range: 0-21 (inverted scoring)
- Rewards: 50 XP + 30 evolution points

## 🛠️ Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Generate Prisma client
npx prisma generate

# Create database migration
npx prisma migrate dev --name <migration_name>

# View database
npx prisma studio
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="file:./dev.db"
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Bloom Pet renders with animations
- [ ] Interaction buttons update pet stats
- [ ] Navigation between pages works
- [ ] All 4 quests complete successfully
- [ ] Both assessments complete successfully
- [ ] XP is awarded correctly
- [ ] Level up triggers at correct thresholds
- [ ] Pet evolves at levels 3, 7, 12
- [ ] Avatar upgrades at correct levels
- [ ] Progress persists across page reloads
- [ ] Stats page shows accurate data

## 🔮 Future Enhancements

### Planned Features
- [ ] BSDS (Bipolar Spectrum) integration
- [ ] Guardian/Parent portal
- [ ] Achievement badge system
- [ ] Daily streak bonuses
- [ ] Evolution track selection
- [ ] Avatar customization
- [ ] Weekly progress reports
- [ ] Sound effects and haptic feedback
- [ ] Offline PWA functionality
- [ ] Push notifications for reminders

### Technical Improvements
- [ ] Database integration (move from localStorage)
- [ ] Historical data tracking and charts
- [ ] Guardian dashboard with privacy-safe insights
- [ ] Unit and E2E tests
- [ ] Accessibility audit (WCAG compliance)
- [ ] Performance optimization
- [ ] i18n (internationalization)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

### Evidence-Based Tools
- **PHQ-9**: Patient Health Questionnaire for depression screening
- **GAD-7**: Generalized Anxiety Disorder scale
- **CBT/DBT**: Cognitive Behavioral Therapy and Dialectical Behavior Therapy techniques

### Technologies
- Built with [Next.js](https://nextjs.org/)
- UI components from [Shadcn/UI](https://ui.shadcn.com/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)
- Icons from [Lucide](https://lucide.dev/)

## 📞 Support

For questions, issues, or contributions:
- Open an issue on GitHub
- Contact: [your-email@example.com]

## ⚠️ Disclaimer

This application is designed for educational and resilience-building purposes. It is **not** a substitute for professional mental health care. If you or someone you know is experiencing a mental health crisis, please contact:

- **National Suicide Prevention Lifeline**: 988 (US)
- **Crisis Text Line**: Text HOME to 741741 (US)
- **International Association for Suicide Prevention**: https://www.iasp.info/resources/Crisis_Centres/

---

**Made with 💜 for children's mental health and well-being**
