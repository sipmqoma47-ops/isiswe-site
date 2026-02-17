/**
 * Isizwe Printing Services — app.js
 * Pure vanilla JS single-page app with hash-based router.
 * No dependencies, no frameworks.
 */

/* ======================================================
   DATA — SERVICE CATEGORIES (extracted from PDF page 2)
   ====================================================== */
const WA_NUMBER = '27730708651';
const WA_BASE   = `https://wa.me/${WA_NUMBER}`;
const WA_QUOTE  = `${WA_BASE}?text=Hello%20Isizwe%20Printing%2C%20I%27d%20like%20a%20quote%20for%3A%20`;
const WA_CONTACT = `${WA_BASE}?text=Hello%20Isizwe%20Printing%20Services%2C%20I%27d%20like%20to%20get%20in%20touch.`;

const CATEGORIES = [
  {
    id: 'medical-stationery',
    label: 'Medical Stationery',
    icon: '🏥',
    description: 'Professional stationery and printing solutions tailored for medical practitioners, clinics, and healthcare facilities.',
    products: [
      { name: 'Prescription Pads', icon: '📋' },
      { name: 'Patient Referral Forms', icon: '📄' },
      { name: 'Sick Note Books', icon: '📒' },
      { name: 'Medical Record Files', icon: '🗂️' },
      { name: 'Lab Request Forms', icon: '🔬' },
      { name: 'Consent Forms', icon: '✍️' },
      { name: 'Appointment Cards', icon: '📅' },
      { name: 'Patient Feedback Forms', icon: '📝' },
    ],
  },
  {
    id: 'ncr-books',
    label: 'NCR Books',
    icon: '📚',
    description: 'High-quality no-carbon-required duplicate and triplicate books for business record-keeping and invoicing.',
    products: [
      { name: 'Invoice Books (Duplicate)', icon: '🧾' },
      { name: 'Invoice Books (Triplicate)', icon: '🧾' },
      { name: 'Receipt Books', icon: '🗒️' },
      { name: 'Order Books', icon: '📋' },
      { name: 'Delivery Note Books', icon: '📦' },
      { name: 'Quote Books', icon: '💬' },
      { name: 'Job Card Books', icon: '🔧' },
      { name: 'Petty Cash Books', icon: '💵' },
    ],
  },
  {
    id: 'marketing',
    label: 'Marketing',
    icon: '📣',
    description: 'Powerful marketing materials to grow your brand, attract customers, and communicate your message effectively.',
    products: [
      { name: 'Business Cards', icon: '💳' },
      { name: 'Flyers & Pamphlets', icon: '📰' },
      { name: 'Brochures', icon: '📖' },
      { name: 'Posters', icon: '🖼️' },
      { name: 'Letterheads', icon: '📝' },
      { name: 'Compliment Slips', icon: '✉️' },
      { name: 'Banners & Roll-ups', icon: '🚩' },
      { name: 'Promotional Stickers', icon: '🏷️' },
    ],
  },
  {
    id: 'general',
    label: 'General',
    icon: '🖨️',
    description: 'Everyday printing and stationery solutions for offices, individuals, and general business needs.',
    products: [
      { name: 'Printed Envelopes', icon: '✉️' },
      { name: 'Letterheads', icon: '📄' },
      { name: 'With Compliments Slips', icon: '📝' },
      { name: 'Notepads', icon: '🗒️' },
      { name: 'Calendars', icon: '📅' },
      { name: 'Diaries', icon: '📔' },
      { name: 'Stickers & Labels', icon: '🏷️' },
      { name: 'ID Card Printing', icon: '🪪' },
    ],
  },
  {
    id: 'schools-churches',
    label: 'Schools & Churches',
    icon: '🏫',
    description: 'Tailored printing for educational institutions and faith-based organisations — from registers to bulletins.',
    products: [
      { name: 'School Registers', icon: '📒' },
      { name: 'Report Cards', icon: '📊' },
      { name: 'Admission Forms', icon: '📋' },
      { name: 'Permission Slips', icon: '✅' },
      { name: 'Church Programmes', icon: '⛪' },
      { name: 'Church Bulletins', icon: '📰' },
      { name: 'Offering Envelopes', icon: '💌' },
      { name: 'Certificate Printing', icon: '🎓' },
    ],
  },
  {
    id: 'security-stationery',
    label: 'Security Stationery',
    icon: '🔐',
    description: 'Secure, tamper-evident stationery and documents designed to protect your business from fraud and forgery.',
    products: [
      { name: 'Numbered Tickets', icon: '🎫' },
      { name: 'Controlled Documents', icon: '🗃️' },
      { name: 'Serialised Vouchers', icon: '🔢' },
      { name: 'Tamper-Evident Labels', icon: '🔒' },
      { name: 'Security Seals', icon: '🛡️' },
      { name: 'Holographic Stickers', icon: '✨' },
      { name: 'Watermark Certificates', icon: '📜' },
      { name: 'Access Control Cards', icon: '🪪' },
    ],
  },
  {
    id: 'funeral-homes',
    label: 'Funeral Homes',
    icon: '🕊️',
    description: 'Dignified, compassionate stationery for funeral parlours and memorial services — designed with care.',
    products: [
      { name: 'Funeral Programmes', icon: '📖' },
      { name: 'Memorial Cards', icon: '💐' },
      { name: 'Order of Service Booklets', icon: '📋' },
      { name: 'Condolence Cards', icon: '🕯️' },
      { name: 'Funeral Register Books', icon: '📒' },
      { name: 'Death Notices', icon: '📰' },
      { name: 'Hearse Door Flowers Cards', icon: '🌹' },
      { name: 'Thank You Cards', icon: '💌' },
    ],
  },
  {
    id: 'events',
    label: 'Events',
    icon: '🎉',
    description: 'Everything you need to run your event smoothly — from entry management to wristband identification.',
    products: [
      { name: 'Wristbands', icon: '🎗️' },
      { name: 'Event Tickets', icon: '🎫' },
      { name: 'Event Programmes', icon: '📋' },
      { name: 'Banners', icon: '🚩' },
      { name: 'Name Badges', icon: '🪪' },
      { name: 'Table Cards', icon: '🃏' },
    ],
  },
];

