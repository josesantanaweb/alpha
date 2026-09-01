self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

const toAbsolute = (path) =>
  path.startsWith("http") ? path : new URL(path, self.location.origin).href;

self.addEventListener("push", (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch {
    // payload no JSON: ignorar
  }

  const { title = "Aura", body = "", url = "/" } = data;
  const iconUrl = toAbsolute("/icons/icon-192.png");
  const badgeUrl = toAbsolute("/icons/icon-192.png");

  // Nota iOS/WebKit: NO usar "tag" en showNotification (bug: la notificación no se muestra)
  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: iconUrl,
      badge: badgeUrl,
      data: { url: toAbsolute(url) },
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || toAbsolute("/");

  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if ("focus" in client) {
            client.navigate(url);
            return client.focus();
          }
        }
        if (self.clients.openWindow) {
          return self.clients.openWindow(url);
        }
      })
  );
});