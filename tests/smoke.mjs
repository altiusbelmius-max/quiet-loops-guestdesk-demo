// Playwright smoke for the three demo pages at 390 and 1180 wide.
// Run: node tests/smoke.mjs   (needs playwright + chromium; NODE_PATH falls back to the global npm root)
import { createRequire } from 'node:module';
import { execSync, spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

const require = createRequire(import.meta.url);
let pw;
try { pw = require('playwright'); } catch { pw = require(path.join(execSync('npm root -g').toString().trim(), 'playwright')); }
const { chromium } = pw;

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const PORT = 8765, BASE = `http://127.0.0.1:${PORT}`;
const OUT = process.env.SMOKE_OUT || path.join(ROOT, 'tests', 'shots');
mkdirSync(OUT, { recursive: true });

const server = spawn('python3', ['-m', 'http.server', String(PORT), '--bind', '127.0.0.1'], { cwd: ROOT, stdio: 'ignore' });
await new Promise(r => setTimeout(r, 700));

const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
const VIEWPORTS = [{ w: 390, h: 844, tag: 'phone' }, { w: 1180, h: 800, tag: 'desktop' }];
const PAGES = [
  { url: '/', name: 'guesthouse' },
  { url: '/brasa/', name: 'brasa' },
  { url: '/xxi/?agora=12:10&dia=3', name: 'xxi' },
];

const browser = await chromium.launch();
try {
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, permissions: ['clipboard-read', 'clipboard-write'] });
    for (const p of PAGES) {
      const page = await ctx.newPage();
      const errors = [];
      page.on('pageerror', e => errors.push('pageerror: ' + e.message));
      // font CDN fetches fail behind a sandbox proxy; that is the environment, not the page
      page.on('console', m => { if (m.type() === 'error' && !/ERR_CERT_AUTHORITY_INVALID|ERR_PROXY|ERR_TUNNEL/.test(m.text())) errors.push('console: ' + m.text()); });
      await page.goto(BASE + p.url, { waitUntil: 'networkidle' });
      const tag = `${p.name}@${vp.tag}`;
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      check(overflow <= 0, `${tag}: horizontal overflow ${overflow}px`);
      await page.screenshot({ path: path.join(OUT, `${p.name}-${vp.tag}.png`), fullPage: false });

      if (p.name === 'brasa') {
        const html = await page.content();
        check(!/xxi\//.test(html), `${tag}: brasa links to /xxi/`);
        check(html.includes('O Uber trata das entregas. O loop trata do balcão.'), `${tag}: positioning line missing`);
        check(html.includes('sem comissões nos levantamentos'), `${tag}: message 3 not reframed`);
        // owner view is the default and shows the two escalations
        check(await page.locator('#owner').isVisible(), `${tag}: owner view not default`);
        check(await page.locator('#app').isHidden(), `${tag}: loop view visible by default`);
        check((await page.locator('.ph-in').count()) === 2, `${tag}: expected 2 escalation cards`);
        check((await page.locator('#ph-sum').textContent()).includes('2 precisam de ti'), `${tag}: summary line before confirm`);
        // reply via chip confirms Paulo
        await page.locator('.ph-chip').click();
        check((await page.locator('.ph-out').count()) === 1, `${tag}: owner reply bubble missing`);
        check((await page.locator('.ph-ack').count()) === 1, `${tag}: loop ack missing`);
        // reply via free text confirms Cláudia
        await page.fill('#ph-input', 'Sim, manda o frango');
        await page.locator('#ph-send').click();
        check((await page.locator('.ph-out').count()) === 2, `${tag}: second owner reply missing`);
        check((await page.locator('#ph-sum').textContent()).includes('nada precisa de ti'), `${tag}: calm summary line missing`);
        check(await page.locator('#ph-input').isDisabled(), `${tag}: compose should be disabled when nothing is pending`);
        // state flipped in the loop view
        await page.locator('#vt-loop').click();
        check(await page.locator('#app').isVisible(), `${tag}: loop view not shown after toggle`);
        const confirmed = await page.locator('.status.conf').count();
        check(confirmed === 2, `${tag}: expected 2 Confirmed pills in the list, got ${confirmed}`);
        await page.locator('.msg[data-id="4"]').click();
        await page.waitForTimeout(300);
        check(await page.locator('#x-gate.done').isVisible(), `${tag}: gate not shown as confirmed after phone reply`);
        check(!(await page.content()).includes('[object Object]'), `${tag}: [object Object] rendered`);
        await page.screenshot({ path: path.join(OUT, `brasa-loop-${vp.tag}.png`) });
        await page.keyboard.press('Escape'); // close the detail sheet on phone
        await page.locator('#reset').click();
        await page.locator('#vt-owner').click();
        check((await page.locator('.ph-out').count()) === 0, `${tag}: reset did not clear owner replies`);
      }

      if (p.name === 'xxi') {
        const robots = await page.locator('meta[name="robots"]').getAttribute('content');
        check(robots === 'noindex,nofollow', `${tag}: robots meta is ${robots}`);
        const banner = page.locator('#demo-banner');
        check(await banner.isVisible(), `${tag}: banner not visible`);
        check((await banner.textContent()).includes('não é o site oficial'), `${tag}: banner text`);
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        const bannerBox = await banner.boundingBox();
        check(bannerBox && bannerBox.y === 0, `${tag}: banner not sticky after scroll (y=${bannerBox && bannerBox.y})`);
        await page.evaluate(() => window.scrollTo(0, 0));
        check((await page.locator('#now-text').textContent()).includes('Cozinha aberta'), `${tag}: status line at 12:10`);
        // build a cart
        await page.locator('.item[data-id="frango"] button[data-d="1"]').click();
        await page.locator('.item[data-id="chips"] button[data-d="1"]').click();
        await page.locator('.item[data-id="chips"] button[data-d="1"]').click();
        check((await page.locator('#cart-sum').textContent()).includes('22,00€'), `${tag}: cart total`);
        await page.locator('#go').click();
        check(await page.locator('#sheet').isVisible(), `${tag}: checkout sheet`);
        check(await page.locator('#pay').isDisabled(), `${tag}: pay enabled before slot`);
        const firstSlot = await page.locator('.slot').first().textContent();
        check(firstSlot === '12h45', `${tag}: first slot at 12:10 should be 12h45, got ${firstSlot}`);
        await page.locator('.slot').first().click();
        await page.fill('#name', 'Ana');
        await page.locator('input[name="deliv"][value="glovo"]').check();
        const gt = await page.locator('#glovo-text').inputValue();
        check(gt.includes('Rua Cervantes 1A') && gt.includes('já paga, só levantar') && /XXI-0\d{3}/.test(gt), `${tag}: glovo text: ${gt}`);
        await page.locator('#copy').click();
        await page.locator('#copy', { hasText: 'Copiado' }).waitFor({ timeout: 2000 }).catch(() => failures.push(`${tag}: copy feedback`));
        const bb = await banner.boundingBox(), hb = await page.locator('.sheet-head').boundingBox();
        check(bb && bb.y === 0 && hb && hb.y >= bb.y + bb.height - 1, `${tag}: banner covered by checkout sheet (banner y=${bb && bb.y}, sheet head y=${hb && hb.y})`);
        await page.screenshot({ path: path.join(OUT, `xxi-checkout-${vp.tag}.png`) });
        await page.fill('#mbway', '912345678');
        await page.locator('#pay').click();
        await page.locator('#paid').waitFor({ state: 'visible', timeout: 3000 });
        check(await page.locator('#sec-conf').isVisible(), `${tag}: confirmation missing`);
        check(/XXI-0\d{3}/.test(await page.locator('#conf-no').textContent()), `${tag}: order no. on confirmation`);
        check((await page.locator('#ticket').textContent()).includes('TALÃO COZINHA'), `${tag}: kitchen ticket`);
        check((await page.locator('#ticket').textContent()).includes('ESTAFETA GLOVO'), `${tag}: ticket delivery mode`);
        check(await page.locator('#glovo2').isVisible(), `${tag}: glovo text on confirmation`);
        await page.screenshot({ path: path.join(OUT, `xxi-confirm-${vp.tag}.png`), fullPage: true });
        const sheetOverflow = await page.evaluate(() => { const s = document.getElementById('sheet'); return s.scrollWidth - s.clientWidth; });
        check(sheetOverflow <= 0, `${tag}: checkout sheet horizontal overflow ${sheetOverflow}px`);
        // dead window and Monday
        await page.goto(BASE + '/xxi/?agora=15:10&dia=3', { waitUntil: 'networkidle' });
        check((await page.locator('#now-text').textContent()).includes('levanta às 18h00+'), `${tag}: dead-window status`);
        await page.locator('.item[data-id="meio"] button[data-d="1"]').click();
        await page.locator('#go').click();
        check((await page.locator('#slot-notice').textContent()).includes('levanta às 18h00+'), `${tag}: dead-window notice`);
        check((await page.locator('.slot').first().textContent()) === '18h00', `${tag}: dead-window first slot`);
        await page.goto(BASE + '/xxi/?agora=13:00&dia=1', { waitUntil: 'networkidle' });
        check((await page.locator('#now-text').textContent()).includes('segunda'), `${tag}: Monday status`);
        await page.locator('.item[data-id="meio"] button[data-d="1"]').click();
        await page.locator('#go').click();
        check((await page.locator('#slot-day').textContent()).includes('ter'), `${tag}: Monday should offer Tuesday slots`);
      }

      if (p.name === 'guesthouse') {
        const html = await page.content();
        check(!/xxi\//.test(html), `${tag}: guesthouse links to /xxi/`);
      }

      check(errors.length === 0, `${tag}: ${errors.join(' | ')}`);
      await page.close();
    }
    await ctx.close();
  }
} finally {
  await browser.close();
  server.kill();
}

if (failures.length) { console.error('SMOKE FAILED\n- ' + failures.join('\n- ')); process.exit(1); }
console.log(`SMOKE OK · ${PAGES.length} pages × ${VIEWPORTS.length} viewports · screenshots in ${path.relative(ROOT, OUT)}/`);
