import { StartWithPage } from './app.po';

describe('start-with App', () => {
  let page: StartWithPage;

  beforeEach(() => {
    page = new StartWithPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
