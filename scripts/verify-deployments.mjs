#!/usr/bin/env node
import assert from "node:assert/strict";
import { mkdirSync } from "node:fs";
import { Browser, sleep } from "/Users/amar/Codes/ak/.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs";

const targets = process.argv.slice(2);
if (!targets.length) {
  console.error("Usage: node scripts/verify-deployments.mjs <url...>");
  process.exit(2);
}

mkdirSync("/tmp/himalaya-minimal", { recursive: true });
const browser = await Browser.launch();

const REQUIRED_SERVICES = [
  "Business Development & Consultancy",
  "Strategic Planning",
  "Business Management Solutions",
  "Operational Improvement",
  "Business Growth & Development",
  "Creative and Professional Solutions",
];

const VIEWPORTS = [
  { name: "mobile-320", width: 320, height: 640, mobile: true },
  { name: "mobile-390", width: 390, height: 844, mobile: true },
  { name: "tablet-768", width: 768, height: 1024, mobile: false },
  { name: "laptop-1024", width: 1024, height: 768, mobile: false },
  { name: "desktop-1440", width: 1440, height: 900, mobile: false },
];

try {
  for (let i = 0; i < targets.length; i++) {
    const url = targets[i];
    const page = await browser.newPage({ width: 1440, height: 900 });
    const status = await page.goto(url, { timeoutMs: 30000, settleMs: 600 });
    await page.eval("document.fonts.ready.then(() => true)").catch(() => {});
    await sleep(700);

    if (i === 0) {
      await page.screenshot({ path: "/tmp/himalaya-minimal/1-hero.jpg", quality: 88 });
      await page.eval("document.getElementById('services')?.scrollIntoView({ behavior: 'instant' })");
      await sleep(350);
      await page.screenshot({ path: "/tmp/himalaya-minimal/2-services.jpg", quality: 88 });
      await page.eval("document.getElementById('mission')?.scrollIntoView({ behavior: 'instant' })");
      await sleep(350);
      await page.screenshot({ path: "/tmp/himalaya-minimal/3-mission-contact.jpg", quality: 88 });
      await page.eval("window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' })");
      await sleep(350);
      await page.screenshot({ path: "/tmp/himalaya-minimal/4-footer.jpg", quality: 88 });
      await page.eval("document.querySelector('[data-service-key=\"operations\"]')?.click()");
      await sleep(350);
      await page.screenshot({ path: "/tmp/himalaya-minimal/5-drawer.jpg", quality: 88 });
      await page.eval("document.getElementById('modal-close-btn')?.click()");
      await page.eval("window.scrollTo({ top: 0, behavior: 'instant' })");
      await sleep(200);
    }

    const check = await page.eval(`(() => {
      const text = document.body.innerText;
      const hasAddress = text.includes("16 Dimond Close, E7 0HZ, London, UK");
      const hasPhone = text.includes("07467 604323");
      const hasEmail = text.includes("Himalayacreativestudio@gmail.com");
      const requiredServices = ${JSON.stringify(REQUIRED_SERVICES)};
      const missingServices = requiredServices.filter((s) => !text.includes(s));

      const servicesSection = document.getElementById("services");
      const scrollMargin = servicesSection ? getComputedStyle(servicesSection).scrollMarginTop : "";

      document.querySelector('[data-service-key="operations"]')?.click();
      const modalOpen = document.getElementById("service-modal")?.classList.contains("is-open");
      const modalTitle = document.getElementById("modal-title")?.innerText.trim();
      document.getElementById("modal-inquire-btn")?.click();
      const modalClosed = !document.getElementById("service-modal")?.classList.contains("is-open");
      const selectedAfterModal = document.getElementById("client-service")?.value;

      document.getElementById("client-name").value = "Amar Test";
      document.getElementById("client-company").value = "London Holdings Ltd";
      document.getElementById("client-email").value = "client@londonholdings.co.uk";
      document.getElementById("client-phone").value = "07467604323";
      document.getElementById("client-message").value = "Looking for operational and growth advisory in Q3.";
      document.getElementById("consultation-form").dispatchEvent(new Event("submit", { cancelable: true }));
      const confirmVisible = document.getElementById("form-confirmation")?.classList.contains("is-visible");
      const emailHref = document.getElementById("send-email-link")?.getAttribute("href") || "";
      const waHref = document.getElementById("send-whatsapp-link")?.getAttribute("href") || "";

      const brokenImages = [...document.images].filter((img) => img.complete && img.naturalWidth === 0).length;
      const overflowX = document.documentElement.scrollWidth - window.innerWidth;
      const wordCount = text.trim().split(/\\s+/).filter(Boolean).length;

      return {
        hasAddress,
        hasPhone,
        hasEmail,
        missingServices,
        scrollMargin,
        modalOpen,
        modalTitle,
        modalClosed,
        selectedAfterModal,
        confirmVisible,
        emailHrefValid: emailHref.startsWith("mailto:Himalayacreativestudio@gmail.com?subject="),
        waHrefValid: waHref.startsWith("https://wa.me/447467604323?text="),
        brokenImages,
        overflowX,
        wordCount,
      };
    })()`);

    assert.equal(check.hasAddress, true, `${url}: missing London address`);
    assert.equal(check.hasPhone, true, `${url}: missing phone 07467 604323`);
    assert.equal(check.hasEmail, true, `${url}: missing email Himalayacreativestudio@gmail.com`);
    assert.deepEqual(check.missingServices, [], `${url}: missing services ${check.missingServices.join(", ")}`);
    assert.equal(check.scrollMargin, "96px", `${url}: scroll-margin-top mismatch (${check.scrollMargin})`);
    assert.equal(check.modalOpen, true, `${url}: service modal failed to open`);
    assert.equal(check.modalTitle, "Operational Improvement", `${url}: wrong modal title`);
    assert.equal(check.modalClosed, true, `${url}: service modal failed to close on inquire`);
    assert.equal(check.selectedAfterModal, "Operational Improvement", `${url}: service select not pre-filled`);
    assert.equal(check.confirmVisible, true, `${url}: consultation form confirmation did not appear`);
    assert.equal(check.emailHrefValid, true, `${url}: mailto link malformed`);
    assert.equal(check.waHrefValid, true, `${url}: WhatsApp link malformed`);
    assert.equal(check.brokenImages, 0, `${url}: broken images detected`);
    assert.ok(check.overflowX <= 1, `${url}: horizontal overflow ${check.overflowX}px`);
    assert.equal(page.consoleErrors.length, 0, `${url}: console errors detected`);

    console.log(JSON.stringify({ url, status, verified: true, ...check }));
    await page.close();

    for (const vp of VIEWPORTS) {
      const vpPage = await browser.newPage({ width: vp.width, height: vp.height, mobile: vp.mobile });
      await vpPage.goto(url, { timeoutMs: 30000, settleMs: 500 });
      await vpPage.eval("document.fonts.ready.then(() => true)").catch(() => {});
      await sleep(400);

      if (i === 0 && vp.name === "mobile-390") {
        await vpPage.screenshot({ path: "/tmp/himalaya-minimal/6-mobile-hero.jpg", quality: 88 });
        await vpPage.eval("document.getElementById('services')?.scrollIntoView({ behavior: 'instant' })");
        await sleep(300);
        await vpPage.screenshot({ path: "/tmp/himalaya-minimal/7-mobile-services.jpg", quality: 88 });
        await vpPage.eval("document.getElementById('contact')?.scrollIntoView({ behavior: 'instant' })");
        await sleep(300);
        await vpPage.screenshot({ path: "/tmp/himalaya-minimal/8-mobile-contact.jpg", quality: 88 });
        await vpPage.eval("window.scrollTo({ top: 0, behavior: 'instant' })");
        await sleep(200);
      }

      const vpCheck = await vpPage.eval(`(() => {
        const overflowX = document.documentElement.scrollWidth - window.innerWidth;
        const wideEls = [...document.querySelectorAll("body *")]
          .filter((el) => {
            const st = getComputedStyle(el);
            if (st.display === "none" || st.visibility === "hidden") return false;
            const r = el.getBoundingClientRect();
            return r.width > 0 && r.height > 0 && r.right > window.innerWidth + 1.5;
          })
          .map((el) => ({ tag: el.tagName, cls: el.className, right: Math.round(el.getBoundingClientRect().right) }));

        let drawerOpen = null;
        let drawerClosed = null;
        if (window.innerWidth <= 820) {
          document.getElementById("menu-toggle")?.click();
          drawerOpen = document.getElementById("mobile-drawer")?.classList.contains("is-open");
          document.querySelector("[data-drawer-link]")?.click();
          drawerClosed = !document.getElementById("mobile-drawer")?.classList.contains("is-open");
        }
        return { overflowX, wideEls: wideEls.slice(0, 5), drawerOpen, drawerClosed };
      })()`);

      assert.ok(vpCheck.overflowX <= 1, `${url} [${vp.name}]: overflowX=${vpCheck.overflowX}px`);
      assert.equal(vpCheck.wideEls.length, 0, `${url} [${vp.name}]: clipped elements ${JSON.stringify(vpCheck.wideEls)}`);
      if (vp.width <= 820) {
        assert.equal(vpCheck.drawerOpen, true, `${url} [${vp.name}]: mobile menu failed to open`);
        assert.equal(vpCheck.drawerClosed, true, `${url} [${vp.name}]: mobile menu failed to close`);
      }
      console.log(JSON.stringify({ url, viewport: vp.name, pass: true, ...vpCheck }));
      await vpPage.close();
    }
  }
} finally {
  await browser.close();
}
process.exit(0);
