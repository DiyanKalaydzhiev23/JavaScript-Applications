const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

const host = 'http://localhost:5500/01.Messenger/index.html';
const timeout = 10000;
let browser, page;

describe('tests for messenger', () => {
    before(async () => browser = await chromium.launch());
    after(async () => browser.close());
    beforeEach(async () => page = await browser.newPage());
    afterEach(async () => await page.close());

    it('should load messages', async () => {
        await page.goto(host);
        await page.click('#refresh');

        const content = await page.inputValue('textarea');
        const expected = 
        'Spami: Hello, are you there?\n' +
        'Garry: Yep, whats up :?\n' +
        'Spami: How are you? Long time no see? :)\n' +
        'George: Hello, guys! :))\n' +
        'Spami: Hello, George nice to see you! :)))';

        expect(content).to.contains(expected);
    }).timeout(timeout);

    it('should send message', async () => {
        await page.goto(host);
        await page.fill('#author', 'Slim Shady');
        await page.fill('#content', 'Hi my name is...');

        const [request] = await Promise.all([
            page.waitForRequest(request => request.method() == 'POST'),
            page.click('#submit')
        ]);

        const data = JSON.parse(request.postData());
        expect(data.author).to.be.equal('Slim Shady');
        expect(data.content).to.be.equal('Hi my name is...');
    });
});