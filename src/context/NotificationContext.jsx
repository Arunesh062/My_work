import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { showNotification, requestNotificationPermission } from '../utils/notifications';
import { useStore } from '../store/useStore';
import { HiOutlineBell } from "react-icons/hi";




const NotificationContext = createContext();

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
  const { reminders } = useStore();
  const lastNotified = useRef('');

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
      
      // Prevent double notifications in the same minute
      if (lastNotified.current === currentTime) return;

      let notifiedInThisCycle = false;

      // Check User Reminders from Store
      reminders?.forEach(meal => {
        if (meal.enabled && !meal.completed && meal.time === currentTime) {
          showNotification(
            `${meal.emoji || '🥣'} ${meal.title}`, 
            `Time for your ${meal.calories} kcal feeding protocol. Consistency is key!`
          );
          notifiedInThisCycle = true;
        }
      });

      // Randomized Motivation (at 10:00 AM and 5:00 PM)
      if (currentTime === '10:00' || currentTime === '17:00') {
        const randomQuote = MOTIVATIONS[Math.floor(Math.random() * MOTIVATIONS.length)];
        showNotification('My Work Motivation', randomQuote);
        notifiedInThisCycle = true;
      }

      if (notifiedInThisCycle) {
        lastNotified.current = currentTime;
      }
    };

    // Run immediately then every 30 seconds for better accuracy
    checkReminders();
    const interval = setInterval(checkReminders, 30000); 
    return () => clearInterval(interval);
  }, [permission, enabled, reminders]);

  return (
    <NotificationContext.Provider value={{ permission, enabled, requestPermission, toggleNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => useContext(NotificationContext);
