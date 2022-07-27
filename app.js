const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto("https://www.nytimes.com/games/wordle/index.html");
  await page.click(
    "#wordle-app-game > div.Modal-module_modalOverlay__81ZCi.Modal-module_enableAuth__SR682 > div > div > svg"
  );
  await page.waitForTimeout(1000);
  await page.click(
    "#wordle-app-game > div.Keyboard-module_keyboard__1HSnn > div:nth-child(1) > button:nth-child(4)"
  );
  await page.waitForTimeout(1000);
  await page.click(
    "#wordle-app-game > div.Keyboard-module_keyboard__1HSnn > div:nth-child(1) > button:nth-child(9)"
  );
  await page.waitForTimeout(1000);
  await page.click(
    "#wordle-app-game > div.Keyboard-module_keyboard__1HSnn > div:nth-child(2) > button:nth-child(2)"
  );
  await page.waitForTimeout(1000);
  await page.click(
    "#wordle-app-game > div.Keyboard-module_keyboard__1HSnn > div:nth-child(1) > button:nth-child(5)"
  );
  await page.waitForTimeout(1000);
  await page.click(
    "#wordle-app-game > div.Keyboard-module_keyboard__1HSnn > div:nth-child(1) > button:nth-child(3)"
  );
  await page.waitForTimeout(1000); 
  await page.click(
    "#wordle-app-game > div.Keyboard-module_keyboard__1HSnn > div:nth-child(3) > button:nth-child(1)"
  );
  await page.waitForTimeout(5000);
  await browser.close();
})();
