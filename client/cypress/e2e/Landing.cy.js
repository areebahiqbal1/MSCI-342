describe('TheLanding page', () => {
    it('displays landing page content', () => {
      cy.visit('/'); 
      
      cy.contains('CAN DO CO-OP').should('be.visible');
      cy.contains('Can do Co-op').should('be.visible');
      cy.contains('Welcome to the landing page!! Can do coop has all you need to help review your co-op documents and help you land that job!').should('be.visible');
      
      cy.get('button').contains('Sign In').should('be.visible');
      cy.get('button').contains('Sign Up').should('be.visible');
    });
  });
  