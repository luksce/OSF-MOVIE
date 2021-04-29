import { OsfAcademyPage } from './app.po';

describe('osf-academy App', function() {
  let page: OsfAcademyPage;

  beforeEach(() => {
    page = new OsfAcademyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
