import { Page } from '@playwright/test';
import { TodoMvcPage } from '../pages/todoMvcPage';

export class App {
  readonly todoMvc: TodoMvcPage;

  constructor(page: Page) {
    this.todoMvc = new TodoMvcPage(page);
  }
}
