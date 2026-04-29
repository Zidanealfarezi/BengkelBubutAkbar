const WHATSAPP_NUMBER = "6282285036041";
const WHATSAPP_DISPLAY = "+62 822-8503-6041";

const buildWhatsAppUrl = (message) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const navMenu = document.querySelector("[data-nav-menu]");
const waLinks = document.querySelectorAll("[data-wa-link]");
const waNumberLabels = document.querySelectorAll("[data-wa-number-label]");
const filterButtons = document.querySelectorAll("[data-filter]");
const galleryItems = document.querySelectorAll(".gallery-item");
const portfolioItems = document.querySelectorAll(".portfolio-card[data-category]");
const filterStatus = document.querySelector("[data-filter-status]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxTitle = document.querySelector("[data-lightbox-title]");
const lightboxClose = document.querySelector("[data-lightbox-close]");
const contactForm = document.querySelector("[data-contact-form]");
const yearLabel = document.querySelector("[data-year]");

const setWhatsAppLinks = () => {
  waLinks.forEach((link) => {
    const message = link.dataset.waText || "Halo Bengkel Bubut Akbar, saya ingin konsultasi.";
    link.href = buildWhatsAppUrl(message);
    link.target = "_blank";
    link.rel = "noopener";
  });

  waNumberLabels.forEach((label) => {
    label.textContent = WHATSAPP_DISPLAY;
  });
};

const closeMenu = () => {
  document.body.classList.remove("menu-open");
  menuToggle?.classList.remove("active");
  navMenu?.classList.remove("open");
  menuToggle?.setAttribute("aria-label", "Buka menu navigasi");
};

const setupMenu = () => {
  menuToggle?.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuToggle.classList.toggle("active", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-label", isOpen ? "Tutup menu navigasi" : "Buka menu navigasi");
  });

  navMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
};

const setupScrollState = () => {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-menu a");

  const updateHeader = () => {
    header?.classList.toggle("scrolled", window.scrollY > 12);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
};

// ===== SCROLL PROGRESS BAR =====
const setupScrollProgress = () => {
  const bar = document.getElementById('scroll-progress-bar');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
};

// ===== COUNTER ANIMATION =====
const setupCounterAnimation = () => {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1500;
    const step = Math.ceil(target / (duration / 16));
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current + suffix;
    }, 16);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
};

const initAOS = () => {
  const startAOS = () => {
    if (typeof AOS === 'undefined') return;
    
    // Add data-aos attributes dynamically to keep HTML clean
    document.querySelectorAll('#home h1').forEach(el => { el.setAttribute('data-aos', 'fade-up'); el.setAttribute('data-aos-duration', '1000'); });
    document.querySelectorAll('#home p').forEach(el => { el.setAttribute('data-aos', 'fade-up'); el.setAttribute('data-aos-delay', '200'); el.setAttribute('data-aos-duration', '1000'); });
    document.querySelectorAll('#home .flex').forEach(el => { el.setAttribute('data-aos', 'fade-up'); el.setAttribute('data-aos-delay', '400'); el.setAttribute('data-aos-duration', '1000'); });
    
    // About Us Stats
    document.querySelectorAll('.grid > .p-6.border').forEach((el, i) => { el.setAttribute('data-aos', 'fade-up'); el.setAttribute('data-aos-delay', (i * 100).toString()); });
    
    // Services Section
    document.querySelectorAll('#services .text-center').forEach(el => { el.setAttribute('data-aos', 'fade-up'); });
    document.querySelectorAll('#services .group').forEach((el, i) => { el.setAttribute('data-aos', 'fade-up'); el.setAttribute('data-aos-delay', ((i%3) * 100).toString()); });
    
    // Portfolio
    document.querySelectorAll('#portfolio .text-center').forEach(el => { el.setAttribute('data-aos', 'fade-up'); });
    document.querySelectorAll('.portfolio-card').forEach((el, i) => { el.setAttribute('data-aos', 'zoom-in'); el.setAttribute('data-aos-delay', ((i%4) * 100).toString()); });
    
    // Clients / Dipercaya Oleh
    document.querySelectorAll('#clients .text-center').forEach(el => { el.setAttribute('data-aos', 'fade-up'); });
    document.querySelectorAll('#clients .group').forEach((el, i) => { el.setAttribute('data-aos', 'fade-up'); el.setAttribute('data-aos-delay', (i * 150).toString()); });

    // Order flow
    document.querySelectorAll('#order-flow .text-center').forEach(el => { el.setAttribute('data-aos', 'fade-up'); });
    document.querySelectorAll('#order-flow .group').forEach((el, i) => { el.setAttribute('data-aos', 'fade-up'); el.setAttribute('data-aos-delay', (i * 100).toString()); });
    
    // Contact
    document.querySelectorAll('#contact .text-center').forEach(el => { el.setAttribute('data-aos', 'fade-up'); });
    document.querySelectorAll('#contact .flex-col').forEach(el => { el.setAttribute('data-aos', 'fade-right'); });
    document.querySelectorAll('#contact .relative').forEach(el => { el.setAttribute('data-aos', 'fade-left'); });

    AOS.init({
      once: true,
      offset: 50,
      duration: 800,
      easing: 'ease-out-cubic',
    });
  };

  // Try immediately, or wait for AOS to load
  if (typeof AOS !== 'undefined') {
    startAOS();
  } else {
    window.addEventListener('load', startAOS);
  }
};

