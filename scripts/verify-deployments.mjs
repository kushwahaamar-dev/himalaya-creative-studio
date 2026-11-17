#!/usr/bin/env node
import assert from "node:assert/strict";
import { Browser, sleep } from "/Users/amar/Codes/ak/.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs";

const targets = process.argv.slice(2);
if (!targets.length) {
  console.error("Usage: node scripts/verify-deployments.mjs <url...>");
  process.exit(2);
}

const browser = await Browser.launch();
try {
  for (const url of targets) {
    const page = await browser.newPage({ width: 1440, height: 900 });
    const status = await page.goto(url, { timeoutMs: 30000, settleMs: 600 });
    await sleep(800);

    const check = await page.eval(`(() => {
      const h1 = document.querySelector("h1")?.innerText.trim();
      const beforeFee = document.getElementById("pricing-amount")?.innerText.trim();
      const retainerBtn = document.querySelector('[data-scope="retainer"]');
      retainerBtn?.click();
      const afterFee = document.getElementById("pricing-amount")?.innerText.trim();
      const routedEmail = document.getElementById("routed-email")?.innerText.trim();

      const patanTile = document.querySelector('[data-work-id="patan"]');
      patanTile?.click();
      const activeWork = document.getElementById("ledger-title")?.innerText.trim();

      const summitBtn = document.querySelector('[data-cal-mode="summit"]');
      summitBtn?.click();
      const specimenTracking = document.getElementById("cal-specimen")?.style.letterSpacing;

      const stage2 = document.querySelector('[data-stage="1"]');
      stage2?.click();
      const stage2Open = stage2?.classList.contains("is-open");

      const brokenImages = [...document.images].filter(i => i.complete && i.naturalWidth === 0).length;
      return { h1, beforeFee, afterFee, routedEmail, activeWork, specimenTracking, stage2Open, brokenImages };
    })()`);

    assert.equal(check.h1, "BUILT FOR", `${url}: expected H1 'BUILT FOR'`);
    assert.equal(check.beforeFee, "£28,000", `${url}: expected initial fee £28,000`);
    assert.equal(check.afterFee, "£34,000", `${url}: expected toggled fee £34,000`);
    assert.equal(check.routedEmail, "projects@himalayacreativestudio.com", `${url}: expected routed desk email`);
    assert.match(check.activeWork, /Patan Foundry/i, `${url}: expected work ledger to switch to Patan Foundry`);
    assert.equal(check.specimenTracking, "-0.045em", `${url}: expected calibrator tracking -0.045em`);
    assert.equal(check.stage2Open, true, `${url}: expected stage 2 accordion to open`);
    assert.equal(check.brokenImages, 0, `${url}: expected 0 broken images`);
    assert.equal(page.consoleErrors.length, 0, `${url}: expected 0 console errors`);

    console.log(JSON.stringify({ url, status, verified: true, ...check }));
    await page.close();
  }
} finally {
  await browser.close();
}
