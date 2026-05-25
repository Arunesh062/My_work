const NOTIFICATION_MESSAGES = {
  'Mass Gainer Shake': "Time to drink your mass gainer shake 💪",
  'Breakfast': "Breakfast time! Fuel up for the day 🍳",
  'Snack': "Snack time! Keep those calories coming 🥜",
  'Lunch': "Lunch time! Don't skip meals 🍛",
  'Evening Snack': "Evening snack time! Stay consistent 🍌",
  'Dinner': "Dinner time! One more big meal 🥘",
  'Milk Before Sleep': "Time for your bedtime milk 🥛",
};

const GENERIC_MESSAGES = [
  "Consistency builds muscle. 💪",
  "Complete your calorie goal today! 🎯",
  "Don't break the streak! 🔥",
  "Every meal counts for your gains! 🏋️",
  "Stay disciplined, stay growing! 📈",
];

export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    console.warn('This browser does not support notifications');
    return false;
  }

  if (Notification.permission === 'granted') return true;
  if (Notification.permission === 'denied') return false;

  const permission = await Notification.requestPermission();
  return permission === 'granted';
};

export const playNotificationSound = () => {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, audioContext.currentTime); // A5
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.05);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.3);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  } catch (err) {
    console.warn('Audio play failed:', err);
  }
};

export const sendNotification = (title, body, icon = '💪', soundEnabled = true) => {
  if (Notification.permission !== 'granted') return;

  if (soundEnabled) {
    playNotificationSound();
  }

  try {
    new Notification(title, {
      body,
      icon: '/vite.svg',
      badge: '/vite.svg',
      tag: `mywork-${Date.now()}`,
      requireInteraction: false,
      silent: false,
    });
  } catch (err) {
    console.warn('Notification error:', err);
  }
};

export const getNotificationMessage = (mealTitle) => {
  return NOTIFICATION_MESSAGES[mealTitle] ||
    GENERIC_MESSAGES[Math.floor(Math.random() * GENERIC_MESSAGES.length)];
};

let notificationIntervals = [];

export const startNotificationScheduler = (reminders, enabled, soundEnabled = true) => {
  stopNotificationScheduler();

  if (!enabled || Notification.permission !== 'granted') return;

  const checkInterval = setInterval(() => {
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    reminders.forEach((reminder) => {
      if (reminder.enabled && !reminder.completed && reminder.time === currentTime) {
        const message = getNotificationMessage(reminder.title);
        sendNotification(`My Work - ${reminder.title}`, message, '💪', soundEnabled);
      }
    });
  }, 60000); // Check every minute

  notificationIntervals.push(checkInterval);
};

export const stopNotificationScheduler = () => {
  notificationIntervals.forEach(clearInterval);
  notificationIntervals = [];
};

export const formatTime = (time24) => {
  const [hours, minutes] = time24.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

export const calculateBMI = (weight, heightCm) => {
  const heightM = heightCm / 100;
  return (weight / (heightM * heightM)).toFixed(1);
};

export const getBMICategory = (bmi) => {
  if (bmi < 18.5) return { label: 'Underweight', color: '#f97316' };
  if (bmi < 25) return { label: 'Normal', color: '#06d6a0' };
  if (bmi < 30) return { label: 'Overweight', color: '#eab308' };
  return { label: 'Obese', color: '#ef4444' };
};

export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
};
