const publicKey =
  "BP6wc7uBiJ-S1LbydpZM7-WRsh2X1dUqcnOWL-TqCgiB9UblBfT0XBrTt2JzrjvAKZtiobBIDJCRsyZzcAUMWsw";
if (navigator.serviceWorker) {
  regSW();
}

async function regSW() {
  // registering service worker
  const regSw = await navigator.serviceWorker.register("sw.js", { scope: "/" });
}

const subscribeBtn = document.querySelector(".subscribe");
const unsubscribeBtn = document.querySelector(".unsubscribe");
subscribeBtn.addEventListener("click", async (e) => {
  console.log("btn clicked ..");
  const sw = await navigator.serviceWorker.ready;
  console.log(sw);
  // requesting notification subscription
  const notificationRequest = await Notification.requestPermission();
  const permState = Notification.permission;

  if (permState === "granted") {
    console.log("hello me");

    const data = await sw.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: publicKey,
    });
    const subscription = data;
    try {
      if (navigator.onLine === false) {
        console.log("you are not online");
        return;
      }
      const data = await fetch("/user/subscribe", {
        method: "POST",
        body: JSON.stringify({ subscription}),
        headers: { "content-type": "application/json" },
      });
      const june = await data.json();
      console.log(june);
    } catch (error) {
      console.log(error);
    }
  }
});

unsubscribeBtn.addEventListener("click", async (e) => {
  const { userAgent } = navigator;
  const data = await fetch("/user/unsubscribe", {
    method: "DELETE",
    body: JSON.stringify({ userAgent }),
    headers: { "content-type": "application/json" },
  });
  const june = await data.json();
  console.log(june);
});
