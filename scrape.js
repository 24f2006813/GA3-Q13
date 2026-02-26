const { chromium } = require("playwright");

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let totalSum = 0;

  for (let seed = 10; seed <= 19; seed++) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    await page.goto(url);

    const numbers = await page.$$eval("table td", cells =>
      cells
        .map(td => td.innerText.trim())
        .filter(text => !isNaN(text))
        .map(Number)
    );

    const pageSum = numbers.reduce((a, b) => a + b, 0);
    totalSum += pageSum;

    console.log(`Seed ${seed} sum: ${pageSum}`);
  }

  console.log("FINAL TOTAL:", totalSum);

  await browser.close();
}

run();
