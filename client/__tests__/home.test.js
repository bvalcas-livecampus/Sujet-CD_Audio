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
});