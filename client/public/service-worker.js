console.log("service-worker.js");
self.addEventListener("push", (event) => {
  const options = {
    body: event.data.text(),
  };
  console.log(event, "event paa");

  event.waitUntil(
    self.registration.showNotification("Custom Notification Title", options),
  );
});