/* Gallery items (placeholder-based, one per product per category) */
const GALLERY_ITEMS = CATEGORIES.flatMap(cat =>
  cat.products.slice(0, 3).map((p, i) => ({
    id: `${cat.id}-${i}`,
    categoryId: cat.id,
    categoryLabel: cat.label,
    name: p.name,
    icon: p.icon,
  }))
);

/* ======================================================
   UTILITY HELPERS
   ====================================================== */
const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);
const root = () => $('#app-root');
const waQuoteUrl = (item) => `${WA_QUOTE}${encodeURIComponent(item)}`;

function setPageTitle(sub) {
  document.title = sub ? `${sub} – Isizwe Printing Services` : 'Isizwe Printing Services';
}

function updateActiveNav(route) {
  $$('.nav-link, .mobile-nav-link').forEach(el => {
    const r = el.dataset.route || '';
    el.classList.toggle('active', r === route || (route === '' && r === 'home'));
  });
}

function renderPage(html) {
  const el = root();
  el.innerHTML = html;
  el.querySelector('.page-enter') || el.firstElementChild?.classList.add('page-enter');
  // Foot year
  const yr = $('#footer-year');
  if (yr) yr.textContent = new Date().getFullYear();
}

function wa_icon(size = 18) {
  return `<svg viewBox="0 0 24 24" fill="currentColor" width="${size}" height="${size}" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12.004 2.003C6.476 2.003 2 6.478 2 12.007c0 1.771.462 3.435 1.268 4.885L2 22l5.274-1.381A9.956 9.956 0 0012.004 22c5.527 0 9.996-4.478 9.996-9.993 0-5.517-4.469-10.004-9.996-10.004zm0 18.174a8.155 8.155 0 01-4.16-1.14l-.298-.177-3.13.82.835-3.046-.194-.314A8.167 8.167 0 013.828 12c0-4.508 3.668-8.174 8.177-8.174 4.508 0 8.173 3.666 8.173 8.174 0 4.508-3.665 8.177-8.174 8.177z"/>
  </svg>`;
}

