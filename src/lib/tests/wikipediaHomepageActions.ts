import { Page, expect } from '@playwright/test';

/**
 * This test was generated using Ranger's test recording tool. The test is supposed to:
 * 1. Navigate to Wikipedia's homepage
 * 2. Assert there are less than 7,000,000 articles in English
 * 3. Assert the page's text gets smaller when the 'Small' text size option is selected
 * 4. Assert the page's text gets larger when the 'Large' text size option is selected
 * 5. Assert the page's text goes back to the default size when the 'Standard' text size option is selected
 *
 * Instructions: Run the test and ensure it performs all steps described above
 *
 * Good luck!
 */

async function getFontSize(page: Page, selector: string): Promise<number> {
    const fontSize = await page.evaluate((sel) => {
        const element = document.querySelector(sel);
        if (!element) throw new Error(`Element with selector "${sel}" not found`);
        return window.getComputedStyle(element).fontSize;
    }, selector);
    return parseInt(fontSize);
}

const articleCount = 7000000;

export async function run(page: Page, params: {}) {
    /** STEP: Navigate to URL */
    await page.goto('https://en.wikipedia.org/wiki/Main_Page');

    /** STEP: Click the link to view the total number of articles in English */
    const totalArticlesLink = page.getByTitle('Special:Statistics').nth(1);
    const count = await totalArticlesLink.textContent();

    if (!count) {
        throw new Error(`Cannot find total articles link!`);
    }
    await expect(parseInt(count.replace(/,/g, ''))).toBeLessThan(articleCount);

    /** STEP: Select the 'Small' text size option in the appearance settings */
    const smallTextSizeOption = page.getByRole('radio', { name: 'Small' });
    
    const initialSize = await getFontSize(page, '#bodyContent');
    await smallTextSizeOption.click();
    const smallSize = await getFontSize(page, '#bodyContent');
    await expect(smallSize).toBeLessThan(initialSize);

    /** STEP: Click the 'Large' text size option to change the display size */
    const largeTextSizeOption = page.getByRole('radio', { name: 'Large' });
    await largeTextSizeOption.click();
    const largeSize = await getFontSize(page, '#bodyContent');
    await expect(largeSize).toBeGreaterThan(smallSize);

    /** STEP: Click the 'Standard' text size option in the appearance settings */
    const standardTextSizeButton = page.getByLabel('Standard').first();
    await standardTextSizeButton.click();
    const standardSize = await getFontSize(page, '#bodyContent');
    await expect(standardSize).toBeLessThan(largeSize);
}
