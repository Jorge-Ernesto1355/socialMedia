const sendNotification = async (req, res) => {
  const { message } = req.body;
  try {
    const payload = JSON.stringify({
      title: "UniVerse",
      message: message,
    });

    const options = {
      // Puedes agregar opciones adicionales aquí, como TTL, icono, etc.
      // Consulta la documentación de webPush para más detalles.
    };

    await webPush.sendNotification(payload, options);
    res
      .status(200)
      .json({ success: true, message: "Notification sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = sendNotification;
