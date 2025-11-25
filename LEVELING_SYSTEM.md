# Bloom Sanctuary - Leveling System & Mental Health Assessments Update

## 🎮 New Features Implemented

### 1. **XP & Leveling System**

#### Core Mechanics
- **XP-Based Progression**: Players earn XP from completing activities
- **Exponential Level Curve**: XP required increases by 1.5x each level
  - Level 1→2: 100 XP
  - Level 2→3: 150 XP
  - Level 3→4: 225 XP
  - And so on...
- **Automatic Pet Evolution**: Pet evolves at specific level milestones
  - Level 3: EGG → BABY
  - Level 7: BABY → CHILD
  - Level 12: CHILD → ADULT
- **Persistent Storage**: All progress saved using Zustand persist middleware

#### XP Rewards
- **Quests** (Box Breathing, Gratitude, Worry Dragon): **30 XP** each
- **Check-Ins** (Sparkle Check, Energy Meter): **50 XP** each
- **Level Up Bonus**: +50 Evolution Points

### 2. **Gamified Mental Health Assessments**

#### Sparkle Check (PHQ-9 Adaptation)
**Purpose**: Depression screening disguised as a brightness/sparkle meter

**Questions** (9 total):
1. "How much sparkle did your favorite activities have?" (Interest/pleasure)
2. "How bright did you feel inside?" (Mood)
3. "How well did you sleep and rest?" (Sleep)
4. "How much energy did you have?" (Energy)
5. "How good was your appetite?" (Appetite)
6. "How proud did you feel about yourself?" (Self-worth)
7. "How easy was it to focus on things?" (Concentration)
8. "How calm did your body feel?" (Psychomotor)
9. "How safe and happy did you feel?" (Safety/suicidal ideation)

**Response Options**:
- "Super bright!" (3 points) → Inverted to 0 for PHQ-9
- "Pretty good" (2 points) → Inverted to 1
- "A little dim" (1 point) → Inverted to 2
- "Very dim" (0 points) → Inverted to 3

**Scoring**: Questions are inverted so higher "sparkle" = lower depression score
- Total score range: 0-27 (standard PHQ-9 range)
- Score is calculated but **hidden from user**
- Can be stored in database for trend analysis

#### Energy Meter (GAD-7 Adaptation)
**Purpose**: Anxiety screening disguised as a calm/energy assessment

**Questions** (7 total):
1. "How calm and relaxed did you feel?" (Nervousness)
2. "How easy was it to let worries go?" (Control)
3. "How peaceful was your mind?" (Worrying)
4. "How easy was it to relax your body?" (Relaxation)
5. "How still and settled did you feel?" (Restlessness)
6. "How patient were you with things?" (Irritability)
7. "How safe did everything feel?" (Fear)

**Response Options**:
- "Super calm!" (3 points) → Inverted to 0 for GAD-7
- "Pretty calm" (2 points) → Inverted to 1
- "A bit worried" (1 point) → Inverted to 2
- "Very worried" (0 points) → Inverted to 3

**Scoring**: Questions are inverted so higher "calm" = lower anxiety score
- Total score range: 0-21 (standard GAD-7 range)
- Score is calculated but **hidden from user**

### 3. **Enhanced UI Components**

#### Level Display Component
- **Visual XP Bar**: Animated progress bar showing XP progress
- **Trophy Icon**: Indicates current level
- **Star Icon**: Shows evolution points
- **Glassmorphism Design**: Translucent background with backdrop blur
- **Real-time Updates**: Animates when XP is gained

#### Reward Screen
- **Celebration Animation**: Rotating card with confetti emoji
- **XP Display**: Shows amount of XP earned
- **Auto-dismiss**: Returns to activities after 3 seconds
- **Spring Animation**: Bouncy, satisfying feedback

#### Stats Page
New `/stats` route showing:
- **Level Progress**: Current level, XP bar, evolution points
- **Health & Happiness Bars**: Visual progress indicators
- **Activity Summary**: Quests completed, check-ins done
- **Milestones**: Achievement tracking for level thresholds
  - Level 3: "Baby Bloom"
  - Level 7: "Growing Strong"
  - Level 12: "Fully Grown"
  - Level 20: "Master Gardener"

### 4. **Updated Activities Page**

#### Organized Sections
1. **Quests** (30 XP each)
   - Box Breathing
   - Gratitude Journal
   - Worry Dragon

