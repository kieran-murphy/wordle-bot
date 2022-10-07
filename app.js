const puppeteer = require("puppeteer");
const inputs = require("./inputs.json");
const words = require("./words.json");
const { determineBestWord } = require("./determineBestWord.js");
const { convertWordToInputs, asyncInputWord } = require("./asyncInputWord");
const myArgs = process.argv.slice(2);
// const iPhone = puppeteer.devices["iPhone 11"];

const run = (firstWord) => {
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch({
        headless: false,
        args: [`--window-size=450,950`],
        defaultViewport: {
          width: 500,
          height: 800,
          isMobile: true,
        },
      });
      const page = await browser.newPage();
      // await page.emulate(iPhone);
      await page.goto("https://www.nytimes.com/games/wordle/index.html");
      await page.click(
        "body > div > div > dialog > div > button"
      );
      await page.waitForTimeout(1000);
      await page.click("#settings-button > svg > path");
      await page.waitForTimeout(1000);
      await page.click("#hardMode > button");
      await page.waitForTimeout(1000);
      await page.click(
        "body > div > div > dialog > div > button"
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

      await page.waitForTimeout(10000);
      browser.close();
      return resolve([]);
    } catch (e) {
      return reject(e);
    }
  });
};

if (myArgs.length > 0) {
  run(myArgs[0]).then(console.log).catch(console.error);
} else {
  run("adieu").then(console.log).catch(console.error);
}