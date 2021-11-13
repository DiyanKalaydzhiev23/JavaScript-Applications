const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

const host = 'http://localhost:5500/01.%20Accordion/index.html';
const timeout = 10000;
let browser, page;

describe('tests for accordion.js', () => {
    before(async () => browser = await chromium.launch({headless: false, slowMo: 500}));
    after(async () => browser.close());
    beforeEach(async () => page = await browser.newPage());
    afterEach(async () => await page.close());

    it('loads static page', async () => {
        await page.goto(host);

        const content = await page.textContent('#main');

        expect(content).to.contains('Scalable Vector Graphics');
        expect(content).to.contains('Open standard');
        expect(content).to.contains('Unix');
        expect(content).to.contains('ALGOL');
    });


    it('toggles content', async () => {
        await page.goto(host);
        await page.click('text=More');
        
        const visible = await page.isVisible('.extra p');
        const article = await page.textContent('.accordion .head button');

        expect(visible).to.be.true;
        expect(article).to.be.equal('Less');
    });

    it('hides content', async () => {
        await page.goto(host);
        await page.click('text=More');
        await page.click('text=Less');
        
        const visible = await page.isVisible('.extra p');
        const article = await page.textContent('.accordion .head button');

        expect(visible).to.be.false;
        expect(article).to.be.equal('More');
    }).timeout(timeout);

});