const setupGallery = () => {
  const filterTargets = portfolioItems.length ? portfolioItems : galleryItems;

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory = button.dataset.filter;
      const selectedLabel = button.dataset.filterLabel || button.textContent.trim();
      let visibleCount = 0;

      filterButtons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("active", isActive);
        item.setAttribute("aria-pressed", isActive ? "true" : "false");
      });

      filterTargets.forEach((item) => {
        const shouldShow = selectedCategory === "semua" || item.dataset.category === selectedCategory;
        if (shouldShow) visibleCount += 1;
        item.hidden = !shouldShow;
        item.classList.toggle("hidden-by-filter", !shouldShow);
        item.classList.toggle("visible-by-filter", shouldShow);
      });

      if (filterStatus) {
        filterStatus.textContent =
          selectedCategory === "semua"
            ? `Menampilkan semua kategori (${visibleCount} item)`
            : `Menampilkan ${selectedLabel} (${visibleCount} item)`;
      }
    });
  });

  if (filterStatus && filterTargets.length) {
    filterStatus.textContent = `Menampilkan semua kategori (${filterTargets.length} item)`;
  }

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      lightboxImage.src = item.dataset.image;
      lightboxImage.alt = item.dataset.title;
      lightboxTitle.textContent = item.dataset.title;
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
    });
  });
};

const closeLightbox = () => {
  if (!lightbox) return;
  lightbox.hidden = true;
  lightboxImage.src = "";
  document.body.style.overflow = "";
};

const setupLightbox = () => {
  lightboxClose?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });
};

const setupContactForm = () => {
  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const nama = formData.get("nama");
    const layanan = formData.get("layanan");
    const detail = formData.get("detail");
    const message = [
      "Halo Bengkel Bubut Akbar, saya ingin konsultasi.",
      `Nama: ${nama}`,
      `Layanan: ${layanan}`,
      `Detail: ${detail}`,
    ].join("\n");

    window.open(buildWhatsAppUrl(message), "_blank", "noopener");
  });
};

const setupButtonFeedback = () => {
  const pressableControls = document.querySelectorAll(
    "button, a[data-wa-link], a[href='#portfolio'], a[href*='maps.app.goo.gl'].font-label-caps"
  );

  pressableControls.forEach((control) => {
    control.classList.add("button-feedback");

    if (!control.classList.contains("bg-[#25D366]") && !control.classList.contains("bg-[#0A192F]")) {
      control.classList.add("button-feedback-dark");
    }

    control.addEventListener("pointerdown", (event) => {
      control.classList.add("is-pressed");

      const rect = control.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "button-ripple";
      ripple.style.left = `${event.clientX - rect.left}px`;
      ripple.style.top = `${event.clientY - rect.top}px`;
      control.appendChild(ripple);

      ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
    });

    ["pointerup", "pointercancel", "pointerleave", "blur"].forEach((eventName) => {
      control.addEventListener(eventName, () => {
        control.classList.remove("is-pressed");
      });
    });
  });
};

setWhatsAppLinks();
setupMenu();
setupScrollState();
setupScrollProgress();
setupCounterAnimation();
initAOS();
setupGallery();
setupLightbox();
setupContactForm();
setupButtonFeedback();

if (yearLabel) {
  yearLabel.textContent = new Date().getFullYear();
}
