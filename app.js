const STUDIO_EMAIL = "Himalayacreativestudio@gmail.com";
const STUDIO_WHATSAPP = "447467604323";

const SERVICES = {
  consultancy: {
    eyebrow: "Commercial Advisory",
    title: "Business Development & Consultancy",
    desc: "We work directly with founders and directors to identify untapped revenue streams, structure strategic partnerships, and build repeatable commercial pipelines that win higher-value clients.",
    deliverables: [
      "Market entry & commercial opportunity assessment",
      "B2B partnership & client acquisition strategy",
      "Proposal, pricing, and deal-closing frameworks",
      "Hands-on executive advisory & quarterly pipeline reviews"
    ]
  },
  strategic: {
    eyebrow: "Long-Term Direction",
    title: "Strategic Planning",
    desc: "Clear strategy eliminates wasted budget and scattered effort. We build practical 12-to-36-month strategic plans backed by financial milestones, competitive differentiation, and leadership accountability.",
    deliverables: [
      "1-to-3 year strategic growth roadmap",
      "Competitive positioning & market differentiation",
      "Quarterly OKR and executive KPI scorecards",
      "Scenario planning & risk mitigation frameworks"
    ]
  },
  management: {
    eyebrow: "Organisational Leadership",
    title: "Business Management Solutions",
    desc: "As companies grow, informal habits break down. We install dependable management rhythms, governance structures, and team accountability systems so leadership can scale with confidence.",
    deliverables: [
      "Organisational structure & role clarity blueprints",
      "Executive reporting dashboards & meeting cadences",
      "Vendor, supplier, and contract management systems",
      "Leadership mentoring & cross-team alignment"
    ]
  },
  operations: {
    eyebrow: "Margin & Efficiency",
    title: "Operational Improvement",
    desc: "We audit end-to-end workflows to remove costly bottlenecks, reduce rework, and standardise delivery so your business handles greater volume while protecting quality and profit margins.",
    deliverables: [
      "End-to-end workflow & process bottleneck audit",
      "Standard Operating Procedures (SOP) documentation",
      "Cost-structure and resource utilisation review",
      "Quality assurance and delivery SLA frameworks"
    ]
  },
  growth: {
    eyebrow: "Sustainable Expansion",
    title: "Business Growth & Development",
    desc: "Structured commercial expansion designed for ambitious UK and international businesses ready to scale client retention, expand service lines, and capture market share.",
    deliverables: [
      "Customer acquisition & retention architecture",
      "Service-line expansion & packaging strategy",
      "Account growth and referral engine design",
      "Performance tracking and quarterly growth sprints"
    ]
  },
  creative: {
    eyebrow: "Executive Presentation",
    title: "Creative and Professional Solutions",
    desc: "Great strategy deserves commanding presentation. We craft investor-ready pitch decks, corporate brand alignment, digital touchpoints, and client-facing materials that build instant trust.",
    deliverables: [
      "Executive pitch decks & commercial capability profiles",
      "Corporate brand positioning & visual identity alignment",
      "Digital presence and conversion-focused web strategy",
      "Bespoke client-facing business collateral"
    ]
  }
};

const APPROACH_PHASES = [
  {
    title: "Discovery & Commercial Audit",
    desc: "We begin by reviewing your commercial model, operational bottlenecks, revenue streams, and competitive position in the London and UK market. Within two weeks, leadership receives a frank, evidence-backed diagnostic.",
    deliverables: [
      "Commercial & Operational Health Audit",
      "Opportunity & Margin Gap Analysis",
      "Priority Risk Register & Quick-Win Matrix"
    ]
  },
  {
    title: "Strategic Blueprint & Financial Alignment",
    desc: "Using the audit findings, we co-author a practical roadmap with clear quarterly targets, resource allocation, and commercial initiatives tailored to your exact growth horizon.",
    deliverables: [
      "12-Month Strategic Action Plan",
      "KPI Scorecard & Revenue Milestones",
      "Organisational Responsibility Matrix"
    ]
  },
  {
    title: "Operational Execution & Rollout",
    desc: "Strategy only counts when implemented. We work alongside your team to deploy improved workflows, launch business development campaigns, and install repeatable management systems.",
    deliverables: [
      "Documented SOPs & Workflow Upgrades",
      "Live Business Development Pipeline Setup",
      "Bi-Weekly Executive Progress Reviews"
    ]
  },
  {
    title: "Sustained Growth & Advisory Support",
    desc: "Once core systems are running smoothly, we stay by your side to measure results, refine commercial positioning, and help leadership navigate new market opportunities.",
    deliverables: [
      "Quarterly Board & Performance Reviews",
      "Continuous Operational Optimisation",
      "On-Demand Executive & Creative Advisory"
    ]
  }
];

