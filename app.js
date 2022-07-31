const puppeteer = require("puppeteer");
const inputs = require("./inputs.json");
const words = require("./words.json");
const { determineBestWord } = require("./determineBestWord.js");
const iPhone = puppeteer.devices["iPhone X"];

const convertWordToInputs = (word) => {
  let thingsToInput = [];
  word.split("").forEach((letter) => {
    thingsToInput.push([inputs[letter][0], inputs[letter][1]]);
  });
  return thingsToInput;
};

const asyncInputWord = (page, word) => {
  if (word !== "done!") {
    return new Promise(async (resolve, reject) => {
      for (let i = 0; i < convertWordToInputs(word).length; i++) {
        await page.click(
          `#wordle-app-game > div.Keyboard-module_keyboard__1HSnn > div:nth-child(${
            convertWordToInputs(word)[i][0]
          }) > button:nth-child(${convertWordToInputs(word)[i][1]})`
        );
        await page.waitForTimeout(500);
      }
      await page.click(
        `#wordle-app-game > div.Keyboard-module_keyboard__1HSnn > div:nth-child(3) > button:nth-child(1)`
      );

      await page.waitForTimeout(2000);

      let letters = await page.evaluate(() => {
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
      return resolve(letters);
    }).catch((err) => console.log(err));
  } else {
    return new Promise((resolve, reject) => {
      return resolve([
        { text: "C", state: "correct" },
        { text: "R", state: "correct" },
        { text: "A", state: "correct" },
        { text: "M", state: "correct" },
        { text: "P", state: "correct" },
      ]);
    }).catch((err) => console.log(err));
  }
};

const run = (firstWord) => {
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch({
        headless: false,
        args: [`--window-size=450,950`],
        defaultViewport: {
          width: 450,
          height: 900,
          isMobile: true,
        },
      });
      const page = await browser.newPage();
      await page.emulate(iPhone);
      await page.goto("https://www.nytimes.com/games/wordle/index.html");
      await page.click(
        "#wordle-app-game > div.Modal-module_modalOverlay__81ZCi.Modal-module_enableAuth__SR682 > div > div > svg"
      );
      await page.waitForTimeout(1000);

      let first = await asyncInputWord(page, firstWord);
      let second = await asyncInputWord(page, determineBestWord(first));
      let third = await asyncInputWord(page, determineBestWord(second));
      let fourth = await asyncInputWord(page, determineBestWord(third));
      let fifth = await asyncInputWord(page, determineBestWord(fourth));
      let final = await asyncInputWord(page, determineBestWord(fifth));

      await page.waitForTimeout(30000);
      browser.close();
      return resolve(final);
    } catch (e) {
      return reject(e);
    }
  });
};

run("adieu").then(console.log).catch(console.error);
