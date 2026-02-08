import { useCallback } from 'react';

export const useSound = () => {
  
  const playSound = useCallback((type) => {
    let audioFile;

    switch (type) {
      case 'click':
        audioFile = '/assets/sounds/ui-click.mp3'; // Sonido suave de botón
        break;
      case 'success':
        audioFile = '/assets/sounds/success.mp3'; // Sonido de "Tarea completada"
        break;
      case 'delete':
        audioFile = '/assets/sounds/trash.mp3'; // Sonido de papelera o algo "glitch"
        break;
      case 'error':
        audioFile = '/assets/sounds/error.mp3'; // Sonido de error
        break;
      case 'pop':
        audioFile = '/assets/sounds/pop.mp3'; // Sonido al abrir modal
        break;
      default:
        return;
    }

    const audio = new Audio(audioFile);
    audio.volume = 0.5; // Para que no rompa tímpanos
    audio.play().catch(e => console.log("Audio play failed (user interaction needed first)", e));
  }, []);

  return playSound;
};