import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(link : string): Promise<unknown> {
    return browser.get(link);//(browser.baseUrl);
  }
//func to get inner element of html elem
  async getTitleText(selector :string): Promise<string> {
   // return element(by.css('app-root .content span')).getText();
   return element(by.css(selector)).getText(); 
  }
  // get the first html element found
  getElement(selector: string){
      element(by.css(selector));
  }
  // get all html elements found
  getAllElements(selector: string){
    return element.all(by.css(selector));
  }
}
