export const formatTime = (seconds) => {
  if (seconds < 0) return "Tiempo inválido"; // Manejo de valores negativos

  if (seconds >= 3600) {
    const hours = Math.floor(seconds / 3600);
    return hours === 1 ? `${hours} hora` : `${hours} horas`;
  } else if (seconds >= 60) {
    const minutes = Math.floor(seconds / 60);
    return minutes === 1 ? `${minutes} minuto` : `${minutes} minutos`;
  } else {
    return seconds === 1 ? `${seconds} segundo` : `${seconds} segundos`;
  }
};
