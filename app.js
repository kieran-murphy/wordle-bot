const puppeteer = require("puppeteer");
const inputs = require("./inputs.json");
const iPhone = puppeteer.devices['iPhone X'];

const convertWordToInputs = (word) => {
  let thingsToInput = [];
  word.split("").forEach((letter) => {
    thingsToInput.push([inputs[letter][0], inputs[letter][1]]);
  });
  return thingsToInput;
};

const asyncInputWord = (page, word) => {
  return new Promise(async (resolve, reject) => {
    for (let i = 0; i < convertWordToInputs(word).length; i++) {
      await page.click(
        `#wordle-app-game > div.Keyboard-module_keyboard__1HSnn > div:nth-child(${
          convertWordToInputs(word)[i][0]
        }) > button:nth-child(${convertWordToInputs(word)[i][1]})`
      );
      await page.waitForTimeout(500);
    }

    await page.waitForTimeout(2000);

    let urls = await page.evaluate(() => {
      let results = [];
      let items = document.querySelectorAll("div.Tile-module_tile__3ayIZ");
      items.forEach((item) => {
        if (item.getAttribute("data-state") != "empty") {
          results.push({
            text: item.innerText,
            state: item.getAttribute("data-state"),
          });
        }
      });

      return results;
    });
    return resolve(urls);
  }).catch((err) => console.log(err));
};

const determineBestWord = (urls) => {
  return "clown?";
};

const run = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch({
        headless: false,
        args: [`--window-size=450,950`],
        defaultViewport: {
          width: 450,
          height: 900,
          isMobile: true,
        }
        
      });
      const page = await browser.newPage();
      await page.emulate(iPhone);
      await page.goto("https://www.nytimes.com/games/wordle/index.html");
      await page.click(
        "#wordle-app-game > div.Modal-module_modalOverlay__81ZCi.Modal-module_enableAuth__SR682 > div > div > svg"
      );
      await page.waitForTimeout(1000);

      let first = await asyncInputWord(page, "roate?");
      let second = await asyncInputWord(page, determineBestWord(first));
      let third = await asyncInputWord(page, "dream?");
      let fourth = await asyncInputWord(page, "rager?");
      let fifth = await asyncInputWord(page, "lover?");
      let final = await asyncInputWord(page, "final?");

      // browser.close();
      return resolve(final);
    } catch (e) {
      return reject(e);
    }
  });
};
run().then(console.log).catch(console.error);
