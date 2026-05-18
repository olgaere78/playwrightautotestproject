import { Locator, Page } from '@playwright/test';

export class MainPageLocators {
  readonly inputWhatNeedsToBeDone: Locator;
  readonly todoItem: Locator;
  readonly todoTitle: Locator;
  readonly checkbox: Locator;
  readonly completed: Locator;
  readonly active: Locator;
  readonly all: Locator;
  readonly clearItems: Locator;

  constructor(private page: Page) {
    this.inputWhatNeedsToBeDone = this.page.getByPlaceholder('What needs to be done?');
    this.todoItem = this.page.getByTestId('todo-item');
    this.todoTitle = this.page.getByTestId('todo-title');
    this.checkbox = this.page.getByRole('checkbox', { name: 'Toggle Todo' });
    this.completed = this.page.getByRole('link', { name: 'Completed' });
    this.active = this.page.getByRole('link', { name: 'Active' });
    this.all = this.page.getByRole('link', { name: 'All' });
    this.clearItems = this.page.getByRole('button', { name: 'Clear completed' });
  }

  getCheckboxByTitle = (title: string): Locator =>
    this.page.getByTestId('todo-item').filter({ hasText: title }).getByRole('checkbox');
}

