describe('template spec', () => {
  /* ==== Test Created with Cypress Studio ==== */
  it('slidebar', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:3000');
    cy.get('#email').type('jhon.doe@example.com');
    cy.get('#password').type('stringPassword123');
    cy.get('.submitButton__styles__d7f7d906').should('be.visible').click();
    cy.wait(5000);
    cy.get('div > h1').should('be.visible');
    cy.get('div > h1').should('have.text', 'DashBoard');
    cy.get('.iconSearch__style__24973ee0').should('have.class', 'iconSearch__style__24973ee0');
    cy.get(':nth-child(2) > .sidebar__link__style__828ccd69 > .sidebar__name__style__828ccd69').should('be.visible');
    cy.get(':nth-child(2) > .sidebar__link__style__828ccd69 > .sidebar__name__style__828ccd69').should('have.text', 'Estadisticas');
    cy.get(':nth-child(2) > .sidebar__link__style__828ccd69').click();
    cy.get('div > h1').should('be.visible');
    cy.get('div > h1').should('have.text', 'Stats');
    cy.get(':nth-child(6) > .sidebar__link__style__828ccd69 > .sidebar__name__style__828ccd69').click();
    cy.get('.sidebar__link_active__style__828ccd69 > .sidebar__name__style__828ccd69').should('be.visible');
    cy.get('.sidebar__link_active__style__828ccd69 > .sidebar__name__style__828ccd69').should('have.text', 'Inventario');
    cy.get('div > h1').should('be.visible');
    cy.get('div > h1').should('have.text', 'Inventory');
    cy.get(':nth-child(7) > .sidebar__link__style__828ccd69 > .sidebar__name__style__828ccd69').click();
    cy.get('.sidebar__link_active__style__828ccd69 > .sidebar__name__style__828ccd69').should('be.visible');
    cy.get('.sidebar__link_active__style__828ccd69 > .sidebar__name__style__828ccd69').should('have.text', 'Proveedores');
    cy.get('.layout__main__style__c0076f95 > div').click();
    cy.get('.layout__main__style__c0076f95 > div').should('be.visible');
    cy.get('.layout__main__style__c0076f95 > div').should('have.text', 'Providers');
    /* ==== End Cypress Studio ==== */
  });
})