const DIAGNOSTIC_PLANS = {
  revenue: {
    title: "Commercial Acceleration & Pipeline Programme",
    summary: "Aligns your commercial offer, builds a repeatable B2B outreach and partnership engine, and tracks weekly conversion KPIs.",
    services: ["Business Development & Consultancy", "Business Growth & Development", "Strategic Planning"],
    primaryService: "Business Development & Consultancy"
  },
  strategy: {
    title: "Executive Strategy & Market Roadmap",
    summary: "Clarifies your 12-to-36-month direction, sharpens competitive positioning, and sets measurable quarterly leadership KPIs.",
    services: ["Strategic Planning", "Business Management Solutions", "Business Development & Consultancy"],
    primaryService: "Strategic Planning"
  },
  operations: {
    title: "Operational Excellence & Margin Protection",
    summary: "Eliminates workflow bottlenecks, standardises SOPs, and installs management reporting so your team scales cleanly.",
    services: ["Operational Improvement", "Business Management Solutions", "Strategic Planning"],
    primaryService: "Operational Improvement"
  },
  positioning: {
    title: "Brand Authority & Commercial Positioning",
    summary: "Elevates your corporate identity, pitch materials, and market narrative so prospects choose you with confidence.",
    services: ["Creative and Professional Solutions", "Business Growth & Development", "Business Development & Consultancy"],
    primaryService: "Creative and Professional Solutions"
  }
};

const HORIZON_LABELS = {
  "90d": "90-Day Sprint",
  "6m": "6-Month Transformation",
  annual: "Annual Advisory Partner"
};

const STAGE_LABELS = {
  startup: "Early-Stage / Startup",
  sme: "Growing SME",
  enterprise: "Established Enterprise"
};

function selectServiceAndScroll(serviceName, prefillMessage) {
  const select = document.getElementById("client-service");
  const messageEl = document.getElementById("client-message");
  const contactSection = document.getElementById("contact");
  const form = document.getElementById("consultation-form");
  const confirmation = document.getElementById("form-confirmation");

  if (confirmation && form) {
    confirmation.classList.remove("is-visible");
    form.style.display = "block";
  }

  if (select) {
    const match = [...select.options].find((o) => o.value === serviceName);
    if (match) select.value = serviceName;
  }

  if (prefillMessage && messageEl) {
    messageEl.value = prefillMessage;
  }

  contactSection?.scrollIntoView({ behavior: "smooth" });
  setTimeout(() => document.getElementById("client-name")?.focus(), 450);
}

function initContourCanvas() {
  const canvas = document.getElementById("contour-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let w = 0;
  let h = 0;
  let pointerX = 0.5;
  let pointerY = 0.5;
  let t = 0;

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    const lines = 11;
    for (let i = 0; i < lines; i++) {
      const ratio = i / (lines - 1);
      ctx.beginPath();
      const baseY = h * (0.2 + ratio * 0.72);
      const alpha = 0.06 + (1 - Math.abs(ratio - 0.5) * 2) * 0.14;
      ctx.strokeStyle = `rgba(212, 175, 99, ${alpha.toFixed(3)})`;
      ctx.lineWidth = i === 5 ? 1.4 : 0.85;

      for (let x = 0; x <= w; x += 28) {
        const nx = x / Math.max(w, 1);
        const ridge =
          Math.sin(nx * 4.2 + t + i * 0.45) * 34 +
          Math.cos(nx * 8.5 - t * 0.7 + i) * 14 +
          (pointerY - 0.5) * 45 * Math.exp(-Math.pow((nx - pointerX) * 2.4, 2));
        const y = baseY + ridge;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    if (!calm) {
      t += 0.0045;
      requestAnimationFrame(draw);
    }
  };

  resize();
  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", (e) => {
    pointerX = e.clientX / Math.max(window.innerWidth, 1);
    pointerY = e.clientY / Math.max(window.innerHeight, 1);
  }, { passive: true });
  draw();
}

