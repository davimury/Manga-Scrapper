const puppeteer = require("puppeteer");

async function getPagesNumber() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://unionmangas.top/lista-mangas/a-z/1/*");
  const PagesNumber = await page.waitForSelector(".bloco-manga").then(() =>
    page.evaluate(() => {
      return document
        .querySelectorAll(".pagination > li > a")[6]
        .href.match(/\d+/g)
        .map(Number)[0];
    })
  );
  await browser.close();

  return PagesNumber;
}

module.exports = getPagesNumber();
