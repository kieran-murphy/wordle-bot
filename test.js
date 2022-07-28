const puppeteer = require('puppeteer');
function run () {
    return new Promise(async (resolve, reject) => {
        try {
            const browser = await puppeteer.launch({"headless": false});
            const page = await browser.newPage();
            await page.goto("https://news.ycombinator.com/");
            await page.waitForTimeout(2000);
            let urls = await page.evaluate(() => {
                let results = [];
                let items = document.querySelectorAll('a.titlelink');
                items.forEach((item) => {
                    results.push({
                        url:  item.getAttribute('href'),
                        text: item.innerText,
                    });
                });
                return results;
            })
            browser.close();
            return resolve(urls);
        } catch (e) {
            return reject(e);
        }
    })
}
run().then(console.log).catch(console.error);