import { test } from '../../src/fixtures/app-fixture';
import { env } from '../../src/config/env';
import { todoItems } from '../../src/data/todo.data';

test.describe('TodoMVC tests', () => {
  test.beforeEach(async ({ app }) => {
    await app.mainPage.goto();
    await app.mainPage.assertUrlIs(env.baseUrl);
  });

  test('should add a new todo item', async ({ app }) => {
    await app.mainPage.assertInputWhatNeedsToBeDoneIsVisible();
    await app.mainPage.fillInputAndSubmit(todoItems[0]);
    await app.mainPage.assertToDoItemWithTextIsVisible(todoItems[0]);
    await app.mainPage.assertInputWhatNeedsToBeDoneIsEmpty();
  });

  test('should filter todos by all/active/completed', async ({ app }) => {
    await app.mainPage.assertInputWhatNeedsToBeDoneIsVisible();

    for (const todoItem of todoItems) {
      await app.mainPage.fillInputAndSubmit(todoItem);
      await app.mainPage.assertToDoItemWithTextIsVisible(todoItem);
    }

    await app.mainPage.toggleTodoItemByTitle(todoItems[0]);
    await app.mainPage.assertToDoItemWithTextIsChecked(todoItems[0]);

    await app.mainPage.clickOnCompletedFilter();
    await app.mainPage.assertToDoItemWithTextIsVisible(todoItems[0]);
    await app.mainPage.assertToDoItemsCount(1);

    await app.mainPage.clickOnActiveFilter();
    await app.mainPage.assertToDoItemsCount(todoItems.length - 1);
    await app.mainPage.assertToDoItemWithTextIsNotVisible(todoItems[0]);

    await app.mainPage.clickOnAllFilter();
    await app.mainPage.assertToDoItemsCount(todoItems.length);
    await app.mainPage.assertToDoItemWithTextIsVisible(todoItems[0]);
  });

  test('should delete completed todo item', async ({ app }) => {
    await app.mainPage.assertInputWhatNeedsToBeDoneIsVisible();
    await app.mainPage.fillInputAndSubmit(todoItems[0]);
    await app.mainPage.assertToDoItemWithTextIsVisible(todoItems[0]);

    await app.mainPage.toggleTodoItemByTitle(todoItems[0]);
    await app.mainPage.clickOnClearItem();

    await app.mainPage.assertToDoItemWithTextIsNotVisible(todoItems[0]);
  });
});
