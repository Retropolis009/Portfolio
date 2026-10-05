function copyTextToClipboard(value) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(value);
  }

  return new Promise((resolve, reject) => {
    const field = document.createElement('textarea');
    field.value = value;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.opacity = '0';
    document.body.appendChild(field);
    field.select();

    try {
      const copied = document.execCommand('copy');
      document.body.removeChild(field);
      copied ? resolve() : reject(new Error('Clipboard copy was declined.'));
    } catch (error) {
      document.body.removeChild(field);
      reject(error);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const discordElement = document.getElementById('discord-id');
  const copyButton = document.getElementById('copy-btn');
  const copyText = document.getElementById('copy-text');
  const copyStatus = document.getElementById('copy-status');
  const currentYear = document.getElementById('current-year');

  if (currentYear) currentYear.textContent = new Date().getFullYear();

  if (copyButton && discordElement && copyText) {
    copyButton.addEventListener('click', async () => {
      const label = copyText.textContent;
      try {
        await copyTextToClipboard(discordElement.textContent.trim());
        copyText.textContent = 'Copied';
        if (copyStatus) copyStatus.textContent = 'Discord username copied to clipboard.';
      } catch (error) {
        copyText.textContent = 'Copy failed';
        if (copyStatus) copyStatus.textContent = 'Copy failed. Select the username and copy it manually.';
      }

      window.setTimeout(() => {
        copyText.textContent = label;
      }, 2200);
    });
  }

  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const context = canvas.getContext('2d');
  if (!context) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const pointerFine = window.matchMedia('(pointer: fine)');
  let width = 0;
  let height = 0;
  let animationFrame = 0;
  let lastFrameTime = 0;
  const spacing = 32;
  const mouse = { x: -1000, y: -1000 };

  function resizeCanvas() {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * pixelRatio);
    canvas.height = Math.floor(height * pixelRatio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    draw(0);
  }

  function draw(time) {
    context.clearRect(0, 0, width, height);
    const gradient = context.createLinearGradient(0, height, width, 0);
    gradient.addColorStop(0, '#070714');
    gradient.addColorStop(0.55, '#05060b');
    gradient.addColorStop(1, '#030409');
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

    for (let x = 0; x < width; x += spacing) {
      for (let y = 0; y < height; y += spacing) {
        const diagonal = (y / Math.max(height, 1)) * 0.65 + (1 - x / Math.max(width, 1)) * 0.45;
        const shimmer = reducedMotion.matches ? 0.7 : Math.sin(x * 0.018 + y * 0.019 + time * 0.00035) * 0.12 + 0.72;
        let opacity = Math.min(0.55, Math.max(0.035, diagonal * shimmer * 0.34));
        const dx = mouse.x - x;
        const dy = mouse.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 150) opacity += (1 - distance / 150) * 0.24;

        context.beginPath();
        context.arc(x, y, 1.2, 0, Math.PI * 2);
        context.fillStyle = (x + y) % (spacing * 2) === 0
          ? `rgba(91, 144, 255, ${opacity})`
          : `rgba(143, 124, 255, ${opacity})`;
        context.fill();
      }
    }
  }

  function animate(time) {
    if (document.hidden) {
      animationFrame = 0;
      return;
    }
    if (time - lastFrameTime >= 45) {
      draw(time);
      lastFrameTime = time;
    }
    animationFrame = window.requestAnimationFrame(animate);
  }

  function updateAnimation() {
    if (reducedMotion.matches || document.hidden) {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      draw(0);
    } else if (!animationFrame) {
      animationFrame = window.requestAnimationFrame(animate);
    }
  }

  window.addEventListener('resize', resizeCanvas, { passive: true });
  if (pointerFine.matches) {
    window.addEventListener('pointermove', (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    }, { passive: true });
    window.addEventListener('pointerleave', () => {
      mouse.x = -1000;
      mouse.y = -1000;
    }, { passive: true });
  }
  document.addEventListener('visibilitychange', updateAnimation);
  reducedMotion.addEventListener('change', updateAnimation);
  resizeCanvas();
  updateAnimation();
});