/* ======================================================
   PAGE RENDERS
   ====================================================== */

/* ---- HOME PAGE ---- */
function renderHome() {
  setPageTitle(null);
  updateActiveNav('home');

  const firstCat = CATEGORIES[0];

  const categoryItems = CATEGORIES.map(cat => `
    <div class="category-item${cat.id === firstCat.id ? ' active' : ''}"
         data-cat="${cat.id}"
         role="button"
         tabindex="0"
         aria-label="View ${cat.label}">
      <span class="category-icon">${cat.icon}</span>
      <span class="category-label">${cat.label}</span>
      <span class="category-count">${cat.products.length}</span>
    </div>
  `).join('') + `
    <div class="category-item category-item-gallery"
         data-cat="gallery"
         role="button"
         tabindex="0"
         aria-label="View Gallery">
      <span class="category-icon">🖼️</span>
      <span class="category-label">Gallery</span>
      <span class="category-count">${GALLERY_ITEMS.length}</span>
    </div>
  `;

  const html = `
    <div class="page-enter">
      <!-- HERO -->
      <section class="hero" aria-label="Hero banner">
        <div class="hero-inner">
          <div class="hero-badge">Kwa-Thema's Trusted Print Partner</div>
          <h1 class="hero-title">
            Premium Printing <span class="accent">Built for Your Business</span>
          </h1>
          <p class="hero-sub">
            From medical stationery and NCR books to event wristbands and security printing —
            we bring your vision to life with precision and care.
          </p>
          <div class="hero-actions">
            <a href="${WA_CONTACT}" target="_blank" rel="noopener" class="btn btn-wa">
              ${wa_icon(18)} WhatsApp for a Quote
            </a>
            <a href="#about" class="btn btn-outline">About Us</a>
          </div>
        </div>
      </section>

      <!-- SERVICES -->
      <section class="home-services-section" aria-label="Our services">
        <h2 class="section-heading">Our Services</h2>
        <p class="section-subheading">Select a category to explore our full range of printing solutions.</p>

        <div class="services-layout">
          <!-- Category sidebar / tabs -->
          <aside class="category-sidebar" aria-label="Service categories" id="cat-sidebar">
            ${categoryItems}
          </aside>

          <!-- Detail panel -->
          <div class="detail-panel" id="detail-panel" aria-live="polite" aria-atomic="true">
            ${buildDetailPanel(firstCat)}
          </div>
        </div>
      </section>
    </div>
  `;

  renderPage(html);
  attachHomeListeners();
}

function buildDetailPanel(cat) {
  const products = cat.products.map(p => `
    <div class="product-card">
      <span class="product-icon" aria-hidden="true">${p.icon}</span>
      <span class="product-name">${p.name}</span>
    </div>
  `).join('');

  return `
    <div class="category-detail" id="cat-detail-${cat.id}">
      <div class="detail-header">
        <div>
          <div class="detail-icon" aria-hidden="true">${cat.icon}</div>
          <h3 class="detail-title">${cat.label}</h3>
          <p class="detail-desc">${cat.description}</p>
        </div>
        <a href="#category/${cat.id}" class="btn btn-outline" style="white-space:nowrap; flex-shrink:0; align-self:flex-start;">
          View All →
        </a>
      </div>
      <div class="products-grid" role="list" aria-label="${cat.label} products">
        ${products}
      </div>
      <div class="detail-cta-bar">
        <a href="${waQuoteUrl(cat.label)}" target="_blank" rel="noopener"
           class="wa-quote-pill" aria-label="WhatsApp for a quote on ${cat.label}">
          ${wa_icon(18)} WhatsApp for a quote
        </a>
        <a href="#category/${cat.id}" class="btn btn-outline" style="font-size:0.85rem; padding:8px 16px;">
          See full ${cat.label} range
        </a>
      </div>
    </div>
  `;
}

