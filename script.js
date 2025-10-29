// ==================== NAVIGATION ====================
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  // Close menu when clicking on a link
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });
}

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offset = 80;
      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// ==================== NAVBAR SCROLL EFFECT ====================
const navbar = document.querySelector(".navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.style.background = "rgba(10, 14, 39, 0.98)";
    navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.3)";
  } else {
    navbar.style.background = "rgba(10, 14, 39, 0.95)";
    navbar.style.boxShadow = "none";
  }

  lastScroll = currentScroll;
});

// ==================== ACTIVE NAVIGATION ====================
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll(`
  .problem-card,
  .ip-card,
  .value-card,
  .comp-card,
  .participation-card
`);

animateElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(el);
});

// ==================== STATS COUNTER ANIMATION ====================
const statsSection = document.querySelector(".stats");
let hasAnimatedStats = false;

const animateValue = (element, start, end, duration) => {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const current = Math.floor(progress * (end - start) + start);
    element.textContent = current.toLocaleString();
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
};

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimatedStats) {
        hasAnimatedStats = true;

        const statNumbers = document.querySelectorAll(".stat-number");
        statNumbers.forEach((stat, index) => {
          const target = parseInt(stat.getAttribute("data-target"));
          setTimeout(() => {
            animateValue(stat, 0, target, 2000);
          }, index * 200);
        });
      }
    });
  },
  { threshold: 0.3 }
);

if (statsSection) {
  statsObserver.observe(statsSection);
}

// ==================== BUSINESS TABS ====================
const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetTab = button.getAttribute("data-tab");

    // Remove active class from all buttons and contents
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));

    // Add active class to clicked button and corresponding content
    button.classList.add("active");
    const targetContent = document.getElementById(`${targetTab}-tab`);
    if (targetContent) {
      targetContent.classList.add("active");
    }
  });
});

// ==================== TIMELINE ANIMATION ====================
const timelineItems = document.querySelectorAll(".timeline-item");
const timelineObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateX(0)";
        }, index * 100);
      }
    });
  },
  { threshold: 0.2 }
);

timelineItems.forEach((item) => {
  item.style.opacity = "0";
  item.style.transform = "translateX(-30px)";
  item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  timelineObserver.observe(item);
});

// ==================== FAQ ACCORDION ====================
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    // Close all FAQ items
    faqItems.forEach((faq) => {
      faq.classList.remove("active");
      const answer = faq.querySelector(".faq-answer");
      answer.style.maxHeight = "0";
    });

    // Open clicked item if it wasn't active
    if (!isActive) {
      item.classList.add("active");
      const answer = item.querySelector(".faq-answer");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

// ==================== FAQ CATEGORY FILTER ====================
const faqCategories = document.querySelectorAll(".faq-category");

faqCategories.forEach((category) => {
  category.addEventListener("click", () => {
    const targetCategory = category.getAttribute("data-category");

    // Update active category
    faqCategories.forEach((cat) => cat.classList.remove("active"));
    category.classList.add("active");

    // Filter FAQ items
    faqItems.forEach((item) => {
      const itemCategory = item.getAttribute("data-category");

      if (targetCategory === "all" || itemCategory === targetCategory) {
        item.style.display = "block";
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        }, 100);
      } else {
        item.style.opacity = "0";
        item.style.transform = "translateY(-20px)";
        setTimeout(() => {
          item.style.display = "none";
        }, 300);
      }
    });

    // Close all FAQ items when filtering
    faqItems.forEach((faq) => {
      faq.classList.remove("active");
      const answer = faq.querySelector(".faq-answer");
      if (answer) {
        answer.style.maxHeight = "0";
      }
    });
  });
});

// ==================== PARALLAX EFFECT ====================
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroBackground = document.querySelector(".hero-background");
  if (heroBackground) {
    heroBackground.style.transform = `translateY(${scrolled * 0.4}px)`;
  }
});

// ==================== CARD HOVER EFFECTS ====================
const cards = document.querySelectorAll(
  ".problem-card, .ip-card, .value-card, .comp-card"
);

