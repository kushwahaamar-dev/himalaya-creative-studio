const STUDIO_EMAIL = "Himalayacreativestudio@gmail.com";
const STUDIO_WHATSAPP = "447467604323";

const SERVICES = {
  consultancy: {
    title: "Business Development & Consultancy",
    desc: "We work directly with founders and directors to identify untapped revenue streams, structure strategic partnerships, and build repeatable commercial pipelines.",
    deliverables: [
      "Market entry and commercial opportunity assessment",
      "B2B partnership and client acquisition strategy",
      "Proposal, pricing, and deal-closing frameworks",
      "Executive advisory and pipeline reviews"
    ]
  },
  strategic: {
    title: "Strategic Planning",
    desc: "Practical multi-year strategic plans backed by clear financial milestones, competitive differentiation, and leadership accountability.",
    deliverables: [
      "1-to-3 year strategic growth roadmap",
      "Competitive positioning and differentiation",
      "Quarterly OKR and KPI scorecards",
      "Scenario planning and risk mitigation"
    ]
  },
  management: {
    title: "Business Management Solutions",
    desc: "Dependable management rhythms, governance structures, and team accountability systems so leadership can scale with clarity.",
    deliverables: [
      "Organisational structure and role clarity",
      "Executive reporting and meeting cadences",
      "Vendor and contract management systems",
      "Leadership alignment and operational oversight"
    ]
  },
  operations: {
    title: "Operational Improvement",
    desc: "End-to-end workflow audits that remove costly bottlenecks, reduce rework, and protect profit margins as volume grows.",
    deliverables: [
      "Workflow and process bottleneck audit",
      "Standard Operating Procedures (SOPs)",
      "Cost-structure and resource utilisation review",
      "Delivery quality and SLA frameworks"
    ]
  },
  growth: {
    title: "Business Growth & Development",
    desc: "Structured commercial expansion designed for ambitious UK and international businesses ready to scale client retention and market share.",
    deliverables: [
      "Customer acquisition and retention architecture",
      "Service-line expansion and packaging",
      "Account growth and referral systems",
      "Quarterly growth sprint tracking"
    ]
  },
  creative: {
    title: "Creative and Professional Solutions",
    desc: "Investor-ready pitch decks, corporate brand alignment, and client-facing materials built to command trust in every room.",
    deliverables: [
      "Executive pitch decks and capability profiles",
      "Corporate brand and visual identity alignment",
      "Digital presence and web strategy",
      "Client-facing business collateral"
    ]
  }
};

function selectServiceAndScroll(serviceName, prefillMessage) {
  const select = document.getElementById("client-service");
  const messageEl = document.getElementById("client-message");
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

  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  setTimeout(() => document.getElementById("client-name")?.focus(), 420);
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
      btn.textContent = "Copy email";
    }, 2000);
  });
}

function initServiceDrawer() {
  const modal = document.getElementById("service-modal");
  const closeBtn = document.getElementById("modal-close");
  const titleEl = document.getElementById("modal-title");
  const descEl = document.getElementById("modal-desc");
  const listEl = document.getElementById("modal-list");
  const inquireBtn = document.getElementById("modal-inquire-btn");

  let activeTitle = "";

  const close = () => {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  const open = (key) => {
    const svc = SERVICES[key];
    if (!svc || !modal) return;
    activeTitle = svc.title;
    titleEl.textContent = svc.title;
    descEl.textContent = svc.desc;
    listEl.innerHTML = svc.deliverables.map((item) => `<li>— ${item}</li>`).join("");
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeBtn?.focus();
  };

  document.querySelectorAll("[data-service-key]").forEach((btn) => {
    btn.addEventListener("click", () => open(btn.getAttribute("data-service-key")));
  });

  inquireBtn?.addEventListener("click", () => {
    close();
    selectServiceAndScroll(activeTitle, `I would like to explore ${activeTitle} for my business.`);
  });

  closeBtn?.addEventListener("click", close);
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

function initForm() {
  const form = document.getElementById("consultation-form");
  const confirmation = document.getElementById("form-confirmation");
  const previewEl = document.getElementById("brief-preview");
  const emailLink = document.getElementById("send-email-link");
  const waLink = document.getElementById("send-whatsapp-link");
  const copyBtn = document.getElementById("copy-brief-btn");
  const editBtn = document.getElementById("edit-brief-btn");

  if (!form || !confirmation) return;

  let briefText = "";

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

    let ok = true;
    if (name.length < 2) {
      errName.textContent = "Please enter your name.";
      ok = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errEmail.textContent = "Please enter a valid email address.";
      ok = false;
    }
    if (message.length < 8) {
      errMessage.textContent = "Please share a short note about your goals.";
      ok = false;
    }
    if (!ok) return;

    briefText = [
      `Inquiry — Himalaya Creative Studio Ltd`,
      `Name: ${name}`,
      `Company: ${company}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Service: ${service}`,
      ``,
      message
    ].join("\n");

    previewEl.textContent = briefText;
    const subject = encodeURIComponent(`Consultation: ${service} (${company !== "Not specified" ? company : name})`);
    const body = encodeURIComponent(briefText);
    emailLink.href = `mailto:${STUDIO_EMAIL}?subject=${subject}&body=${body}`;
    waLink.href = `https://wa.me/${STUDIO_WHATSAPP}?text=${body}`;

    form.style.display = "none";
    confirmation.classList.add("is-visible");
  });

  copyBtn?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(briefText);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = briefText;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    copyBtn.textContent = "Copied";
    setTimeout(() => {
      copyBtn.textContent = "Copy brief";
    }, 2000);
  });

  editBtn?.addEventListener("click", () => {
    confirmation.classList.remove("is-visible");
    form.style.display = "block";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initCopyEmail();
  initServiceDrawer();
  initForm();
});