2. **Daily Check-Ins** (50 XP each)
   - Sparkle Check
   - Energy Meter

#### Visual Improvements
- XP badges on each activity card
- Category-based organization
- Color-coded buttons (purple for quests, yellow for check-ins)
- Hover animations

## 📊 Data Architecture

### Updated Zustand Store
```typescript
interface GameState {
  pet: {
    level: number          // Current level
    xp: number            // Current XP
    evolutionPoints: number
    // ... other pet stats
  }
  questsCompleted: number
  assessmentsCompleted: number
  achievements: Achievement[]
  
  addXP: (amount: number) => void
  incrementQuestsCompleted: () => void
  incrementAssessmentsCompleted: () => void
}
```

### Persistence
- Uses `zustand/middleware` persist
- Storage key: `'bloom-sanctuary-storage'`
- Automatically saves to localStorage
- Survives page reloads

## 🎯 Privacy & Ethics

### Hidden Scoring
- Clinical scores (PHQ-9, GAD-7) are calculated but **never shown to the child**
- Scores can be stored in the database for:
  - Trend analysis
  - Guardian insights (future feature)
  - Resilience tracking
- Child only sees:
  - XP rewards
  - Positive feedback
  - Pet growth

### Age-Appropriate Language
- No clinical terminology
- Emoji-based visual communication
- Positive framing (sparkle, brightness, calm)
- No judgment or negative labels

## 🚀 Technical Implementation

### Files Created/Modified

**New Components**:
- `src/components/assessments/SparkleCheck.tsx`
- `src/components/assessments/EnergyMeter.tsx`
- `src/components/sanctuary/LevelDisplay.tsx`
- `src/app/stats/page.tsx`

**Modified Files**:
- `src/lib/store.ts` - Enhanced with leveling system
- `src/app/quests/page.tsx` - Added assessments and XP rewards
- `src/components/sanctuary/SanctuaryView.tsx` - Added LevelDisplay

### Dependencies
- `zustand` - Already installed
- `zustand/middleware` - For persistence (included with zustand)

## 🎨 Design Consistency

All new components follow the established design system:
- **Glassmorphism**: Translucent cards with backdrop blur
- **Gradients**: Smooth color transitions
- **Rounded Corners**: Friendly, approachable shapes
- **Micro-animations**: Framer Motion for smooth transitions
- **Calm Palette**: Soft blues, purples, greens, yellows

## 📈 User Flow

1. **User completes an activity** (quest or check-in)
2. **Reward screen appears** showing XP gained
3. **XP is added to total** and level bar updates
4. **If level threshold reached**:
   - Level increases
   - Pet may evolve
   - Bonus evolution points awarded
5. **Stats are saved** to localStorage
6. **User can view progress** on stats page

## 🔮 Future Enhancements

### Potential Additions
1. **Daily Streaks**: Bonus XP for consecutive days
2. **Achievements System**: Unlock badges for milestones
3. **Evolution Tracks**: Different evolution paths based on activity types
4. **Guardian Insights**: Show trends to parents without raw scores
5. **BSDS Integration**: Add mood pattern tracking
6. **Weekly Reports**: Summary of progress and insights

### Database Integration
Currently using localStorage. Future:
- Save scores to Prisma database
- Track historical data
- Generate trend charts
- Enable guardian portal features

## ✅ Testing Checklist

- [x] XP is awarded correctly
- [x] Level up triggers at correct thresholds
- [x] Pet evolves at levels 3, 7, 12
- [x] Progress persists across page reloads
- [x] Assessments complete successfully
- [x] Reward screen displays correctly
- [x] Stats page shows accurate data
- [x] Build passes without errors
- [x] Mobile responsive design maintained

## 🎉 Summary

The Bloom Sanctuary app now features:
- ✅ **Complete leveling system** with XP and automatic evolution
- ✅ **Two gamified mental health assessments** (PHQ-9 and GAD-7)
- ✅ **Enhanced reward feedback** with animations
- ✅ **Stats tracking page** with milestones
- ✅ **Persistent progress** across sessions
- ✅ **Privacy-first design** with hidden clinical scores
- ✅ **Age-appropriate language** and visuals

**Total Activities**: 5 (3 quests + 2 check-ins)
**XP Range**: 30-50 per activity
**Level Cap**: Unlimited (exponential growth)
**Evolution Stages**: 4 (Egg, Baby, Child, Adult)
