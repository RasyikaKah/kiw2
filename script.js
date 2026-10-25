// Interaksi Klik Lilin
const flame = document.getElementById('flame');
const candle = document.querySelector('.candle');
const instruction = document.getElementById('cake-instruction');

let extinguishedCount = 0;
const totalCandles = 3;

function extinguish(candleElement, event) {
    const flame = candleElement.querySelector('.flame');
    
    if (!flame.classList.contains('off')) {
        flame.classList.add('off');
        extinguishedCount++;

        // Panggil fungsi partikel dengan mengirim elemen lilinnya langsung
        createCandleSparkles(candleElement);

        if (extinguishedCount === totalCandles) {
            const instruction = document.getElementById('cake-instruction');
            instruction.innerHTML = '🎉 Yey! Semua lilin padam! Selamat Ulang Tahun! 🥳';
            instruction.style.color = '#61dafb';

            triggerCornerConfetti();
        }
    }
}

// Fungsi efek partikel kecil pas lilin diklik (Posisi dijamin pas di atas lilin)
function createCandleSparkles(candleElement) {
    // Buat elemen pembungkus sementara tepat di dalam lilin yang diklik
    const rect = candleElement.getBoundingClientRect();
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '50%';
    container.style.top = '0px';
    container.style.width = '0px';
    container.style.height = '0px';
    container.style.overflow = 'visible';
    container.style.zIndex = '100';
    candleElement.appendChild(container);

    const colors = ['#ff4d6d', '#ffb703', '#ffffff', '#ffd1dc'];
    for (let i = 0; i < 14; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'absolute';
        sparkle.style.left = '0px';
        sparkle.style.top = '0px';
        sparkle.style.width = '6px';
        sparkle.style.height = '6px';
        sparkle.style.borderRadius = '50%';
        sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        sparkle.style.pointerEvents = 'none';
        
        // Arah sebaran menyebar melingkar dari titik api lilin
        const angle = Math.random() * Math.PI * 2;
        const distance = 25 + Math.random() * 35;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance - 10;

        sparkle.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';
        container.appendChild(sparkle);

        requestAnimationFrame(() => {
            sparkle.style.transform = `translate(${dx}px, ${dy}px) scale(0.2)`;
            sparkle.style.opacity = '0';
        });
    }

    // Hapus kontainer setelah animasi selesai
    setTimeout(() => container.remove(), 500);
}

// Fungsi konfeti besar di akhir (dari pojok kanan & kiri atas)
function triggerCornerConfetti() {
    const container = document.getElementById('fullscreen-confetti-container');
    const colors = ['#ff4d6d', '#ffb703', '#61dafb', '#ffffff', '#ffd1dc', '#c9a24c'];
    
    const origins = [
        { x: 50, y: 50 },                  // Pojok Kiri Atas
        { x: window.innerWidth - 50, y: 50 } // Pojok Kanan Atas
    ];

    origins.forEach(orig => {
        for (let i = 0; i < 40; i++) {
            const sparkle = document.createElement('div');
            sparkle.classList.add('fullscreen-sparkle');
            
            sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            sparkle.style.left = `${orig.x}px`;
            sparkle.style.top = `${orig.y}px`;

            const angle = Math.random() * Math.PI;
            const distance = 150 + Math.random() * 350;
            const finalX = (orig.x < 100 ? 1 : -1) * (Math.random() * 300) + (orig.x < 100 ? distance : -distance);
            const finalY = Math.random() * 400 + 100;

            sparkle.style.setProperty('--final-x', `${finalX}px`);
            sparkle.style.setProperty('--final-y', `${finalY}px`);

            container.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1500);
        }
    });
}

