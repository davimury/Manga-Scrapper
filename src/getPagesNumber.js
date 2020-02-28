const puppeteer = require('puppeteer');

getPagesNumber = async function() {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('https://unionmangas.top/lista-mangas/a-z/1/*');
	var PagesNumber = await page.waitForSelector('.bloco-manga').then(() =>
		page.evaluate(() => {
			return document.querySelectorAll('.pagination > li > a')[6].href.match(/\d+/g).map(Number)[0];
		})
	);
	await browser.close();
	number = PagesNumber;
	return number;
};

module.exports = getPagesNumber;
