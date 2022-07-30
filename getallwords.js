const puppeteer = require('puppeteer');
var fs = require('fs');

function run () {
    return new Promise(async (resolve, reject) => {
        try {
            const browser = await puppeteer.launch({"headless": false});
            const page = await browser.newPage();
            await page.goto("https://www.wordunscrambler.net/word-list/wordle-word-list");
            await page.waitForTimeout(5000);
            let urls = await page.evaluate(() => {
                let results = [];
                let items = document.querySelectorAll('li.invert.light');
                items.forEach((item) => {
                    results.push(
                        item.innerText,
                    );
                });
                return {"words": results};
            })
            var json = JSON.stringify(urls);
            fs.writeFile ("input.json", json, function(err) {
                if (err) throw err;
                console.log('complete');
                }
            );
            browser.close();
            return resolve(urls);
        } catch (e) {
            return reject(e);
        }
    })
}
run().then(console.log).catch(console.error);
