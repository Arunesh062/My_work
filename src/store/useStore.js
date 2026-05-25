import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const DEFAULT_REMINDERS = [
  { id: '1', title: 'Mass Gainer Shake', time: '07:00', completed: false, calories: 450, enabled: true, emoji: '🥤' },
  { id: '2', title: 'Breakfast', time: '09:00', completed: false, calories: 500, enabled: true, emoji: '🍳' },
  { id: '3', title: 'Snack', time: '11:00', completed: false, calories: 200, enabled: true, emoji: '🥜' },
  { id: '4', title: 'Lunch', time: '13:30', completed: false, calories: 700, enabled: true, emoji: '🍛' },
  { id: '5', title: 'Evening Snack', time: '16:30', completed: false, calories: 300, enabled: true, emoji: '🍌' },
  { id: '6', title: 'Dinner', time: '19:30', completed: false, calories: 650, enabled: true, emoji: '🥘' },
  { id: '7', title: 'Milk Before Sleep', time: '22:00', completed: false, calories: 200, enabled: true, emoji: '🥛' },
];

const MOTIVATIONAL_QUOTES = [
  "The only bad workout is the one that didn't happen. 💪",
  "Consistency is the key to transformation. 🔑",
  "Every meal counts when you're building muscle. 🍗",
  "Your body achieves what your mind believes. 🧠",
  "Small daily improvements lead to stunning results. 📈",
  "Discipline is choosing between what you want now and what you want most. 🎯",
  "Feed the machine. Your body is a temple of gains. 🏛️",
  "Progress, not perfection. Keep showing up. ✨",
  "Today's effort is tomorrow's muscle. 💪",
  "Winners never skip meals. Champions never quit. 🏆",
  "The pain you feel today will be the strength you feel tomorrow. 🔥",
  "Eat big, lift big, get big. Simple. 🍖",
  "Don't wish for a good body. Work for it. 🏋️",
  "Stay hungry, stay consistent. 🦁",
];

const ACHIEVEMENT_BADGES = [
  { id: 'first_log', name: 'First Step', description: 'Logged your first weight', icon: '🌟', requirement: 1, type: 'weight_logs' },
  { id: 'week_streak', name: 'Week Warrior', description: '7-day streak', icon: '🔥', requirement: 7, type: 'streak' },
  { id: 'month_streak', name: 'Monthly Master', description: '30-day streak', icon: '👑', requirement: 30, type: 'streak' },
  { id: 'calorie_crusher', name: 'Calorie Crusher', description: 'Hit calorie goal 10 times', icon: '💪', requirement: 10, type: 'calorie_goals' },
  { id: 'hydrated', name: 'Stay Hydrated', description: 'Hit water goal 7 days', icon: '💧', requirement: 7, type: 'water_goals' },
  { id: 'meal_master', name: 'Meal Master', description: 'Complete all meals 5 days', icon: '🍽️', requirement: 5, type: 'meal_completions' },
  { id: 'ten_logs', name: 'Dedicated', description: 'Logged weight 10 times', icon: '📊', requirement: 10, type: 'weight_logs' },
  { id: 'fifty_streak', name: 'Unstoppable', description: '50-day streak', icon: '⚡', requirement: 50, type: 'streak' },
];

