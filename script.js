// Discord ID Copy Functionality
function copyDiscordID() {
  const discordElement = document.getElementById("discord-id");
  const copyText = document.getElementById("copy-text");

  if (!discordElement || !copyText) return;

  const discordID = discordElement.innerText;

  navigator.clipboard.writeText(discordID).then(() => {
    copyText.innerText = "Copied!";
    setTimeout(() => {
      copyText.innerText = "Copy ID";
    }, 2000);
  }).catch(err => {
    console.error("Failed to copy Discord ID: ", err);
  });
}

// Explicitly bind to window for inline onclick accessibility
window.copyDiscordID = copyDiscordID;

document.addEventListener('DOMContentLoaded', () => {
  const scrollIndicator = document.getElementById('scroll-indicator');

  // Hide scroll indicator when reaching bottom
  window.addEventListener('scroll', () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.documentElement.scrollHeight - 50;

    if (scrollPosition >= threshold) {
      scrollIndicator.classList.add('hidden');
    } else {
      scrollIndicator.classList.remove('hidden');
    }
  });

  // LED Canvas Background with Mouse Glow Hover Effect
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const mouse = {
    x: -1000,
    y: -1000,
    radius: 180
  };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const spacing = 28;

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Dark base gradient
    const bgGradient = ctx.createLinearGradient(0, height, width, 0);
    bgGradient.addColorStop(0, '#040314');
    bgGradient.addColorStop(0.5, '#02020a');
    bgGradient.addColorStop(1, '#000000');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    const time = Date.now() * 0.0015;

    for (let x = 0; x < width; x += spacing) {
      for (let y = 0; y < height; y += spacing) {
        
        const diagFactor = (y / height) * 0.7 + (1 - x / width) * 0.5;
        const noise = Math.sin(x * 0.02 + y * 0.02 + time) * 0.3 + 0.7;
        let opacity = Math.min(1, Math.max(0, diagFactor * noise * 0.85));

        // Hover Effect: Calculate distance from mouse position
        const dx = mouse.x - x;
        const dy = mouse.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let dotRadius = 1.8;

        if (dist < mouse.radius) {
          const hoverIntensity = (1 - dist / mouse.radius);
          opacity = Math.min(1, opacity + hoverIntensity * 0.8);
          dotRadius += hoverIntensity * 2; // Dynamic dot scaling on hover
        }

        if (opacity > 0.05) {
          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);

          const isBlue = (x + y) % (spacing * 2) === 0;
          ctx.fillStyle = isBlue 
            ? `rgba(59, 130, 246, ${opacity})` 
            : `rgba(139, 92, 246, ${opacity})`;

          ctx.fill();
        }
      }
    }

    requestAnimationFrame(render);
  }

  render();
});