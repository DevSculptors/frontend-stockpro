describe('template spec', () => {
  /* ==== Test Created with Cypress Studio ==== */
  it('navBar', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:3000');
    cy.get('#email').type('jhon.doe@example.com');
    cy.get('#password').type('stringPassword123');
    cy.get('.submitButton__styles__d7f7d906').click();
    cy.get('.iconSearch__style__24973ee0').should('be.visible');
    cy.get('.iconSearch__style__24973ee0').should('have.class', 'iconSearch__style__24973ee0');
    cy.get('.inputSearch__style__24973ee0').should('be.visible');
    cy.get('.inputSearch__style__24973ee0').should('have.attr', 'placeholder', 'Buscar, producto,usuario,cliente ');
    cy.get('.divRole__style__24973ee0 > .nameUser__style__24973ee0').should('be.visible');
    cy.get('.roleUser__style__24973ee0').should('be.visible');
    /* ==== End Cypress Studio ==== */
  });
})