import { chromium } from 'playwright';

const persianWelcome = 'دستیار هوشمند داتیس';
const enWelcome = "DattisDev's AI assistant";
const arWelcome = 'مساعد داتيس ديف';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

for (const loc of ['en', 'ar', 'fa']) {
  await page.goto(`http://localhost:3001/${loc}`, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2000);
  await page.locator('button.fixed.bottom-6.left-6').click();
  await page.waitForTimeout(1500);
  const text = await page.locator('.fixed.bottom-24').innerText();
  const hasPersian = text.includes(persianWelcome);
  const hasEn = text.includes(enWelcome);
  const hasAr = text.includes(arWelcome);
  const ok =
    loc === 'fa'
      ? hasPersian && !hasEn
      : loc === 'en'
        ? hasEn && !hasPersian
        : hasAr && !hasPersian;
  console.log(JSON.stringify({ loc, hasPersian, hasEn, hasAr, ok }));
}

await browser.close();
