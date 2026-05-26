import { createContext, useContext, useEffect, useState } from 'react';
import { showNotification, requestNotificationPermission } from '../utils/notifications';

const NotificationContext = createContext();

const MEAL_REMINDERS = [
  { time: '07:00', title: 'Mass Gainer Shake 💪', body: 'Initialize hypertrophy protocol. Consume mass gainer now.' },
  { time: '09:00', title: 'Breakfast 🍳', body: 'Energy intake required. Consume breakfast protocol.' },
  { time: '11:00', title: 'Snack 🍌', body: 'Metabolic maintenance. Mid-morning snack due.' },
  { time: '13:30', title: 'Lunch 🍛', body: 'Peak nutrient delivery. Initiate lunch sequence.' },
  { time: '16:30', title: 'Evening Snack 🥜', body: 'Anabolic window protection. Evening snack required.' },
  { time: '19:30', title: 'Dinner 🍽️', body: 'Nightload sequence initiated. Consume dinner protocol.' },
  { time: '22:00', title: 'Milk Before Sleep 🥛', body: 'Slow-release protein required. Final nutrient intake.' },
];

const MOTIVATIONS = [
  "Consistency builds muscle 🔥",
  "Complete your calorie goal today 💪",
  "Stay disciplined. Results are earned.",
  "Your body is a temple of gains.",
  "Feed the machine. 🍖",
];

export function NotificationProvider({ children }) {
  const [permission, setPermission] = useState(Notification.permission);
  const [enabled, setEnabled] = useState(localStorage.getItem('notifications_enabled') === 'true');

  const requestPermission = async () => {
    const result = await requestNotificationPermission();
    setPermission(result);
    if (result === 'granted') {
      setEnabled(true);
      localStorage.setItem('notifications_enabled', 'true');
      showNotification('System Synchronized', 'Reminders and notifications active 🔥');
    }
    return result;
  };

  const toggleNotifications = () => {
    const newStatus = !enabled;
    setEnabled(newStatus);
    localStorage.setItem('notifications_enabled', String(newStatus));
  };

  // Scheduler
  useEffect(() => {
    if (permission !== 'granted' || !enabled) return;

    const checkReminders = () => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      // Check Meal Reminders
      MEAL_REMINDERS.forEach(meal => {
        if (meal.time === currentTime) {
          showNotification(meal.title, meal.body);
        }
      });

      // Randomized Motivation (at 10:00 AM and 5:00 PM)
      if (currentTime === '10:00' || currentTime === '17:00') {
        const randomQuote = MOTIVATIONS[Math.floor(Math.random() * MOTIVATIONS.length)];
        showNotification('My Work Motivation', randomQuote);
      }
    };

    const interval = setInterval(checkReminders, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [permission, enabled]);

  return (
    <NotificationContext.Provider value={{ permission, enabled, requestPermission, toggleNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => useContext(NotificationContext);
