describe('Visiting all pages through navigation from home as not logged in', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-cy=dialog-overlay]').click();
    cy.get('[data-cy=cookie-notice]').click();
    cy.get('[data-cy=sidebar-toggle]').click();
  });

  it('Goes into Public charts through navigation bar', () => {
    cy.get('[data-cy="sidebar-Public Charts"]').click();
    cy.url().should('include', '/public/chart-library');
    cy.get('h4').should('contain', 'Zoom chart library');
  });

  it('Goes into About ZOOM through navigation bar', () => {
    cy.get('[data-cy="sidebar-About ZOOM"]').click();
    cy.url().should('include', '/about');
    cy.get('h2').should('contain', 'About zoom');
  });
});

describe('Visiting all pages through navigation from home as logged in', () => {
  it('Visits all pages through navigation as logged in', () => {
    cy.signIn();
    cy.get('[data-cy=cookie-notice]').click();
    cy.get('[data-cy=sidebar-toggle]').click();

    cy.log('**DASHBOARD**');
    cy.get('[data-cy="sidebar-Dashboard"]').click();
    cy.url().should('include', '/dashboard');

    cy.log('**PUBLIC CHARTS**');
    cy.get('[data-cy=sidebar-toggle]').click();
    cy.get('[data-cy="sidebar-Public Charts"]').click();
    cy.url().should('include', '/public/chart-library');
    cy.get('h4').should('contain', 'Zoom chart library');

    cy.log('**ABOUT ZOOM**');
    cy.get('[data-cy=sidebar-toggle]').click();
    cy.get('[data-cy="sidebar-About ZOOM"]').click();
    cy.url().should('include', '/about');
    cy.get('h2').should('contain', 'About zoom');
  });
});
