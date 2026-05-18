import { expect, Page } from '@playwright/test';
import { MainPageLocators } from '../locators/mainPageLocators';
import { BasePage } from './basePage';

export class MainPage extends BasePage {
  private mainPageLocators: MainPageLocators;

  constructor(page: Page) {
    super(page);
    this.mainPageLocators = new MainPageLocators(page);
  }

  async fillInputAndSubmit(itemText: string) {
    await this.mainPageLocators.inputWhatNeedsToBeDone.fill(itemText);
    await this.mainPageLocators.inputWhatNeedsToBeDone.press('Enter');
  }

  async toggleTodoItemByTitle(itemText: string) {
    const checkbox = this.mainPageLocators.getCheckboxByTitle(itemText);
    await expect(checkbox).toBeVisible();
    const isChecked = await checkbox.isChecked();
    if (!isChecked) {
      await checkbox.check();
    }
    await checkbox.check();
  }
  async clickOnCompletedFilter() {
    await this.mainPageLocators.completed.click();
  }

  async clickOnActiveFilter() {
    await this.mainPageLocators.active.click();
  }

  async clickOnAllFilter() {
    await this.mainPageLocators.all.click();
  }

  async clickOnClearItem() {
    await this.mainPageLocators.clearItems.click();
  }

  async assertToDoItemWithTextIsChecked(itemText: string) {
    const checkbox = this.mainPageLocators.getCheckboxByTitle(itemText);
    await expect(checkbox).toBeChecked();
  }

  async assertInputWhatNeedsToBeDoneIsVisible() {
    await expect(this.mainPageLocators.inputWhatNeedsToBeDone).toBeVisible();
  }

  async assertInputWhatNeedsToBeDoneIsEmpty() {
    await expect(this.mainPageLocators.inputWhatNeedsToBeDone).toBeEmpty();
  }

  //   async assertToDoItemWithTextIsVisible(itemText: string) {
  //     await expect(this.mainPageLocators.todoItem.filter({ hasText: itemText })).toBeVisible();
  //   }

  async assertToDoItemWithTextIsVisible(itemText: string) {
    await expect(
      this.mainPageLocators.todoItem.filter({
        has: this.page.getByTestId('todo-title').filter({
          hasText: new RegExp(`^${itemText}$`),
        }),
      }),
    ).toBeVisible();
  }

  async assertToDoItemWithTextIsNotVisible(itemText: string) {
    await expect(this.mainPageLocators.todoItem.filter({ hasText: itemText })).not.toBeVisible();
  }

  async assertToDoItemsCount(count: number) {
    await expect(this.mainPageLocators.todoItem).toHaveCount(count);
  }
}
