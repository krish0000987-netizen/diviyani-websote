/* ==========================================================================
   DEVYANI CREATIVE STUDIO — PORTFOLIO & CASE STUDY MODAL SYSTEM
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initPortfolioFilter();
  initCaseStudyModal();
});

// Sample Case Study Dataset
const caseStudiesData = {
  "aurora-luxe": {
    title: "Aurora Haute Parfumerie",
    category: "Brand Identity & Packaging",
    client: "Luxury Fragrance House (Concept Case Study)",
    year: "2026",
    deliverables: "Logo Architecture, Custom Gold Foiling, Packaging Suite, Campaign Art Direction",
    image: "assets/images/portfolio-1.jpg",
    challenge: "Establishing an ultra-luxury sensory brand that stands shoulder-to-shoulder with European fragrance maisons while carrying distinctive artisanal warmth.",
    direction: "Dark obsidian backgrounds with bespoke high-contrast serif typography, precision gold foil accents, and tactile embossed paper stocks.",
    solution: "A bespoke identity system featuring a refined interlocking monogram, custom structural packaging boxes, and a cinematic visual campaign for digital and flagship launch.",
    results: "Complete brand design system delivered with 40+ master asset files, packaging production dies, and brand guideline documentation."
  },
  "nexus-digital": {
    title: "Nexus Global Fintech",
    category: "Digital Creative & Campaigns",
    client: "Next-Gen Financial Platform",
    year: "2026",
    deliverables: "Digital Ad Creatives, Social Video Reels, Interactive Campaign Assets, Motion UI",
    image: "assets/images/portfolio-2.jpg",
    challenge: "Transforming complex financial data tools into intuitive, visually electrifying social campaign assets that drive immediate user action.",
    direction: "High-contrast dark-mode UI graphics paired with glowing gold data streams and clean kinetic typography.",
    solution: "Produced 24 high-converting social campaign variations, 3 motion reveal videos, and cohesive performance marketing creative kits.",
    results: "Designed for seamless multi-platform deployment across Instagram, LinkedIn, and performance advertising networks."
  },
  "zenith-architecture": {
    title: "Zenith Spatial & Design",
    category: "Brand Identity",
    client: "Architectural & Interior Design Studio",
    year: "2025",
    deliverables: "Visual Identity, Editorial Monographs, Digital Guidelines, Studio Stationery",
    image: "assets/images/portfolio-3.jpg",
    challenge: "Designing a minimalist, architectural brand identity that allows structural photographs to lead while maintaining unmistakable branding.",
    direction: "Structural geometric typography, vast negative space, warm ivory backgrounds with deep navy and subtle gold accents.",
    solution: "Developed an identity system inspired by architectural blueprints and modern luxury spatial aesthetics.",
    results: "Comprehensive brand book, bespoke physical presentation folios, and responsive digital identity assets."
  },
  "solaris-lifestyle": {
    title: "Solaris Resort & Spa",
    category: "Campaigns & Content",
    client: "Luxury Hospitality & Wellness Destination",
    year: "2025",
    deliverables: "Visual Campaign, Social Content Suite, Print Brochures, Guest Welcome Kit",
    image: "assets/images/portfolio-4.jpg",
    challenge: "Capturing the serene warmth of high-end wellness hospitality through evocative editorial photography and curated social content.",
    direction: "Sun-drenched editorial color palettes, soft film textures, and timeless editorial serif titles.",
    solution: "Art directed and produced a complete 60-day visual content library, print collateral, and digital promotional kits.",
    results: "Curated aesthetic grid, viral short-form reel concepts, and tactile guest collateral."
  },
  "verve-artisanal": {
    title: "Verve Artisanal Chocolatier",
    category: "Packaging & Graphic Design",
    client: "Craft Gourmet Confectionery",
    year: "2025",
    deliverables: "Custom Packaging Boxes, Foil Wrapping, Brand Storytelling, Retail Banners",
    image: "assets/images/portfolio-5.jpg",
    challenge: "Creating premium giftable packaging that turns an artisanal food product into an opulent luxury experience.",
    direction: "Deep midnight tones paired with intricate botanical gold foil vector illustrations and textured matte paper.",
    solution: "Engineered multi-layered unboxing experiences with custom embossed sleeves and bespoke flavor-story inserts.",
    results: "Ready-to-manufacture packaging die-lines, 3D retail renders, and complete packaging style manuals."
  },
  "lumina-corporate": {
    title: "Lumina Enterprise Group",
    category: "Graphic Design & Branding",
    client: "Global Advisory & Investment Group",
    year: "2025",
    deliverables: "Corporate Brand System, Annual Report Design, Investor Decks, Exhibition Stand",
    image: "assets/images/portfolio-6.jpg",
    challenge: "Modernizing a legacy advisory firm's visual communication to attract forward-thinking technology partners.",
    direction: "Clean editorial layouts, custom data visualization charts, and premium dual-tone color accents.",
    solution: "Crafted executive presentation templates, a 64-page printed corporate monograph, and responsive digital collateral.",
    results: "Standardized enterprise design templates used across international corporate communications."
  },
  "vogue-editorial": {
    title: "Aura Editorial Magazine",
    category: "Content & Graphic Design",
    client: "Contemporary Design Journal",
    year: "2026",
    deliverables: "Publication Layout, Typography Hierarchy, Editorial Covers, Social Teasers",
    image: "assets/images/portfolio-7.jpg",
    challenge: "Creating a collector's edition print magazine that celebrates modern South Asian design and luxury craftsmanship.",
    direction: "Bold large-scale typography, dynamic asymmetric grids, and rich tactile paper curation.",
    solution: "Art-directed layout systems with custom grid hierarchies for long-form interviews and high-fashion photo essays.",
    results: "Published bi-annual print volume and companion digital editorial microsite design."
  },
  "motion-brand-reel": {
    title: "Devyani Motion Showreel",
    category: "Social Media & Video",
    client: "Studio Creative Showcase",
    year: "2026",
    deliverables: "Motion Graphics, Title Sequences, Sound Design Art Direction, Social Cutdowns",
    image: "assets/images/portfolio-8.jpg",
    challenge: "Synthesizing high-craft design and fast-paced motion storytelling for modern social algorithms.",
    direction: "Fluid 3D camera transitions, typography kinetic choreography, and deep audio synchronization.",
    solution: "Produced an energetic 45-second studio showreel and 6 platform-optimized short teasers.",
    results: "High-engagement flagship showcase asset for digital campaigns and portfolio presentations."
  }
};

/* 1. Category Filtering */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.portfolio-card');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const filterValue = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });
}

