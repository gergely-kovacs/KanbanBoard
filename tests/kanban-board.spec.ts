import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200');
});

test('should pass accessibility scan with dark mode', async ({ page }) => {
  await expect(page.getByText('Get to work')).toBeVisible();

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});

test('should pass accessibility scan with light mode', async ({ page }) => {
  await expect(page.getByText('Get to work')).toBeVisible();

  await page.getByTestId('theme-toggle').click();
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});

test('should create task by clicking button', async ({ page }) => {
  const descriptionInput = page.getByTestId('description-input');

  await descriptionInput.click();
  await page.keyboard.insertText('Create some task for testing');
  await page.getByTestId('create-button').click();

  await expect(descriptionInput).toHaveValue('');
  await expect(page.getByText('Task added successfully')).toBeVisible();
  await expect(page.getByText('Create some task for testing')).toBeVisible();
});

test('should create task by pressing enter', async ({ page }) => {
  const descriptionInput = page.getByTestId('description-input');

  await descriptionInput.click();
  await page.keyboard.insertText('Create some task for testing');
  await page.keyboard.press('Enter');

  await expect(descriptionInput).toHaveValue('');
  await expect(page.getByText('Task added successfully')).toBeVisible();
  await expect(page.getByText('Create some task for testing')).toBeVisible();
});

test('should delete task by clicking delete button', async ({ page }) => {
  await expect(page.getByText('Get to work')).toBeVisible();

  await page.getByTestId('delete-button-1').click();
  await expect(
    page.getByRole('heading', { name: 'Delete task' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Ok' }).click();

  await expect(page.getByText('Task deleted successfully')).toBeVisible();
  await expect(page.getByText('Get to work')).not.toBeVisible();
});

test('should move task from todo to doing', async ({ page }) => {
  await expect(page.getByText('Get to work')).toBeVisible();
  await expect(page.getByTestId('previous-button-1')).not.toBeVisible();

  await page.getByTestId('next-button-1').click();

  await expect(
    page.locator('[data-status=doing]').getByText('Get to work'),
  ).toBeVisible();
  await expect(
    page.locator('[data-status=todo]').getByText('Get to work'),
  ).not.toBeVisible();
});

test('should move task from doing to done', async ({ page }) => {
  await expect(page.getByText('Get up')).toBeVisible();
  await expect(page.getByTestId('previous-button-5')).toBeVisible();

  await page.getByTestId('next-button-5').click();

  await expect(
    page.locator('[data-status=done]').getByText('Get up'),
  ).toBeVisible();
  await expect(
    page.locator('[data-status=doing]').getByText('Get up'),
  ).not.toBeVisible();
});

test('should move task from done to doing', async ({ page }) => {
  await expect(page.getByText('Walk dog')).toBeVisible();
  await expect(page.getByTestId('next-button-9')).not.toBeVisible();

  await page.getByTestId('previous-button-9').click();

  await expect(
    page.locator('[data-status=doing]').getByText('Walk dog'),
  ).toBeVisible();
  await expect(
    page.locator('[data-status=done]').getByText('Walk dog'),
  ).not.toBeVisible();
});

test('should move task from doing to todo', async ({ page }) => {
  await expect(page.getByText('Get up')).toBeVisible();
  await expect(page.getByTestId('next-button-5')).toBeVisible();

  await page.getByTestId('previous-button-5').click();

  await expect(
    page.locator('[data-status=todo]').getByText('Get up'),
  ).toBeVisible();
  await expect(
    page.locator('[data-status=doing]').getByText('Get up'),
  ).not.toBeVisible();
});

test('should drag and drop task from todo to done', async ({ page }) => {
  const taskCard = page.getByTestId('task-card-1');
  const doneTaskGroup = page.locator('[data-status=done]');
  await expect(page.getByText('Get to work')).toBeVisible();

  await taskCard.hover();
  await page.mouse.down();
  /* If your page relies on the dragover event being dispatched,
  you need at least two mouse moves to trigger it in all browsers. */
  await doneTaskGroup.hover();
  await doneTaskGroup.hover();
  await page.mouse.up();

  await expect(page.getByTestId('loading-indicator')).toBeVisible();
  await expect(page.getByTestId('loading-indicator')).not.toBeVisible();
  await expect(doneTaskGroup.getByText('Get to work')).toBeVisible();
  await expect(
    page.locator('[data-status=todo]').getByText('Get to work'),
  ).not.toBeVisible();
});

/* TODO: find a way to simulate the backend failing on drag and drop
to see if it the error is displayed and the drop is reverted */
