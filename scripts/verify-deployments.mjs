#!/usr/bin/env node
import assert from "node:assert/strict";
import { mkdirSync } from "node:fs";
import { Browser, sleep } from "/Users/amar/Codes/ak/.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs";

const targets = process.argv.slice(2);
if (!targets.length) {
  console.error("Usage: node scripts/verify-deployments.mjs <url...>");
  process.exit(2);
}

mkdirSync("/tmp/himalaya-consultancy", { recursive: true });
const browser = await Browser.launch();

try {
  for (let i = 0; i < targets.length; i++) {
    const url = targets[i];
    const page = await browser.newPage({ width: 1440, height: 900 });
    const status = await page.goto(url, { timeoutMs: 30000, settleMs: 600 });
    await page.eval("document.fonts.ready.then(() => true)").catch(() => {});
    await sleep(700);

    if (i === 0) {
      await page.screenshot({ path: "/tmp/himalaya-consultancy/1-hero.jpg", quality: 85 });
      await page.eval("window.scrollTo({ top: 920, behavior: 'instant' })");
      await sleep(300);
      await page.screenshot({ path: "/tmp/himalaya-consultancy/2-services.jpg", quality: 85 });
      await page.eval("window.scrollTo({ top: 1820, behavior: 'instant' })");
      await sleep(300);
      await page.screenshot({ path: "/tmp/himalaya-consultancy/3-diagnostic.jpg", quality: 85 });
      await page.eval("window.scrollTo({ top: 3450, behavior: 'instant' })");
      await sleep(300);
      await page.screenshot({ path: "/tmp/himalaya-consultancy/4-contact-footer.jpg", quality: 85 });
      await page.eval("window.scrollTo({ top: 0, behavior: 'instant' })");
      await sleep(200);
    }

    const check = await page.eval(`(() => {
      const text = document.body.innerText;
      const hasAddress = text.includes("16 Dimond Close, E7 0HZ, London, UK");
      const hasPhone = text.includes("07467 604323");
      const hasEmail = text.includes("Himalayacreativestudio@gmail.com");

      document.querySelector('[data-service-key="operations"]')?.click();
      const modalOpen = document.getElementById("service-modal")?.classList.contains("is-open");
      const modalTitle = document.getElementById("modal-title")?.innerText.trim();
      document.getElementById("modal-inquire-btn")?.click();
      const modalClosed = !document.getElementById("service-modal")?.classList.contains("is-open");
      const selectedAfterModal = document.getElementById("client-service")?.value;

      document.querySelector('[data-diag-group="challenge"][data-diag-value="strategy"]')?.click();
      document.querySelector('[data-diag-group="horizon"][data-diag-value="6m"]')?.click();
      const diagTitle = document.getElementById("diag-title")?.innerText.trim();
      document.getElementById("diag-apply-btn")?.click();
      const prefilledMessage = document.getElementById("client-message")?.value || "";

      document.querySelector('[data-phase="2"]')?.click();
      const phaseTitle = document.getElementById("phase-title")?.innerText.trim();

      document.getElementById("client-name").value = "Amar Test";
      document.getElementById("client-company").value = "London Holdings Ltd";
      document.getElementById("client-email").value = "client@londonholdings.co.uk";
      document.getElementById("client-phone").value = "07467604323";
      document.getElementById("consultation-form").dispatchEvent(new Event("submit", { cancelable: true }));
      const confirmVisible = document.getElementById("form-confirmation")?.classList.contains("is-visible");
      const emailHref = document.getElementById("send-email-link")?.getAttribute("href") || "";
      const waHref = document.getElementById("send-whatsapp-link")?.getAttribute("href") || "";

      const brokenImages = [...document.images].filter(img => img.complete && img.naturalWidth === 0).length;
      const overflowX = document.documentElement.scrollWidth - window.innerWidth;

      return {
        hasAddress,
        hasPhone,
        hasEmail,
        modalOpen,
        modalTitle,
        modalClosed,
        selectedAfterModal,
        diagTitle,
        prefilledMessageContainsRoadmap: prefilledMessage.includes("Executive Strategy & Market Roadmap"),
        phaseTitle,
        confirmVisible,
        emailHrefValid: emailHref.startsWith("mailto:Himalayacreativestudio@gmail.com?subject="),
        waHrefValid: waHref.startsWith("https://wa.me/447467604323?text="),
        brokenImages,
        overflowX
      };
    })()`);

    assert.equal(check.hasAddress, true, `${url}: missing London address`);
    assert.equal(check.hasPhone, true, `${url}: missing phone 07467 604323`);
    assert.equal(check.hasEmail, true, `${url}: missing email Himalayacreativestudio@gmail.com`);
    assert.equal(check.modalOpen, true, `${url}: service modal failed to open`);
    assert.equal(check.modalTitle, "Operational Improvement", `${url}: wrong modal title`);
    assert.equal(check.modalClosed, true, `${url}: service modal failed to close on inquire`);
    assert.equal(check.selectedAfterModal, "Operational Improvement", `${url}: service select not pre-filled`);
    assert.equal(check.diagTitle, "Executive Strategy & Market Roadmap", `${url}: diagnostic failed to update`);
    assert.equal(check.prefilledMessageContainsRoadmap, true, `${url}: diagnostic failed to prefill form`);
    assert.equal(check.phaseTitle, "Operational Execution & Rollout", `${url}: approach tab failed to switch`);
    assert.equal(check.confirmVisible, true, `${url}: consultation form confirmation did not appear`);
    assert.equal(check.emailHrefValid, true, `${url}: mailto link malformed`);
    assert.equal(check.waHrefValid, true, `${url}: WhatsApp link malformed`);
    assert.equal(check.brokenImages, 0, `${url}: broken images detected`);
    assert.ok(check.overflowX <= 1, `${url}: horizontal overflow ${check.overflowX}px`);
    assert.equal(page.consoleErrors.length, 0, `${url}: console errors detected`);

    console.log(JSON.stringify({ url, status, verified: true, ...check }));
    await page.close();
  }

  const mob = await browser.newPage({ width: 390, height: 844, mobile: true });
  await mob.goto(targets[0], { timeoutMs: 30000, settleMs: 600 });
  await sleep(600);
  await mob.screenshot({ path: "/tmp/himalaya-consultancy/5-mobile.jpg", quality: 85 });
  const mobCheck = await mob.eval(`(() => {
    document.getElementById("menu-toggle")?.click();
    const drawerOpen = document.getElementById("mobile-drawer")?.classList.contains("is-open");
    document.querySelector("[data-drawer-link]")?.click();
    const drawerClosed = !document.getElementById("mobile-drawer")?.classList.contains("is-open");
    return { drawerOpen, drawerClosed, overflowX: document.documentElement.scrollWidth - window.innerWidth };
  })()`);
  assert.equal(mobCheck.drawerOpen, true, "mobile menu failed to open");
  assert.equal(mobCheck.drawerClosed, true, "mobile menu failed to close");
  assert.ok(mobCheck.overflowX <= 1, `mobile horizontal overflow ${mobCheck.overflowX}px`);
  console.log(JSON.stringify({ mobileVerified: true, ...mobCheck }));
  await mob.close();
} finally {
  await browser.close();
}
