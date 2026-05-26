/**
 * Safe Browser Notification Utility for My Work
 * Handles permission checks and notification display with fallbacks.
 */
export const showNotification = (title, body, options = {}) => {
  if (!("Notification" in window)) {
    console.warn("[Notifications] This browser does not support desktop notifications.");
    return;
  }

  if (Notification.permission === "granted") {
    try {
      const defaultOptions = {
        body,
        icon: "/icon.png",
        badge: "/icon.png",
        vibrate: [200, 100, 200],
        ...options
      };

      // Try service worker notification first (better for PWA/Mobile)
      if (navigator.serviceWorker && navigator.serviceWorker.controller) {
        navigator.serviceWorker.ready.then(registration => {
          registration.showNotification(title, defaultOptions);
        });
      } else {
        // Fallback to standard Browser API
        new Notification(title, defaultOptions);
      }
    } catch (err) {
      console.error("[Notifications] Error showing notification:", err);
    }
  }
};

export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) return "not_supported";
  
  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (err) {
    console.error("[Notifications] Error requesting permission:", err);
    return "error";
  }
};
