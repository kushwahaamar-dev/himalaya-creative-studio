const PROJECTS = {
  khumbu: {
    backdrop: "Khumbu Atlas",
    sub: "Khumbu Atlas · 3D Cartography & UI System",
    tags: ["WEBGL", "UI SYSTEM", "BRAND"],
    desc: "Real-time 3D terrain and glacier telemetry interface crafted for high-altitude research teams. Built with custom shaders and fluid motion.",
    image: "assets/everest-nuptse-khumbu-glacier-nepal-himalayas.jpg",
    desk: "projects@himalayacreativestudio.com"
  },
  patan: {
    backdrop: "Patan Type",
    sub: "Patan Type · Bilingual Foundry & Specimen",
    tags: ["TYPOGRAPHY", "IDENTITY", "WEB"],
    desc: "Interactive variable font specimen and licensing platform created for an independent Kathmandu type foundry.",
    image: "assets/himalayas-ama-dablam-nepal.jpg",
    desk: "design@himalayacreativestudio.com"
  },
  solukhumbu: {
    backdrop: "Solukhumbu",
    sub: "Solukhumbu · Clean Energy Control Console",
    tags: ["PRODUCT UI", "DESIGN SYSTEM", "DATA"],
    desc: "High-contrast telemetry console and design system engineered for alpine hydro-electric stations.",
    image: "assets/everest-himalayas.jpg",
    desk: "projects@himalayacreativestudio.com"
  },
  mustang: {
    backdrop: "Mustang",
    sub: "Upper Mustang · Editorial Commerce",
    tags: ["COMMERCE", "ART DIRECTION", "BRAND"],
    desc: "Direct-to-collector digital flagship and provenance archive for hand-loomed mountain wool editions.",
    image: "assets/sunset-view-of-everest.jpg",
    desk: "hello@himalayacreativestudio.com"
  },
  meridian: {
    backdrop: "Meridian",
    sub: "Meridian Labs · Autonomous Earth Observation",
    tags: ["MOTION", "INTERFACE", "3D"],
    desc: "Browser-native satellite imagery inspector and brand identity for orbital climate monitoring.",
    image: "assets/himalayas-cholatse-nepal.jpg",
    desk: "projects@himalayacreativestudio.com"
  },
  kalapatthar: {
    backdrop: "Kala Patthar",
    sub: "Kala Patthar · Monograph & Print Platform",
    tags: ["EDITORIAL", "WEB DESIGN", "IDENTITY"],
    desc: "Minimal digital reading room and limited-edition book store for alpine photography.",
    image: "assets/annapurna-i-annapurna-south-and-himchuli-from.jpg",
    desk: "design@himalayacreativestudio.com"
  }
};

function initDeck() {
  const cards = [...document.querySelectorAll(".fan-card")];
  const backdrop = document.getElementById("backdrop-title");
  const sub = document.getElementById("deck-sub");
  const inspector = document.getElementById("project-inspector");
  const closeBtn = document.getElementById("inspector-close");
  const inspTitle = document.getElementById("inspector-title");
  const inspTags = document.getElementById("inspector-tags");
  const inspDesc = document.getElementById("inspector-desc");
  const inspCta = document.getElementById("inspector-cta");
  const inspBg = document.getElementById("inspector-bg");
  const inspImg = document.getElementById("inspector-img");

  const previewProject = (key, activeCard) => {
    const p = PROJECTS[key];
    if (!p) return;
    cards.forEach((c) => c.classList.toggle("is-active", c === activeCard));
    backdrop.style.transform = "translate3d(-50%, 0px, 0)";
    backdrop.textContent = p.backdrop;
    sub.textContent = p.sub;
  };

  const openInspector = (key) => {
    const p = PROJECTS[key];
    if (!p || !inspector) return;
    inspTitle.textContent = p.backdrop;
    inspTags.innerHTML = p.tags.map((t) => `<span class="inspector-tag">${t}</span>`).join("");
    inspDesc.textContent = p.desc;
    inspCta.href = `mailto:${p.desk}?subject=${encodeURIComponent("Project Inquiry · " + p.backdrop)}`;
    inspBg.src = p.image;
    inspImg.src = p.image;
    inspImg.alt = p.backdrop;
    inspector.classList.add("is-open");
    inspector.setAttribute("aria-hidden", "false");
  };

  const closeInspector = () => {
    if (!inspector) return;
    inspector.classList.remove("is-open");
    inspector.setAttribute("aria-hidden", "true");
  };

  cards.forEach((card) => {
    const key = card.getAttribute("data-project");
    card.addEventListener("mouseenter", () => previewProject(key, card));
    card.addEventListener("focus", () => previewProject(key, card));
    card.addEventListener("mousemove", (e) => {
      if (window.innerWidth <= 960) return;
      const rect = card.getBoundingClientRect();
      const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
      const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
      card.style.transform = `translate3d(0, -30px, 42px) rotateX(${rx.toFixed(1)}deg) rotateY(${ry.toFixed(1)}deg) scale(1.07)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
    card.addEventListener("click", () => openInspector(key));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openInspector(key);
      }
    });
  });

  document.querySelectorAll("[data-open-project]").forEach((el) => {
    const key = el.getAttribute("data-open-project");
    el.addEventListener("click", () => {
      document.getElementById("highlights")?.scrollIntoView({ behavior: "smooth" });
      openInspector(key);
    });
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        document.getElementById("highlights")?.scrollIntoView({ behavior: "smooth" });
        openInspector(key);
      }
    });
  });

  closeBtn?.addEventListener("click", closeInspector);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeInspector();
  });
}

function initThemeToggle() {
  const btn = document.getElementById("theme-toggle");
  btn?.addEventListener("click", () => {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    if (next === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
  });
}

function initReveals() {
  document.documentElement.classList.add("js");
  const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
  if ("IntersectionObserver" in window && !calm.matches) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-in"));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initDeck();
  initThemeToggle();
  initReveals();
});
