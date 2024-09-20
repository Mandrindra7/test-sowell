/* eslint-disable playwright/expect-expect */
import { test, expect } from '@playwright/test'
// See here how to get started:
// https://playwright.dev/docs/intro
test('I can navigate to the home page', async ({ page }) => {
  /** Scenario:
   *    Given I am on the "Home" page
   *    Then I see "File upload page" as the page title
   */
  await page.goto('/')

  // Expect a title "to contain" a substring.
  await expect(page.getByTestId('home.title')).toHaveText('File upload page')
})

test('I can navigate to the test page', async ({ page }) => {
  /** Scenario:
   *    Given I am on the "Home" page
   *    When I click on the "Open Drawer" button
   *    And I click on the "Tests" menu
   *    Then I am redirected to "/tests"
   *    And I see "Form" as the page title
   */
  // TODO: implement
  await page.goto('/')
  await page.getByTestId('drawer').click()
  await page.getByText('Tests').click()
  await page.goto('/tests')
  await expect(page.getByTestId('form')).toHaveText('Form')
})

test('I cannot submit an empty form', async ({ page }) => {
  /** Scenario:
   *    Given I am on the "Tests" page
   *    When I click on the "Submit" button
   *    Then I am still on the "Tests" page
   *    And I see an error saying "Please type something"
   */
  // TODO: implement
  await page.goto('/tests')
  await page.getByText('Submit').click()
  await expect(page.getByTestId('form')).toHaveText('Form')
  expect(page.getByText('Please type something')).toBeTruthy()
})

test('I can submit a filled form', async ({ page }) => {
  /** Scenario:
   *    Given I am on the "Tests" page
   *    When I type "John Doe" on the "name" input
   *    And I type "22" on the "age" input
   *    And I type "This is an about me info" on the "about" input
   *    And I check the "accept" input
   *    And I click on the "Submit" button
   *    Then I am redirected to "/tests/summary"
   *    And I see "John" as the given "name"
   *    And I see "Doe" as the given "surname"
   *    And I see "22" as the given "age"
   *    And I see "You accepted the licence and terms conditions"
   *    And I see "This is an about me info" as the given "about"
   *    And I see 5 full stars
   */
  // TODO: implement
  await page.goto('/tests')
  await page.fill('input[aria-label="Your name *"]', 'John Doe')
  await page.fill('input[aria-label="Your age *"]', '22')
  await page.fill('textarea[aria-label="About you"]', 'This is an about me info')
  await page.getByTestId('check').check()
  const ariaChecked = page.locator('[data-testid="check"]')
  await expect(ariaChecked).toHaveAttribute('aria-checked', 'true')
  await page.getByText('Submit').click()
  await page.goto('/tests/summary')

  page.on('domcontentloaded', async () => {
    await expect(page.locator("[data-testid='section-name']")).toHaveText('John')
    await expect(page.locator("[data-testid='section-surname']")).toHaveText('Doe')
    await expect(page.locator("[data-testid='section-age']")).toHaveText('22')
    await expect(page.locator('[data-testid="section-term"]')).toHaveText(
      'You accepted the licence and terms conditions'
    )
    await expect(page.locator('[data-testid="about"]')).toHaveText('This is an about me info')
    await expect(page.getByText('star')).toHaveCount(5)
  })
})

test('I can submit a partially filled form', async ({ page }) => {
  /** Scenario:
   *    Given I am on the "Tests" page
   *    When I type "John" on the "name" input
   *    And I type "11" on the "age" input
   *    And I click on the "Submit" button
   *    Then I am redirected to "/tests/summary"
   *    And I see "John" as the given "name"
   *    And I see "11" as the given "age"
   *    And I see "You did not write about you"
   *    And I see 1 full stars
   *    And I see 3 empty stars
   */
  //  TODO: implement
  await page.goto('/tests')
  await page.fill('input[aria-label="Your name *"]', 'John')
  await page.fill('input[aria-label="Your age *"]', '11')
  await page.getByText('Submit').click()
  await page.goto('/tests/summary')

  page.on('domcontentloaded', async () => {
    await expect(page.locator("[data-testid='section-name']")).toHaveText('John')
    await expect(page.locator("[data-testid='section-age']")).toHaveText('11')
    await expect(page.locator('[data-testid="about"]')).toHaveText('You did not write about you')
    await expect(page.getByText('star')).toHaveCount(1)
    await expect(page.getByText('star_outline')).toHaveCount(4)
  })
})
