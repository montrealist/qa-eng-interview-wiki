import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const wikipediaUsername = process.env.WIKIPEDIA_USERNAME;
const wikipediaPassword = process.env.WIKIPEDIA_PASSWORD;

const authFile = 'src/auth/login.json';

/**
 * Manually create a Wikipedia account and then finish this test
 * so that it signs into Wikipedia and captures the logged-in
 * session to src/auth/login.json, so that the tests in all.test.ts
 * run as a signed in user.
 */
test('Sign in to Wikipedia', async ({ page }) => {
    if (!wikipediaUsername || !wikipediaPassword) {
        throw new Error(`Need a username and password to sign in!`);
    }

    // await page.context().storageState({ path: authFile });
    await page.goto('https://en.wikipedia.org/');
    await page.getByRole('link', { name: 'Log in' }).click();

    await page.getByLabel('Username').fill(wikipediaUsername);
    await page.getByLabel('Password').fill(wikipediaPassword);

    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page.getByRole('link', { name: wikipediaUsername }).first()).toBeVisible();

    await page.context().storageState({ path: authFile });
});
