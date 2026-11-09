// ==================== STATE ====================
const state = {
  appMode: 'public',
  currentSection: 'dashboard',
  currentStage: 1,
  selectedPlan: null,
  selectedAssets: [],
  reviewRating: 0,
  verifiedClient: null
};

// Clients
const clientDatabase = [
  { id: 'c001', businessName: 'Frankies Wraps & Sips', fullName: 'Amara Osei', email: 'amara@frankies.ng', phone: '+234 801 234 5678', niche: 'Food & Beverage', location: 'Lekki, Lagos', plan: 'growth', mrr: 600, status: 'active', billing: 'Monthly', startDate: '2025-07-15', audience: 'Young professionals in Lekki ordering lunch delivery', goals: 'Double online orders, rank top 3 for wraps in lekki, build email list', keywords: 'wraps in lekki, smoothies lagos, healthy lunch delivery', differentiator: 'Fresh-made in 8 minutes, cold-pressed juices, zero preservatives', notes: 'Referred by friend.' },
  { id: 'c002', businessName: 'The Tooth Booth', fullName: 'Dr. Chidi Eze', email: 'chidi@toothbooth.ng', phone: '+234 802 345 6789', niche: 'Medical/Clinic', location: 'Victoria Island, Lagos', plan: 'dominance', mrr: 1000, status: 'active', billing: 'Annual', startDate: '2025-08-02', audience: 'Expats and professionals in VI', goals: 'Rank #1 for dentists in VI', keywords: 'dentist victoria island, dental implants lagos', differentiator: 'US-trained, same-day crowns', notes: 'Quarterly reviews scheduled.' },
  { id: 'c003', businessName: 'Glow Skin Studio', fullName: 'Kemi Afolabi', email: 'kemi@glowskin.ng', phone: '+234 803 456 7890', niche: 'Beauty & Skincare', location: 'Ikeja, Lagos', plan: 'foundation', mrr: 300, status: 'active', billing: 'Monthly', startDate: '2025-09-10', audience: 'Women 25-40 seeking natural skincare', goals: 'Consistent online bookings', keywords: 'facial ikeja, skincare lagos', differentiator: 'Organic products, certified aesthetician', notes: 'Wants to upgrade to Growth Q2.' },
  { id: 'c004', businessName: 'Nomad Fitness', fullName: 'Tolu Adewale', email: 'tolu@nomadfitness.ng', phone: '+234 804 567 8901', niche: 'Fitness/Gym', location: 'Yaba, Lagos', plan: 'growth', mrr: 600, status: 'onboarding', billing: 'Monthly', startDate: '2025-10-01', audience: 'Tech workers in Yaba', goals: 'Launch membership, build community', keywords: 'gym yaba, crossfit lagos', differentiator: 'Pay-as-you-go, rooftop yoga', notes: 'Week 2 of onboarding.' },
  { id: 'c005', businessName: 'Chop Life Eatery', fullName: 'Segun Ibrahim', email: 'segun@choplife.ng', phone: '+234 805 678 9012', niche: 'Restaurant/Eatery', location: 'Surulere, Lagos', plan: 'foundation', mrr: 300, status: 'overdue', billing: 'Monthly', startDate: '2025-06-20', audience: 'Families and local professionals', goals: 'Drive delivery orders', keywords: 'jollof surulere, food delivery lagos mainland', differentiator: 'Grandmother recipes, family packs', notes: 'Payment overdue.' }
];

const leads = [
  { id: 'l001', name: 'Tunde Nwachukwu', business: 'Zest Juice Bar', email: 'tunde@zestjuice.ng', niche: 'Cafe/Juice Bar', location: 'Ikoyi, Lagos', interest: 'Growth', stage: 'demo_scheduled', added: '2026-04-10' },
  { id: 'l002', name: 'Adaeze Smith', business: 'Bloom Events Catering', email: 'ada@bloomevents.ng', niche: 'Catering/Events Food', location: 'Ajah, Lagos', interest: 'Dominance', stage: 'proposal_sent', added: '2026-04-12' },
  { id: 'l003', name: 'Kunle Obi', business: 'Naija Drip Apparel', email: 'kunle@naijadrip.ng', niche: 'Fashion & Retail', location: 'Mainland, Lagos', interest: 'Foundation', stage: 'discovery_call', added: '2026-04-15' }
];

const submissions = [];  // filled from Work with us + localStorage

// Seed reviews (approved & showing on public site)
const approvedReviews = [
  { id: 'r001', name: 'Amara Osei', biz: 'Frankies Wraps & Sips', role: 'OWNER · LEKKI, LAGOS', rating: 5, quote: 'RTG built our site in two days. Within the first month our delivery orders from the website doubled. The weekly report actually told us what to fix.', date: '2025-09-04', initials: 'AO' },
  { id: 'r002', name: 'Dr. Chidi Eze', biz: 'The Tooth Booth', role: 'FOUNDER · VICTORIA ISLAND', rating: 5, quote: 'We were spending 200k naira monthly on an agency getting PDF reports nobody read. RTG replaced that entire spend and now we show up when people search for dentists in VI.', date: '2025-10-12', initials: 'CE' },
  { id: 'r003', name: 'Kemi Afolabi', biz: 'Glow Skin Studio', role: 'FOUNDER · IKEJA', rating: 5, quote: 'The personalization engine is the unlock. Instagram visitors see the treatments page first, Google visitors see the booking flow. Bookings up 60 percent since launch.', date: '2026-01-18', initials: 'KA' }
];
const pendingReviews = []; // admin moderation queue

// Proof data - before/after by client
const proofData = {
  frankies: {
    name: 'Frankies Wraps & Sips',
    metrics: [
      { label: 'TRAFFIC', title: 'Monthly organic visits', before: 320, after: 2840, unit: '', series: [320, 340, 380, 520, 980, 1640, 2840] },
      { label: 'CONVERSIONS', title: 'Orders from website', before: 14, after: 128, unit: '', series: [14, 18, 24, 38, 62, 94, 128] },
      { label: 'AI CITATIONS', title: 'Mentioned by ChatGPT + Perplexity', before: 0, after: 31, unit: '', series: [0, 0, 2, 6, 12, 22, 31] }
    ]
  },
  tooth: {
    name: 'The Tooth Booth',
    metrics: [
      { label: 'TRAFFIC', title: 'Monthly organic visits', before: 180, after: 1920, unit: '', series: [180, 210, 260, 420, 780, 1340, 1920] },
      { label: 'CONVERSIONS', title: 'Booking requests', before: 8, after: 74, unit: '', series: [8, 10, 14, 22, 36, 52, 74] },
      { label: 'AI CITATIONS', title: 'Mentioned by ChatGPT + Perplexity', before: 1, after: 42, unit: '', series: [1, 2, 4, 10, 18, 30, 42] }
    ]
  },
  glow: {
    name: 'Glow Skin Studio',
    metrics: [
      { label: 'TRAFFIC', title: 'Monthly organic visits', before: 240, after: 1680, unit: '', series: [240, 280, 320, 440, 760, 1180, 1680] },
      { label: 'CONVERSIONS', title: 'Booked facials', before: 11, after: 58, unit: '', series: [11, 14, 18, 26, 36, 48, 58] },
      { label: 'AI CITATIONS', title: 'Mentioned by ChatGPT + Perplexity', before: 0, after: 18, unit: '', series: [0, 1, 2, 4, 8, 13, 18] }
    ]
  }
};

// ==================== GLOBE ====================
let scene, camera, renderer, globeGroup, pulseRing, animationFrameId;
let dragging = false;
let lastMouseX = 0, lastMouseY = 0;
let velocityX = 0, velocityY = 0;
let isInViewport = true;

