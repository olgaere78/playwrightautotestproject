import { expect, Page } from '@playwright/test';
import { BasePage } from './basePage';
import { MainPageLocators } from '../locators/mainPageLocators';
import { ensureTodoTitle } from '../utils/todoTitle';

export class TodoMvcPage extends BasePage {
  private readonly locators: MainPageLocators;
  private readonly createdTitles = new Set<string>();

  constructor(page: Page) {
    super(page);
    this.locators = new MainPageLocators(page);
  }

  // Actions
  async addTodo(title: string) {
    const validated = ensureTodoTitle(title);
    if (this.createdTitles.has(validated)) {
      throw new Error('Duplicate todo titles are not allowed');
    }

    await this.locators.inputWhatNeedsToBeDone.fill(validated);
    await this.locators.inputWhatNeedsToBeDone.press('Enter');
    this.createdTitles.add(validated);
  }

  async setTodoCompleted(title: string, completed: boolean) {
    const checkbox = this.locators.getCheckboxByTitle(title);
    await expect(checkbox).toBeVisible();
    const isChecked = await checkbox.isChecked();
    if (isChecked !== completed) {
      await checkbox.click();
    }
  }

  async editTodoTitle(oldTitle: string, newTitle: string) {
    const validatedNew = ensureTodoTitle(newTitle);
    if (this.createdTitles.has(validatedNew) && validatedNew !== oldTitle) {
      throw new Error('Duplicate todo titles are not allowed');
    }

    const title = this.locators.getTodoTitleByTitle(oldTitle);
    await expect(title).toBeVisible();
    await title.dblclick();

    const editInput = this.locators.getEditInputByTitle(oldTitle);
    await expect(editInput).toBeVisible();
    await editInput.fill(validatedNew);
    await editInput.press('Enter');

    this.createdTitles.delete(oldTitle);
    this.createdTitles.add(validatedNew);
  }

  async filterCompleted() {
    await this.locators.completed.click();
  }

  async filterActive() {
    await this.locators.active.click();
  }

  async filterAll() {
    await this.locators.all.click();
  }

  async clearCompleted() {
    await this.locators.clearItems.click();
  }

  // Assertions
  async expectNewTodoInputVisible() {
    await expect(this.locators.inputWhatNeedsToBeDone).toBeVisible();
  }

  async expectNewTodoInputEmpty() {
    await expect(this.locators.inputWhatNeedsToBeDone).toBeEmpty();
  }

  async expectTodoVisible(title: string) {
    await expect(this.locators.getTodoItemByTitle(title)).toBeVisible();
  }

  async expectTodoNotPresent(title: string) {
    await expect(this.locators.getTodoItemByTitle(title)).toHaveCount(0);
  }

  async expectTodoCompleted(title: string) {
    await expect(this.locators.getCheckboxByTitle(title)).toBeChecked();
  }

  async expectTodoCount(count: number) {
    await expect(this.locators.todoItem).toHaveCount(count);
  }
}
