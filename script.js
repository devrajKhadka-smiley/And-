document.addEventListener('DOMContentLoaded', () => {
    const greetingElement = document.getElementById('greeting');
    const startBtn = document.getElementById('start-btn');
    const messageContainer = document.getElementById('message-container');
    const audioPlayerContainer = document.getElementById('audio-player');
    
    const playBtn = document.getElementById('play-btn');
    const audio = document.getElementById('bg-audio');
    const icon = playBtn.querySelector('i');
    
    let isPlaying = false;
    
    // The text to type out
    const textToType = "Good Morning Mrs. Aayusha Gautam Khadka";
    let index = 0;
    const typingSpeed = 100; // milliseconds per character
    
    // Start typing animation after a small delay
    setTimeout(typeText, 1000);
    
    function typeText() {
        if (index < textToType.length) {
            greetingElement.textContent += textToType.charAt(index);
            greetingElement.classList.add('typing-cursor');
            index++;
            setTimeout(typeText, typingSpeed);
        } else {
            // Typing finished
            setTimeout(() => {
                // Keep cursor blinking for a moment, then show the start button
                greetingElement.classList.remove('typing-cursor');
                
                // Show start button
                startBtn.classList.remove('hidden');
                // Trigger reflow
                void startBtn.offsetWidth;
                startBtn.classList.add('visible');
            }, 1000);
        }
    }
    
    const topHeader = document.getElementById('top-header');

    // Start button logic
    startBtn.addEventListener('click', () => {
        // Fade out the start button
        startBtn.classList.remove('visible');
        
        // Fade out the main greeting
        greetingElement.style.opacity = '0';
        
        setTimeout(() => {
            startBtn.classList.add('hidden');
            greetingElement.classList.add('hidden');
            
            // Show the top header
            topHeader.classList.remove('hidden');
            void topHeader.offsetWidth;
            topHeader.classList.add('visible');
            
            // Show the long message
            messageContainer.classList.remove('hidden');
            void messageContainer.offsetWidth;
            messageContainer.classList.add('visible');
            
            // Show audio player slightly after
            setTimeout(() => {
                audioPlayerContainer.classList.remove('hidden');
                void audioPlayerContainer.offsetWidth;
                audioPlayerContainer.classList.add('visible');
            }, 800);
        }, 500); // 500ms fade out transition
    });
    
    // Audio Player pause/play Logic
    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
            playBtn.classList.remove('playing');
        } else {
            audio.play().catch(error => {
                console.error("Audio playback failed:", error);
            });
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
            playBtn.classList.add('playing');
        }
        isPlaying = !isPlaying;
    });
    
    // Handle audio ending
    audio.addEventListener('ended', () => {
        if(!audio.loop) {
            isPlaying = false;
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
            playBtn.classList.remove('playing');
        }
    });

    // Falling cute items (flowers and hearts)
    function createFallingItem() {
        const item = document.createElement('div');
        item.classList.add('falling-item');
        
        const items = ['🌸', '🌹', '🌺', '🌻', '❤️', '💖', '💕', '💗', '✨'];
        item.textContent = items[Math.floor(Math.random() * items.length)];
        
        // Random horizontal position (0vw to 100vw)
        item.style.left = Math.random() * 100 + 'vw';
        
        // Random animation duration between 4s and 9s
        item.style.animationDuration = Math.random() * 5 + 4 + 's';
        
        // Random size
        item.style.fontSize = Math.random() * 1.5 + 1 + 'rem';
        
        document.body.appendChild(item);
        
        // Remove item after animation finishes to keep DOM clean
        setTimeout(() => {
            item.remove();
        }, 10000); // 10 seconds is safe for up to 9s animation
    }
    
    // Spawn a new item every 400 milliseconds
    setInterval(createFallingItem, 400);
});
