import { browser, logging } from 'protractor';
import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display message saying Ristorante Con Fusion', async () => {
    await page.navigateTo('/');
    expect(await page.getTitleText('app-root h1')).toEqual('Ristorante Con Fusion');
  });
// test not working as expected
  // it('should navigate to about us page by clicking on the link', async () => {
  //   await page.navigateTo('/');
  //   const navlink = page.getAllElements('a').get(1);
  //   navlink.click();
    
  //   expect(await page.getTitleText('h3')).toEqual('About Us');//not working as expected
  // });

  // it('should enter a new comment for the first dish', async () => {
  //   await page.navigateTo('/dishdetail/0');

  //   const newAuthor = page.getElement('input[type=text]');
  //   newAuthor.sendKeys('Test Author');

  //   const newComment = page.getElement('textarea');
  //   newComment.sendKeys('Test Comment');

  //   const newSubmitButton = page.getElement('button[type=submit]');
  //   newSubmitButton.click();

  //   browser.pause();
  // });


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
