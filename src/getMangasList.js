const fs = require('fs');
const puppeteer = require('puppeteer');
var PagesNumber = require('./getPagesNumber');

getPagesNumber = (async function() {
	const baseURL = 'https://unionmangas.top';
	const browser = await puppeteer.launch({
		headless: false,
		defaultViewport: null
	});
	const page = await browser.newPage();
	var mangaList = [];
	var mangaChapters = [];

	/* var PagesNumber = console.log(getPagesNumber());
	console.log(PagesNumber); */
	for (i = 1; i < 3; i++) {
		await page.goto(baseURL + '/lista-mangas/a-z/' + i + '/*');

		const Mangas = await page
			.waitForSelector('.bloco-manga')
			.then(() =>
				page.evaluate(() => {
					var Manga = [];
					const MangaNodeList = document.querySelectorAll('.bloco-manga');
					MangaNodeList.forEach(getMangaInfo_ID);

					function getMangaInfo_ID(value, index, array) {
						Manga.push(MangaNodeList[index].childNodes[1].pathname);
					}

					return Manga;
				})
			)
			.catch((err) => console.log('Selector Error: ' + err));
		mangaList.push(Mangas);
	}

	for (i = 0; i < 2; i++) {
		await page.goto(baseURL + mangaList[i][i]);
		console.log('Pagina' + i);

		const mangaChapters = await page
			.waitForSelector('.img-thumbnail')
			.then(() =>
				page.evaluate(() => {
					var genre = [];
					var chapters = [];

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

					mangaChapters = {
						genre: genre,
						chapters: chapters,
						alt_title: document.querySelectorAll('h4:only-child')[0].childNodes[1].wholeText,
						score: document.querySelectorAll('h2:only-child')[1].childNodes[0].wholeText,
						author: document.querySelectorAll('h4:only-child')[2].childNodes[1].wholeText,
						artist: document.querySelectorAll('h4:only-child')[3].childNodes[1].wholeText,
						status: document.querySelectorAll('h4:only-child')[4].childNodes[2].innerText,
						description: document.querySelectorAll('.panel-body')[0].childNodes[0].wholeText
					};
					return mangaChapters;
				})
			)
			.catch((err) => console.log('Selector Error: ' + err));

		console.log(mangaChapters);
	}

	console.log(mangaList);
})();

/* 
					for (i = 0; i < 40; i++){ 
						Mangas = {
							id: MangaNodeList[i].childNodes[1].className.match(/\d+/g).map(Number)[0],
							title: MangaInfo[i][0].childNodes[1].innerHTML,
							pathName: MangaNodeList[i].childNodes[1].pathname,
							link: MangaNodeList[i].childNodes[1].href,
							image: MangaNodeList[i].childNodes[1].childNodes[1].src
						};

						await page.goto(baseURL + Mangas[i].pathName);
					} 
					console.log('First Part Ok...');
					//Second Page...

					return Mangas; */

/* 

			var MangasChapters = [];
			for (i = 0; i < 4; i++) {
				console.log(baseURL + Mangas[i].pathName);
				await page.goto(baseURL + Mangas[i].pathName);
				var id = 0;
				const MangasChapters = await page
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
		
							var MangasChapters = {
								score: score,
								alt_title: alt_title,
								genre: genre,
								author: author,
								artist: artist,
								status: status,
								description: description,
								chapters: chapters
							};
							return MangasChapters;
						})
					)
					.catch((err) => console.log('Selector Error: ' + err)); */

/* MangasInfo.push(MangasChapters);
				console.log(Mangas);
			} */
//MangaFinal.push(Mangas);
