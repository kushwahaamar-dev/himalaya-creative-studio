const WORK_ARCHIVE = {
  khumbu: {
    title: "Khumbu Cryosphere Atlas · Cartographic UI",
    summary: "Interactive glacier mass-balance telemetry and contour browser built for glaciologists tracking 42 Himalayan basins.",
    altitude: "5,360m · Khumbu Icefall",
    deliverable: "Design System, Map Engine, Web App",
    desk: "design@himalayacreativestudio.com"
  },
  patan: {
    title: "Patan Foundry · Devanagari & Latin Specimen",
    summary: "Bilingual variable type specimen and licensing checkout engineered for an independent Kathmandu type foundry.",
    altitude: "1,400m · Lalitpur Valley",
    deliverable: "Type Specimen, Optical Grid, Checkout",
    desk: "design@himalayacreativestudio.com"
  },
  solukhumbu: {
    title: "Solukhumbu Hydro · Turbine Telemetry Interface",
    summary: "High-contrast control room interface monitoring run-of-river Pelton turbines across steep glacial catchments.",
    altitude: "3,820m · Dudh Koshi Gorge",
    deliverable: "Operator Console, Token System",
    desk: "projects@himalayacreativestudio.com"
  },
  annapurna: {
    title: "Annapurna Conservation Trust · Trail & Permit System",
    summary: "Offline-first route status ledger and digital entry permit verification built for high-pass checkpoints.",
    altitude: "4,130m · Annapurna Sanctuary",
    deliverable: "Brand Identity, Web Platform",
    desk: "projects@himalayacreativestudio.com"
  },
  mustang: {
    title: "Upper Mustang Textile Guild · Direct Commerce",
    summary: "Direct-to-collector digital archive and provenance ledger for hand-loomed mountain wool weavers.",
    altitude: "3,840m · Lo Manthang",
    deliverable: "Art Direction, Commerce Architecture",
    desk: "hello@himalayacreativestudio.com"
  },
  orbital: {
    title: "Meridian Earth Observation · Spectral Browser",
    summary: "Browser-native satellite tile inspector for snowpack albedo and watershed runoff forecasting.",
    altitude: "7,900m · Stratosphere Band",
    deliverable: "UI Architecture, WebGL Viewport",
    desk: "projects@himalayacreativestudio.com"
  },
  ghorepani: {
    title: "Kala Patthar Barometric Press · Editorial Platform",
    summary: "Long-form monograph publishing system and print-on-demand dispatch ledger for alpine cartography.",
    altitude: "5,644m · Kala Patthar Ridge",
    deliverable: "Editorial System, Custom Typography",
    desk: "design@himalayacreativestudio.com"
  },
  manang: {
    title: "Manang Alpine Shelter · Booking & Weather Ledger",
    summary: "Low-bandwidth reservation engine and live barometric pass advisory for high-route mountain huts.",
    altitude: "3,519m · Marshyangdi Valley",
    deliverable: "Identity, Booking Engine",
    desk: "hello@himalayacreativestudio.com"
  }
};

const CALIBRATOR_PRESETS = {
  valley: {
    elevation: "ALTITUDE 1,400M · HUMID HAZE",
    tracking: "-0.015em",
    leading: "1.02",
    readout: "font-weight: 900 · letter-spacing: -0.015em · line-height: 1.02 · contrast: 12.5:1"
  },
  ridge: {
    elevation: "ALTITUDE 4,400M · HIGH GLARE",
    tracking: "-0.03em",
    leading: "0.92",
    readout: "font-weight: 900 · letter-spacing: -0.03em · line-height: 0.92 · contrast: 12.5:1"
  },
  summit: {
    elevation: "ALTITUDE 8,000M · THIN AIR",
    tracking: "-0.045em",
    leading: "0.86",
    readout: "font-weight: 900 · letter-spacing: -0.045em · line-height: 0.86 · contrast: 12.5:1"
  }
};

const SCOPE_MODULES = {
  identity: { label: "Brand & Typography", fee: 8000, weeks: 2, desc: "brand identity and custom typographic scale" },
  interface: { label: "UI Design System", fee: 11000, weeks: 3, desc: "interactive UI component system" },
  production: { label: "Production Web Build", fee: 9000, weeks: 3, desc: "production web engineering and edge deployment" },
  retainer: { label: "Seasonal Partner Retainer", fee: 6000, weeks: 4, desc: "ongoing quarterly design and engineering partnership" }
};

const WEEK_WORDS = {
  2: "Two weeks",
  3: "Three weeks",
  4: "Four weeks",
  5: "Five weeks",
  6: "Six weeks",
  7: "Seven weeks",
  8: "Eight weeks",
  9: "Nine weeks",
  10: "Ten weeks",
  11: "Eleven weeks",
  12: "Twelve weeks"
};

function selectDeskForModules(activeKeys) {
  if (activeKeys.includes("production") && activeKeys.length >= 2) {
    return {
      email: "projects@himalayacreativestudio.com",
      short: "projects@",
      sla: "Full-expedition engineering & design desk · Response within 24h"
    };
  }
  if (activeKeys.includes("identity") || activeKeys.includes("interface")) {
    return {
      email: "design@himalayacreativestudio.com",
      short: "design@",
      sla: "Brand systems & interface design desk · Response within 24h"
    };
  }
  if (activeKeys.includes("retainer") && activeKeys.length === 1) {
    return {
      email: "accounts@himalayacreativestudio.com",
      short: "accounts@",
      sla: "Retainer agreements & commercial terms desk · Response within 24h"
    };
  }
  return {
    email: "hello@himalayacreativestudio.com",
    short: "hello@",
    sla: "New commissions & general studio dispatch · Response within 24h"
  };
}

