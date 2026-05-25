import { requestNotificationPermission, sendNotification } from '../utils/helpers';
import { useStore } from '../store/useStore';
import { useState } from 'react';

export default function NotificationButton() {
  const { settings, updateSettings } = useStore();
  const [status, setStatus] = useState('');

  const handleEnable = async () => {
    const granted = await requestNotificationPermission();
    if (granted) {
      updateSettings({ notificationsEnabled: true });
      sendNotification('My Work', 'Notifications enabled! We\'ll remind you to eat. 💪', '💪', settings.notificationSound);
      setStatus('enabled');
    } else {
      setStatus('denied');
    }
    setTimeout(() => setStatus(''), 3000);
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleEnable}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border-none cursor-pointer"
        style={{
          background: settings.notificationsEnabled
            ? 'rgba(6, 214, 160, 0.15)'
            : 'rgba(59, 130, 246, 0.15)',
          color: settings.notificationsEnabled ? '#06d6a0' : '#3b82f6',
        }}
      >
        <span>{settings.notificationsEnabled ? '🔔' : '🔕'}</span>
        <span>{settings.notificationsEnabled ? 'Notifications On' : 'Enable Notifications'}</span>
      </button>
      {status === 'denied' && (
        <span className="text-xs text-red-400">Permission denied. Enable in browser settings.</span>
      )}
      {status === 'enabled' && (
        <span className="text-xs text-green-400">Notifications enabled!</span>
      )}
    </div>
  );
}
