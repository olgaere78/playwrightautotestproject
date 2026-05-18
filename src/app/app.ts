import { Page } from '@playwright/test';
import { MainPage } from '../pages/mainPage';

export class App {
  readonly mainPage: MainPage;

  constructor(page: Page) {
    this.mainPage = new MainPage(page);
  }
}