const cities = [
  { name: 'Lagos', lat: 6.5244, lon: 3.3792, origin: true },
  { name: 'London', lat: 51.5074, lon: -0.1278 },
  { name: 'New York', lat: 40.7128, lon: -74.0060 },
  { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
  { name: 'Dubai', lat: 25.2048, lon: 55.2708 },
  { name: 'São Paulo', lat: -23.5505, lon: -46.6333 },
  { name: 'Mumbai', lat: 19.0760, lon: 72.8777 },
  { name: 'Sydney', lat: -33.8688, lon: 151.2093 },
  { name: 'Paris', lat: 48.8566, lon: 2.3522 },
  { name: 'Toronto', lat: 43.6532, lon: -79.3832 },
  { name: 'Singapore', lat: 1.3521, lon: 103.8198 },
  { name: 'Nairobi', lat: -1.2921, lon: 36.8219 },
  { name: 'Cairo', lat: 30.0444, lon: 31.2357 },
  { name: 'Johannesburg', lat: -26.2041, lon: 28.0473 },
  { name: 'Los Angeles', lat: 34.0522, lon: -118.2437 },
  { name: 'Chicago', lat: 41.8781, lon: -87.6298 },
  { name: 'Berlin', lat: 52.5200, lon: 13.4050 },
  { name: 'Moscow', lat: 55.7558, lon: 37.6173 },
  { name: 'Beijing', lat: 39.9042, lon: 116.4074 },
  { name: 'Seoul', lat: 37.5665, lon: 126.9780 },
  { name: 'Bangkok', lat: 13.7563, lon: 100.5018 },
  { name: 'Jakarta', lat: -6.2088, lon: 106.8456 },
  { name: 'Mexico City', lat: 19.4326, lon: -99.1332 },
  { name: 'Buenos Aires', lat: -34.6037, lon: -58.3816 },
  { name: 'Casablanca', lat: 33.5731, lon: -7.5898 },
  { name: 'Accra', lat: 5.6037, lon: -0.1870 },
  { name: 'Abidjan', lat: 5.3600, lon: -4.0083 },
  { name: 'Cape Town', lat: -33.9249, lon: 18.4241 },
  { name: 'Istanbul', lat: 41.0082, lon: 28.9784 },
  { name: 'Madrid', lat: 40.4168, lon: -3.7038 },
  { name: 'Rome', lat: 41.9028, lon: 12.4964 },
  { name: 'Miami', lat: 25.7617, lon: -80.1918 },
  { name: 'San Francisco', lat: 37.7749, lon: -122.4194 },
  { name: 'Hong Kong', lat: 22.3193, lon: 114.1694 },
  { name: 'Lisbon', lat: 38.7223, lon: -9.1393 },
  { name: 'Amsterdam', lat: 52.3676, lon: 4.9041 },
  { name: 'Kigali', lat: -1.9441, lon: 30.0619 },
  { name: 'Addis Ababa', lat: 9.0320, lon: 38.7469 },
  { name: 'Dakar', lat: 14.7167, lon: -17.4677 },
  { name: 'Tel Aviv', lat: 32.0853, lon: 34.7818 }
];

function latLonToVec3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

function initGlobe() {
  if (typeof THREE === 'undefined') return;
  const container = document.getElementById('globe-container');
  if (!container) return;
  const width = container.clientWidth;
  const height = container.clientHeight;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.z = 2.8;

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  globeGroup = new THREE.Group();
  scene.add(globeGroup);

  const sphereGeom = new THREE.SphereGeometry(1, 64, 64);
  const sphereMat = new THREE.MeshPhongMaterial({ color: 0x0e0e0e, specular: 0x3a3a3a, shininess: 22 });
  globeGroup.add(new THREE.Mesh(sphereGeom, sphereMat));

  const wireGeom = new THREE.SphereGeometry(1.001, 32, 32);
  const wireMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.07 });
  globeGroup.add(new THREE.Mesh(wireGeom, wireMat));

  const atmosGeom = new THREE.SphereGeometry(1.05, 64, 64);
  const atmosMat = new THREE.MeshBasicMaterial({ color: 0x1a1a2e, transparent: true, opacity: 0.35, side: THREE.BackSide, blending: THREE.AdditiveBlending });
  globeGroup.add(new THREE.Mesh(atmosGeom, atmosMat));

  const cityPositions = [];
  cities.forEach(city => {
    const pos = latLonToVec3(city.lat, city.lon, 1.005);
    const r = city.origin ? 0.014 : 0.008;
    const dot = new THREE.Mesh(new THREE.SphereGeometry(r, 12, 12), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: city.origin ? 1.0 : 0.7 }));
    dot.position.copy(pos);
    globeGroup.add(dot);
    cityPositions.push(pos);
    if (city.origin) {
      const ringGeom = new THREE.RingGeometry(0.02, 0.024, 32);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.4, side: THREE.DoubleSide });
      pulseRing = new THREE.Mesh(ringGeom, ringMat);
      pulseRing.position.copy(pos);
      pulseRing.lookAt(0, 0, 0);
      pulseRing.rotateY(Math.PI);
      globeGroup.add(pulseRing);
    }
  });

  const numArcs = 24;
  for (let i = 0; i < numArcs; i++) {
    const s = cityPositions[Math.floor(Math.random() * cityPositions.length)];
    const e = cityPositions[Math.floor(Math.random() * cityPositions.length)];
    if (s.equals(e)) continue;
    const d = s.distanceTo(e);
    const lift = 1.2 + (d / 2) * 0.3;
    const mid = new THREE.Vector3().addVectors(s, e).multiplyScalar(0.5).normalize().multiplyScalar(lift);
    const curve = new THREE.QuadraticBezierCurve3(s, mid, e);
    const pts = curve.getPoints(40);
    const arcGeom = new THREE.BufferGeometry().setFromPoints(pts);
    const arcMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.15 + Math.random() * 0.12 });
    globeGroup.add(new THREE.Line(arcGeom, arcMat));
  }

  scene.add(new THREE.AmbientLight(0x252525, 1));
  const d1 = new THREE.DirectionalLight(0xffffff, 0.5);
  d1.position.set(5, 3, 5);
  scene.add(d1);
  const d2 = new THREE.DirectionalLight(0xffffff, 0.18);
  d2.position.set(-3, -2, -3);
  scene.add(d2);
  const p = new THREE.PointLight(0xffffff, 0.22);
  p.position.set(0, 0, 4);
  scene.add(p);

  renderer.domElement.addEventListener('mousedown', onGlobeMouseDown);
  window.addEventListener('mousemove', onGlobeMouseMove);
  window.addEventListener('mouseup', onGlobeMouseUp);
  renderer.domElement.addEventListener('touchstart', onGlobeTouchStart, { passive: true });
  window.addEventListener('touchmove', onGlobeTouchMove, { passive: true });
  window.addEventListener('touchend', onGlobeMouseUp);
  window.addEventListener('resize', onGlobeResize);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isInViewport = entry.isIntersecting;
      if (isInViewport && !animationFrameId) animateGlobe();
    });
  }, { threshold: 0.1 });
  observer.observe(container);

  animateGlobe();
}
function onGlobeMouseDown(e) { dragging = true; lastMouseX = e.clientX; lastMouseY = e.clientY; velocityX = 0; velocityY = 0; }
function onGlobeTouchStart(e) { dragging = true; lastMouseX = e.touches[0].clientX; lastMouseY = e.touches[0].clientY; }
function onGlobeMouseMove(e) {
  if (!dragging || !globeGroup) return;
  const dx = e.clientX - lastMouseX, dy = e.clientY - lastMouseY;
  velocityX = dx * 0.005; velocityY = dy * 0.005;
  globeGroup.rotation.y += velocityX; globeGroup.rotation.x += velocityY;
  lastMouseX = e.clientX; lastMouseY = e.clientY;
}
function onGlobeTouchMove(e) {
  if (!dragging || !globeGroup) return;
  const dx = e.touches[0].clientX - lastMouseX, dy = e.touches[0].clientY - lastMouseY;
  velocityX = dx * 0.005; velocityY = dy * 0.005;
  globeGroup.rotation.y += velocityX; globeGroup.rotation.x += velocityY;
  lastMouseX = e.touches[0].clientX; lastMouseY = e.touches[0].clientY;
}
function onGlobeMouseUp() { dragging = false; }
function onGlobeResize() {
  const container = document.getElementById('globe-container');
  if (!container || !renderer) return;
  const w = container.clientWidth, h = container.clientHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}
let pulseTime = 0;
function animateGlobe() {
  if (!isInViewport) { animationFrameId = null; return; }
  animationFrameId = requestAnimationFrame(animateGlobe);
  if (!dragging) {
    velocityX *= 0.95; velocityY *= 0.95;
    if (Math.abs(velocityX) > 0.0001) globeGroup.rotation.y += velocityX;
    if (Math.abs(velocityY) > 0.0001) globeGroup.rotation.x += velocityY;
    globeGroup.rotation.y += 0.0008;
  }
  pulseTime += 0.016;
  if (pulseRing) {
    const t = (pulseTime % 2) / 2;
    const sc = 1 + t * 1.5;
    pulseRing.scale.set(sc, sc, sc);
    pulseRing.material.opacity = 0.4 * (1 - t);
  }
  renderer.render(scene, camera);
}

// ==================== GRAIN ====================
function initGrain() {
  // Grain is now a static CSS noise tile animated on the compositor (see globals.css).
  // Regenerating an SVG turbulence filter every 60ms was the main source of scroll lag.
  return;
  const turb = document.getElementById('turbulence');
  if (!turb) return;
  let seed = 1;
  setInterval(() => {
    seed = (seed + 1) % 100;
    turb.setAttribute('seed', seed);
  }, 60);
}

// ==================== NAV ====================
function handleNavScroll() {
  const nav = document.getElementById('nav');
  if (window.scrollY > 60) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
}
function scrollToEl(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
  document.getElementById('navMobile').classList.remove('open');
}
function toggleMobileNav() { document.getElementById('navMobile').classList.toggle('open'); }

// ==================== SCROLL ANIM ====================
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('in-view'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.observe').forEach(el => observer.observe(el));
}

// ==================== PROOF CHARTS ====================
function switchProofClient(key, btn) {
  document.querySelectorAll('.proof-toggle').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderProofGrid(key);
}

function buildSparkline(series, width = 280, height = 110) {
  const pad = 8;
  const max = Math.max(...series);
  const min = Math.min(...series);
  const range = max - min || 1;
  const stepX = (width - pad * 2) / (series.length - 1);
  const pts = series.map((v, i) => {
    const x = pad + i * stepX;
    const y = height - pad - ((v - min) / range) * (height - pad * 2);
    return [x, y];
  });
  const path = pts.map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
  const areaPath = path + ` L${pts[pts.length-1][0].toFixed(1)},${height - pad} L${pts[0][0].toFixed(1)},${height - pad} Z`;
  return `
    <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad-${Math.random().toString(36).slice(2,8)}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="rgba(255,255,255,0.25)"/>
          <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
        </linearGradient>
      </defs>
      <path d="${areaPath}" fill="rgba(255,255,255,0.06)" stroke="none"/>
      <path d="${path}" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      ${pts.map((p, i) => `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${i === pts.length-1 ? 3.2 : 1.5}" fill="${i === pts.length-1 ? '#fff' : 'rgba(255,255,255,0.5)'}"/>`).join('')}
    </svg>
  `;
}

function renderProofGrid(key) {
  const data = proofData[key];
  const grid = document.getElementById('proofGrid');
  grid.innerHTML = data.metrics.map(m => {
    const deltaPct = m.before === 0 ? '∞' : Math.round(((m.after - m.before) / m.before) * 100) + '%';
    const deltaX = m.before === 0 ? `${m.after} new` : (m.after / m.before).toFixed(1) + 'x';
    return `
      <div class="proof-card">
        <div class="proof-metric-label">${m.label}</div>
        <div class="proof-metric-title">${m.title}</div>
        <div class="proof-values">
          <div class="proof-before">
            <div class="proof-label">Before RTG</div>
            <div class="proof-value before">${m.before}</div>
          </div>
          <div class="proof-arrow">→</div>
          <div class="proof-after">
            <div class="proof-label">After 90 days</div>
            <div class="proof-value after">${m.after}</div>
          </div>
        </div>
        <div class="proof-delta">↑ ${deltaPct} · ${deltaX}</div>
        <div class="proof-chart">${buildSparkline(m.series)}</div>
      </div>
    `;
  }).join('');
  countUpIn(grid);
}

// ==================== REVIEWS ====================
function renderReviews() {
  const grid = document.getElementById('reviewsGrid');
  if (!grid) { if (typeof renderTestimonial === 'function') renderTestimonial(quoteIdx); return; }
  if (!approvedReviews.length) {
    grid.innerHTML = '<div class="reviews-empty">No reviews yet. Clients get access to leave one after onboarding.</div>';
    return;
  }
  grid.innerHTML = approvedReviews.map(r => {
    const stars = Array.from({length: 5}, (_, i) =>
      `<span class="${i < r.rating ? 'star-on' : 'star-off'}">★</span>`
    ).join('');
    return `
      <div class="review-card">
        <div class="review-stars">${stars}</div>
        <div class="review-quote">"${r.quote}"</div>
        <div class="review-author">
          <div class="review-avatar">${r.initials}</div>
          <div>
            <div class="review-name">${r.name}</div>
            <div class="review-role">${r.role}</div>
          </div>
          <div class="review-date">${formatDateShort(r.date)}</div>
        </div>
      </div>
    `;
  }).join('');
}
function formatDateShort(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase();
}

// Review modal - verified clients only
function openReviewModal() {
  document.getElementById('reviewModalOverlay').classList.add('show');
  state.reviewRating = 0;
  state.verifiedClient = null;
  // Reset both steps
  document.getElementById('revStepVerify').style.display = '';
  document.getElementById('revStepForm').style.display = 'none';
  document.getElementById('verifyError').classList.remove('show');
  document.querySelectorAll('#revStars button').forEach(b => b.classList.remove('on'));
  ['revVerifyEmail','revVerifyToken','revRole','revQuote'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  document.body.style.overflow = 'hidden';
  // Check URL for auto-fill token: ?review=rtg_xxx
  const params = new URLSearchParams(window.location.search);
  const token = params.get('review');
  if (token) {
    document.getElementById('revVerifyToken').value = token;
    // Auto-attempt verify
    setTimeout(verifyClient, 100);
  } else {
    setTimeout(() => document.getElementById('revVerifyEmail').focus(), 150);
  }
}
function closeReviewModal() {
  document.getElementById('reviewModalOverlay').classList.remove('show');
  document.body.style.overflow = '';
}
function showVerifyError(msg) {
  const e = document.getElementById('verifyError');
  e.textContent = msg;
  e.classList.remove('show');
  void e.offsetWidth; // restart animation
  e.classList.add('show');
}

// Client verification: match against client database by email OR invite token
function verifyClient() {
  const email = document.getElementById('revVerifyEmail').value.trim().toLowerCase();
  const token = document.getElementById('revVerifyToken').value.trim().toLowerCase();
  if (!email && !token) {
    showVerifyError('Enter your client email or invite token.');
    return;
  }
  let match = null;
  if (email) {
    match = clientDatabase.find(c => c.email.toLowerCase() === email);
  }
  if (!match && token) {
    // Token format: rtg_<clientId-lowercased>
    const idFromToken = token.replace(/^rtg_/, '');
    match = clientDatabase.find(c => c.id.toLowerCase() === idFromToken || c.email.toLowerCase().split('@')[0] === idFromToken);
  }
  if (!match) {
    showVerifyError("We couldn't find an active client with that email or token. If you just signed up, your access activates once onboarding starts.");
    return;
  }
  if (match.status === 'pending_review') {
    showVerifyError('Your client account is still pending. Reviews unlock once onboarding begins.');
    return;
  }
  // Verified. Swap to review form.
  state.verifiedClient = match;
  document.getElementById('verifiedBizName').textContent = 'VERIFIED · ' + match.businessName.toUpperCase();
  document.getElementById('revStepVerify').style.display = 'none';
  document.getElementById('revStepForm').style.display = '';
  document.getElementById('revRole').value = match.location ? 'Founder · ' + match.location : '';
  setTimeout(() => document.getElementById('revQuote').focus(), 200);
}

function backToVerify() {
  document.getElementById('revStepForm').style.display = 'none';
  document.getElementById('revStepVerify').style.display = '';
  state.verifiedClient = null;
}

function initReviewStars() {
  document.querySelectorAll('#revStars button').forEach(btn => {
    btn.addEventListener('click', () => {
      const v = parseInt(btn.dataset.v);
      state.reviewRating = v;
      document.querySelectorAll('#revStars button').forEach((b, i) => {
        if (i < v) b.classList.add('on');
        else b.classList.remove('on');
      });
    });
  });
}
function submitReview() {
  if (!state.verifiedClient) {
    showToast('Verification required');
    backToVerify();
    return;
  }
  const role = document.getElementById('revRole').value.trim();
  const quote = document.getElementById('revQuote').value.trim();
  if (!quote || state.reviewRating === 0) {
    showToast('Write your review and pick a rating');
    return;
  }
  const c = state.verifiedClient;
  const initials = c.fullName.split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase();
  pendingReviews.push({
    id: 'r' + Date.now(),
    name: c.fullName,
    biz: c.businessName,
    role: (role || (c.location + ' · ' + c.niche.toUpperCase())).toUpperCase(),
    rating: state.reviewRating,
    quote,
    date: new Date().toISOString().slice(0,10),
    initials,
    submittedAt: new Date().toISOString(),
    clientId: c.id,
    verified: true
  });
  updateReviewBadge();
  closeReviewModal();
  showToast('Review submitted. Visible after moderation.');
}
function updateReviewBadge() {
  const b = document.getElementById('revBadge');
  if (b) b.textContent = pendingReviews.length;
}

// ==================== MULTI-STEP FORM ====================
// ==================== CONTACT CONFIG ====================
// formEndpoint: paste a Formspree / Web3Forms / Getform URL to receive every
// message in your inbox. Left empty, messages save to the admin inbox only.
const RTG_CONFIG = {
  email: 'hello@rtg.studio',
  // Review links point at wherever the site is open (rtg.studio, GitHub Pages or Netlify)
  siteUrl: () => location.origin + location.pathname.replace(/index\.html$/, ''),
  formEndpoint: ''
};

function esc(v) {
  return String(v == null ? '' : v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// Admin inbox persists in this browser
function loadSubmissions() {
  try {
    const saved = JSON.parse(localStorage.getItem('rtg_submissions') || '[]');
    if (Array.isArray(saved)) saved.forEach(s => submissions.push(s));
  } catch (e) {}
}
function saveSubmissions() {
  try { localStorage.setItem('rtg_submissions', JSON.stringify(submissions)); } catch (e) {}
}

// ==================== HERO ====================
function initBookingBadge() {
  const d = new Date();
  d.setMonth(d.getMonth() + 1);
  const m = d.toLocaleDateString('en-US', { month: 'long' });
  const y = String(d.getFullYear()).slice(2);
  const el = document.getElementById('bookingBadge');
  if (el) el.textContent = `Booking for ${m} '${y}`;
}