function buildGalleryMiniPanel() {
  const preview = GALLERY_ITEMS.slice(0, 6);
  const items = preview.map(item => `
    <div class="product-card" aria-label="${item.name}">
      <span class="product-icon" aria-hidden="true">${item.icon}</span>
      <span class="product-name">${item.name}</span>
      <span style="font-size:0.72rem; color:var(--text-muted);">${item.categoryLabel}</span>
    </div>
  `).join('');

  return `
    <div class="category-detail" id="cat-detail-gallery">
      <div class="detail-header">
        <div>
          <div class="detail-icon" aria-hidden="true">🖼️</div>
          <h3 class="detail-title">Gallery</h3>
          <p class="detail-desc">Browse samples of our printed work across all categories. Filter by category to find inspiration.</p>
        </div>
        <a href="#gallery" class="btn btn-outline" style="white-space:nowrap; flex-shrink:0; align-self:flex-start;">
          Open Gallery →
        </a>
      </div>
      <div class="products-grid" role="list" aria-label="Gallery preview">
        ${items}
      </div>
      <div class="detail-cta-bar">
        <a href="#gallery" class="btn btn-primary">Browse Full Gallery</a>
        <a href="${WA_CONTACT}" target="_blank" rel="noopener" class="wa-quote-pill">
          ${wa_icon(18)} Chat with us
        </a>
      </div>
    </div>
  `;
}

function attachHomeListeners() {
  const sidebar = $('#cat-sidebar');
  const panel   = $('#detail-panel');
  if (!sidebar || !panel) return;

  sidebar.addEventListener('click', e => {
    const item = e.target.closest('.category-item');
    if (!item) return;

    const catId = item.dataset.cat;

    // Update active state
    $$('.category-item').forEach(el => el.classList.remove('active'));
    item.classList.add('active');

    // Navigate to gallery page or render detail
    if (catId === 'gallery') {
      window.location.hash = '#gallery';
      return;
    }

    const cat = CATEGORIES.find(c => c.id === catId);
    if (!cat) return;

    panel.innerHTML = buildDetailPanel(cat);
  });

  // Keyboard navigation for sidebar items
  sidebar.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.target.click();
    }
  });
}

/* ---- ABOUT PAGE ---- */
function renderAbout() {
  setPageTitle('About Us');
  updateActiveNav('about');

  const html = `
    <div class="page-container page-enter">
      <div class="page-hero">
        <span class="page-label">Who We Are</span>
        <h1 class="page-title">Printing with Purpose</h1>
        <p class="page-intro">
          Isizwe Printing Services is a proudly South African printing business delivering
          high-quality print solutions to individuals, businesses, healthcare providers,
          schools, and more — based in Kwa-Thema.
        </p>
      </div>

      <div class="about-cards">
        <div class="info-card">
          <div class="info-card-icon">📍</div>
          <div class="info-card-label">Address</div>
          <div class="info-card-value">15695 Mohalbi Street, Riverside, Kwa-Thema</div>
        </div>
        <div class="info-card">
          <div class="info-card-icon">📅</div>
          <div class="info-card-label">Visits</div>
          <div class="info-card-value">By appointment only</div>
        </div>
        <div class="info-card">
          <div class="info-card-icon">💬</div>
          <div class="info-card-label">WhatsApp</div>
          <div class="info-card-value">
            <a href="${WA_CONTACT}" target="_blank" rel="noopener" aria-label="Open WhatsApp">073 070 8651</a>
          </div>
        </div>
      </div>

      <div class="about-body">
        <h3>Our Story</h3>
        <p>
          At Isizwe Printing Services, we believe that every printed document tells a story —
          whether it's a prescription pad in a doctor's hands, an invoice book tracking a
          growing business, or a wristband at a community event. We take pride in delivering
          professional-grade print products with attention to detail and a personal touch.
        </p>
        <p>
          We serve a wide range of clients across Kwa-Thema and the surrounding areas —
          from medical professionals and funeral homes to schools, churches, and event
          organisers. Our commitment is to quality, consistency, and quick turnaround so
          your business never skips a beat.
        </p>
        <h3>Why Choose Us?</h3>
        <p>
          We offer a comprehensive catalogue covering NCR books, medical stationery,
          marketing materials, security printing, and event supplies. Every order is handled
          with care, and we're just a WhatsApp message away for quotes and queries.
          Visit us by appointment and experience the Isizwe difference.
        </p>
      </div>

      <div style="display:flex; gap:12px; flex-wrap:wrap;">
        <a href="${WA_CONTACT}" target="_blank" rel="noopener" class="btn btn-wa">
          ${wa_icon(18)} WhatsApp Us
        </a>
        <a href="#home" class="btn btn-outline">View Our Services</a>
      </div>
    </div>
  `;

  renderPage(html);
}

