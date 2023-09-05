describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })

  /* ==== Test Created with Cypress Studio ==== */
  it('slidebar', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:3000');
    cy.get('#email').type('sebastian.martinez07@uptc.edu.co');
    cy.get('#password').type('sebastian');
    cy.get('.styles_submitButton__WMndn').click();
    cy.wait(5000);
    cy.get('.style_sidebar__link_active__xw7MM').click();
    cy.get('div > h1').should('be.visible');
    cy.get(':nth-child(2) > .style_sidebar__link__k9NH_').click();
    cy.get('div > h1').should('be.visible');
    cy.get('div > h1').should('have.text', 'Stats');
    cy.get(':nth-child(7) > .style_sidebar__link__k9NH_').click();
    cy.get('.style_sidebar__link_active__xw7MM').should('have.class', 'style_sidebar__link_active__xw7MM');
    cy.get('main > div').should('have.text', 'Providers');
    /* ==== End Cypress Studio ==== */
  });
})