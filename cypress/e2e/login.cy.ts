describe('template spec', () => {

  /* ==== Test Created with Cypress Studio ==== */
  it('recover password', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:3000');
    cy.get('h2').should('have.text', 'Iniciar sesión');
    cy.get('.font-bold').should('be.visible');
    cy.get('.font-bold').click();
    cy.get('.submitButton__styles__d7f7d906').should('have.text', 'Recuperar Contraseña');
    cy.get('.submitButton__styles__d7f7d906').should('be.visible');
    cy.get('.submitButton__styles__d7f7d906').should('have.text', 'Recuperar Contraseña');
    cy.get('.font-bold').should('have.text', 'Inicio');
    cy.get('.font-bold').click();
    cy.get('h2').should('have.text', 'Iniciar sesión');
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('login', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:3000');
    cy.get('#email').clear();
    cy.get('#email').type('jhon.doe@example.com');
    cy.get('#password').type('stringPassword123');
    cy.get('.submitButton__styles__d7f7d906').should('be.visible').click();
    cy.wait(5000);
    cy.get('.sidebar__link_active__style__828ccd69').should('be.visible');
    cy.get('.sidebar__link_active__style__828ccd69 > .sidebar__name__style__828ccd69').should('have.text', 'Dashboard');
    /* ==== End Cypress Studio ==== */
  });
})