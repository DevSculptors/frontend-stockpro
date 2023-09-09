describe('template spec', () => {

  /* ==== Test Created with Cypress Studio ==== */
  it('recover password', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:3000');
    cy.get('h2').should('have.text', 'Iniciar sesión');
    cy.get('.font-bold').should('be.visible');
    cy.get('.font-bold').click();
    cy.get('h2').should('have.text', 'Recuperar contraseña');
    cy.get('.styles_submitButton__WMndn').should('be.visible');
    cy.get('.styles_submitButton__WMndn').should('have.text', 'Recuperar Contraseña');
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
    cy.get('#email').type('sebastian.martinez07@uptc.edu.co');
    cy.get('#password').type('sebastian');
    cy.get('.styles_submitButton__WMndn').click();
    cy.wait(5000);
    cy.get('.style_sidebar__link_active__xw7MM > .style_sidebar__name__bQJni').should('have.text', 'Dashboard');
    /* ==== End Cypress Studio ==== */
  });
})