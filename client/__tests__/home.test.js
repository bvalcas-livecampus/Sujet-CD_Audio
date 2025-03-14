import puppeteer from 'puppeteer';
import { describe, test, expect, beforeAll, beforeEach, afterAll } from '@jest/globals';

describe('Home Page Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true
    });
    page = await browser.newPage();
  });

  beforeEach(async () => {
    await page.goto('http://localhost:5173');
  });

  afterAll(async () => {
    await browser.close();
  });

  test('should load home page with correct title', async () => {
    const title = await page.$eval('h1', el => el.textContent);
    expect(title).toBe('🎶 Gestion des CD 🎶');
  });

  test('should have CD list component', async () => {
    const cdList = await page.$('[data-testid="cd-list"]');
    expect(cdList).toBeTruthy();
  });

  test('should have Add CD form', async () => {
    const addCdForm = await page.$('[data-testid="add-cd-form"]');
    expect(addCdForm).toBeTruthy();
  });

  test('should add a new CD when form is submitted', async () => {
    // Fill in the form fields
    await page.type('input[name="title"]', 'Test Album');
    await page.type('input[name="artist"]', 'Test Artist');
    await page.type('input[name="year"]', '2024');

    // Click the submit button
    await page.click('button[type="submit"]');

    // Wait for the page to reload (since your onAdd handler reloads the page)
    await page.waitForNavigation();

    // Verify the page loaded correctly after submission
    const title = await page.$eval('h1', el => el.textContent);
    expect(title).toBe('🎶 Gestion des CD 🎶');

    // Verify the new CD appears in the list
    const cdElements = await page.$$eval('[data-testid="cd-list"] ul li', elements => 
      elements.map(el => ({
        title: el.querySelector('[data-testid="cd-title"]')?.textContent,
        artist: el.querySelector('[data-testid="cd-artist"]')?.textContent,
        year: el.querySelector('[data-testid="cd-year"]')?.textContent
      }))
    );

    // Find the newly added CD in the list
    const newCD = cdElements.find(cd => 
      cd.title === 'Test Album' && 
      cd.artist === 'Test Artist' && 
      cd.year === '2024'
    );

    expect(newCD).toBeTruthy();
  });
});