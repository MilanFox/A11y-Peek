import puppeteer from 'puppeteer';

export default defineEventHandler(async (event) => {
  const url = getQuery(event).url as string;
  if (!url) return { error: 'Missing URL' };

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'domcontentloaded' });

  const client = await page.target().createCDPSession();
  const tree = await client.send('Accessibility.getFullAXTree');

  await browser.close();

  return tree;
});
