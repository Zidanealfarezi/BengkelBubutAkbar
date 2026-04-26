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

const setupRevealAnimations = () => {
  const revealItems = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => observer.observe(item));
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
setupRevealAnimations();
setupGallery();
setupLightbox();
setupContactForm();
setupButtonFeedback();

if (yearLabel) {
  yearLabel.textContent = new Date().getFullYear();
}