cards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transition = "all 0.3s ease";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transition = "all 0.3s ease";
  });
});

// ==================== ROADMAP STAGE ANIMATION ====================
const roadmapStages = document.querySelectorAll(".roadmap-stage");
const roadmapObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateX(0)";
        }, index * 200);
      }
    });
  },
  { threshold: 0.2 }
);

roadmapStages.forEach((stage) => {
  stage.style.opacity = "0";
  stage.style.transform = "translateX(-50px)";
  stage.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  roadmapObserver.observe(stage);
});

// ==================== BUTTON RIPPLE EFFECT ====================
document.querySelectorAll(".btn-primary, .btn-secondary").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple styles
const style = document.createElement("style");
style.textContent = `
  .btn-primary, .btn-secondary {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ==================== CHART BAR ANIMATION ====================
const chartBars = document.querySelectorAll(".chart-bar");
const chartObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bars = entry.target.querySelectorAll(".chart-bar");
        bars.forEach((bar, index) => {
          setTimeout(() => {
            bar.style.opacity = "1";
            bar.style.transform = "scaleY(1)";
          }, index * 200);
        });
      }
    });
  },
  { threshold: 0.5 }
);

const sizeChart = document.querySelector(".size-chart");
if (sizeChart) {
  chartObserver.observe(sizeChart);
  chartBars.forEach((bar) => {
    bar.style.opacity = "0";
    bar.style.transform = "scaleY(0)";
    bar.style.transformOrigin = "bottom";
    bar.style.transition = "all 0.6s ease";
  });
}

// ==================== FUND VISUALIZATION ANIMATION ====================
const fundLayers = document.querySelectorAll(".fund-layer .layer-bar");
const fundObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        fundLayers.forEach((layer, index) => {
          setTimeout(() => {
            layer.style.width = layer.style.width || "100%";
          }, index * 300);
        });
      }
    });
  },
  { threshold: 0.5 }
);

const fundVisualization = document.querySelector(".fund-visualization");
if (fundVisualization) {
  fundObserver.observe(fundVisualization);
  fundLayers.forEach((layer) => {
    const targetWidth = layer.style.width;
    layer.style.width = "0";
    layer.style.transition = "width 1s ease";
    layer.setAttribute("data-width", targetWidth);
  });
}

// ==================== FLOATING ANIMATION FOR BADGES ====================
const badges = document.querySelectorAll(".hero-badge, .cta-badge");
badges.forEach((badge) => {
  badge.style.animation = "float 3s ease-in-out infinite";
});

const floatKeyframes = `
  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;

const floatStyle = document.createElement("style");
floatStyle.textContent = floatKeyframes;
document.head.appendChild(floatStyle);

// ==================== SCROLL TO TOP ====================
let scrollTopBtn;

