import { PuppeteerNode } from "puppeteer";

const puppeteer: PuppeteerNode = require("puppeteer");

export const scrapper = async (
  startlat: number,
  startlon: number,
  endlat: number,
  endlon: number,
  numberofresults: number
) => {
  const browser = await puppeteer.launch();

  for (let i = 0; i < numberofresults; i++) {
    const randomLatitude = startlat + Math.random() * (endlat - startlat);
    const randomLongitude = startlon + Math.random() * (endlon - startlon);

    const url = `https://www.google.com/maps/@${randomLatitude},${randomLongitude},3a,90y,55h,90t/data=!3m6!1e1!3m4!1sAF1QipOzVzM-rV-svfbZ24H90JzoZBZgYP6H6iGeW6g2!2e10!7i13312!8i6656`;
    const page = await browser.newPage();

    await page.goto(url, {
      waitUntil: "networkidle2",
    });

    await page.waitForSelector("canvas.widget-scene-canvas");

    // Ocultar los elementos adicionales de la interfaz de Google Maps
    await page.evaluate(() => {
      const infoDiv = document.querySelector(".JHngof");
      const mapDiv = document.querySelector(".F63Kk");
      const searchBar = document.getElementById("searchbox");

      if (
        infoDiv instanceof HTMLElement &&
        mapDiv instanceof HTMLElement &&
        searchBar instanceof HTMLElement
      ) {
        infoDiv.style.display = "none";
        mapDiv.style.display = "none";
        searchBar.style.display = "none";
      }
    });

    // Screenshot
    await page.screenshot({
      path: "screenshot.png",
    });
  }

  await browser.close();
};
