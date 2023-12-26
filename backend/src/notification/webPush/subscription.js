const webPush = require("./webPush");

const subscription = async (req, res) => {
  try {
    const pushSubscription = req.body;
    console.log(pushSubscription);

    const payload = JSON.stringify({
      title: "Custom Notification Title",
      message: "Your custom notification message here",
    });

    const options = {
      // Puedes agregar opciones adicionales aquí, como TTL, icono, etc.
      // Consulta la documentación de webPush para más detalles.
    };

    await webPush.sendNotification(pushSubscription, payload, options);
    res
      .status(200)
      .json({ success: true, message: "Notification sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = subscription;
