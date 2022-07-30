const puppeteer = require("puppeteer");
const inputs = require("./inputs.json");

const convertWordToInputs = (word) => {
  let thingsToInput = [];
  word.split("").forEach((letter) => {
    thingsToInput.push([inputs[letter][0], inputs[letter][1]]);
  });
  return thingsToInput;
};

function run(word) {

  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.goto("https://www.nytimes.com/games/wordle/index.html");
      await page.click(
        "#wordle-app-game > div.Modal-module_modalOverlay__81ZCi.Modal-module_enableAuth__SR682 > div > div > svg"
      );
      await page.waitForTimeout(1000);


      for (let i = 0; i < convertWordToInputs("roate?").length; i++) {
        await page.click(
          `#wordle-app-game > div.Keyboard-module_keyboard__1HSnn > div:nth-child(${convertWordToInputs("roate?")[i][0]}) > button:nth-child(${convertWordToInputs("roate?")[i][1]})`
        );
        await page.waitForTimeout(1000);
      }

      await page.waitForTimeout(1000);

      for (let i = 0; i < convertWordToInputs("slice?").length; i++) {
        await page.click(
          `#wordle-app-game > div.Keyboard-module_keyboard__1HSnn > div:nth-child(${convertWordToInputs("slice?")[i][0]}) > button:nth-child(${convertWordToInputs("slice?")[i][1]})`
        );
        await page.waitForTimeout(1000);
      }

      await page.waitForTimeout(5000);
      let urls = await page.evaluate(() => {
        let results = [];
        let items = document.querySelectorAll("div.Tile-module_tile__3ayIZ");
        items.forEach((item) => {
          results.push({
            text: item.innerText,
            state: item.getAttribute("data-state"),
          });
        });
        return results;
      });
      browser.close();
      return resolve(urls);
    } catch (e) {
      return reject(e);
    }
  });
}
run().then(console.log).catch(console.error);