// Jumlah partikel disesuaikan agar ringan di area kecil
  const PARTICLE_COUNT = 3000;

  // Function Posisi Uranus Milikmu
  function getUranusPositions() {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      if (i < PARTICLE_COUNT * 0.45) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI;
        const r = 2.5;
        pos[i * 3] = r * Math.sin(v) * Math.cos(u);
        pos[i * 3 + 1] = r * Math.sin(v) * Math.sin(u);
        pos[i * 3 + 2] = r * Math.cos(v);
      } else {
        const theta = Math.random() * Math.PI * 2;
        const r = 3.8 + Math.random() * 2.8;
        pos[i * 3] = r * Math.cos(theta);
        pos[i * 3 + 1] = (Math.random() - 0.5) * 0.25;
        pos[i * 3 + 2] = r * Math.sin(theta);
      }
    }
    return pos;
  }

  // Function Warna Uranus Milikmu
  function getUranusColors() {
    const col = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      if (i < PARTICLE_COUNT * 0.45) {
        col[i * 3] = 0.35 + Math.random() * 0.15;
        col[i * 3 + 1] = 0.85 + Math.random() * 0.15;
        col[i * 3 + 2] = 0.9 + Math.random() * 0.1;
      } else {
        col[i * 3] = 0.25 + Math.random() * 0.15;
        col[i * 3 + 1] = 0.75 + Math.random() * 0.2;
        col[i * 3 + 2] = 0.85 + Math.random() * 0.15;
      }
    }
    return col;
  }

  function replyWhatsApp(section) {
    const nomorWA = "62895327994877"; // Ganti dengan nomor WA lu

    const pesan = `Bales ${section}:\n[isi disini]`;

    const url = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;

    window.open(url, "_blank");
  }

  // --- Setup Scene Three.js ---
  const container = document.getElementById('uranus-container');
  const canvas = document.getElementById('uranusCanvas');

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
  camera.position.z = 16; // Jarak kamera ke planet

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(200, 200);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Buat Geometri Partikel
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(getUranusPositions(), 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(getUranusColors(), 3));

  // Material Partikel Glow Cyan
  const material = new THREE.PointsMaterial({
    size: 0.12,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending
  });

  const uranusParticles = new THREE.Points(geometry, material);
  
  // Kemiringan Khas Cincin Uranus (Cincin Hampir Vertikal)
  uranusParticles.rotation.z = Math.PI / 4; 
  scene.add(uranusParticles);

  // Animation Loop (Rotasi Pelan)
  function animate() {
    requestAnimationFrame(animate);
    uranusParticles.rotation.y += 0.005; // Rotasi planet & cincin
    renderer.render(scene, camera);
  }

  animate();

  const SECRET_CODE = "2610";

  const TRACKS = [
    { title: "Shape of My Heart", artist: "Backstreet Boys", src: "smh.mp3" },
    { title: "About You", artist: "The 1975", src: "about.mp3" },
    { title: "Jatuh Cinta Lagi", artist: "Nadhif Basalamah", src: "jcl.mp3" }
  ];

  const NOTES = [
    "Kamu Punya sisi yg ga di tau orang, Dan selalu bisa tersenyum disaat itu",
    "Kamu Punya Cara sendiri untuk menjadi diri kamu yg sekarang",
    "Kamu Layak Di Rayakan, Walau sekecil apapun itu",
    "Terima kasih Udah Pernah Singgah, walau rasanya kayak cepet gitu",
    "Dan aku harap, Ini semua bisa jadi pelajaran masing-masing :)"
  ];

  const dotsEl = document.getElementById('dots');
  const dots = dotsEl.querySelectorAll('.dot');
  const keypad = document.getElementById('keypad');
  const lockScreen = document.getElementById('lock-screen');
  const site = document.getElementById('site');
  let entered = "";

  function updateDots() {
    dots.forEach((d, i) => d.classList.toggle('filled', i < entered.length));
  }

  // Fungsi untuk membuka tutup polaroid saat diklik
    function revealPhoto(cardElement) {
        const cover = cardElement.querySelector('.polaroid-cover');
        
        // Jika cover belum terbuka, hilangkan cover-nya
        if (!cover.classList.contains('hidden')) {
            cover.classList.add('hidden');
        }
    }

  function tryUnlock() {
    if (entered === SECRET_CODE) {
      lockScreen.classList.add('hidden');
      document.body.style.overflow = 'auto';
      setTimeout(() => site.classList.add('visible'), 200);
      playAudio();
    } else {
      dotsEl.classList.add('error');
      dotsEl.classList.add('shake');
      setTimeout(() => {
        dotsEl.classList.remove('shake', 'error');
        entered = "";
        updateDots();
      }, 500);
    }
  }

  document.body.style.overflow = 'hidden';

  keypad.addEventListener('click', (e) => {
    const btn = e.target.closest('.key');
    if (!btn) return;
    if (btn.id === 'clearBtn') {
      entered = entered.slice(0, -1);
      updateDots();
      return;
    }
    if (btn.id === 'enterBtn') {
      tryUnlock();
      return;
    }
    const num = btn.dataset.num;
    if (num !== undefined && entered.length < 6) {
      entered += num;
      updateDots();
      if (entered.length === 6) setTimeout(tryUnlock, 150);
    }
  });

  const sections = document.querySelectorAll('#site section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('in-view');
    });
  }, { threshold: 0.15 });

  sections.forEach(s => observer.observe(s));

  const toastEl = document.getElementById('toast');
  let toastTimer;

  function showToast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2200);
  }

  const audio = document.getElementById('audio');
  const playBtn = document.getElementById('playBtn');
  const playIcon = document.getElementById('playIcon');
  const vinyl = document.getElementById('vinyl');
  const trackTitle = document.getElementById('trackTitle');
  const trackArtist = document.getElementById('trackArtist');
  const progressFill = document.getElementById('progressFill');
  const progressBar = document.getElementById('progressBar');
  const curTime = document.getElementById('curTime');
  const durTime = document.getElementById('durTime');
  const tracklistEl = document.getElementById('tracklist');

  let currentTrack = 0;
  let isPlaying = false;

  function formatTime(s) {
    if (!isFinite(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  }

  function renderTracklist() {
    tracklistEl.innerHTML = "";
    TRACKS.forEach((t, i) => {
      const row = document.createElement('div');
      row.className = 'track-row' + (i === currentTrack ? ' active' : '');
      row.innerHTML = `<span>${t.title}</span><span class="artist">${t.artist}</span>`;
      row.addEventListener('click', () => loadTrack(i, true));
      tracklistEl.appendChild(row);
    });
  }

  function loadTrack(i, autoplay) {
    currentTrack = (i + TRACKS.length) % TRACKS.length;
    const t = TRACKS[currentTrack];
    trackTitle.textContent = t.title;
    trackArtist.textContent = t.artist;
    progressFill.style.width = "0%";
    curTime.textContent = "0:00";
    durTime.textContent = "0:00";
    renderTracklist();
    if (t.src) {
      audio.src = t.src;
      if (autoplay) playAudio();
    } else if (autoplay) {
      showToast("Tambahkan file lagu (src) di bagian TRACKS pada kode ✨");
    }
  }

  function playAudio() {
    const t = TRACKS[currentTrack];
    if (!t.src) {
      showToast("Tambahkan file lagu (src) di bagian TRACKS pada kode ✨");
      return;
    }
    audio.play();
  }

  playBtn.addEventListener('click', () => {
    if (isPlaying) {
      audio.pause();
    } else {
      playAudio();
    }
  });

  audio.addEventListener('play', () => {
    isPlaying = true;
    playIcon.innerHTML = '<path d="M6 5h4v14H6zm8 0h4v14h-4z"/>';
    vinyl.classList.add('spin');
  });

  audio.addEventListener('pause', () => {
    isPlaying = false;
    playIcon.innerHTML = '<path d="M8 5v14l11-7z"/>';
    vinyl.classList.remove('spin');
  });

  audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
      progressFill.style.width = (audio.currentTime / audio.duration * 100) + "%";
      curTime.textContent = formatTime(audio.currentTime);
    }
  });

  audio.addEventListener('loadedmetadata', () => {
    durTime.textContent = formatTime(audio.duration);
  });

  audio.addEventListener('ended', () => loadTrack(currentTrack + 1, true));

  progressBar.addEventListener('click', (e) => {
    if (!audio.duration) return;
    const rect = progressBar.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * audio.duration;
  });

  document.getElementById('prevBtn').addEventListener('click', () => loadTrack(currentTrack - 1, isPlaying));
  document.getElementById('nextBtn').addEventListener('click', () => loadTrack(currentTrack + 1, isPlaying));

  loadTrack(0, false);

  const jarSvg = document.getElementById('jarSvg');
  const shakeBtn = document.getElementById('shakeBtn');
  const noteCard = document.getElementById('noteCard');
  const noteNumber = document.getElementById('noteNumber');
  const noteText = document.getElementById('noteText');
  let lastNote = -1;

  shakeBtn.addEventListener('click', () => {
    jarSvg.classList.remove('shaking');
    void jarSvg.offsetWidth;
    jarSvg.classList.add('shaking');
    noteCard.classList.remove('show');
    setTimeout(() => {
      let idx;
      do {
        idx = Math.floor(Math.random() * NOTES.length);
      } while (idx === lastNote && NOTES.length > 1);
      lastNote = idx;
      noteNumber.textContent = `#${idx + 1}`;
      noteText.textContent = NOTES[idx];
      noteCard.classList.add('show');
    }, 350);
  });