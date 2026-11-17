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
      const h1Before = document.getElementById("backdrop-title")?.innerText.trim();
      const card = document.querySelector('[data-project="solukhumbu"]');
      card?.dispatchEvent(new MouseEvent("mouseenter"));
      const h1After = document.getElementById("backdrop-title")?.innerText.trim();

      card?.click();
      const inspectorOpen = document.getElementById("project-inspector")?.classList.contains("is-open");
      const inspectorTitle = document.getElementById("inspector-title")?.innerText.trim();
      document.getElementById("inspector-close")?.click();

      document.getElementById("theme-toggle")?.click();
      const darkTheme = document.documentElement.getAttribute("data-theme");

      const creditsPresent = document.body.innerText.includes("Wikimedia Commons");
      const brokenImages = [...document.images].filter(i => i.complete && i.naturalWidth === 0).length;
      return { h1Before, h1After, inspectorOpen, inspectorTitle, darkTheme, creditsPresent, brokenImages };
    })()`);

    assert.equal(check.h1Before, "Himalaya", `${url}: expected initial backdrop 'Himalaya'`);
    assert.equal(check.h1After, "Solukhumbu", `${url}: expected hovered backdrop 'Solukhumbu'`);
    assert.equal(check.inspectorOpen, true, `${url}: expected 3D project inspector to open`);
    assert.equal(check.inspectorTitle, "Solukhumbu", `${url}: expected inspector title 'Solukhumbu'`);
    assert.equal(check.darkTheme, "dark", `${url}: expected theme toggle to set dark mode`);
    assert.equal(check.creditsPresent, false, `${url}: expected Wikimedia credit wall to be removed`);
    assert.equal(check.brokenImages, 0, `${url}: expected 0 broken images`);
    assert.equal(page.consoleErrors.length, 0, `${url}: expected 0 console errors`);

    console.log(JSON.stringify({ url, status, verified: true, ...check }));
    await page.close();
  }
} finally {
  await browser.close();
}
