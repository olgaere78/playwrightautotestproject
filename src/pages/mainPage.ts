import { Page } from '@playwright/test';
import { MainPageLocators } from '../locators/mainPageLocators';
import { BasePage } from './basePage';

export class MainPage extends BasePage {
  private mainPageLocators: MainPageLocators;

  constructor(page: Page) {
    super(page);
    this.mainPageLocators = new MainPageLocators(page);
  }

  //#actions

  //#endregion

  //#assertion

  //#endregion
}
