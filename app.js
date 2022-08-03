const puppeteer = require("puppeteer");
const inputs = require("./inputs.json");
const words = require("./words.json");
const { determineBestWord } = require("./determineBestWord.js");
const { convertWordToInputs, asyncInputWord } = require("./asyncInputWord");
// const iPhone = puppeteer.devices["iPhone X"];

const run = (firstWord) => {
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch({
        headless: false,
        // args: [`--window-size=450,950`],
        // defaultViewport: {
        //   width: 450,
        //   height: 900,
        //   isMobile: true,
        // },
      });
      const page = await browser.newPage();
      // await page.emulate(iPhone);
      await page.goto("https://www.nytimes.com/games/wordle/index.html");
      await page.click(
        "#wordle-app-game > div.Modal-module_modalOverlay__81ZCi.Modal-module_enableAuth__SR682 > div > div > svg"
      );
      await page.waitForTimeout(1000);
      await page.click("#settings-button > svg > path");
      await page.waitForTimeout(1000);
      await page.click("#hardMode > button");
      await page.waitForTimeout(1000);
      await page.click(
        "#wordle-app-game > div.Modal-module_modalOverlay__81ZCi.Modal-module_enableAuth__SR682 > div > div.Modal-module_closeIcon__b4z74 > svg"
      );
      await page.waitForTimeout(1000);

      let first = await asyncInputWord(page, firstWord);
      let second = await asyncInputWord(page, determineBestWord(first));
      let third = await asyncInputWord(page, determineBestWord(second));
      let fourth = await asyncInputWord(page, determineBestWord(third));
      let fifth = await asyncInputWord(page, determineBestWord(fourth));
      let final = await asyncInputWord(page, determineBestWord(fifth));

      
      await page.waitForTimeout(4000);
      await page.click("#share-button");

      await page.waitForTimeout(30000);
      browser.close();
      return resolve(final);
    } catch (e) {
      return reject(e);
    }
  });
};

run("roate").then(console.log).catch(console.error);