export const useStore = create(
  persist(
    (set, get) => ({
      // User Profile
      user: null,
      isAuthenticated: false,
      profile: {
        name: '',
        email: '',
        currentWeight: 55,
        targetWeight: 70,
        calorieGoal: 3000,
        waterGoal: 8,
        height: 170,
      },

      // Stats
      streak: 0,
      bestStreak: 0,
      calorieGoalHits: 0,
      waterGoalHits: 0,
      mealCompletionDays: 0,

      // Reminders
      reminders: DEFAULT_REMINDERS,

      // Weight Logs
      weightLogs: [
        { id: 'w1', weight: 55, date: '2026-05-19' },
        { id: 'w2', weight: 55.3, date: '2026-05-20' },
        { id: 'w3', weight: 55.5, date: '2026-05-21' },
        { id: 'w4', weight: 55.8, date: '2026-05-22' },
        { id: 'w5', weight: 56.0, date: '2026-05-23' },
        { id: 'w6', weight: 55.9, date: '2026-05-24' },
        { id: 'w7', weight: 56.2, date: '2026-05-25' },
      ],

      // Calorie Logs
      calorieLogs: [],

      // Water Intake
      waterIntake: 0,
      waterHistory: [],

      // Settings
      settings: {
        darkMode: true,
        notificationsEnabled: true,
        notificationSound: true,
      },

      // Quotes
      motivationalQuote: MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)],

      // Badges
      badges: ACHIEVEMENT_BADGES,

      // Actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),

      updateProfile: (updates) => set((state) => ({
        profile: { ...state.profile, ...updates },
      })),

      // Reminder Actions
      addReminder: (reminder) => set((state) => ({
        reminders: [...state.reminders, { ...reminder, id: Date.now().toString() }],
      })),

      updateReminder: (id, updates) => set((state) => ({
        reminders: state.reminders.map((r) =>
          r.id === id ? { ...r, ...updates } : r
        ),
      })),

      deleteReminder: (id) => set((state) => ({
        reminders: state.reminders.filter((r) => r.id !== id),
      })),

      toggleReminder: (id) => set((state) => ({
        reminders: state.reminders.map((r) =>
          r.id === id ? { ...r, completed: !r.completed } : r
        ),
      })),

      toggleReminderEnabled: (id) => set((state) => ({
        reminders: state.reminders.map((r) =>
          r.id === id ? { ...r, enabled: !r.enabled } : r
        ),
      })),

      resetDailyReminders: () => set((state) => ({
        reminders: state.reminders.map((r) => ({ ...r, completed: false })),
      })),

      // Weight Actions
      addWeightLog: (weight) => {
        const today = new Date().toISOString().split('T')[0];
        set((state) => ({
          weightLogs: [...state.weightLogs.filter(w => w.date !== today), {
            id: Date.now().toString(),
            weight: parseFloat(weight),
            date: today,
          }],
          profile: { ...state.profile, currentWeight: parseFloat(weight) },
        }));
      },

      // Calorie Actions
      addCalorieLog: (foodName, calories) => {
        const today = new Date().toISOString().split('T')[0];
        set((state) => ({
          calorieLogs: [...state.calorieLogs, {
            id: Date.now().toString(),
            foodName,
            calories: parseInt(calories),
            date: today,
          }],
        }));
      },

      deleteCalorieLog: (id) => set((state) => ({
        calorieLogs: state.calorieLogs.filter((c) => c.id !== id),
      })),

      // Water Actions
      addWater: () => set((state) => ({
        waterIntake: Math.min(state.waterIntake + 1, state.profile.waterGoal + 4),
      })),

      removeWater: () => set((state) => ({
        waterIntake: Math.max(state.waterIntake - 1, 0),
      })),

      resetWater: () => set({ waterIntake: 0 }),

      // Streak Actions
      incrementStreak: () => set((state) => ({
        streak: state.streak + 1,
        bestStreak: Math.max(state.streak + 1, state.bestStreak),
      })),

      resetStreak: () => set({ streak: 0 }),

      // Settings
      updateSettings: (updates) => set((state) => ({
        settings: { ...state.settings, ...updates },
      })),

      // Refresh Quote
      refreshQuote: () => set({
        motivationalQuote: MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)],
      }),

      // Computed values
      getTodayCalories: () => {
        const today = new Date().toISOString().split('T')[0];
        const state = get();
        const fromLogs = state.calorieLogs
          .filter((c) => c.date === today)
          .reduce((sum, c) => sum + c.calories, 0);
        const fromMeals = state.reminders
          .filter((r) => r.completed)
          .reduce((sum, r) => sum + r.calories, 0);
        return fromLogs + fromMeals;
      },

      getRemainingCalories: () => {
        const state = get();
        return Math.max(0, state.profile.calorieGoal - state.getTodayCalories());
      },

      getProgressPercentage: () => {
        const state = get();
        const currentWeight = state.profile.currentWeight;
        const startWeight = state.weightLogs.length > 0 ? state.weightLogs[0].weight : currentWeight;
        const targetWeight = state.profile.targetWeight;
        if (targetWeight === startWeight) return 100;
        const progress = ((currentWeight - startWeight) / (targetWeight - startWeight)) * 100;
        return Math.min(Math.max(progress, 0), 100);
      },

      getBMI: () => {
        const state = get();
        const heightM = state.profile.height / 100;
        return (state.profile.currentWeight / (heightM * heightM)).toFixed(1);
      },

      getUnlockedBadges: () => {
        const state = get();
        return ACHIEVEMENT_BADGES.filter(badge => {
          switch (badge.type) {
            case 'streak': return state.streak >= badge.requirement;
            case 'weight_logs': return state.weightLogs.length >= badge.requirement;
            case 'calorie_goals': return state.calorieGoalHits >= badge.requirement;
            case 'water_goals': return state.waterGoalHits >= badge.requirement;
            case 'meal_completions': return state.mealCompletionDays >= badge.requirement;
            default: return false;
          }
        });
      },

      getWeeklyCompletionScore: () => {
        const state = get();
        const completed = state.reminders.filter(r => r.completed).length;
        const total = state.reminders.length;
        return total > 0 ? Math.round((completed / total) * 100) : 0;
      },

      getNextReminder: () => {
        const state = get();
        const now = new Date();
        const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        const upcoming = state.reminders
          .filter(r => !r.completed && r.enabled && r.time > currentTime)
          .sort((a, b) => a.time.localeCompare(b.time));
        return upcoming[0] || null;
      },
    }),
    {
      name: 'my-work-fitness-store',
      partialize: (state) => ({
        profile: state.profile,
        reminders: state.reminders,
        weightLogs: state.weightLogs,
        calorieLogs: state.calorieLogs,
        waterIntake: state.waterIntake,
        streak: state.streak,
        bestStreak: state.bestStreak,
        calorieGoalHits: state.calorieGoalHits,
        waterGoalHits: state.waterGoalHits,
        mealCompletionDays: state.mealCompletionDays,
        settings: state.settings,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
);