function initRotatingWord() {
  const el = document.getElementById('rotWord');
  if (!el) return;
  const words = ['brand', 'menu', 'clinic', 'studio', 'store'];
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let i = 0;
  setInterval(() => {
    if (el.parentElement && el.parentElement.matches(':hover')) return;
    el.classList.add('out');
    setTimeout(() => {
      i = (i + 1) % words.length;
      el.textContent = words[i];
      el.classList.remove('out');
      el.classList.add('in-start');
      void el.offsetWidth;
      el.classList.remove('in-start');
    }, 450);
  }, 2600);
}

// ==================== SPLIT LAYOUT: WORK ====================
const workShowcase = [
  { key: 'frankies', img: 'frankies.png', short: 'Frankies', name: 'Frankies Wraps & Sips', type: 'Website design & build · Lekki', live: true,
    shot: 'linear-gradient(135deg, #ff8a3d 0%, #7a1f05 55%, #1a0601 100%)',
    accent: '#ef4a14', hero: 'linear-gradient(135deg, #ff7a2f 0%, #e5341b 100%)', bg: '#fff7f1',
    nav: ['Menu', 'Delivery', 'About'], cta: 'Order', h: 'Wraps made fresh in 8 minutes.',
    sub: 'Lunch across Lekki. Cold-pressed juice. Zero preservatives.', b1: 'Order now', b2: 'See menu' },
  { key: 'glow', short: 'Glow', name: 'Glow Skin Studio', type: 'Landing page & booking · Ikeja', live: true,
    shot: 'linear-gradient(135deg, #2a0620 0%, #c2185b 55%, #ffc2d8 100%)',
    accent: '#c2185b', hero: 'linear-gradient(135deg, #f49ab9 0%, #a8306a 100%)', bg: '#fff5f8',
    nav: ['Facials', 'Products', 'Visit'], cta: 'Book', h: 'Skin that glows on its own.',
    sub: 'Organic facials by a certified aesthetician in Ikeja.', b1: 'Book facial', b2: 'Treatments' }
];

// Old-site look per client, for the "before" side of the slider
const workBefore = {
  frankies: { title: 'Welcome To Frankies Wraps!!!', tag: 'Best wraps in Lagos. Call us to order today.', links: ['Home', 'Menu', 'Contact Us', 'Gallery'], tone: '#8a5a2b', year: 2019 },
  tooth: { title: 'THE TOOTH BOOTH DENTAL CLINIC', tag: 'Quality dental care. Opening hours Mon to Sat.', links: ['Home', 'About Us', 'Services', 'Contact'], tone: '#2d4f7c', year: 2018 },
  glow: { title: 'Glow Skin Studio ~ Beauty & Spa', tag: 'Facials, massage and more. DM us on Instagram to book.', links: ['Home', 'Price List', 'Gallery', 'Location'], tone: '#7c3a5c', year: 2020 },
  nomad: { parked: true }
};
let workIdx = 0;
let baPos = 50;

function workBeforeHTML(w) {
  // Frankies: the Before side shows the designed page (the After side is the live site)
  if (w.img) return workDesignHTML(w);
  const b = workBefore[w.key] || {};
  if (b.parked) {
    return `<div class="old old-parked">
      <div class="old-bar"><i></i><i></i><i></i><span>riseupgames.net</span></div>
      <div class="old-park"><b>This domain is parked</b><span>No studio website yet. The games lived only on Roblox.</span></div>
    </div>`;
  }
  const visits = (proofData[w.key] ? proofData[w.key].metrics[0].before : 0);
  return `<div class="old" style="--old-tone:${b.tone}">
    <div class="old-bar"><i></i><i></i><i></i><span>${esc(w.short.toLowerCase().replace(/\s/g, ''))}.com.ng</span></div>
    <div class="old-page">
      <div class="old-head">${esc(b.title)}</div>
      <div class="old-links">${b.links.map(l => `<u>${l}</u>`).join(' | ')}</div>
      <div class="old-body">
        <div class="old-img">IMAGE</div>
        <div class="old-copy">
          <p>${esc(b.tag)}</p>
          <p class="old-small">We are open for business. Click on the links above for more information about our services and prices.</p>
          <span class="old-btn">Click Here</span>
        </div>
      </div>
      <div class="old-foot">Visitors: ${String(visits).padStart(6, '0')} &nbsp;|&nbsp; © ${b.year} &nbsp;|&nbsp; Best viewed in Chrome</div>
    </div>
  </div>`;
}

const workAfterExtra = {
  frankies: { badge: 'Rated 4.9 by 1,200+ diners', feats: [['8 min', 'Fresh wraps, every time'], ['Free', 'Delivery across Lekki'], ['100%', 'Cold-pressed juice']] },
  tooth: { badge: 'US-trained dental team', feats: [['Same day', 'Crowns and implants'], ['0%', 'Instalment plans'], ['Mon-Sat', 'Open late in VI']] },
  glow: { badge: 'Certified aesthetician', feats: [['Organic', 'Skin-first facials'], ['30 sec', 'To book online'], ['Ikeja', 'Calm, private studio']] },
  nomad: { badge: 'Roblox game studio', feats: [['Roblox', 'Games built for the platform'], ['Algorithm', 'Made to hit the feed'], ['Studio', 'Small team, fast builds']] }
};

const workArt = {
  frankies: `<div class="fr-steam"><i></i><i></i><i></i></div>
    <div class="fr-wrap"><i class="fr-tort"></i><i class="fr-fill"></i><i class="fr-foil"></i></div>
    <div class="fr-cup"><i></i></div>
    <div class="fr-timer"><b>08:00</b><small>avg. prep time</small></div>`,
  tooth: `<div class="th-badge"><svg viewBox="0 0 24 24"><path d="M7.5 3C5 3 3 4.8 3 7.8c0 2.4 1 3.6 1.4 6C4.8 16.6 5.2 21 7 21c1.6 0 1.7-3.4 3-5 .6-.7 1.4-.7 2 0 1.3 1.6 1.4 5 3 5 1.8 0 2.2-4.4 2.6-7.2.4-2.4 1.4-3.6 1.4-6C21 4.8 19 3 16.5 3c-1.8 0-2.8.8-4.5.8S9.3 3 7.5 3z"/></svg><u class="th-sp th-sp1"></u><u class="th-sp th-sp2"></u><u class="th-sp th-sp3"></u></div>
    <div class="th-book"><b>Book a visit</b><div class="th-slots"><span>9:00</span><span class="on">10:30</span><span>2:00</span><span>4:15</span></div><div class="th-go">Confirm slot</div></div>`,
  glow: `<div class="gl-arch"><i class="gl-sun"></i><i class="gl-arch2"></i><i class="gl-p gl-p1"></i><i class="gl-p gl-p2"></i><i class="gl-p gl-p3"></i></div>
    <div class="gl-menu"><small>Signature</small><b>Glow facial</b><span>60 min · from ₦25,000</span><em>&#9733;&#9733;&#9733;&#9733;&#9733; 4.9</em></div>`,
  nomad: `<svg class="nm-rings" viewBox="0 0 120 120"><circle cx="60" cy="60" r="52"/><circle class="r1" cx="60" cy="60" r="52"/><circle cx="60" cy="60" r="38"/><circle class="r2" cx="60" cy="60" r="38"/><circle cx="60" cy="60" r="24"/><circle class="r3" cx="60" cy="60" r="24"/></svg>
    <div class="nm-sched"><small>Studio pipeline</small><div><b>01</b><span>Prototype</span></div><div><b>02</b><span>Playtest</span></div><div><b>03</b><span>Ship to Roblox</span></div></div>`
};

// Fit the 1280px-wide live iframe into whatever width the mock has
const liveRO = 'ResizeObserver' in window
  ? new ResizeObserver(es => es.forEach(en => fitOne(en.target)))
  : null;
function fitOne(m) {
  const w = m.clientWidth;
  if (!w) return;
  // slight overscan so sub-pixel rounding never leaves a gap at the edges
  m.style.setProperty('--live-s', ((w / 1297) * 1.004).toFixed(4));
}
function fitLive() {
  document.querySelectorAll('.mk-live').forEach(m => {
    fitOne(m);
    if (liveRO) liveRO.observe(m);
  });
}
window.addEventListener('resize', fitLive);

// Phones skip the live iframe (a whole second website to load and scroll);
// they get the designed mock instead.
const baLiteMode = window.matchMedia('(max-width: 820px), (hover: none) and (pointer: coarse)').matches;