function initLondonClock() {
  const el = document.getElementById("london-clock");
  if (!el) return;
  const update = () => {
    try {
      const now = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/London",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short"
      }).format(new Date());
      el.textContent = `London, UK · ${now}`;
    } catch {
      el.textContent = "London, UK";
    }
  };
  update();
  setInterval(update, 30000);
}

function initMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const drawer = document.getElementById("mobile-drawer");
  if (!toggle || !drawer) return;

  const setOpen = (open) => {
    drawer.classList.toggle("is-open", open);
    drawer.setAttribute("aria-hidden", String(!open));
    toggle.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  };

  toggle.addEventListener("click", () => setOpen(!drawer.classList.contains("is-open")));
  drawer.querySelectorAll("[data-drawer-link]").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });
}

function initCopyEmail() {
  const btn = document.getElementById("copy-email-btn");
  if (!btn) return;
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(STUDIO_EMAIL);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = STUDIO_EMAIL;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    btn.textContent = "Copied";
    setTimeout(() => {
      btn.textContent = "Copy";
    }, 2200);
  });
}

function initPracticesAndDossier() {
  const rows = [...document.querySelectorAll("[data-service-key]")];
  const previewTag = document.getElementById("preview-tag");
  const previewTitle = document.getElementById("preview-title");
  const previewDesc = document.getElementById("preview-desc");
  const previewList = document.getElementById("preview-list");
  const previewOpenBtn = document.getElementById("preview-open-btn");

  const modal = document.getElementById("service-modal");
  const closeBtn = document.getElementById("modal-close");
  const eyebrowEl = document.getElementById("modal-eyebrow");
  const titleEl = document.getElementById("modal-title");
  const descEl = document.getElementById("modal-desc");
  const listEl = document.getElementById("modal-list");
  const inquireBtn = document.getElementById("modal-inquire-btn");

  let activeKey = "consultancy";

  const updatePreview = (key) => {
    const svc = SERVICES[key];
    if (!svc) return;
    activeKey = key;
    rows.forEach((r) => r.classList.toggle("is-active", r.getAttribute("data-service-key") === key));
    if (previewTag) previewTag.textContent = svc.eyebrow;
    if (previewTitle) previewTitle.textContent = svc.title;
    if (previewDesc) previewDesc.textContent = svc.desc;
    if (previewList) {
      previewList.innerHTML = svc.deliverables.slice(0, 3).map((item) => `<li>${item}</li>`).join("");
    }
  };

  const closeDossier = () => {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  const openDossier = (key) => {
    const svc = SERVICES[key];
    if (!svc || !modal) return;
    updatePreview(key);
    eyebrowEl.textContent = svc.eyebrow;
    titleEl.textContent = svc.title;
    descEl.textContent = svc.desc;
    listEl.innerHTML = svc.deliverables.map((item) => `<li>${item}</li>`).join("");
    inquireBtn.textContent = `Inquire About ${svc.title} ↗`;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeBtn?.focus();
  };

  rows.forEach((row) => {
    const key = row.getAttribute("data-service-key");
    row.addEventListener("mouseenter", () => updatePreview(key));
    row.addEventListener("focus", () => updatePreview(key));
    row.addEventListener("click", () => openDossier(key));
  });

  previewOpenBtn?.addEventListener("click", () => openDossier(activeKey));

  document.querySelectorAll("[data-select-service]").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectServiceAndScroll(btn.getAttribute("data-select-service"));
    });
  });

  inquireBtn?.addEventListener("click", () => {
    const svc = SERVICES[activeKey];
    closeDossier();
    selectServiceAndScroll(svc.title, `I would like to explore ${svc.title} for my business.`);
  });

  closeBtn?.addEventListener("click", closeDossier);
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) closeDossier();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDossier();
  });
}

