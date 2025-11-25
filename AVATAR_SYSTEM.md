# Dynamic Avatar System - Bloom Sanctuary

## Overview

The avatar system provides a visual representation of the user's progress that evolves and upgrades as they level up. The avatar appears in the level display (header) and stats page, serving as a constant reminder of achievement and growth.

## Avatar Progression

### Level 1-2: Beginner
- **Color**: Blue to Purple gradient
- **Border**: Simple white border (2px)
- **Accessories**: None
- **Animation**: Gentle pulse (1.0 → 1.05 → 1.0)

### Level 3-4: Crown Unlocked
- **Color**: Blue to Purple gradient
- **Border**: White border (2px)
- **Accessories**: 
  - 👑 **Crown** (top of avatar, gentle sway animation)
- **Animation**: Gentle pulse

### Level 5-6: Color Upgrade
- **Color**: Purple to Pink gradient
- **Border**: Golden border (4px, 70% opacity)
- **Accessories**: Crown
- **Animation**: Gentle pulse

### Level 7-9: Sparkles Unlocked
- **Color**: Purple to Pink gradient
- **Border**: Golden border (4px, 90% opacity) with glow
- **Accessories**:
  - 👑 Crown
  - ✨ **Sparkles** (top-right and bottom-left, rotating fade animation)
- **Animation**: Gentle pulse

### Level 10-11: Enhanced Glow
- **Color**: Pink to Orange gradient
- **Border**: Golden border (4px, 90% opacity) with yellow glow
- **Accessories**: Crown, Sparkles
- **Animation**: Enhanced pulse (1.0 → 1.08 → 1.0)

### Level 12-14: Stars Unlocked
- **Color**: Pink to Orange gradient
- **Border**: Golden border (4px, 90% opacity) with yellow glow
- **Accessories**:
  - 👑 Crown
  - ✨ Sparkles
  - ⭐ **Floating Stars** (top and bottom, orbital animation)
- **Animation**: Enhanced pulse

### Level 15-17: Radiant
- **Color**: Orange to Yellow gradient
- **Border**: Thick orange border (6px) with orange glow
- **Accessories**: Crown, Sparkles, Stars
- **Animation**: Enhanced pulse

### Level 18-19: Aura Unlocked
- **Color**: Orange to Yellow gradient
- **Border**: Thick orange border (6px) with orange glow
- **Accessories**:
  - 👑 Crown
  - ✨ Sparkles
  - ⭐ Stars
  - 🌟 **Aura** (pulsing gradient background blur)
- **Animation**: Enhanced pulse

### Level 20-24: Master
- **Color**: Yellow to Green gradient
- **Border**: Gradient border (6px, yellow to pink) with pink glow
- **Accessories**: Crown, Sparkles, Stars, Aura
- **Animation**: Maximum pulse (1.0 → 1.12 → 1.0)

### Level 25+: Legendary
- **Color**: Yellow to Green gradient
- **Border**: Gradient border with pink glow
- **Accessories**:
  - 👑 Crown
  - ✨ Sparkles
  - ⭐ Stars
  - 🌟 Aura
  - ⚡ **Lightning Bolt** (right side, pulsing)
- **Animation**: Maximum pulse

## Technical Implementation

### Component: UserAvatar

**Location**: `src/components/sanctuary/UserAvatar.tsx`

**Props**:
- `size`: 'sm' | 'md' | 'lg'
  - **sm**: 48px (w-12 h-12) - For compact displays
  - **md**: 80px (w-20 h-20) - For header/level display
  - **lg**: 128px (w-32 h-32) - For stats page

**Features**:
- Real-time level reading from Zustand store
- Automatic upgrade calculation based on level
- Framer Motion animations for all effects
- Responsive sizing
- Glassmorphism effects

### Animation Details

#### Pulse Animation
```typescript
animate: {
  scale: pulseScale, // [1, 1.05-1.12, 1] depending on level
}
transition: {
  duration: 2,
  repeat: Infinity,
  ease: 'easeInOut',
}
```