function workAfterHTML(w) {
  if (w.img) {
    return `<div class="mock mk-shot"><img src="${w.img}" alt="${esc(w.name)} website" decoding="async" draggable="false" /></div>`;
  }
  return workDesignHTML(w);
}

// The designed page (nav, hero, art, stat chips, feature cards)
function workDesignHTML(w) {
  const p = proofData[w.key];
  const ms = p ? p.metrics : null;
  const x = workAfterExtra[w.key] || { badge: '', feats: [] };
  const chips = ms ? `
      <div class="mk-chip mk-chip-a"><small>Monthly visits</small><strong>${ms[0].after.toLocaleString()}</strong><em>${ms[0].before === 0 ? 'new' : '+' + Math.round(((ms[0].after - ms[0].before) / ms[0].before) * 100) + '%'}</em></div>
      <div class="mk-chip mk-chip-b"><small>${esc(ms[1].title)}</small><strong>${ms[1].after}</strong><em>${ms[1].before === 0 ? 'new' : (ms[1].after / ms[1].before).toFixed(1) + 'x'}</em></div>` : `
      <div class="mk-chip mk-chip-a"><small>Status</small><strong>Live</strong><em>online now</em></div>
      <div class="mk-chip mk-chip-b"><small>Platform</small><strong>Roblox</strong><em>studio</em></div>`;
  return `<div class="mock mk-v-${w.key}" style="--mock-bg:${w.bg};--mock-accent:${w.accent};--mock-hero:${w.hero}">
    <div class="mk-nav"><span class="mk-logo"><i></i>${esc(w.short)}</span><span class="mk-links">${w.nav.map(n => `<u>${n}</u>`).join('')}</span><b>${w.cta}</b></div>
    <div class="mock-hero mk-hero">
      <span class="mk-orb mk-orb-1"></span><span class="mk-orb mk-orb-2"></span><span class="mk-ring"></span>
      <div class="mk-copy">
        <span class="mk-badge"><i></i>${esc(x.badge)}</span>
        <div class="mock-h mk-h">${esc(w.h)}</div>
        <div class="mock-sub mk-sub">${esc(w.sub)}</div>
        <div class="mock-btns mk-btns"><span>${w.b1}</span><span>${w.b2}</span></div>
      </div>
      <div class="mk-art">
        ${workArt[w.key] || '<div class="mk-disc"><span class="mk-disc-in"></span></div>'}${chips}
      </div>
      <div class="mk-feats">${x.feats.map(f => `<div><strong>${esc(f[0])}</strong><span>${esc(f[1])}</span></div>`).join('')}</div>
    </div>
  </div>`;
}

function renderWork() {
  const grid = document.getElementById('workGrid');
  if (!grid) return;
  grid.innerHTML = `<div class="gl-work ba" id="baRoot">
    <div class="ba-stage" id="baStage" style="--pos:${baPos}%">
      <div class="ba-layer ba-after" id="baAfter"></div>
      <div class="ba-layer ba-before" id="baBefore"></div>
      <span class="ba-tag ba-tag-l">Before</span>
      <span class="ba-tag ba-tag-r">After RTG</span>
      <div class="ba-handle" id="baHandle" role="slider" tabindex="0" aria-label="Drag to compare before and after" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${baPos}">
        <span class="ba-line"></span>
        <span class="ba-knob"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 7l-5 5 5 5M15 7l5 5-5 5"/></svg></span>
      </div>
      <span class="ba-hint" id="baHint">Drag to compare</span>
    </div>
    <div class="ba-info" id="baInfo"></div>
    <div class="ba-strip-wrap">
      <button class="ba-nav" aria-label="Previous project" onclick="selectWork(workIdx - 1)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 6l-6 6 6 6"/></svg></button>
      <div class="ba-strip" id="baStrip" role="tablist">${workShowcase.map((w, k) => `
        <button class="ba-thumb" role="tab" data-i="${k}" onclick="selectWork(${k})" aria-label="${esc(w.name)}">
          <span class="ba-thumb-shot" style="background:${w.shot}"><span class="ba-thumb-page" style="--mock-bg:${w.bg};--mock-hero:${w.hero}"><i></i></span></span>
          <span class="ba-thumb-name">${esc(w.short)}</span>
          <span class="ba-thumb-num">${String(k + 1).padStart(2, '0')}</span>
        </button>`).join('')}
      </div>
      <button class="ba-nav" aria-label="Next project" onclick="selectWork(workIdx + 1)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg></button>
    </div>
  </div>`;
  selectWork(0, true);
  initBeforeAfter();
}

function selectWork(i, first) {
  const n = workShowcase.length;
  workIdx = (i + n) % n;
  const w = workShowcase[workIdx];
  const stage = document.getElementById('baStage');
  if (!stage) return;
  const paint = () => {
    stage.style.background = w.shot;
    document.getElementById('baAfter').innerHTML = workAfterHTML(w);
    document.getElementById('baBefore').innerHTML = workBeforeHTML(w);
    fitLive();
    const p = proofData[w.key];
    const stats = p ? p.metrics.map(m => {
      const mult = m.before === 0 ? 'new' : (m.after / m.before).toFixed(1) + 'x';
      return `<div class="ba-stat"><span>${esc(m.label.toLowerCase())}</span><b>${m.before.toLocaleString()} <i>→</i> ${m.after.toLocaleString()}</b><em>${mult}</em></div>`;
    }).join('') : `<div class="ba-stat ba-stat-wide"><span>status</span><b>${esc(w.status || 'In build')}</b></div>`;
    document.getElementById('baInfo').innerHTML = `
      <div class="ba-who">
        <div class="ba-name">${esc(w.name)} <span class="live-pill ${w.live ? '' : 'work-pill-build'}">${w.live ? 'LIVE' : 'IN BUILD'}</span></div>
        <div class="ba-type">${esc(w.type)}</div>      </div>
      <div class="ba-stats">${stats}</div>`;
    document.querySelectorAll('.ba-thumb').forEach(t => {
      const on = +t.dataset.i === workIdx;
      t.classList.toggle('on', on);
      t.setAttribute('aria-selected', on);
      if (on && !first) {
        const strip = t.parentElement;
        strip.scrollTo({ left: t.offsetLeft - (strip.clientWidth - t.offsetWidth) / 2, behavior: 'smooth' });
      }
    });
  };
  if (first) { paint(); return; }
  stage.classList.add('swap');
  setTimeout(() => { paint(); stage.classList.remove('swap'); }, 220);
}

// Slider state. baPos is what is on screen, baTarget is where it is heading.
// Input only sets the target; one rAF loop eases baPos toward it and writes
// two CSS variables (--pos for the clip, --px for the transform-moved handle).
let baTarget = 50, baW = 0, baRaf = 0, baEase = 0.34, baShown = -1, baStageEl = null, baHandleEl = null;
const baReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function baApply() {
  if (!baStageEl) return;
  baStageEl.style.setProperty('--pos', baPos.toFixed(3) + '%');
  baStageEl.style.setProperty('--px', (baPos / 100 * baW).toFixed(2) + 'px');
  const r = Math.round(baPos);
  if (baHandleEl && r !== baShown) { baShown = r; baHandleEl.setAttribute('aria-valuenow', r); }
}

function baTick() {
  baRaf = 0;
  const d = baTarget - baPos;
  if (Math.abs(d) < 0.03) { baPos = baTarget; baApply(); return; }
  baPos += d * baEase;
  baApply();
  baRaf = requestAnimationFrame(baTick);
}

function setBA(pct, opts) {
  baTarget = Math.max(0, Math.min(100, pct));
  baEase = (opts && opts.ease) || 0.34;
  if (baReduce || (opts && opts.instant)) { baPos = baTarget; baApply(); return; }
  if (!baRaf) baRaf = requestAnimationFrame(baTick);
}

function initBeforeAfter() {
  const stage = document.getElementById('baStage');
  const handle = document.getElementById('baHandle');
  const hint = document.getElementById('baHint');
  if (!stage || !handle) return;
  baStageEl = stage; baHandleEl = handle; baShown = -1;
  let dragging = false;
  // cache geometry once instead of reading layout on every pointer event
  let rect = stage.getBoundingClientRect();
  baW = rect.width;
  baPos = baTarget = Math.max(0, Math.min(100, baPos));
  baApply();
  if ('ResizeObserver' in window) {
    new ResizeObserver(() => { rect = stage.getBoundingClientRect(); baW = rect.width; baApply(); }).observe(stage);
  }
  let lastX = 0;
  const fromX = x => setBA(((x - rect.left) / rect.width) * 100);
  const hideHint = () => hint && hint.classList.add('gone');
  stage.addEventListener('pointerdown', e => {
    if (e.target.closest('a,button:not(.ba-handle)')) return;
    dragging = true;
    rect = stage.getBoundingClientRect();
    baW = rect.width;
    stage.classList.add('dragging');
    stage.setPointerCapture(e.pointerId);
    lastX = e.clientX;
    fromX(lastX);
    hideHint();
  });
  stage.addEventListener('pointermove', e => { if (dragging) { lastX = e.clientX; fromX(lastX); } }, { passive: true });
  const end = () => { dragging = false; stage.classList.remove('dragging'); };
  stage.addEventListener('pointerup', end);
  stage.addEventListener('pointercancel', end);
  handle.addEventListener('keydown', e => {
    const step = e.shiftKey ? 10 : 4;
    if (e.key === 'ArrowLeft') { setBA(baTarget - step); hideHint(); e.preventDefault(); }
    if (e.key === 'ArrowRight') { setBA(baTarget + step); hideHint(); e.preventDefault(); }
    if (e.key === 'Home') { setBA(0, { ease: 0.2 }); e.preventDefault(); }
    if (e.key === 'End') { setBA(100, { ease: 0.2 }); e.preventDefault(); }
  });
  const strip = document.getElementById('baStrip');
  if (strip) strip.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { selectWork(workIdx + 1); e.preventDefault(); }
    if (e.key === 'ArrowLeft') { selectWork(workIdx - 1); e.preventDefault(); }
  });
  // one-time sweep the first time the slider scrolls into view
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(entries => {
    if (!entries.some(en => en.isIntersecting)) return;
    io.disconnect();
    const keys = [[0, 50], [700, 78], [1300, 22], [1900, 50]];
    keys.forEach(([t, v]) => setTimeout(() => { if (!dragging) setBA(v, { ease: 0.07 }); }, 400 + t));
  }, { threshold: 0.5 });
  io.observe(stage);
}

// ==================== TESTIMONIAL ====================
let quoteIdx = 0, quoteTimer = null;
function renderTestimonial(i) {
  if (!approvedReviews.length) return;
  quoteIdx = (i + approvedReviews.length) % approvedReviews.length;
  const r = approvedReviews[quoteIdx];
  const q = document.getElementById('glQuote');
  if (!q) return;
  q.style.opacity = 0;
  setTimeout(() => {
    q.textContent = r.quote;
    document.getElementById('glQuoteBy').innerHTML = `<b>${esc(r.name)}</b>, ${esc(r.biz)}`;
    document.getElementById('glQuoteAv').textContent = r.initials || (r.name || '?').slice(0, 2).toUpperCase();
    document.getElementById('glDots').innerHTML = approvedReviews.map((_, k) =>
      `<button class="${k === quoteIdx ? 'on' : ''}" aria-label="Review ${k + 1}" onclick="renderTestimonial(${k});restartQuotes()"></button>`).join('');
    q.style.opacity = 1;
  }, q.textContent ? 250 : 0);
}
function restartQuotes() {
  clearInterval(quoteTimer);
  quoteTimer = setInterval(() => renderTestimonial(quoteIdx + 1), 6500);
}

