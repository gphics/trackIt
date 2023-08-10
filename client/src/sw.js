self.addEventListener("install", (e) => {
    console.log("I am installing", e)
})

self.addEventListener("push", (e) => {
  const { title, body } = e.data
  self.registration.sendNotification(title, {body})
})