/* 2. Interactive Case Study Modal */
function initCaseStudyModal() {
  const cards = document.querySelectorAll('.portfolio-card');
  const modal = document.querySelector('#caseStudyModal');
  if (!modal) return;

  const closeBtn = modal.querySelector('.modal-close-btn');
  const modalHeroImg = modal.querySelector('.modal-hero-img');
  const modalCategory = modal.querySelector('.modal-cat-badge');
  const modalTitle = modal.querySelector('.modal-project-title');
  const modalClient = modal.querySelector('#modalClient');
  const modalYear = modal.querySelector('#modalYear');
  const modalDeliverables = modal.querySelector('#modalDeliverables');
  const modalChallenge = modal.querySelector('#modalChallenge');
  const modalDirection = modal.querySelector('#modalDirection');
  const modalSolution = modal.querySelector('#modalSolution');
  const modalResults = modal.querySelector('#modalResults');

  const openModal = (projectId) => {
    const data = caseStudiesData[projectId];
    if (!data) return;

    if (modalHeroImg) modalHeroImg.src = data.image;
    if (modalCategory) modalCategory.textContent = data.category;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalClient) modalClient.textContent = data.client;
    if (modalYear) modalYear.textContent = data.year;
    if (modalDeliverables) modalDeliverables.textContent = data.deliverables;
    if (modalChallenge) modalChallenge.textContent = data.challenge;
    if (modalDirection) modalDirection.textContent = data.direction;
    if (modalSolution) modalSolution.textContent = data.solution;
    if (modalResults) modalResults.textContent = data.results;

    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-project');
      if (projectId) openModal(projectId);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeModal();
    }
  });
}
