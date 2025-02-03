import confetti from 'canvas-confetti';

const createEmojiParticle = (emoji: string) => {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '50%';
  canvas.style.left = '50%';
  canvas.style.transform = 'translate(-50%, -50%)';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  canvas.style.transition = 'all 0.5s ease-out';
  canvas.style.fontSize = '0px';
  document.body.appendChild(canvas);

  // Animate the emoji
  requestAnimationFrame(() => {
    canvas.style.fontSize = '100px';
    canvas.textContent = emoji;
    
    setTimeout(() => {
      canvas.style.opacity = '0';
      canvas.style.transform = 'translate(-50%, -50%) scale(1.5)';
      setTimeout(() => canvas.remove(), 500);
    }, 800);
  });
};

export const celebrateTaskCompletion = (taskTitle: string) => {
  const isCodingTask = taskTitle.toLowerCase().includes('cod') || 
                      taskTitle.toLowerCase().includes('program') ||
                      taskTitle.toLowerCase().includes('dev');

  if (isCodingTask) {
    // Show coder emoji first
    createEmojiParticle('👨‍💻');
    
    // Then burst into confetti after a delay
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#60A5FA', '#3B82F6', '#2563EB', '#C084FC', '#A855F7'], // Blue + Purple theme
        shapes: ['square'], // To represent bits/pixels
      });
    }, 1000);
  } else {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#60A5FA', '#3B82F6', '#2563EB'],
    });
  }
};

export const celebrateAllTasksCompleted = () => {
  const duration = 3000;
  const end = Date.now() + duration;

  const colors = ['#60A5FA', '#3B82F6', '#2563EB', '#1D4ED8'];

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};