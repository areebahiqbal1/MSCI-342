
describe("Calendar", () => {
    it('displays calendar content', () => {
        cy.visit('/Calendar/Calendar'); 
        cy.contains('Calendar').should('be.visible');
  
        cy.get('.calendar_default_cell').first().click()
        cy.get('.calendar_default_event_inner').should('have.length.gt', 0)
//the test first visits the Calendar component, then finds the first day cell and clicks it
//then it checks if the timeslots are displayed by checking if there are any elements with the class calendar_default_event_inner.
//If there is, it means the time slots are preseent
        });
    });
        
  