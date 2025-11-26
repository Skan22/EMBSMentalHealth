// src/lib/store.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ----- Types -----
interface PetState {
  name: string;
  stage: 'EGG' | 'BABY' | 'CHILD' | 'ADULT';
  evolutionTrack: 'NEUTRAL' | 'SERENE' | 'WISE' | 'ENERGETIC';
  health: number;
  happiness: number;
  evolutionPoints: number;
  level: number;
  xp: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  unlockedAt: Date;
}

interface GameState {
  pet: PetState;
  achievements: Achievement[];
  journalEntries: string[]; // stored gratitude entries
  questsCompleted: number;
  assessmentsCompleted: number;
  sunlight: number;
  streak: {
    current: number;
    max: number;
    lastLoginDate: string | null;
  };
  inventory: string[];
  equippedItems: {
    hat?: string;
    accessory?: string;
  };
  habitat: string;
  safetyPlan: {
    strategies: string[];
    contacts: { name: string; phone: string }[];
    message: string;
  };
  assessmentHistory: { date: string; type: 'sparkle' | 'energy' | 'mood'; score: number }[];
  // ----- Actions -----
  setPetName: (name: string) => void;
  updatePetStats: (stats: Partial<PetState>) => void;
  evolvePet: (stage: PetState['stage']) => void;
  setHabitat: (habitat: string) => void;
  updateSafetyPlan: (plan: Partial<GameState['safetyPlan']>) => void;
  logAssessment: (type: 'sparkle' | 'energy' | 'mood', score: number) => void;
  addXP: (amount: number) => void;
  addSunlight: (amount: number) => void;
  processDailyStreak: () => void;
  purchaseItem: (itemId: string, cost: number) => boolean;
  equipItem: (slot: 'hat' | 'accessory', itemId: string) => void;
  addAchievement: (achievement: Omit<Achievement, 'unlockedAt'>) => void;
  addJournalEntry: (entry: string) => void;
  incrementQuestsCompleted: () => void;
  incrementAssessmentsCompleted: () => void;
}

// XP required for each level (exponential growth)
const getXPForLevel = (level: number): number => {
  return Math.floor(100 * Math.pow(1.5, level - 1));
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      pet: {
        name: 'Bloom',
        stage: 'EGG',
        evolutionTrack: 'NEUTRAL',
        health: 100,
        happiness: 50,
        evolutionPoints: 0,
        level: 1,
        xp: 0,
      },
      achievements: [],
      journalEntries: [],
      questsCompleted: 0,
      assessmentsCompleted: 0,
      sunlight: 0,
      streak: {
        current: 0,
        max: 0,
        lastLoginDate: null,
      },
      inventory: [],
      equippedItems: {},
      habitat: 'default',
      safetyPlan: {
        strategies: ['Take deep breaths', 'Drink some water', 'Hug a plushie'],
        contacts: [],
        message: 'You are safe and loved.',
      },
      assessmentHistory: [],

      // ----- Action implementations -----
      setPetName: (name) => set((state) => ({ pet: { ...state.pet, name } })),
      updatePetStats: (stats) => set((state) => ({ pet: { ...state.pet, ...stats } })),
      evolvePet: (stage) => set((state) => ({ pet: { ...state.pet, stage } })),
      setHabitat: (habitat) => set(() => ({ habitat })),
      updateSafetyPlan: (plan) => set((state) => ({ safetyPlan: { ...state.safetyPlan, ...plan } })),
      logAssessment: (type, score) => set((state) => ({
        assessmentHistory: [...state.assessmentHistory, { date: new Date().toISOString(), type, score }]
      })),
      addXP: (amount) =>
        set((state) => {
          const newXP = state.pet.xp + amount;
          const currentLevel = state.pet.level;
          const xpNeeded = getXPForLevel(currentLevel);

          // Also award sunlight proportional to XP (e.g., 1:1)
          const newSunlight = state.sunlight + amount;

          if (newXP >= xpNeeded) {
            const newLevel = currentLevel + 1;
            const remainingXP = newXP - xpNeeded;
            // Auto‑evolve based on level milestones
            let newStage = state.pet.stage;
            if (newLevel >= 3 && state.pet.stage === 'EGG') newStage = 'BABY';
            if (newLevel >= 7 && state.pet.stage === 'BABY') newStage = 'CHILD';
            if (newLevel >= 12 && state.pet.stage === 'CHILD') newStage = 'ADULT';
            return {
              pet: {
                ...state.pet,
                xp: remainingXP,
                level: newLevel,
                stage: newStage,
                evolutionPoints: state.pet.evolutionPoints + 50,
              },
              sunlight: newSunlight,
            };
          }
          return {
            pet: { ...state.pet, xp: newXP },
            sunlight: newSunlight
          };
        }),
      addSunlight: (amount) => set((state) => ({ sunlight: state.sunlight + amount })),

      processDailyStreak: () => set((state) => {
        const today = new Date().toISOString().split('T')[0];
        const lastDate = state.streak.lastLoginDate;

        // If already checked in today, do nothing
        if (lastDate === today) return {};

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        let newCurrent = 1;
        if (lastDate === yesterdayStr) {
          newCurrent = state.streak.current + 1;
        }

        return {
          streak: {
            current: newCurrent,
            max: Math.max(state.streak.max, newCurrent),
            lastLoginDate: today,
          },
          // Bonus sunlight for keeping the streak
          sunlight: state.sunlight + (newCurrent * 10)
        };
      }),

      purchaseItem: (itemId, cost) => {
        const state = get();
        if (state.sunlight >= cost && !state.inventory.includes(itemId)) {
          set({
            sunlight: state.sunlight - cost,
            inventory: [...state.inventory, itemId],
          });
          return true;
        }
        return false;
      },

      equipItem: (slot, itemId) => set((state) => ({
        equippedItems: { ...state.equippedItems, [slot]: itemId }
      })),

      addAchievement: (achievement) =>
        set((state) => ({
          achievements: [...state.achievements, { ...achievement, unlockedAt: new Date() }],
        })),
      addJournalEntry: (entry) =>
        set((state) => ({ journalEntries: [...state.journalEntries, entry] })),
      incrementQuestsCompleted: () =>
        set((state) => ({ questsCompleted: state.questsCompleted + 1 })),
      incrementAssessmentsCompleted: () =>
        set((state) => ({ assessmentsCompleted: state.assessmentsCompleted + 1 })),
    }),
    { name: 'bloom-sanctuary-storage' }
  )
);

export { getXPForLevel };