/* ---- CONTACT PAGE ---- */
function renderContact() {
  setPageTitle('Contact Us');
  updateActiveNav('contact');

  const html = `
    <div class="page-container page-enter">
      <div class="page-hero contact-hero">
        <span class="page-label">Get in Touch</span>
        <h1 class="page-title">We're a Message Away</h1>
        <p class="page-intro" style="margin: 0 auto; text-align:center;">
          The quickest way to reach us is via WhatsApp. We'll respond promptly with pricing,
          turnaround times, and any help you need.
        </p>
      </div>

      <div class="wa-main-cta-card">
        <h3>${wa_icon(24)} Chat with Isizwe Printing</h3>
        <p>Click below to open WhatsApp and start a conversation directly with us.</p>
        <a href="${WA_CONTACT}"
           target="_blank"
           rel="noopener"
           class="wa-big-btn"
           aria-label="Open WhatsApp to contact Isizwe Printing Services">
          ${wa_icon(22)} Open WhatsApp — 073 070 8651
        </a>
      </div>

      <div class="contact-grid">
        <div class="contact-card">
          <div class="contact-card-icon">📍</div>
          <div class="contact-card-label">Physical Address</div>
          <div class="contact-card-value">15695 Mohalbi Street<br>Riverside, Kwa-Thema</div>
        </div>
        <div class="contact-card">
          <div class="contact-card-icon">📅</div>
          <div class="contact-card-label">Availability</div>
          <div class="contact-card-value">Visit by appointment only</div>
        </div>
        <div class="contact-card">
          <div class="contact-card-icon">💬</div>
          <div class="contact-card-label">WhatsApp Number</div>
          <div class="contact-card-value">
            <a href="${WA_CONTACT}" target="_blank" rel="noopener"
               style="color: var(--teal); font-weight:700;">073 070 8651</a>
          </div>
        </div>
      </div>

      <p style="text-align:center; color:var(--text-muted); font-size:0.85rem; margin-top:8px;">
        Please WhatsApp us before visiting to ensure we are available to assist you.
      </p>
    </div>
  `;

  renderPage(html);
}

/* ---- GALLERY PAGE ---- */
function renderGallery(activeFilter = 'all') {
  setPageTitle('Gallery');
  updateActiveNav('gallery');

  const filters = [
    { id: 'all', label: 'All' },
    ...CATEGORIES.map(c => ({ id: c.id, label: c.label })),
  ];

  const filterBtns = filters.map(f => `
    <button class="filter-btn${f.id === activeFilter ? ' active' : ''}"
            data-filter="${f.id}"
            aria-pressed="${f.id === activeFilter}">
      ${f.id === 'all' ? '🖼️ All' : CATEGORIES.find(c => c.id === f.id)?.icon + ' ' + f.label}
    </button>
  `).join('');

  const visible = activeFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(g => g.categoryId === activeFilter);

  const gridItems = visible.length
    ? visible.map(item => `
        <article class="gallery-item" aria-label="${item.name} – ${item.categoryLabel}">
          <div class="gallery-img-wrap">
            <div class="gallery-placeholder" aria-hidden="true">
              <span class="gallery-placeholder-icon">${item.icon}</span>
              <span class="gallery-placeholder-text">Sample: ${item.name}</span>
            </div>
          </div>
          <div class="gallery-item-info">
            <div class="gallery-item-name">${item.name}</div>
            <div class="gallery-item-cat">${item.categoryLabel}</div>
          </div>
        </article>
      `).join('')
    : `<div class="gallery-empty">
         <div>No items found for this category.</div>
       </div>`;

  const html = `
    <div class="gallery-container page-enter">
      <div class="page-hero">
        <span class="page-label">Our Work</span>
        <h1 class="page-title">Gallery</h1>
        <p class="page-intro">Browse samples of our printed work. Use the filters to explore by category.</p>
      </div>

      <div class="gallery-filters" role="group" aria-label="Filter gallery by category" id="gallery-filters">
        ${filterBtns}
      </div>

      <div class="gallery-grid" id="gallery-grid" aria-live="polite">
        ${gridItems}
      </div>

      <div style="text-align:center; margin-top:48px;">
        <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:16px;">
          Like what you see? Let's bring your print project to life.
        </p>
        <a href="${WA_CONTACT}" target="_blank" rel="noopener" class="btn btn-wa">
          ${wa_icon(18)} WhatsApp for a Quote
        </a>
      </div>
    </div>
  `;

  renderPage(html);
  attachGalleryListeners();
}

