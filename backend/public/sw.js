self.addEventListener("push", (e) => {
  const poster = e.data.json();
  self.registration.showNotification(poster.title, { body: poster.body });
});
