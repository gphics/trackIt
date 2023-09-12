import { precacheAndRoute } from "workbox-precaching";


self.addEventListener("push", (e) => {
  const data = e.data.json();
  const { title, body } = data;
  self.registration.showNotification(title, { body });
});

precacheAndRoute(self.__WB_MANIFEST);