function initDiagnostic() {
  const state = { stage: "sme", challenge: "revenue", horizon: "90d" };
  const tagEl = document.getElementById("diag-tag");
  const titleEl = document.getElementById("diag-title");
  const summaryEl = document.getElementById("diag-summary");
  const listEl = document.getElementById("diag-services");
  const applyBtn = document.getElementById("diag-apply-btn");

  const render = () => {
    const plan = DIAGNOSTIC_PLANS[state.challenge];
    if (!plan || !titleEl) return;
    tagEl.textContent = `Recommended Engagement · ${HORIZON_LABELS[state.horizon]}`;
    titleEl.textContent = plan.title;
    summaryEl.textContent = `Tailored for a ${STAGE_LABELS[state.stage]}. ${plan.summary}`;
    listEl.innerHTML = plan.services.map((s) => `<span>${s}</span>`).join("");
  };

  document.querySelectorAll("[data-diag-group]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const group = btn.getAttribute("data-diag-group");
      const value = btn.getAttribute("data-diag-value");
      state[group] = value;
      document.querySelectorAll(`[data-diag-group="${group}"]`).forEach((b) => {
        b.setAttribute("aria-pressed", String(b === btn));
      });
      render();
    });
  });

  applyBtn?.addEventListener("click", () => {
    const plan = DIAGNOSTIC_PLANS[state.challenge];
    const summary = `Growth Diagnostic Roadmap:\n- Business Stage: ${STAGE_LABELS[state.stage]}\n- Recommended Programme: ${plan.title}\n- Target Horizon: ${HORIZON_LABELS[state.horizon]}\n- Focus Areas: ${plan.services.join(", ")}\n\nWe would like to schedule a discovery consultation to discuss this roadmap.`;
    selectServiceAndScroll(plan.primaryService, summary);
  });

  render();
}

function initApproachTabs() {
  const tabs = [...document.querySelectorAll("[data-phase]")];
  const titleEl = document.getElementById("phase-title");
  const descEl = document.getElementById("phase-desc");
  const listEl = document.getElementById("phase-deliverables");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const idx = Number(tab.getAttribute("data-phase"));
      const phase = APPROACH_PHASES[idx];
      if (!phase) return;
      tabs.forEach((t) => t.setAttribute("aria-selected", String(t === tab)));
      titleEl.textContent = phase.title;
      descEl.textContent = phase.desc;
      listEl.innerHTML = phase.deliverables.map((d) => `<li>— ${d}</li>`).join("");
    });
  });
}

function initConsultationForm() {
  const form = document.getElementById("consultation-form");
  const confirmation = document.getElementById("form-confirmation");
  const previewEl = document.getElementById("brief-preview");
  const emailLink = document.getElementById("send-email-link");
  const waLink = document.getElementById("send-whatsapp-link");
  const copyBtn = document.getElementById("copy-brief-btn");
  const editBtn = document.getElementById("edit-brief-btn");

  if (!form || !confirmation) return;

  let lastBriefText = "";

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("client-name").value.trim();
    const company = document.getElementById("client-company").value.trim() || "Not specified";
    const email = document.getElementById("client-email").value.trim();
    const phone = document.getElementById("client-phone").value.trim() || "Not specified";
    const service = document.getElementById("client-service").value;
    const message = document.getElementById("client-message").value.trim();

    const errName = document.getElementById("err-name");
    const errEmail = document.getElementById("err-email");
    const errMessage = document.getElementById("err-message");

    errName.textContent = "";
    errEmail.textContent = "";
    errMessage.textContent = "";

    let valid = true;
    if (name.length < 2) {
      errName.textContent = "Please enter your full name.";
      valid = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errEmail.textContent = "Please enter a valid email address.";
      valid = false;
    }
    if (message.length < 10) {
      errMessage.textContent = "Please share a short note about your business goals.";
      valid = false;
    }
    if (!valid) return;

    lastBriefText = [
      `Consultation Inquiry — Himalaya Creative Studio Ltd`,
      `Name: ${name}`,
      `Company: ${company}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Service: ${service}`,
      ``,
      `Objectives:`,
      message
    ].join("\n");

    previewEl.textContent = lastBriefText;
    const subject = encodeURIComponent(`Consultation Request: ${service} (${company !== "Not specified" ? company : name})`);
    const body = encodeURIComponent(lastBriefText);
    emailLink.href = `mailto:${STUDIO_EMAIL}?subject=${subject}&body=${body}`;
    waLink.href = `https://wa.me/${STUDIO_WHATSAPP}?text=${body}`;

    form.style.display = "none";
    confirmation.classList.add("is-visible");
  });

  copyBtn?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(lastBriefText);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = lastBriefText;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    copyBtn.textContent = "Brief Copied";
    setTimeout(() => {
      copyBtn.textContent = "Copy Brief";
    }, 2200);
  });

  editBtn?.addEventListener("click", () => {
    confirmation.classList.remove("is-visible");
    form.style.display = "block";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initContourCanvas();
  initLondonClock();
  initMobileMenu();
  initCopyEmail();
  initPracticesAndDossier();
  initDiagnostic();
  initApproachTabs();
  initConsultationForm();
});
