document.documentElement.classList.add("js-enabled");

// Substitua pelo número oficial do Monterey antes de publicar.
const WHATSAPP_NUMBER = "5547999999999";
const DEFAULT_WHATSAPP_MESSAGE =
  "Olá, vi a página da Monterey Pet & Resort e gostaria de atendimento.";

document.addEventListener("DOMContentLoaded", () => {
  setCurrentYear();
  initHeaderState();
  initMobileMenu();
  initReveal();
  initSmartMedia();
  initWhatsAppLinks();
  initLeadForm();
  initAccordion();
  initGallery();
});

function setCurrentYear() {
  const yearNode = document.getElementById("current-year");

  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }
}

function initHeaderState() {
  const header = document.querySelector(".site-header");

  if (!header) {
    return;
  }

  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 18);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

function initMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");

  if (!toggle || !nav) {
    return;
  }

  const closeMenu = () => {
    document.body.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
  };

  const openMenu = () => {
    document.body.classList.add("menu-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Fechar menu");
  };

  toggle.addEventListener("click", () => {
    if (document.body.classList.contains("menu-open")) {
      closeMenu();
      return;
    }

    openMenu();
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (!document.body.classList.contains("menu-open")) {
      return;
    }

    if (nav.contains(event.target) || toggle.contains(event.target)) {
      return;
    }

    closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) {
      closeMenu();
    }
  });
}

function initReveal() {
  const revealItems = document.querySelectorAll("[data-reveal]");

  if (!revealItems.length) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, revealObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function initSmartMedia() {
  const mediaImages = document.querySelectorAll("[data-smart-image]");

  mediaImages.forEach((image) => {
    const wrapper = image.closest("[data-smart-wrapper]");

    if (!wrapper) {
      return;
    }

    const markLoaded = () => wrapper.classList.add("is-loaded");
    const markMissing = () => wrapper.classList.remove("is-loaded");

    if (image.complete && image.naturalWidth > 0) {
      markLoaded();
      return;
    }

    image.addEventListener("load", markLoaded, { once: true });
    image.addEventListener("error", markMissing, { once: true });
  });
}

function initWhatsAppLinks() {
  const links = document.querySelectorAll("[data-whatsapp-link]");

  links.forEach((link) => {
    const message = link.dataset.message || DEFAULT_WHATSAPP_MESSAGE;
    link.href = buildWhatsAppUrl(message);
  });
}

function initLeadForm() {
  const form = document.getElementById("lead-form");
  const feedback = document.getElementById("form-feedback");

  if (!form || !feedback) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearValidation(form, feedback);

    const formData = new FormData(form);
    const payload = {
      tutorName: getFieldValue(formData, "tutorName"),
      tutorPhone: getFieldValue(formData, "tutorPhone"),
      petName: getFieldValue(formData, "petName"),
      petType: getFieldValue(formData, "petType"),
      service: getFieldValue(formData, "service"),
      date: getFieldValue(formData, "date"),
      notes: getFieldValue(formData, "notes"),
    };

    const invalidFields = validateLeadForm(form, payload);

    if (invalidFields.length) {
      feedback.textContent = "Preencha os campos principais para seguir para o WhatsApp.";
      invalidFields[0].querySelector("input, select, textarea")?.focus();
      return;
    }

    const message = [
      "Olá, vi a página da Monterey Pet & Resort e gostaria de atendimento.",
      "",
      `Nome do tutor: ${payload.tutorName}`,
      `WhatsApp: ${payload.tutorPhone}`,
      `Nome do pet: ${payload.petName}`,
      `Tipo do pet: ${payload.petType}`,
      `Serviço desejado: ${payload.service}`,
      `Data desejada: ${formatDate(payload.date) || "Não informado"}`,
      `Observações: ${payload.notes || "Não informado"}`,
    ].join("\n");

    feedback.textContent = "Abrindo o WhatsApp com a sua mensagem pronta...";
    feedback.classList.add("is-success");
    openWhatsAppMessage(message);
  });
}

function validateLeadForm(form, payload) {
  const fieldRules = [
    { name: "tutorName", isValid: Boolean(payload.tutorName) },
    { name: "tutorPhone", isValid: sanitizePhoneNumber(payload.tutorPhone).length >= 10 },
    { name: "petName", isValid: Boolean(payload.petName) },
    { name: "petType", isValid: Boolean(payload.petType) },
    { name: "service", isValid: Boolean(payload.service) },
  ];

  const invalidFields = [];

  fieldRules.forEach((rule) => {
    const field = form.querySelector(`[name="${rule.name}"]`)?.closest(".field");

    if (!rule.isValid && field) {
      field.classList.add("is-invalid");
      invalidFields.push(field);
    }
  });

  return invalidFields;
}

