const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

const host = 'http://localhost:5500/02.Book-Library/index.html';
const timeout = 10000;
const debugSettings = {headless: false, slowMo: 500}
let browser, page;

describe('tests for Book Library', () => {
    before(async () => browser = await chromium.launch(debugSettings));
    after(async () => browser.close());
    beforeEach(async () => page = await browser.newPage());
    afterEach(async () => page.close());

    it('should load books', async () => {
        await page.goto(host);
        await page.click('#loadBooks');
        
        const data = await page.$$eval('tbody tr', (rows) => rows.map(row => row.textContent.trim()));
        
        expect(data[0]).to.contains("Harry Potter and the Philosopher's Stone");
        expect(data[0]).to.contains("J.K.Rowling");
        expect(data[1]).to.contains("C# Fundamentals");
        expect(data[1]).to.contains("Svetlin Nakov");
    }).timeout(10000);

    it('should add a book', async () => {
        await page.goto(host);
        await page.fill("#createForm input[name='title']", 'Moms spaghetti');
        await page.fill("#createForm input[name='author']", 'Eminem');

        const [request] = await Promise.all([
            page.waitForRequest(request => request.method() == 'POST'),
            page.click('form#createForm >> text=Submit')
        ]);
        const data = JSON.parse(request.postData());
        
        expect(data.title).to.equal('Moms spaghetti');
        expect(data.author).to.equal('Eminem');
    }).timeout(10000);

    it('should edit the book', async () => {
        await page.goto(host);
        await page.click('#loadBooks');
        await page.click('text=Edit');
        await page.fill("#editForm input[name='title']", 'Holy wotah and the Phosphorus is gone');
        await page.fill("#editForm input[name='author']", 'K.J. Bowling');

        const [request] = await Promise.all([
            page.waitForRequest(request => request.method() == 'PUT'),
            page.click('text=Save')
        ]);
        const data = JSON.parse(request.postData());

        expect(data.title).to.be.equal('Holy wotah and the Phosphorus is gone');
        expect(data.author).to.be.equal('K.J. Bowling');
    }).timeout(10000);

    it.only('should delete book', async () => {
        await page.goto(host);
        await page.click('#loadBooks');
        await page.click('text=Delete');
        
        // const [request] = await Promise.all([
        //     page.waitForRequest(request => request.method() == 'delete'),
            
            
        // ]);
        // console.log(1);
    }).timeout(10000);
});