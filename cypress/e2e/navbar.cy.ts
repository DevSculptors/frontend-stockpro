describe('template spec', () => {

  /* ==== Test Created with Cypress Studio ==== */
  it('NavBar', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:3000');
    cy.get('#email').type('sebastian.martinez07@uptc.edu.co');
    cy.get('#password').type('sebastian');
    cy.get('.styles_submitButton__WMndn').click();
    cy.wait(5000)
    cy.get('.style_iconSearch__de22b').should('be.visible');
    cy.get('.style_nameUser__iJpX5 > span').click();
    cy.get('.style_nameUser__iJpX5 > span').should('have.text', 'Andres Nausan ');
    cy.get('.style_inputSearch__Gk34D').click();
    cy.get('.style_inputSearch__Gk34D').should('have.attr', 'placeholder', 'Buscar, producto,usuario,cliente ');
    /* ==== End Cypress Studio ==== */
  });
})