function initWorkLedger() {
  const tiles = document.querySelectorAll("[data-work-id]");
  const titleEl = document.getElementById("ledger-title");
  const summaryEl = document.getElementById("ledger-summary");
  const altitudeEl = document.getElementById("ledger-altitude");
  const deliverableEl = document.getElementById("ledger-deliverable");
  const deskEl = document.getElementById("ledger-desk");

  const activate = (id) => {
    const entry = WORK_ARCHIVE[id];
    if (!entry || !titleEl) return;
    tiles.forEach((tile) => {
      tile.setAttribute("aria-pressed", String(tile.getAttribute("data-work-id") === id));
    });
    titleEl.textContent = entry.title;
    summaryEl.textContent = entry.summary;
    altitudeEl.textContent = entry.altitude;
    deliverableEl.textContent = entry.deliverable;
    deskEl.textContent = entry.desk;
    deskEl.href = `mailto:${entry.desk}?subject=${encodeURIComponent("Case Study Inquiry: " + entry.title)}`;
  };

  tiles.forEach((tile) => {
    const id = tile.getAttribute("data-work-id");
    tile.addEventListener("click", () => activate(id));
    tile.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activate(id);
      }
    });
  });
}

function initCalibrator() {
  const buttons = document.querySelectorAll("[data-cal-mode]");
  const specimen = document.getElementById("cal-specimen");
  const elevation = document.getElementById("cal-elevation");
  const readout = document.getElementById("cal-readout");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const mode = btn.getAttribute("data-cal-mode");
      const preset = CALIBRATOR_PRESETS[mode];
      if (!preset || !specimen) return;
      buttons.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      specimen.style.letterSpacing = preset.tracking;
      specimen.style.lineHeight = preset.leading;
      elevation.textContent = preset.elevation;
      readout.textContent = preset.readout;
    });
  });
}

function initProcessAccordion() {
  const panels = document.querySelectorAll(".stage-panel");
  const openPanel = (target) => {
    panels.forEach((panel) => {
      const active = panel === target;
      panel.classList.toggle("is-open", active);
      const btn = panel.querySelector(".stage-panel__trigger");
      if (btn) btn.setAttribute("aria-expanded", String(active));
    });
  };

  panels.forEach((panel) => {
    panel.addEventListener("click", () => openPanel(panel));
  });
}

function initCommissionRouter() {
  const buttons = [...document.querySelectorAll("[data-scope]")];
  const durationEl = document.getElementById("pricing-duration");
  const amountEl = document.getElementById("pricing-amount");
  const summaryEl = document.getElementById("scope-summary");
  const emailEl = document.getElementById("routed-email");
  const slaEl = document.getElementById("routed-sla");
  const ctaEl = document.getElementById("dispatch-cta");

  const render = () => {
    const activeKeys = buttons
      .filter((b) => b.getAttribute("aria-pressed") === "true")
      .map((b) => b.getAttribute("data-scope"));

    const totalFee = activeKeys.reduce((sum, k) => sum + SCOPE_MODULES[k].fee, 0);
    const totalWeeks = activeKeys.reduce((sum, k) => sum + SCOPE_MODULES[k].weeks, 0);
    const weekLabel = WEEK_WORDS[totalWeeks] || `${totalWeeks} weeks`;
    const formattedFee = "£" + totalFee.toLocaleString("en-GB");
    const desk = selectDeskForModules(activeKeys);
    const descriptions = activeKeys.map((k) => SCOPE_MODULES[k].desc);
    const labels = activeKeys.map((k) => SCOPE_MODULES[k].label);

    durationEl.textContent = weekLabel;
    amountEl.textContent = formattedFee;
    summaryEl.textContent = `Includes ${descriptions.join(", ")} in ${weekLabel.toLowerCase()}.`;
    emailEl.textContent = desk.email;
    slaEl.textContent = desk.sla;

    const subject = encodeURIComponent(`Commission Brief · Himalaya Creative Studio Limited (${formattedFee} · ${weekLabel})`);
    const body = encodeURIComponent(
      `Hello Himalaya Creative Studio Limited,\n\nWe would like to scope a commission with the following modules:\n- ${labels.join("\n- ")}\n\nEstimated Timeline: ${weekLabel}\nEstimated Budget: ${formattedFee}\n\nProject context and target launch window:\n`
    );
    const mailto = `mailto:${desk.email}?subject=${subject}&body=${body}`;
    emailEl.href = mailto;
    ctaEl.href = mailto;
    ctaEl.textContent = `Dispatch brief to ${desk.short}`;
  };

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const pressed = btn.getAttribute("aria-pressed") === "true";
      const activeCount = buttons.filter((b) => b.getAttribute("aria-pressed") === "true").length;
      if (pressed && activeCount <= 1) return;
      btn.setAttribute("aria-pressed", String(!pressed));
      render();
    });
  });

  render();
}

function initRevealsAndVideo() {
  document.documentElement.classList.add("js");
  const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
  const videos = document.querySelectorAll("video[autoplay]");
  const syncVideo = () => {
    videos.forEach((v) => {
      if (calm.matches) {
        v.removeAttribute("autoplay");
        v.pause();
      } else {
        v.play().catch(() => {});
      }
    });
  };
  syncVideo();
  calm.addEventListener("change", syncVideo);

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
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    document.querySelectorAll("[data-reveal], .shutter").forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll("[data-reveal], .shutter").forEach((el) => el.classList.add("is-in"));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initWorkLedger();
  initCalibrator();
  initProcessAccordion();
  initCommissionRouter();
  initRevealsAndVideo();
});
