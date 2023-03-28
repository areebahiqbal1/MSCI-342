
describe("Calendar", () => {
    it('displays calendar content', () => {
        cy.visit('/Calendar/Calendar'); 
        cy.contains('Calendar').should('be.visible');

        });
    });
        
  