// ==================== FAQ ====================
const faqs = [
  ['Who do you work with?', 'Restaurants, clinics, beauty, fitness, retail and gaming studios. Any business that needs its website to bring in customers.'],
  ["What if I don't have a brief?", 'Send a few lines or book a call. RTG turns it into a plan.'],
  ['How long does a build take?', 'Most sites go live within 48 hours of kickoff. Bigger builds take one to two weeks.'],
  ['How much does it cost?', 'Foundation is $300, Growth $800 and Dominance $1,500. Try any plan for one month with a single payment, or go monthly for 15% less and cancel anytime.'],
  ['What is in each plan?', 'Foundation is your website with SEO and AI search. Every plan gets image ads, plus a film ad on the trial. Growth adds UGC videos, AI content, 2 film ads a month and ads run on Meta and Google. Dominance adds AI model shoots, longer film ads and AI tools training. Anyone can book an AI training call on its own.'],
  ['Does my ad budget go to you?', 'No. Your ad spend stays in your own Meta or Google account. The plan covers RTG running it for you.'],
  ['Why do you show prices?', 'So you know before the first call. It saves both of us time and keeps the focus on your build.'],
  ['What happens after launch?', 'RTG keeps the site fast, ranked and updated, with a weekly report on what to fix next.']
];
function renderFAQ() {
  const list = document.getElementById('faqList');
  if (!list) return;
  list.innerHTML = faqs.map(([q, a]) => `
    <div class="faq-item">
      <button class="faq-q" onclick="this.parentElement.classList.toggle('open')" aria-expanded="false">${esc(q)}<span class="faq-plus"></span></button>
      <div class="faq-a"><div>${esc(a)}</div></div>
    </div>`).join('');
}

function initSectionSpy() {
  const root = document.getElementById('glRight');
  const ids = ['work', 'services', 'faq', 'contact'];
  const links = document.querySelectorAll('.gl-bnav a[data-sec]');
  const spy = () => {
    const useRoot = root && root.scrollHeight > root.clientHeight + 4;
    const top = useRoot ? root.getBoundingClientRect().top : 0;
    let cur = null;
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top - top < 160) cur = id;
    });
    links.forEach(l => l.classList.toggle('on', l.dataset.sec === cur));
  };
  if (root) root.addEventListener('scroll', spy, { passive: true });
  window.addEventListener('scroll', spy, { passive: true });
  spy();
}

function glHome() {
  const r = document.getElementById('glRight');
  if (r && r.scrollHeight > r.clientHeight) r.scrollTo({ top: 0, behavior: 'smooth' });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==================== PRICING: 3 PLANS ====================
// Every price and inclusion lives here. Change a number, the page updates.
const NGN_RATE = 1600;
const MONTHLY_DISCOUNT = 0.15; // monthly plans pay 15% less than the 1-month trial
const PLAN_ORDER = ['foundation', 'growth', 'dominance'];
const PLANS = {
  foundation: {
    name: 'Foundation', price: 300,
    for: 'Get your business online and found on Google.',
    inherit: null,
    feats: [['Website', ['Website, up to 5 pages', 'Hosting, SSL and updates']], ['Search', ['SEO + AI search (AIO)', 'Monthly results report']], ['Ads', ['Image ads (static)', '+ 1 film ad (video) on your trial']]]
  },
  growth: {
    name: 'Growth', price: 800, popular: true,
    for: 'Your site plus the content and ads that bring people to it.',
    inherit: 'Foundation',
    feats: [['Content', ['4 UGC videos a month', '12 AI content posts a month']], ['Ads', ['Ads run for you on Meta and Google', '2 film ads a month']]]
  },
  dominance: {
    name: 'Dominance', price: 1500,
    for: 'The full RTG team on your brand, every month.',
    inherit: 'Growth',
    feats: [['Content', ['AI model photo and video shoot']], ['Ads', ['Longer film ads, up to 2 min']], ['Team', ['AI tools training for your team', 'Direct line to the RTG founder']]]
  }
};

const pbState = { plan: 'growth', mode: 'trial', cur: 'usd' };
const pricingState = pbState;

function money(usd, cur) {
  return cur === 'ngn' ? '₦' + Math.round(usd * NGN_RATE).toLocaleString() : '$' + Math.round(usd).toLocaleString();
}
function planPrice(k, mode) {
  const p = PLANS[k].price;
  return (mode || pbState.mode) === 'monthly' ? Math.round(p * (1 - MONTHLY_DISCOUNT)) : p;
}
function setPlan(k) { if (PLANS[k]) { pbState.plan = k; renderPricing(true); } }
function pbSetMode(m) { pbState.mode = m; renderPricing(); }
function setCur(c) { pbState.cur = c; renderPricing(); }
function setBilling(b) { pbSetMode(b === 'monthly' ? 'monthly' : 'trial'); }

function countTo(el, from, to, fmt) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || from === to) { el.textContent = fmt(to); return; }
  const start = performance.now(), dur = 520;
  cancelAnimationFrame(el._raf);
  const tick = now => {
    const t = Math.min((now - start) / dur, 1);
    const e = 1 - Math.pow(1 - t, 3);
    el.textContent = fmt(from + (to - from) * e);
    if (t < 1) el._raf = requestAnimationFrame(tick);
  };
  el._raf = requestAnimationFrame(tick);
}

const PB_CHECK = '<svg viewBox="0 0 16 16" fill="none"><path d="M3.5 8.5l3 3 6-7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

function renderPricing(bump) {
  const { plan, mode, cur } = pbState;
  const P = PLANS[plan];
  if (!document.getElementById('prTabs')) return;
  const monthly = mode === 'monthly';

  document.querySelectorAll('.pr-tab').forEach(t => t.classList.toggle('active', t.dataset.plan === plan));
  const ind = document.getElementById('prInd');
  if (ind) ind.style.transform = `translateX(${PLAN_ORDER.indexOf(plan) * 100}%)`;
  document.getElementById('prTabs').dataset.tier = plan;
  document.querySelectorAll('.pt-p').forEach(el => { el.textContent = money(planPrice(el.dataset.p), cur) + (monthly ? '/mo' : ''); });
  document.querySelectorAll('#pbBill button').forEach(b => {
    const on = b.dataset.v === mode;
    b.classList.toggle('on', on);
    b.setAttribute('aria-checked', on);
  });
  const bi = document.getElementById('pbBillInd');
  if (bi) bi.style.transform = monthly ? 'translateX(100%)' : 'translateX(0)';

  document.getElementById('prName').textContent = P.name;
  document.getElementById('prFor').textContent = P.for;
  document.getElementById('prInherit').innerHTML = P.inherit ? `<span class="pr-plus">+</span>Everything in ${P.inherit}, plus` : '';
  document.getElementById('prFeats').innerHTML = P.feats.map(([g, items]) =>
    `<li class="pf-group"><span class="pf-g">${g}</span><ul>${items.map(f => f.startsWith('+ ') ? `<li class="pf-bonus"><span>PLUS</span>${f.slice(2)}</li>` : `<li>${PB_CHECK}${f}</li>`).join('')}</ul></li>`).join('');

  const card = document.getElementById('prMetal');
  card.dataset.tier = plan;
  document.getElementById('prPop').style.visibility = P.popular ? 'visible' : 'hidden';
  document.getElementById('prMetalLabel').textContent = P.name.toUpperCase() + ' PLAN';
  document.getElementById('prPer').textContent = monthly ? '/mo' : ' once';
  const price = planPrice(plan);
  const alt = cur === 'usd' ? 'ngn' : 'usd';
  document.getElementById('prAlt').innerHTML = `<button class="pb-cur" onclick="setCur('${alt}')" aria-label="Show price in ${alt.toUpperCase()}">${money(price, alt)}</button> ${monthly ? 'per month' : 'for 1 month'}`;
  const priceEl = document.getElementById('prPrice');
  const target = cur === 'ngn' ? price * NGN_RATE : price;
  const from = priceEl._val == null ? target : priceEl._val;
  priceEl._val = target;
  countTo(priceEl, from, target, v => (cur === 'ngn' ? '₦' : '$') + Math.round(v).toLocaleString());

  document.getElementById('prGoName').textContent = `${monthly ? 'Start' : 'Try'} ${P.name}`;
  document.getElementById('prNote').innerHTML = monthly
    ? 'Billed monthly. Cancel anytime. <a onclick="bookCall(\'website\')">Questions? Book a call.</a>'
    : `One payment, no renewal. Stay on for ${money(planPrice(plan, 'monthly'), 'usd')}/mo. <a onclick="bookCall('website')">Book a call.</a>`;

  if (bump) { card.classList.remove('flip'); void card.offsetWidth; card.classList.add('flip'); }
  syncPlanNote();
}

function initPricingCard() {
  const d = new Date(); d.setMonth(d.getMonth() + 1);
  const since = document.getElementById('prSince');
  if (since) since.textContent = String(d.getMonth() + 1).padStart(2, '0') + ' / ' + String(d.getFullYear()).slice(2);
  const stage = document.getElementById('prStage');
  const card = document.getElementById('prMetal');
  if (!stage || !card) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(hover: none)').matches) return;
  stage.addEventListener('pointermove', e => {
    const r = stage.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    card.style.setProperty('--rx', ((0.5 - y) * 10).toFixed(2) + 'deg');
    card.style.setProperty('--ry', ((x - 0.5) * 14).toFixed(2) + 'deg');
    card.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
    card.style.setProperty('--my', (y * 100).toFixed(1) + '%');
    card.classList.add('tilting');
  });
  stage.addEventListener('pointerleave', () => {
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
    card.classList.remove('tilting');
  });
}

// summary used by the form and the admin inbox
function pbSummary() {
  const P = PLANS[pbState.plan];
  const price = planPrice(pbState.plan);
  const monthly = Math.round(P.price * (1 - MONTHLY_DISCOUNT));
  return {
    mode: pbState.mode,
    plan: pbState.plan,
    lines: [{ key: pbState.plan, name: P.name + ' plan', detail: (P.inherit ? 'Everything in ' + P.inherit + ' + ' : '') + P.feats.map(([g, it]) => g + ': ' + it.join(', ')).join('. '), addons: [], price }],
    trial: P.price,
    monthly,
    due: price,
    text: `${P.name} plan · ${pbState.mode === 'monthly' ? money(monthly, 'usd') + '/mo' : money(P.price, 'usd') + ' 1-month trial'}`
  };
}

const topicNames = { website: 'Website plan', ads: 'Ads & growth', training: 'AI tools training', unsure: 'Not sure yet' };
const svcState = new Set();
function toggleSvc() {}
function renderSvcs() {}
function startService() { scrollToEl('pricing'); }
function bookCall(topic) {
  openWW('call');
  const sel = document.querySelector('.ww-panel[data-panel="call"] [name="topic"]');
  if (sel) sel.value = topic || 'website';
}
function startPlan() {
  openWW('project');
  syncPlanNote();
}
function syncPlanNote() {
  const box = document.getElementById('wwPlan');
  const t = document.getElementById('wwCommitText');
  const P = PLANS[pbState.plan];
  const price = planPrice(pbState.plan);
  const monthly = pbState.mode === 'monthly';
  if (box) box.innerHTML = `<div class="ww-plan-line ww-plan-one"><span><b>${P.name} plan</b><small>${monthly ? 'Monthly, cancel anytime' : '1-month trial, one payment'}</small></span><b class="ww-plan-price">${money(price, 'usd')}${monthly ? '/mo' : ''}</b></div>`;
  if (t) t.textContent = monthly ? `I'm ready to start at ${money(price, 'usd')} a month.` : `I'm ready to pay ${money(price, 'usd')} for a 1-month trial.`;
}

