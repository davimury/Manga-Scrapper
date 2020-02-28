const puppeteer = require('puppeteer');
var Mangas = require('../mangas.json');

(async () => {
	const baseURL = 'https://unionmangas.top';
	const browser = await puppeteer.launch({
		headless: false,
		defaultViewport: null
	});
	const page = await browser.newPage();
	//Mangas.length
	for (i = 0; i < 2; i++) {
		await page.goto(baseURL + Mangas[i].pathName);
		const getInfo = await page.waitForSelector('h4:only-child').then(() =>
			page.evaluate(() => {
				var score = document.querySelectorAll('h2:only-child')[1].childNodes[0].wholeText;
				var alt_title = document.querySelectorAll('h4:only-child')[0].childNodes[1].wholeText;

				var Manga;

				function isEven(n) {
					if (n % 2 == 0) return n;
					else return null;
				}
				Manga = {
					score: score,
					alt_title: alt_title
				};

				console.log(Manga);
				/* forEach(Mangas, (value, index) => {
				
			}); */
			})
		);
		console.log(getInfo);
	}
})().catch((err) => {
	console.log('error: ' + err);
});
