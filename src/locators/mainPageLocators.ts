import { Locator, Page } from '@playwright/test';

export class MainPageLocators {
  readonly inputWhatNeedsToBeDone: Locator;
  readonly todoItem: Locator;
  readonly todoTitle: Locator;
  readonly completed: Locator;
  readonly active: Locator;
  readonly all: Locator;
  readonly clearItems: Locator;

  constructor(private page: Page) {
    this.inputWhatNeedsToBeDone = this.page.getByPlaceholder('What needs to be done?');
    this.todoItem = this.page.getByTestId('todo-item');
    this.todoTitle = this.page.getByTestId('todo-title');
    this.completed = this.page.getByRole('link', { name: 'Completed' });
    this.active = this.page.getByRole('link', { name: 'Active' });
    this.all = this.page.getByRole('link', { name: 'All' });
    this.clearItems = this.page.getByRole('button', { name: 'Clear completed' });
  }

  getTodoItemByTitle = (title: string): Locator =>
    this.page.getByTestId('todo-item').filter({
      has: this.page.getByTestId('todo-title').filter({ hasText: new RegExp(`^${title}$`) }),
    });

  getTodoTitleByTitle = (title: string): Locator =>
    this.getTodoItemByTitle(title).getByTestId('todo-title');

  getEditInputByTitle = (title: string): Locator => this.getTodoItemByTitle(title).locator('.edit');

  getCheckboxByTitle = (title: string): Locator =>
    this.getTodoItemByTitle(title).getByRole('checkbox');
}
