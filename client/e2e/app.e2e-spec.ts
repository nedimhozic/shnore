import { ShnorePage } from './app.po';

describe('shnore App', () => {
  let page: ShnorePage;

  beforeEach(() => {
    page = new ShnorePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