#### Crown Sway
```typescript
animate: {
  rotate: [-5, 5, -5],
}
transition: {
  duration: 2,
  repeat: Infinity,
  ease: 'easeInOut',
}
```

#### Sparkle Fade
```typescript
animate: {
  scale: [0, 1, 0],
  rotate: [0, 180, 360],
}
transition: {
  duration: 2,
  repeat: Infinity,
  repeatDelay: 1,
}
```

#### Star Orbit
```typescript
animate: {
  y: [-5, -10, -5],
  rotate: [0, 360],
}
transition: {
  duration: 3,
  repeat: Infinity,
}
```

#### Aura Pulse
```typescript
animate: {
  scale: [1, 1.3, 1],
  opacity: [0.3, 0.5, 0.3],
}
transition: {
  duration: 3,
  repeat: Infinity,
  ease: 'easeInOut',
}
```

## Integration Points

### 1. Level Display (Header)
- **Size**: Medium (md)
- **Location**: Top-left of Sanctuary view
- **Purpose**: Constant visibility of progress
- **Includes**: Avatar + Level number + XP bar + Evolution points

### 2. Stats Page
- **Size**: Large (lg)
- **Location**: Top of level card
- **Purpose**: Showcase achievement
- **Includes**: Avatar + Level info + XP progress

## Visual Hierarchy

The avatar system uses a clear visual hierarchy to communicate progress:

1. **Color Progression**: Cool → Warm (Blue → Purple → Pink → Orange → Yellow → Green)
2. **Border Enhancement**: Simple → Glowing → Gradient
3. **Accessory Accumulation**: None → Crown → Sparkles → Stars → Aura → Lightning
4. **Animation Intensity**: Gentle → Enhanced → Maximum

## Design Philosophy

### Positive Reinforcement
- Every upgrade is additive (accessories stack)
- No downgrades or penalties
- Visual rewards for consistent progress
- Celebratory aesthetics

### Age-Appropriate
- Bright, friendly colors
- Recognizable symbols (crown, stars)
- Smooth, non-jarring animations
- Clear visual feedback

### Performance
- Optimized animations using Framer Motion
- Conditional rendering of accessories
- Efficient re-renders via Zustand
- No heavy image assets

## Future Enhancements

### Potential Additions
1. **Custom Themes**: Unlock different color schemes
2. **Seasonal Accessories**: Holiday-themed decorations
3. **Achievement Badges**: Display specific accomplishments
4. **Avatar Customization**: Choose accessories to display
5. **Particle Effects**: More elaborate visual effects at high levels
6. **Sound Effects**: Audio feedback on level up
7. **Avatar Gallery**: View all unlocked states
8. **Share Feature**: Export avatar as image

### Evolution Track Integration
Future: Different accessories based on evolution track
- **Serene**: Calm blue aura, peaceful symbols
- **Wise**: Purple glow, book/owl accessories
- **Energetic**: Orange lightning, dynamic effects

## Accessibility

- High contrast colors for visibility
- Clear level number always visible
- Animations can be reduced via CSS `prefers-reduced-motion`
- Semantic HTML structure
- Screen reader friendly

## Summary

The avatar system provides:
- ✅ **Visual Progress Indicator**: Immediate feedback on level
- ✅ **Motivation**: Exciting upgrades to work toward
- ✅ **Identity**: Personalized representation of achievement
- ✅ **Celebration**: Rewarding visual effects
- ✅ **Consistency**: Appears throughout the app
- ✅ **Scalability**: Easy to add new tiers and accessories

**Total Upgrade Tiers**: 10 (every 2-5 levels)
**Total Accessories**: 5 (Crown, Sparkles, Stars, Aura, Lightning)
**Color Schemes**: 6 distinct gradients
**Animation Types**: 5 unique patterns