function clearValidation(form, feedback) {
  form.querySelectorAll(".field").forEach((field) => field.classList.remove("is-invalid"));
  feedback.textContent = "";
  feedback.classList.remove("is-success");
}

function initAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  if (!faqItems.length) {
    return;
  }

  const setState = (item, open) => {
    const button = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    item.classList.toggle("is-open", open);
    button?.setAttribute("aria-expanded", String(open));

    if (!answer) {
      return;
    }

    answer.style.maxHeight = open ? `${answer.scrollHeight}px` : "0px";
  };

  faqItems.forEach((item) => {
    const button = item.querySelector(".faq-question");
    const isOpen = item.classList.contains("is-open");

    setState(item, isOpen);

    button?.addEventListener("click", () => {
      const shouldOpen = !item.classList.contains("is-open");

      faqItems.forEach((faqItem) => setState(faqItem, false));
      setState(item, shouldOpen);
    });
  });

  window.addEventListener("resize", () => {
    faqItems.forEach((item) => {
      if (item.classList.contains("is-open")) {
        const answer = item.querySelector(".faq-answer");

        if (answer) {
          answer.style.maxHeight = `${answer.scrollHeight}px`;
        }
      }
    });
  });
}

function initGallery() {
  const items = Array.from(document.querySelectorAll("[data-gallery-item]"));
  const lightbox = document.getElementById("gallery-lightbox");

  if (!items.length || !lightbox) {
    return;
  }

  const closeButton = lightbox.querySelector(".lightbox-close");
  const prevButton = lightbox.querySelector(".lightbox-nav--prev");
  const nextButton = lightbox.querySelector(".lightbox-nav--next");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxDescription = document.getElementById("lightbox-description");
  const mediaWrapper = lightbox.querySelector(".lightbox-media");
  let currentIndex = 0;

  const renderSlide = (index) => {
    currentIndex = (index + items.length) % items.length;
    const item = items[currentIndex];
    const src = item.dataset.image || "";
    const title = item.dataset.title || "Galeria Monterey";
    const description = item.dataset.description || "";

    lightboxTitle.textContent = title;
    lightboxDescription.textContent = description;
    lightboxImage.alt = title;
    mediaWrapper?.classList.remove("is-loaded");

    lightboxImage.onload = () => mediaWrapper?.classList.add("is-loaded");
    lightboxImage.onerror = () => {
      mediaWrapper?.classList.remove("is-loaded");
      lightboxImage.removeAttribute("src");
    };

    lightboxImage.src = src;

    if (lightboxImage.complete && lightboxImage.naturalWidth > 0) {
      mediaWrapper?.classList.add("is-loaded");
    }
  };

  const openLightbox = (index) => {
    document.body.classList.add("modal-open");
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    renderSlide(index);
    closeButton?.focus();
  };

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };

  items.forEach((item, index) => {
    item.addEventListener("click", () => openLightbox(index));
  });

  closeButton?.addEventListener("click", closeLightbox);
  prevButton?.addEventListener("click", () => renderSlide(currentIndex - 1));
  nextButton?.addEventListener("click", () => renderSlide(currentIndex + 1));

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-open")) {
      return;
    }

    if (event.key === "Escape") {
      closeLightbox();
    }

    if (event.key === "ArrowRight") {
      renderSlide(currentIndex + 1);
    }

    if (event.key === "ArrowLeft") {
      renderSlide(currentIndex - 1);
    }
  });
}

function getFieldValue(formData, fieldName) {
  return String(formData.get(fieldName) || "").trim();
}

function sanitizePhoneNumber(value) {
  return String(value || "").replace(/\D/g, "");
}

function formatDate(value) {
  if (!value) {
    return "";
  }

  const [year, month, day] = value.split("-");

  if (!year || !month || !day) {
    return value;
  }

  return `${day}/${month}/${year}`;
}

function buildWhatsAppUrl(message) {
  const cleanedNumber = sanitizePhoneNumber(WHATSAPP_NUMBER);
  return `https://wa.me/${cleanedNumber}?text=${encodeURIComponent(message)}`;
}

function openWhatsAppMessage(message) {
  window.open(buildWhatsAppUrl(message), "_blank", "noopener");
}
