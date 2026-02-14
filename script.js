document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.getElementById('hero');
    const hintSection = document.getElementById('hint');
    const revealSection = document.getElementById('reveal');
    const revealBtn = document.getElementById('reveal-btn');

    const dearAmySection = document.getElementById('dear-amy');
    const continueBtn = document.getElementById('continue-btn');

    // Simple scroll detection to show Dear Amy section
    let hasScrolled = false;

    function showDearAmy() {
        if (!hasScrolled) {
            hasScrolled = true;
            heroSection.style.opacity = '0';
            setTimeout(() => {
                heroSection.style.display = 'none';
                dearAmySection.classList.remove('hidden');
                void dearAmySection.offsetWidth;
                dearAmySection.style.opacity = '1';
                dearAmySection.style.display = 'flex';
                // Auto-play video if desired/possible, but usually blocked by browsers without interaction
            }, 1000);
        }
    }

    const startBtn = document.getElementById('start-btn');

    // Button click to show Dear Amy section
    startBtn.addEventListener('click', showDearAmy);

    // Continue button from Dear Amy to Hint
    continueBtn.addEventListener('click', () => {
        const video = document.querySelector('video');
        if (video) video.pause(); // Stop video when continuing

        dearAmySection.style.opacity = '0';
        setTimeout(() => {
            dearAmySection.style.display = 'none';
            hintSection.classList.remove('hidden');
            void hintSection.offsetWidth;
            hintSection.style.opacity = '1';
            hintSection.style.display = 'flex';
        }, 1000);
    });

    revealBtn.addEventListener('click', () => {
        const music = document.getElementById('concert-music');
        music.volume = 0.5;

        // Try to play
        const playPromise = music.play();

        if (playPromise !== undefined) {
            playPromise.then(_ => {
                console.log("Audio playing automatically");
            })
                .catch(error => {
                    console.error("Auto-play prevented (or load failed):", error);
                    // Show play button if auto-play fails
                    document.getElementById('play-music-btn').style.display = 'inline-block';
                });
        }

        // Add error listener to audio element to handle loading errors
        music.addEventListener('error', (e) => {
            console.error("Error loading audio:", e);
            document.getElementById('play-music-btn').style.display = 'none';
            document.getElementById('music-error').style.display = 'block';
        });

        hintSection.style.opacity = '0';
        setTimeout(() => {
            hintSection.style.display = 'none';
            revealSection.classList.remove('hidden');
            void revealSection.offsetWidth;
            revealSection.style.opacity = '1';
            revealSection.style.display = 'flex';
            startMusicNoteRain();
        }, 1000);
    });

    // Manual Play Button Logic
    document.getElementById('play-music-btn').addEventListener('click', () => {
        const music = document.getElementById('concert-music');
        music.play().catch(e => alert("Could not play music: " + e.message));
        document.getElementById('play-music-btn').style.display = 'none';
        startMusicNoteRain(); // Also start rain if manual play is used
    });

    function startMusicNoteRain() {
        const notes = ['♪', '♫', '♩', '♬', '♭', '♮', '♯'];
        const container = document.body;

        setInterval(() => {
            const note = document.createElement('div');
            note.innerText = notes[Math.floor(Math.random() * notes.length)];
            note.classList.add('music-note');

            // Randomize properties
            const left = Math.random() * 100; // 0-100vw
            const duration = 3 + Math.random() * 5; // 3-8s
            const size = 1 + Math.random() * 2; // 1-3rem
            const rotate = Math.random() * 360;

            note.style.left = `${left}vw`;
            note.style.animationDuration = `${duration}s`;
            note.style.fontSize = `${size}rem`;
            note.style.transform = `rotate(${rotate}deg)`;

            container.appendChild(note);

            // Cleanup
            setTimeout(() => {
                note.remove();
            }, duration * 1000);
        }, 300);
    }
});
