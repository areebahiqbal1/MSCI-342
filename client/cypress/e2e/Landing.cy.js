describe('TheLanding page', () => {
    it('displays landing page content', () => {
      cy.visit('/'); 
      cy.contains('CAN-DO-CO-OP').should('be.visible');
      cy.get('button').contains('Sign In').should('be.visible');
      cy.get('button').contains('Sign Up').should('be.visible');
    });
  });
  