// ==================== TEAM ====================
// Add a person: { name, role, photo: 'team/name.jpg' (in /public/team), tag: 'Short fun fact' }
// Without a photo the card shows their initials on the brand gradient.
const TEAM = [
  { name: 'Xica', role: 'Founder', photo: 'team/xica.jpg', pos: '80% 82%', tag: '' }
];
function renderTeam() {
  const t = document.getElementById('teamTrack');
  if (!t) return;
  t.innerHTML = TEAM.map(m => {
    const ini = m.name.split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
    return `<article class="team-card">
      ${m.photo ? `<img class="team-photo" src="${esc(m.photo)}" alt="${esc(m.name)}" loading="lazy" decoding="async" draggable="false"${m.pos ? ` style="object-position:${esc(m.pos)}"` : ''} />` : `<span class="team-initials" aria-hidden="true">${esc(ini)}</span>`}
      <div class="team-meta"><div class="team-name">${esc(m.name)}</div><div class="team-role">${esc(m.role)}</div></div>
      ${m.tag ? `<span class="team-tag">${esc(m.tag)}</span>` : ''}
    </article>`;
  }).join('');
  // drag to scroll with mouse
  let down = false, sx = 0, sl = 0, moved = false;
  t.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; down = true; moved = false; sx = e.clientX; sl = t.scrollLeft; });
  window.addEventListener('pointermove', e => {
    if (!down) return;
    const dx = e.clientX - sx;
    if (Math.abs(dx) > 4) { moved = true; t.classList.add('dragging'); }
    t.scrollLeft = sl - dx;
  });
  window.addEventListener('pointerup', () => { if (!down) return; down = false; t.classList.remove('dragging'); });
}
function teamScroll(dir) {
  const t = document.getElementById('teamTrack');
  const c = t && t.querySelector('.team-card');
  if (c) t.scrollBy({ left: dir * (c.offsetWidth + 20), behavior: 'smooth' });
}

