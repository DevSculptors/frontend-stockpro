describe('template spec', () => {
  
  /* ==== Test Created with Cypress Studio ==== */
  it('ShowAllUser', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:3000');
    cy.get('#email').type('jhon.doe@example.com');
    cy.get('#password').type('stringPassword123');
    cy.get('.submitButton__styles__d7f7d906').should('be.visible');
    cy.get('.form__styles__c32fe43b').click();
    cy.get('.submitButton__styles__d7f7d906').click();
    cy.wait(5000);
    cy.get(':nth-child(4) > .sidebar__link__style__828ccd69 > .sidebar__name__style__828ccd69').should('have.text', 'Usuarios');
    cy.get(':nth-child(4) > .sidebar__link__style__828ccd69').click();
    cy.get('.tittleList__style__90eefaa6').click();
    cy.wait(5000);
    cy.get('.tittleList__style__90eefaa6').should('be.visible');
    cy.get('.tittleList__style__90eefaa6').should('have.text', 'Lista Usuarios');
    cy.get('thead > tr > :nth-child(2)').click();
    cy.get('thead > tr > :nth-child(2)').should('be.visible');
    cy.get('thead > tr > :nth-child(2)').should('have.text', 'Documento');
    cy.get('thead > tr > :nth-child(3)').should('be.visible');
    cy.get('thead > tr > :nth-child(3)').should('have.text', 'Nombre');
    cy.get('thead > tr > :nth-child(4)').should('be.visible');
    cy.get('thead > tr > :nth-child(4)').click();
    cy.get('thead > tr > :nth-child(4)').should('have.text', 'Username');
    cy.get('thead > tr > :nth-child(5)').should('be.visible');
    cy.get('thead > tr > :nth-child(5)').should('have.text', 'Celular');
    cy.get('thead > tr > :nth-child(6)').should('be.visible');
    cy.get('thead > tr > :nth-child(6)').should('have.text', 'Estado');
    /* ==== End Cypress Studio ==== */
  });
})