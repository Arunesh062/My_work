self.addEventListener("install", () => {
  console.log("[My Work] Service Worker Installed");
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  console.log("[My Work] Service Worker Activated");
});

self.addEventListener("push", (event) => {
  const data = event.data?.json() || { title: "My Work", body: "New update from system." };
  
  const options = {
    body: data.body,
    icon: "/icon.png",
    badge: "/icon.png",
    vibrate: [100, 50, 100],
    data: {
      url: self.registration.scope
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("/")
  );
});