// ==================== LOGO ====================
function logoSpin(e) {
  if (e) e.preventDefault();
  const el = e && e.currentTarget;
  if (el) { el.classList.remove('spin'); void el.offsetWidth; el.classList.add('spin'); }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==================== WORK WITH US MODAL ====================
const wwState = { tab: 'project', day: null, time: null, lastFocus: null };

function openWW(tab) {
  wwState.lastFocus = document.activeElement;
  const o = document.getElementById('wwOverlay');
  document.getElementById('wwMain').style.display = '';
  document.getElementById('wwSuccess').classList.remove('show');
  o.classList.add('show');
  o.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  wwTab(tab || 'project');
  const nm = document.getElementById('navMobile');
  if (nm) nm.classList.remove('open');
}
function closeWW() {
  const o = document.getElementById('wwOverlay');
  o.classList.remove('show');
  o.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (wwState.lastFocus && wwState.lastFocus.focus) wwState.lastFocus.focus();
}
function wwTab(tab) {
  const order = ['project', 'call', 'message'];
  wwState.tab = tab;
  document.querySelectorAll('.ww-tab').forEach(t => {
    const on = t.dataset.tab === tab;
    t.classList.toggle('active', on);
    t.setAttribute('aria-selected', on);
  });
  document.querySelectorAll('.ww-panel').forEach(p => p.classList.toggle('active', p.dataset.panel === tab));
  document.getElementById('wwInd').style.transform = `translateX(${order.indexOf(tab) * 100}%)`;
  if (tab === 'call') renderSlots();
  setTimeout(() => {
    const first = document.querySelector(`.ww-panel[data-panel="${tab}"] input`);
    if (first && window.innerWidth > 640) first.focus();
  }, 60);
}

function renderSlots() {
  const days = document.getElementById('wwDays');
  if (!days.children.length) {
    const out = [];
    const d = new Date();
    d.setDate(d.getDate() + 1);
    while (out.length < 5) {
      if (d.getDay() !== 0 && d.getDay() !== 6) out.push(new Date(d));
      d.setDate(d.getDate() + 1);
    }
    days.innerHTML = out.map(x => {
      const iso = `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, '0')}-${String(x.getDate()).padStart(2, '0')}`;
      return `<button type="button" class="ww-day" data-day="${iso}" onclick="pickDay('${iso}')">
        <div class="d1">${x.toLocaleDateString('en-US', { weekday: 'short' })}</div>
        <div class="d2">${x.getDate()}</div></button>`;
    }).join('');
    document.getElementById('wwTimes').innerHTML = ['10:00', '12:00', '15:00', '17:00']
      .map(t => `<button type="button" class="ww-time" data-time="${t}" onclick="pickTime('${t}')">${t}</button>`).join('');
  }
}
function pickDay(iso) {
  wwState.day = iso;
  document.querySelectorAll('.ww-day').forEach(b => b.classList.toggle('sel', b.dataset.day === iso));
}
function pickTime(t) {
  wwState.time = t;
  document.querySelectorAll('.ww-time').forEach(b => b.classList.toggle('sel', b.dataset.time === t));
}

function wwValid(form, names) {
  let ok = true;
  names.forEach(n => {
    const el = form.querySelector(`[name="${n}"]`);
    const v = (el.value || '').trim();
    const bad = !v || (n === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
    el.classList.toggle('error', bad);
    if (bad) {
      ok = false;
      el.addEventListener('input', () => el.classList.remove('error'), { once: true });
    }
  });
  return ok;
}

async function deliver(payload) {
  submissions.unshift(payload);
  saveSubmissions();
  updateSubmissionBadge();
  if (!RTG_CONFIG.formEndpoint) return true;
  try {
    const r = await fetch(RTG_CONFIG.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    });
    return r.ok;
  } catch (e) { return false; }
}

function wwSuccess(title, sub) {
  document.getElementById('wwMain').style.display = 'none';
  document.getElementById('wwSuccessTitle').textContent = title;
  document.getElementById('wwSuccessSub').textContent = sub;
  document.getElementById('wwSuccess').classList.add('show');
}

async function submitProject() {
  const f = document.querySelector('.ww-panel[data-panel="project"]');
  const ok = wwValid(f, ['brand', 'email', 'message']);
  const commit = f.querySelector('[name="commit"]');
  const lab = commit.closest('.ww-check');
  lab.classList.toggle('error', !commit.checked);
  if (!commit.checked) commit.addEventListener('change', () => lab.classList.remove('error'), { once: true });
  if (!ok || !commit.checked) return;
  const btn = f.querySelector('.ww-send');
  btn.disabled = true; btn.textContent = 'Sending';
  const get = n => f.querySelector(`[name="${n}"]`).value.trim();
  const sm = pbSummary();
  const payload = {
    id: 's' + Date.now(), type: 'project',
    businessName: get('brand'), fullName: '', email: get('email'),
    plan: 'custom', committed: true, order: sm,
    billing: sm.mode === 'monthly' ? 'Monthly' : 'Trial',
    message: get('message'), submittedAt: new Date().toISOString()
  };
  await deliver(payload);
  btn.disabled = false; btn.textContent = 'Send message';
  f.reset(); syncPlanNote();
  wwSuccess('Project received.', `${sm.text}. RTG replies to ${payload.email} within 24 hours with your payment link and kickoff steps.`);
}

async function submitCall() {
  const f = document.querySelector('.ww-panel[data-panel="call"]');
  const slotOk = wwState.day && wwState.time;
  if (!slotOk) {
    showToast(!wwState.day ? 'Pick a day' : 'Pick a time');
  }
  if (!wwValid(f, ['name', 'email']) || !slotOk) return;
  const btn = f.querySelector('.ww-send');
  btn.disabled = true; btn.textContent = 'Sending';
  const get = n => f.querySelector(`[name="${n}"]`).value.trim();
  const when = new Date(wwState.day + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  const payload = {
    id: 's' + Date.now(), type: 'call',
    topic: f.querySelector('[name="topic"]').value,
    businessName: '', fullName: get('name'), email: get('email'),
    callSlot: `${when} · ${wwState.time} WAT`, submittedAt: new Date().toISOString()
  };
  await deliver(payload);
  btn.disabled = false; btn.textContent = 'Request call';
  f.reset();
  wwState.day = wwState.time = null;
  document.querySelectorAll('.ww-day,.ww-time').forEach(b => b.classList.remove('sel'));
  wwSuccess('Call requested.', `${topicNames[payload.topic] || 'Call'} · ${payload.callSlot}. Invite goes to ${payload.email}.`);
}

function copyText(text, msg) {
  const done = () => showToast(msg || 'Copied');
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
  } else fallbackCopy(text, done);
}
function fallbackCopy(text, done) {
  const t = document.createElement('textarea');
  t.value = text; t.style.position = 'fixed'; t.style.opacity = '0';
  document.body.appendChild(t); t.select();
  try { document.execCommand('copy'); } catch (e) {}
  t.remove(); done();
}

function applyContactConfig() {
  document.querySelectorAll('.rtg-email').forEach(el => el.textContent = RTG_CONFIG.email);
  document.querySelectorAll('.rtg-email-link').forEach(el => el.href = 'mailto:' + RTG_CONFIG.email);
  document.querySelectorAll('.footer-contact .rtg-email-link').forEach(el => el.textContent = RTG_CONFIG.email);
}

function updateSubmissionBadge() {
  const b = document.getElementById('subBadge');
  if (b) b.textContent = submissions.length;
}

// ==================== MODE ====================
function switchMode(mode) {
  state.appMode = mode;
  if (mode === 'admin') {
    document.getElementById('public-app').style.display = 'none';
    document.getElementById('admin-app').classList.add('active');
    renderSection('dashboard');
    updateSidebarMRR();
    updateSubmissionBadge();
    updateReviewBadge();
    setAdminDate();
    window.scrollTo(0, 0);
  } else {
    document.getElementById('public-app').style.display = '';
    document.getElementById('admin-app').classList.remove('active');
  }
}
function setAdminDate() {
  const d = new Date();
  const opts = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
  document.getElementById('adminDate').textContent = d.toLocaleDateString('en-US', opts).toUpperCase();
}
function calculateMRR() {
  return clientDatabase.filter(c => c.status === 'active' || c.status === 'overdue').reduce((s, c) => s + c.mrr, 0);
}
function updateSidebarMRR() {
  const mrr = calculateMRR();
  document.getElementById('sidebarMRR').textContent = '$' + mrr.toLocaleString();
  const active = clientDatabase.filter(c => c.status === 'active').length;
  document.getElementById('sidebarMRRSub').textContent = active + ' clients active';
}

// ==================== ADMIN SECTIONS ====================
function renderSection(section) {
  state.currentSection = section;
  document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
  const a = document.querySelector(`.sidebar-item[data-nav="${section}"]`);
  if (a) a.classList.add('active');
  const titles = {
    dashboard: 'Dashboard', submissions: 'Inbox', reviews: 'Reviews Moderation', leads: 'Leads',
    onboarding: 'Onboarding', clients: 'Clients', payments: 'Payments', revenue: 'Revenue'
  };
  document.getElementById('sectionTitle').textContent = titles[section];
  const content = document.getElementById('adminContent');
  content.innerHTML = '';
  const view = document.createElement('div');
  view.className = 'admin-section-view';
  content.appendChild(view);
  if (section === 'dashboard') renderDashboard(view);
  else if (section === 'submissions') renderSubmissions(view);
  else if (section === 'reviews') renderReviewsModeration(view);
  else if (section === 'leads') renderLeads(view);
  else if (section === 'onboarding') renderOnboarding(view);
  else if (section === 'clients') renderClients(view);
  else if (section === 'payments') renderPayments(view);
  else if (section === 'revenue') renderRevenue(view);
}

function renderDashboard(view) {
  const mrr = calculateMRR();
  const active = clientDatabase.filter(c => c.status === 'active').length;
  const onboarding = clientDatabase.filter(c => c.status === 'onboarding').length;
  const overdue = clientDatabase.filter(c => c.status === 'overdue').length;
  view.innerHTML = `
    <div class="metrics-row">
      <div class="metric-card"><div class="metric-label">MRR</div><div class="metric-value" data-count="${mrr}">$0</div><div class="metric-sub">+$900 this month</div></div>
      <div class="metric-card"><div class="metric-label">Active Clients</div><div class="metric-value" data-count="${active}">0</div><div class="metric-sub">${onboarding} onboarding</div></div>
      <div class="metric-card"><div class="metric-label">Pipeline Leads</div><div class="metric-value" data-count="${leads.length}">0</div><div class="metric-sub">${submissions.length} new submissions</div></div>
      <div class="metric-card"><div class="metric-label">Overdue</div><div class="metric-value" data-count="${overdue}">0</div><div class="metric-sub">Follow up required</div></div>
    </div>
    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 14px;">
      <div class="admin-table-wrap">
        <div style="padding: 20px 24px; border-bottom: 1px solid var(--border-glass);">
          <div style="font-family: 'Google Sans', sans-serif; font-size: 18px; color: var(--white-100);">Recent Activity</div>
        </div>
        <table class="admin-table">
          <thead><tr><th>Client</th><th>Plan</th><th>Status</th><th>MRR</th></tr></thead>
          <tbody>
            ${clientDatabase.slice(0, 5).map(c => `
              <tr onclick="openClientDetail('${c.id}')">
                <td>${c.businessName}</td>
                <td><span class="tier-badge tier-${c.plan}">${c.plan}</span></td>
                <td><span class="status-dot status-${c.status}">${c.status}</span></td>
                <td style="font-family: 'Geist', sans-serif;">$${c.mrr}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      <div class="chart-wrap">
        <div style="font-family: 'Geist', sans-serif; font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: var(--white-40);">This Week</div>
        <div style="font-family: 'Google Sans', sans-serif; font-size: 32px; color: var(--white-100); margin-top: 8px;">3 actions</div>
        <div style="margin-top: 20px;" class="checklist">
          <div class="checklist-item done"><div class="checklist-check"><svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1 4.5l2.5 2.5L8 1.5" stroke="#0A0A0A" stroke-width="1.5"/></svg></div><span>Follow up on Chop Life overdue payment</span></div>
          <div class="checklist-item"><div class="checklist-check"></div><span>Send Nomad Fitness week 2 check-in</span></div>
          <div class="checklist-item"><div class="checklist-check"></div><span>Review Adaeze Smith proposal feedback</span></div>
        </div>
      </div>
    </div>
  `;
  animateCounters(view);
}

function renderClients(view) {
  view.innerHTML = `
    <div class="admin-table-wrap">
      <table class="admin-table">
        <thead><tr><th>Business</th><th>Owner</th><th>Niche</th><th>Plan</th><th>MRR</th><th>Status</th><th>Start</th></tr></thead>
        <tbody>
          ${clientDatabase.map(c => `
            <tr onclick="openClientDetail('${c.id}')">
              <td style="color: var(--white-100); font-weight: 500;">${c.businessName}</td>
              <td>${c.fullName}</td>
              <td>${c.niche}</td>
              <td><span class="tier-badge tier-${c.plan}">${c.plan}</span></td>
              <td style="font-family: 'Geist', sans-serif;">$${c.mrr}</td>
              <td><span class="status-dot status-${c.status}">${c.status}</span></td>
              <td style="font-family: 'Geist', sans-serif; color: var(--white-40);">${c.startDate}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderLeads(view) {
  view.innerHTML = `
    <div class="admin-table-wrap">
      <table class="admin-table">
        <thead><tr><th>Name</th><th>Business</th><th>Email</th><th>Interest</th><th>Stage</th><th>Added</th></tr></thead>
        <tbody>
          ${leads.map(l => `
            <tr>
              <td style="color: var(--white-100); font-weight: 500;">${esc(l.name)}</td>
              <td>${esc(l.business)}</td>
              <td style="font-family: 'Geist', sans-serif; font-size: 12px;">${esc(l.email)}</td>
              <td><span class="tier-badge tier-${l.interest.toLowerCase()}">${l.interest}</span></td>
              <td><span class="status-dot status-pending">${l.stage.replace(/_/g, ' ')}</span></td>
              <td style="font-family: 'Geist', sans-serif; color: var(--white-40);">${l.added}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderOnboarding(view) {
  const list = clientDatabase.filter(c => c.status === 'onboarding');
  view.innerHTML = `
    <div style="display: grid; gap: 14px;">
      ${list.length === 0 ? '<div class="metric-card">No clients currently onboarding.</div>' : ''}
      ${list.map(c => `
        <div class="metric-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px;">
            <div>
              <div style="font-family: 'Google Sans', sans-serif; font-size: 20px; color: var(--white-100);">${c.businessName}</div>
              <div style="font-family: 'Geist', sans-serif; font-size: 11px; color: var(--white-40); margin-top: 4px;">${c.plan.toUpperCase()} · Started ${c.startDate}</div>
            </div>
            <div style="font-family: 'Geist', sans-serif; font-size: 18px; color: var(--white-100);">60%</div>
          </div>
          <div class="progress-bar"><div class="progress-fill" style="width: 60%;"></div></div>
          <div style="margin-top: 20px;" class="checklist">
            <div class="checklist-item done"><div class="checklist-check"><svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1 4.5l2.5 2.5L8 1.5" stroke="#0A0A0A" stroke-width="1.5"/></svg></div><span>Intake form reviewed</span></div>
            <div class="checklist-item done"><div class="checklist-check"><svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1 4.5l2.5 2.5L8 1.5" stroke="#0A0A0A" stroke-width="1.5"/></svg></div><span>Setup fee paid</span></div>
            <div class="checklist-item done"><div class="checklist-check"><svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1 4.5l2.5 2.5L8 1.5" stroke="#0A0A0A" stroke-width="1.5"/></svg></div><span>Wireframe approved</span></div>
            <div class="checklist-item"><div class="checklist-check"></div><span>Brand assets received</span></div>
            <div class="checklist-item"><div class="checklist-check"></div><span>First draft live preview</span></div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderPayments(view) {
  const payments = clientDatabase.map(c => ({
    client: c.businessName,
    amount: c.mrr,
    status: c.status === 'overdue' ? 'overdue' : 'paid',
    date: c.startDate
  }));
  view.innerHTML = `
    <div class="admin-table-wrap">
      <table class="admin-table">
        <thead><tr><th>Client</th><th>Amount</th><th>Status</th><th>Billed</th></tr></thead>
        <tbody>
          ${payments.map(p => `
            <tr>
              <td style="color: var(--white-100);">${p.client}</td>
              <td style="font-family: 'Geist', sans-serif; font-size: 14px;">$${p.amount}</td>
              <td><span class="status-dot status-${p.status === 'paid' ? 'active' : 'overdue'}">${p.status}</span></td>
              <td style="font-family: 'Geist', sans-serif; color: var(--white-40);">${p.date}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderRevenue(view) {
  const months = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];
  const vals = [1200, 1500, 1800, 2100, 2400, 2800];
  const max = Math.max(...vals);
  view.innerHTML = `
    <div class="metrics-row">
      <div class="metric-card"><div class="metric-label">MRR</div><div class="metric-value">$${calculateMRR().toLocaleString()}</div></div>
      <div class="metric-card"><div class="metric-label">ARR</div><div class="metric-value">$${(calculateMRR() * 12).toLocaleString()}</div></div>
      <div class="metric-card"><div class="metric-label">Avg Client Value</div><div class="metric-value">$${Math.round(calculateMRR() / clientDatabase.length)}</div></div>
      <div class="metric-card"><div class="metric-label">Growth</div><div class="metric-value">+17%</div></div>
    </div>
    <div class="chart-wrap" style="margin-top: 14px;">
      <div style="font-family: 'Geist', sans-serif; font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: var(--white-40);">Revenue · Last 6 Months</div>
      <div class="chart-bars">
        ${months.map((m, i) => `
          <div class="chart-bar" style="height: ${(vals[i]/max)*100}%;">
            <div class="chart-bar-val">$${vals[i]}</div>
            <div class="chart-bar-label">${m}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderSubmissions(view) {
  if (submissions.length === 0) {
    view.innerHTML = `<div class="metric-card" style="text-align: center; padding: 60px;">
      <div style="font-family: 'Google Sans', sans-serif; font-size: 24px; color: var(--white-90);">Inbox empty</div>
      <div style="font-family: 'Geist', sans-serif; font-size: 13px; color: var(--white-50); margin-top: 8px;">Messages and call requests from Work with us land here.</div>
    </div>`;
    return;
  }
  view.innerHTML = submissions.map(s => {
    const isCall = s.type === 'call';
    const who = isCall ? s.fullName : s.businessName;
    return `
    <div class="submission-card">
      <div class="submission-head">
        <div>
          <div class="submission-biz"><span class="sub-type">${isCall ? 'Call' : 'Project'}</span>${esc(who)}${s.order ? ` <span class="tier-badge tier-growth" style="margin-left:8px">${s.order.mode === 'monthly' ? 'Monthly' : 'Trial'}</span>` : ''}${s.topic === 'training' ? ' <span class="tier-badge tier-dominance" style="margin-left:8px">AI training</span>' : ''}${s.committed ? ' <span class="live-pill" style="margin-left:6px">BUDGET OK</span>' : ''}</div>
          <div class="submission-meta"><a href="mailto:${esc(s.email)}" style="color:var(--white-80)">${esc(s.email)}</a></div>
        </div>
        <div class="submission-meta">${new Date(s.submittedAt).toLocaleString()}</div>
      </div>
      ${isCall
        ? `<div class="submission-grid"><div><div class="submission-field-label">Requested slot</div><div class="submission-field-val">${esc(s.callSlot)}</div></div><div><div class="submission-field-label">About</div><div class="submission-field-val">${esc(topicNames[s.topic] || 'Not set')}</div></div></div>`
        : `${s.order && s.order.lines ? `<div class="sub-order"><div class="submission-field-label">Plan · ${s.order.mode === 'monthly' ? 'Monthly' : '1-month trial'} · ${money(s.order.due, 'usd')}${s.order.mode === 'monthly' ? '/mo' : ''}</div>${s.order.lines.map(l => `<div class="sub-order-line"><span><b>${esc(l.name)}</b> ${esc(l.detail)}${l.addons.length ? ' · ' + esc(l.addons.join(', ')) : ''}</span><span>${money(l.price, 'usd')}</span></div>`).join('')}</div>` : ''}${s.services ? `<div style="margin-bottom:12px"><div class="submission-field-label">Services</div><div class="submission-field-val">${s.services.map(x => `<span class="tier-badge tier-growth" style="margin:4px 6px 0 0">${esc(x)}</span>`).join('')}</div></div>` : ''}<div><div class="submission-field-label">Message</div><div class="submission-field-val" style="white-space:pre-wrap">${esc(s.message)}</div></div>`}
      <div class="submission-actions">
        <a class="btn-accept" href="mailto:${esc(s.email)}?subject=${encodeURIComponent('RTG · ' + (isCall ? 'Your call ' + s.callSlot : who))}" style="text-decoration:none;display:inline-flex;align-items:center">Reply</a>
        <button class="btn-accept" onclick="acceptSubmission('${s.id}')">${isCall ? 'Move to Leads' : 'Accept as client'}</button>
        <button class="btn-ghost" onclick="archiveSub('${s.id}')">Archive</button>
      </div>
    </div>`;
  }).join('');
}

function acceptSubmission(id) {
  const idx = submissions.findIndex(s => s.id === id);
  if (idx < 0) return;
  const s = submissions[idx];
  if (s.type === 'project') {
    clientDatabase.unshift({
      id: 'c' + Date.now(),
      businessName: s.businessName, fullName: s.fullName || s.businessName, email: s.email, phone: '',
      niche: s.order ? s.order.lines.map(l => l.name).join(', ') : '', location: '', plan: (s.order && s.order.plan) || 'foundation', mrr: s.order ? s.order.monthly : 0,
      status: 'onboarding', billing: s.billing || 'Monthly', startDate: new Date().toISOString().slice(0, 10),
      audience: '', goals: s.message || '', keywords: '', differentiator: '',
      notes: 'Accepted from Work with us.'
    });
    updateSidebarMRR();
  } else {
    leads.unshift({
      id: 'l' + Date.now(), name: s.fullName || s.businessName, business: s.businessName || s.fullName,
      email: s.email, niche: s.type === 'call' ? (topicNames[s.topic] || 'Call request') : (s.services || []).join(', '), location: '',
      interest: s.type === 'call' ? (s.topic === 'training' ? 'Training' : 'Call') : 'Ads', stage: s.type === 'call' ? 'demo_scheduled' : 'discovery_call',
      added: new Date().toISOString().slice(0, 10)
    });
  }
  submissions.splice(idx, 1);
  saveSubmissions();
  showToast(`${s.businessName || s.fullName} ${s.type === 'project' ? 'added to Clients' : 'moved to Leads'}`);
  updateSubmissionBadge();
  renderSection('submissions');
}
function archiveSub(id) {
  const idx = submissions.findIndex(s => s.id === id);
  if (idx < 0) return;
  submissions.splice(idx, 1);
  saveSubmissions();
  updateSubmissionBadge();
  renderSection('submissions');
  showToast('Archived');
}

// Reviews moderation
function renderReviewsModeration(view) {
  if (pendingReviews.length === 0 && approvedReviews.length === 0) {
    view.innerHTML = `<div class="metric-card" style="text-align: center; padding: 60px;">
      <div style="font-family: 'Google Sans', sans-serif; font-size: 24px; color: var(--white-90);">No reviews yet</div>
    </div>`;
    return;
  }
  const pendingHTML = pendingReviews.length ? `
    <div style="font-family: 'Geist', sans-serif; font-size: 10px; letter-spacing: 2px; color: var(--white-40); text-transform: uppercase; margin-bottom: 14px;">Pending · ${pendingReviews.length}</div>
    ${pendingReviews.map(r => `
      <div class="submission-card">
        <div class="submission-head">
          <div>
            <div class="submission-biz">${r.name}</div>
            <div class="submission-meta">${r.biz} · ${r.role}</div>
          </div>
          <div class="submission-meta">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div>
        </div>
        <div style="font-family: 'Google Sans', sans-serif; font-style: italic; font-size: 16px; color: var(--white-90); line-height: 1.6; margin: 12px 0;">"${r.quote}"</div>
        <div class="submission-actions">
          <button class="btn-accept" onclick="approveReview('${r.id}')">Approve & Publish</button>
          <button class="btn-ghost" onclick="rejectReview('${r.id}')">Reject</button>
        </div>
      </div>
    `).join('')}
    <div style="height: 24px;"></div>
  ` : '';
  const approvedHTML = approvedReviews.length ? `
    <div style="font-family: 'Geist', sans-serif; font-size: 10px; letter-spacing: 2px; color: var(--white-40); text-transform: uppercase; margin-bottom: 14px;">Live on site · ${approvedReviews.length}</div>
    ${approvedReviews.map(r => `
      <div class="submission-card" style="border-left-color: var(--success);">
        <div class="submission-head">
          <div>
            <div class="submission-biz">${r.name}</div>
            <div class="submission-meta">${r.biz} · ${r.role}</div>
          </div>
          <div class="submission-meta">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div>
        </div>
        <div style="font-family: 'Google Sans', sans-serif; font-style: italic; font-size: 16px; color: var(--white-90); line-height: 1.6; margin: 12px 0;">"${r.quote}"</div>
        <div class="submission-actions">
          <button class="btn-ghost" onclick="unpublishReview('${r.id}')">Remove from site</button>
        </div>
      </div>
    `).join('')}
  ` : '';
  view.innerHTML = pendingHTML + approvedHTML;
}

function approveReview(id) {
  const idx = pendingReviews.findIndex(r => r.id === id);
  if (idx < 0) return;
  const r = pendingReviews[idx];
  approvedReviews.unshift(r);
  pendingReviews.splice(idx, 1);
  updateReviewBadge();
  renderReviews();
  renderSection('reviews');
  showToast('Review published');
}
function rejectReview(id) {
  const idx = pendingReviews.findIndex(r => r.id === id);
  if (idx < 0) return;
  pendingReviews.splice(idx, 1);
  updateReviewBadge();
  renderSection('reviews');
  showToast('Review rejected');
}
function unpublishReview(id) {
  const idx = approvedReviews.findIndex(r => r.id === id);
  if (idx < 0) return;
  approvedReviews.splice(idx, 1);
  renderReviews();
  renderSection('reviews');
  showToast('Review unpublished');
}

// Client detail panel
function openClientDetail(id) {
  const c = clientDatabase.find(x => x.id === id);
  if (!c) return;
  document.getElementById('clientPanelBody').innerHTML = `
    <div style="margin-top: 10px;">
      <span class="tier-badge tier-${c.plan}">${c.plan}</span>
      <span class="status-dot status-${c.status}" style="margin-left: 10px;">${c.status}</span>
    </div>
    <div class="client-panel-name">${c.businessName}</div>
    <div class="client-panel-meta">${c.niche.toUpperCase()} · ${c.location.toUpperCase()}</div>
    <div class="detail-row"><div class="detail-key">Owner</div><div class="detail-val">${c.fullName}</div></div>
    <div class="detail-row"><div class="detail-key">Email</div><div class="detail-val">${c.email}</div></div>
    <div class="detail-row"><div class="detail-key">Phone</div><div class="detail-val">${c.phone}</div></div>
    <div class="detail-row"><div class="detail-key">MRR</div><div class="detail-val" style="font-family: 'Geist', sans-serif;">$${c.mrr}/mo</div></div>
    <div class="detail-row"><div class="detail-key">Billing</div><div class="detail-val">${c.billing}</div></div>
    <div class="detail-row"><div class="detail-key">Start Date</div><div class="detail-val">${c.startDate}</div></div>
    <div class="detail-row"><div class="detail-key">Audience</div><div class="detail-val">${c.audience}</div></div>
    <div class="detail-row"><div class="detail-key">Goals</div><div class="detail-val">${c.goals}</div></div>
    <div class="detail-row"><div class="detail-key">Keywords</div><div class="detail-val">${c.keywords}</div></div>
    <div class="detail-row"><div class="detail-key">Differentiator</div><div class="detail-val">${c.differentiator}</div></div>
    <div style="margin-top: 20px;">
      <div class="detail-key" style="margin-bottom: 8px;">Internal Notes</div>
      <textarea class="form-textarea" id="panelNotes">${c.notes}</textarea>
      <button class="btn-primary" style="margin-top: 12px; width: 100%; font-size: 13px; padding: 11px;" onclick="saveClientNotes('${c.id}')">Save Notes</button>
    </div>
    <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--white-06);">
      <div class="detail-key" style="margin-bottom: 10px;">Review Invite Link</div>
      <div style="display: flex; gap: 8px; align-items: center;">
        <input class="form-input" readonly id="reviewLinkInput" value="${RTG_CONFIG.siteUrl()}?review=rtg_${c.id}#reviews" style="font-size: 11px; font-family: 'Geist', sans-serif; color: var(--white-60);" />
        <button class="btn-ghost" onclick="copyReviewLink()" style="padding: 12px 18px; white-space: nowrap;">Copy</button>
      </div>
      <div style="font-family: 'Geist', sans-serif; font-size: 11px; color: var(--white-30); margin-top: 8px; line-height: 1.5;">Send this to ${c.fullName.split(' ')[0]} over WhatsApp or email. It pre-fills their verification.</div>
    </div>
  `;
  document.getElementById('panelOverlay').classList.add('show');
  document.getElementById('clientPanel').classList.add('show');
}
function closeClientDetail() {
  document.getElementById('panelOverlay').classList.remove('show');
  document.getElementById('clientPanel').classList.remove('show');
}
function saveClientNotes(id) {
  const c = clientDatabase.find(x => x.id === id);
  if (!c) return;
  c.notes = document.getElementById('panelNotes').value;
  showToast('Notes saved');
  closeClientDetail();
}
function copyReviewLink() {
  const input = document.getElementById('reviewLinkInput');
  input.select();
  try {
    navigator.clipboard.writeText(input.value);
    showToast('Review link copied');
  } catch (e) {
    document.execCommand('copy');
    showToast('Review link copied');
  }
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

function animateCounters(container) {
  container.querySelectorAll('[data-count]').forEach(el => {
    const target = parseFloat(el.getAttribute('data-count'));
    const isMoney = el.textContent.includes('$');
    const duration = 700;
    const start = performance.now();
    function tick(now) {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = Math.round(target * eased);
      el.textContent = (isMoney ? '$' : '') + v.toLocaleString();
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

// ==================== INIT ====================
(function(fn){ if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); })(() => {
  initGrain();
  initGlobe();
  initScrollAnimations();
  initReviewStars();
  renderReviews();
  loadSubmissions();
  updateSubmissionBadge();
  applyContactConfig();
  initBookingBadge();
  initRotatingWord();
  renderWork();
  renderFAQ();
  renderTeam();
  renderPricing();
  (function(){ const h = document.getElementById('heroGlobeImg'), c = document.getElementById('ctaGlobeImg'); if (h && c) c.src = h.src; })();
  renderSvcs();
  initPricingCard();
  syncPlanNote();
  initSectionSpy();
  renderTestimonial(0);
  restartQuotes();
  window.addEventListener('scroll', handleNavScroll);
  // Close review modal with escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (document.getElementById('wwOverlay').classList.contains('show')) closeWW();
      if (document.getElementById('reviewModalOverlay').classList.contains('show')) closeReviewModal();
      if (document.getElementById('clientPanel').classList.contains('show')) closeClientDetail();
    }
  });
});


// ==================== COUNT-UP ON SCROLL ====================
function countUpIn(root) {
  root.querySelectorAll('.gl-work-stats strong, .mock-stats strong, .proof-value, .result-value').forEach(el => {
    const finalText = el.textContent.trim();
    const m = finalText.match(/^([^\d]*)([\d,]*\.?\d+)(.*)$/);
    if (!m) return; // e.g. "new"
    const [, pre, numStr, post] = m;
    const target = parseFloat(numStr.replace(/,/g, ''));
    const decimals = (numStr.split('.')[1] || '').length;
    const commas = numStr.includes(',');
    const fmt = v => {
      const s = v.toFixed(decimals);
      return pre + (commas ? Number(s).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) : s) + post;
    };
    let raf = 0;
    el.textContent = fmt(0);
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        cancelAnimationFrame(raf);
        if (!entry.isIntersecting) { el.textContent = fmt(0); return; }
        const start = performance.now(), dur = 1400;
        const tick = now => {
          const t = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = t >= 1 ? finalText : fmt(target * eased);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      });
    }, { threshold: 0.4 });
    io.observe(el);
  });
}
countUpIn(document.querySelector(".results-stats") || document.createElement("div"));

// ==================== THE SYSTEM: hover accordion ====================
function initSysAcc() {
  const root = document.getElementById('sysAcc');
  if (!root || root._ready) return;
  root._ready = true;
  const panels = [...root.querySelectorAll('.sys-panel')];
  const open = p => panels.forEach(x => {
    const on = x === p;
    x.classList.toggle('open', on);
    x.setAttribute('aria-expanded', on ? 'true' : 'false');
  });
  panels.forEach(p => {
    p.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') open(p); });
    p.addEventListener('click', () => open(p));
    p.addEventListener('focus', () => open(p));
  });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initSysAcc); else initSysAcc();
