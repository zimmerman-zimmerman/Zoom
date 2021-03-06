beforeEach(() => {
  // README keep in mind that Cypress clears the whole state before each test. => signIn() before each test.
  // set this for skipping landing dialog
  cy.setCookie('cookieNotice', 'false');
});

describe('Chartbuilder geomap chart fragment e2e', function() {
  it('Should map new hiv infections data on the geo map', function() {
    cy.log('**IT NAVIGATES AND ASSERTS ON URL**');
    cy.signIn();
    cy.wait(2000);
    cy.navigateToCreateGeo();
    cy.url().should('include', '/visualizer/geomap');

    cy.log('**PLOTS SOME DATA**');
    //Here we wait till the indicators are loaded.
    cy.wait(2000);
    cy.get('[data-cy="indicator-1"]').click();
    cy.contains('new hiv infections').click();
    //Here we wait till the data has been mapped
    cy.waitPageLoader();
    cy.wait(16000);
    cy.get('[data-cy="legendLayer-label"]').should(
      'contain',
      'new hiv infections'
    );
  });

  it('Should make a snapshot of the visual current state', function() {
    cy.waitPageLoader();
    cy.waitPageLoader2();
    cy.wait(5000);
    cy.percySnapshot('Chartbuilder - Geomap');
  });

  it('Should pass written text from the /context to /preview', function() {
    // Fixme: Change to proper url or simultate click of the button.
    cy.log('**DO SOME CONTEXT TESTING**');
    cy.waitPageLoader();
    cy.get('[href="/visualizer/geomap/vizID/context"]').click();
    cy.waitPageLoader();
    cy.waitPageLoader2();
    cy.get('textarea')
      .last()
      .type('This is a test');
    cy.get('[href="/visualizer/geomap/vizID/preview"]').click();
    cy.get('[data-cy="context-preview-intro"]').should(
      'have.text',
      'This is a test'
    );

    cy.log('**DO SOME DOWNLOAD TESTING*');
    cy.visit('/visualizer/geomap/vizID/download');
    cy.waitPageLoader();
    cy.waitPageLoader2();
    cy.get('[data-cy="dowload-option-PNG"]').click();
    // cy.get('[data-cy="dowload-option-JSON"]').click();
    // cy.get('[data-cy="dowload-option-CSV"]').click();
    // cy.get('[data-cy="dowload-option-XML"]').click();

    cy.log('**DO SOME PUBLISHING TESTING*');
    cy.visit('/visualizer/geomap/vizID/visibility');
    cy.get('[data-cy="publish-chart-to-public"]').click();
    cy.visit('/public/chart-library');
  });
});