function attachGalleryListeners() {
  const filtersEl = $('#gallery-filters');
  const gridEl    = $('#gallery-grid');
  if (!filtersEl || !gridEl) return;

  filtersEl.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    const filter = btn.dataset.filter;

    // Update buttons
    $$('.filter-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.filter === filter);
      b.setAttribute('aria-pressed', b.dataset.filter === filter ? 'true' : 'false');
    });

    // Re-render grid
    const visible = filter === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter(g => g.categoryId === filter);

    if (visible.length) {
      gridEl.innerHTML = visible.map(item => `
        <article class="gallery-item" aria-label="${item.name} – ${item.categoryLabel}">
          <div class="gallery-img-wrap">
            <div class="gallery-placeholder" aria-hidden="true">
              <span class="gallery-placeholder-icon">${item.icon}</span>
              <span class="gallery-placeholder-text">Sample: ${item.name}</span>
            </div>
          </div>
          <div class="gallery-item-info">
            <div class="gallery-item-name">${item.name}</div>
            <div class="gallery-item-cat">${item.categoryLabel}</div>
          </div>
        </article>
      `).join('');
    } else {
      gridEl.innerHTML = `<div class="gallery-empty">No items found for this category.</div>`;
    }
  });
}

/* ---- CATEGORY DETAIL PAGE (full) ---- */
function renderCategory(catId) {
  const cat = CATEGORIES.find(c => c.id === catId);
  if (!cat) {
    render404();
    return;
  }

  setPageTitle(cat.label);
  updateActiveNav('');

  const products = cat.products.map(p => `
    <div class="cat-product-card">
      <span class="cat-product-icon" aria-hidden="true">${p.icon}</span>
      <span class="cat-product-name">${p.name}</span>
      <span class="cat-product-badge">Available</span>
    </div>
  `).join('');

  const otherCats = CATEGORIES
    .filter(c => c.id !== cat.id)
    .slice(0, 3)
    .map(c => `
      <a href="#category/${c.id}" class="btn btn-outline" style="font-size:0.82rem; padding:8px 14px;">
        ${c.icon} ${c.label}
      </a>
    `).join('');

  const html = `
    <div class="category-page page-enter">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="#home">Home</a>
        <span class="breadcrumb-sep" aria-hidden="true">›</span>
        <span>${cat.label}</span>
      </nav>

      <div class="cat-page-header">
        <div class="cat-page-icon" aria-hidden="true">${cat.icon}</div>
        <h1 class="cat-page-title">${cat.label}</h1>
        <p class="cat-page-desc">${cat.description}</p>
      </div>

      <div class="cat-products-grid" role="list" aria-label="${cat.label} products">
        ${products}
      </div>

      <!-- CTA Banner -->
      <div class="cat-cta-banner">
        <div>
          <h3>Ready to order ${cat.label}?</h3>
          <p>Contact us on WhatsApp for a quick quote and fast turnaround.</p>
        </div>
        <div class="cat-cta-actions">
          <a href="${waQuoteUrl(cat.label)}"
             target="_blank"
             rel="noopener"
             class="btn btn-wa"
             aria-label="WhatsApp for a quote on ${cat.label}">
            ${wa_icon(18)} WhatsApp for a Quote
          </a>
          <a href="#home" class="btn btn-outline">← Back to Services</a>
        </div>
      </div>

      <!-- Other categories -->
      <div style="margin-top: 48px;">
        <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:12px; font-weight:600; text-transform:uppercase; letter-spacing:0.08em;">
          Explore other categories
        </p>
        <div style="display:flex; flex-wrap:wrap; gap:10px;">
          ${otherCats}
          <a href="#home" class="btn btn-outline" style="font-size:0.82rem; padding:8px 14px;">
            View all services →
          </a>
        </div>
      </div>
    </div>
  `;

  renderPage(html);
}