function createScrollTopButton() {
  scrollTopBtn = document.createElement("button");
  scrollTopBtn.innerHTML = "↑";
  scrollTopBtn.className = "scroll-top-btn";
  scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #4a90e2 0%, #5b6cf2 100%);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
  `;

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  document.body.appendChild(scrollTopBtn);
}

createScrollTopButton();

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 500) {
    scrollTopBtn.style.opacity = "1";
    scrollTopBtn.style.visibility = "visible";
  } else {
    scrollTopBtn.style.opacity = "0";
    scrollTopBtn.style.visibility = "hidden";
  }
});

scrollTopBtn.addEventListener("mouseenter", () => {
  scrollTopBtn.style.transform = "translateY(-5px)";
  scrollTopBtn.style.boxShadow = "0 6px 20px rgba(74, 144, 226, 0.4)";
});

scrollTopBtn.addEventListener("mouseleave", () => {
  scrollTopBtn.style.transform = "translateY(0)";
  scrollTopBtn.style.boxShadow = "0 4px 15px rgba(74, 144, 226, 0.3)";
});

// ==================== PERFORMANCE OPTIMIZATION ====================
let ticking = false;

window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        // Scroll-dependent operations
        ticking = false;
      });
      ticking = true;
    }
  },
  { passive: true }
);

// ==================== LAZY LOADING ====================
if ("loading" in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach((img) => {
    img.src = img.dataset.src;
  });
}

// ==================== KHANTEUM CAROUSEL ====================
function initCarousel() {
  const carouselContainer = document.querySelector(".carousel-container");
  const slides = document.querySelectorAll(".carousel-slide");
  const prevBtn = document.querySelector(".carousel-prev");
  const nextBtn = document.querySelector(".carousel-next");
  const indicatorsContainer = document.querySelector(".carousel-indicators");

  if (!carouselContainer || !slides.length) return;

  let currentSlide = 0;

  // Create indicators
  slides.forEach((_, index) => {
    const indicator = document.createElement("button");
    indicator.addEventListener("click", () => goToSlide(index));
    indicatorsContainer.appendChild(indicator);
  });

  const indicators = indicatorsContainer.querySelectorAll("button");
  if (indicators[currentSlide]) {
    indicators[currentSlide].classList.add("active");
  }

  function goToSlide(index) {
    slides[currentSlide].classList.remove("active");
    if (indicators[currentSlide]) {
      indicators[currentSlide].classList.remove("active");
    }

    currentSlide = index;

    slides[currentSlide].classList.add("active");
    if (indicators[currentSlide]) {
      indicators[currentSlide].classList.add("active");
    }
  }

  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    goToSlide(next);
  }

  function prevSlide() {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(prev);
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", prevSlide);
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", nextSlide);
  }

  // Auto-play carousel
  setInterval(nextSlide, 10000);
}

initCarousel();

// ==================== CONSOLE MESSAGE ====================
console.log(
  "%c🚀 CoReset Landing Page",
  "font-size: 24px; font-weight: bold; color: #4a90e2;"
);
console.log(
  "%c데이터 주권과 디지털 자산의 미래",
  "font-size: 14px; color: #8899ab;"
);
console.log("%cLoaded Successfully ✓", "font-size: 12px; color: #27ae60;");

// ==================== PREVENT DEFAULT FORM SUBMISSIONS ====================
const forms = document.querySelectorAll("form");
forms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted");
  });
});

// ==================== TOOLTIP FUNCTIONALITY ====================
function createTooltips() {
  const tooltipElements = document.querySelectorAll("[data-tooltip]");

  tooltipElements.forEach((element) => {
    element.addEventListener("mouseenter", function (e) {
      const tooltipText = this.getAttribute("data-tooltip");
      const tooltip = document.createElement("div");
      tooltip.className = "custom-tooltip";
      tooltip.textContent = tooltipText;
      tooltip.style.cssText = `
        position: absolute;
        background: rgba(10, 14, 39, 0.95);
        color: white;
        padding: 10px 15px;
        border-radius: 8px;
        font-size: 0.9rem;
        z-index: 10000;
        pointer-events: none;
        white-space: nowrap;
        border: 1px solid rgba(74, 144, 226, 0.5);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
      `;

      document.body.appendChild(tooltip);

      const rect = this.getBoundingClientRect();
      tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + "px";
      tooltip.style.left =
        rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + "px";

      this._tooltip = tooltip;
    });

    element.addEventListener("mouseleave", function () {
      if (this._tooltip) {
        this._tooltip.remove();
        this._tooltip = null;
      }
    });
  });
}

createTooltips();

// ==================== INITIALIZE ====================
document.addEventListener("DOMContentLoaded", () => {
  // Any initialization code
  console.log("CoReset initialized");

  // Add smooth reveal to sections
  const allSections = document.querySelectorAll(".section");
  allSections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 0.8s ease, transform 0.8s ease";
  });

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  allSections.forEach((section) => {
    sectionObserver.observe(section);
  });
});

// ==================== EXPORT FOR DEBUGGING ====================
window.CoReset = {
  version: "1.0.0",
  features: [
    "Navigation",
    "Smooth Scrolling",
    "Animations",
    "Stats Counter",
    "Business Tabs",
    "FAQ Accordion",
    "Timeline",
    "Parallax",
    "Ripple Effects",
  ],
};
