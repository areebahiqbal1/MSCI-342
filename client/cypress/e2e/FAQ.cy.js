describe('FAQ page', () => {
    beforeEach(() => {
      cy.visit('/FAQ/index')
    })
  
    it('should have bold "Frequently Asked Questions" heading', () => {
      cy.get('h1')
        .contains('Frequently Asked Questions')
        .should('have.css', 'font-weight', '700')
    })
  })