/* ---- 404 PAGE ---- */
function render404() {
  setPageTitle('Page Not Found');
  updateActiveNav('');
  renderPage(`
    <div class="page-container page-enter" style="text-align:center; padding-top:80px;">
      <div style="font-size:4rem; margin-bottom:16px;">🖨️</div>
      <h1 class="page-title">Page Not Found</h1>
      <p class="page-intro" style="margin:0 auto 32px; text-align:center;">
        Looks like this page got lost in the print queue. Let's get you back on track.
      </p>
      <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
        <a href="#home" class="btn btn-primary">Back to Home</a>
        <a href="${WA_CONTACT}" target="_blank" rel="noopener" class="btn btn-wa">
          ${wa_icon(18)} WhatsApp Us
        </a>
      </div>
    </div>
  `);
}

/* ======================================================
   ROUTER
   ====================================================== */
function router() {
  const rawHash = window.location.hash || '#home';
  const hash    = rawHash.startsWith('#') ? rawHash.slice(1) : rawHash;

  // Scroll to top on navigation
  window.scrollTo({ top: 0, behavior: 'instant' });

  // Close mobile nav if open
  const mobileNav = $('#mobile-nav');
  const hamburger = $('#hamburger');
  if (mobileNav && hamburger) {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
  }

  if (!hash || hash === 'home') {
    renderHome();
    return;
  }
  if (hash === 'about') {
    renderAbout();
    return;
  }
  if (hash === 'contact') {
    renderContact();
    // Auto-open WhatsApp on contact page (with brief delay for UX)
    setTimeout(() => {
      const autoOpen = document.createElement('a');
      autoOpen.href = WA_CONTACT;
      autoOpen.target = '_blank';
      autoOpen.rel = 'noopener';
      // Only auto-open if user hasn't disabled popups; button is the reliable fallback
      // Uncomment the line below to enable auto-open:
      // autoOpen.click();
    }, 600);
    return;
  }
  if (hash === 'gallery') {
    renderGallery('all');
    return;
  }
  if (hash.startsWith('gallery/')) {
    const filter = hash.slice('gallery/'.length);
    renderGallery(filter);
    return;
  }
  if (hash.startsWith('category/')) {
    const catId = hash.slice('category/'.length);
    renderCategory(catId);
    return;
  }

  render404();
}

/* ======================================================
   HAMBURGER TOGGLE
   ====================================================== */
function initHamburger() {
  const btn = $('#hamburger');
  const nav = $('#mobile-nav');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const isOpen = btn.classList.toggle('open');
    nav.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));
    nav.setAttribute('aria-hidden', String(!isOpen));
  });

  // Close when a mobile nav link is clicked
  nav.addEventListener('click', e => {
    if (e.target.closest('a')) {
      btn.classList.remove('open');
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      nav.setAttribute('aria-hidden', 'true');
    }
  });
}

/* ======================================================
   FOOTER YEAR
   ====================================================== */
function initFooterYear() {
  const el = $('#footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ======================================================
   INIT
   ====================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initHamburger();
  initFooterYear();
  router();
});

window.addEventListener('hashchange', router);
