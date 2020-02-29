const puppeteer = require('puppeteer');
var Mangas = require('../mangas.json');
/* const Mangas = require('./getMangasList'); */

(async () => {
	const baseURL = 'https://unionmangas.top';
	const browser = await puppeteer.launch({
		headless: false,
		defaultViewport: null
	});
	const page = await browser.newPage();
	//Mangas.length
	var MangasInfo = [];
	for (i = 0; i < 4; i++) {
		console.log(baseURL + Mangas[i].pathName);
		await page.goto(baseURL + Mangas[i].pathName);
		var id = 0;
		const MangaInfo = await page
			.waitForSelector('body')
			.then(() =>
				page.evaluate(() => {
					var genre = [];
					var chapters = [];
					var alt_title = document.querySelectorAll('h4:only-child')[0].childNodes[1].wholeText;
					var score = document.querySelectorAll('h2:only-child')[1].childNodes[0].wholeText;
					var author = document.querySelectorAll('h4:only-child')[2].childNodes[1].wholeText;
					var artist = document.querySelectorAll('h4:only-child')[3].childNodes[1].wholeText;
					var status = document.querySelectorAll('h4:only-child')[4].childNodes[2].innerText;
					var description = document.querySelectorAll('.panel-body')[0].childNodes[0].wholeText;
					var id = 1;
					for (i = 0; i < document.querySelectorAll('h4:only-child')[1].children.length; i++) {
						if (i != 0) genre.push(document.querySelectorAll('h4:only-child')[1].children[i].innerText);
					}

					for (i = document.querySelectorAll('div.row.lancamento-linha').length - 1; i >= 0; i--) {
						chapters.push({
							number: document
								.querySelectorAll('div.row.lancamento-linha')
								[i].children[0].children[1].text.replace(/\D/g, ''),
							path: document.querySelectorAll('div.row.lancamento-linha')[i].children[0].children[1]
								.pathname,
							date: document
								.querySelectorAll('div.row.lancamento-linha')
								[i].children[0].children[2].innerText.replace(/[{()}]/g, ''),
							scan: document.querySelectorAll('div.row.lancamento-linha')[i].children[1].innerText
						});
					}

					var MangaInfo = {
						score: score,
						alt_title: alt_title,
						genre: genre,
						author: author,
						artist: artist,
						status: status,
						description: description,
						chapters: chapters
					};
					return MangaInfo;
				})
			)
			.catch((err) => console.log('Selector Error: ' + err));

		MangasInfo.push(MangaInfo);
		console.log(Mangas);
	}
})().catch((err) => {
	console.log('error: ' + err);
});
