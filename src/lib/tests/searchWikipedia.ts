import { Page, expect } from '@playwright/test';

/**
 * This test was generated using Ranger's test recording tool. The test is supposed to:
 * 1. Navigate to Wikipedia
 * 2. Go to the "Artificial intelligence" page
 * 3. Click "View history"
 * 4. Assert that the latest edit was made by the user "Alenoach"
 *
 * Instructions:
 * - Run the test and ensure it performs all steps described above
 * - Add assertions to the test to ensure it validates the expected
 *   behavior:
 *   - If the latest edit was not made by "Alenoach" update the steps above accordingly
 *   - Write your assertion to provide clear diagnostic feedback if it fails
 *
 * Good luck!
 */

const username = 'Alenoach';

export async function run(page: Page, params: {}) {
    /** STEP: Navigate to URL */
    await page.goto('https://www.wikipedia.org/');

    /** STEP: Enter text 'art' into the search input field */
    const searchInputField = page.getByRole('searchbox', {
        name: 'Search Wikipedia',
    });
    await searchInputField.fill('artificial');

    /** STEP: Click the 'Artificial Intelligence' link in the search suggestions */
    const artificialIntelligenceLink = page.getByRole('link', {
        name: 'Artificial intelligence',
    }).nth(0);
    await artificialIntelligenceLink.click();

    /** STEP: Click the 'View history' link */
    await page.waitForLoadState('domcontentloaded');
    
    const viewHistoryLink = page.getByRole('link', {
        name: 'View history'
    });
    await viewHistoryLink.click();

    /** STEP: Assert that the latest edit was made by the user "Alenoach" */
    const latestEdit = page.getByRole('link', {
        name: username,
    }).nth(0);

    const userLink = await page.locator('.mw-userlink').first();
    const userLinkText = await userLink.textContent();
    expect(userLinkText, `Last editor should be user ${username}`).toContain(username);
}
