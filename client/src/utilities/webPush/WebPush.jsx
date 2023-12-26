import React, { useState } from 'react';
import { urlBase64ToUint8Array } from './utils/urlBase64';
const publicKey =
  "BAXDDlGfnQAbgREOLlk543Q5qlb4lw4Cv467DRCnmHQYjIHYwsdak23VMvmb45oKp1nsrEHdylKpZz1e-YqYpmk";
const WebPush = () => {
  const [subscription, setSubscription] = useState(null);


  const subscribeToNotifications = async () => {
    try {
      const serviceWorkerRegistration = await navigator.serviceWorker.ready;
      const pushSubscription = await serviceWorkerRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
        // Aquí deberías proporcionar tu clave pública del servidor para las notificaciones push
      });

      // Enviar 'pushSubscription' al servidor para almacenarlo y enviar notificaciones
      await sendSubscriptionToServer(pushSubscription);

      setSubscription(pushSubscription);
    } catch (error) {
      console.error('Error subscribing to notifications:', error);
    }
  };

  const sendSubscriptionToServer = async (subscription) => {
    // Envía 'subscription' al servidor, por ejemplo, a través de una solicitud POST
    try {
       
        const response = await fetch('http://localhost:3001/api/v1/notification/subscription', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(subscription),
          });
          console.log(response)
    
          if (response.ok) {
            console.log('Subscription sent to server successfully');
          } else {
            console.error('Failed to send subscription to server');
          }
    
    } catch (error) {
      console.error('Error sending subscription to server:', error);
    }
  };

  return (
    <div>
      {subscription ? (
        <p>Ya estás suscrito a las notificaciones push</p>
      ) : (
        <button onClick={subscribeToNotifications}>Suscribirse a las notificaciones push</button>
      )}
    </div>
  );
};

export default WebPush;