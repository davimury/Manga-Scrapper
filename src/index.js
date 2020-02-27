const fs = require("fs");
const puppeteer = require("puppeteer");
var getPagesNumber = require("./mangas");

(async () => {
  const baseURL = "https://unionmangas.top";
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null
  });
  const page = await browser.newPage();
  var MangaFinal = [];
  for (i = 1; i < 206; i++) {
    await page.goto(baseURL + "/lista-mangas/a-z/" + i + "/*");
    const Mangas = await page
      .waitForSelector(".bloco-manga")
      .then(() =>
        page.evaluate(() => {
          //Important Declarations
          var Mangas = [];
          var MangaInfo = [];

          //First Page
          const MangaNodeList = document.querySelectorAll(".bloco-manga");
          MangaNodeList.forEach(getMangaInfo_ID);

          function getMangaInfo_ID(value, index, array) {
            MangaInfo[index] = document.querySelectorAll(
              "#bloco-tooltip-" +
                MangaNodeList[index].childNodes[1].className
                  .match(/\d+/g)
                  .map(Number)[0]
            );
          }

          for (i = 0; i < 40; i++) {
            Mangas.push({
              title: MangaInfo[i][0].childNodes[1].innerHTML,
              description: MangaInfo[i][0].childNodes[5].wholeText,
              pathName: MangaNodeList[i].childNodes[1].pathname,
              link: MangaNodeList[i].childNodes[1].href,
              image: MangaNodeList[i].childNodes[1].childNodes[1].src
            });
          }
          console.log("First Page Ok...");
          //Second Page...

          return Mangas;
        })
      )
      .catch(err => console.log("Selector Error: " + err));

    MangaFinal.push(Mangas);
  }
  json = JSON.stringify(MangaFinal);
  fs.writeFile("../mangas.json", json, "utf8", callback => {});
  console.log("Json Created ...");
  await browser.close();
})();
