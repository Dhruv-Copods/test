/* eslint-disable no-undef */
describe("Tests", () => {
  it("Test to visit all Routes", () => {
    cy.visit("/dashboard");
    cy.url().should("includes", "/dashboard");
    cy.location("pathname").should("include", "/dashboard");
    cy.visit("/notes");
    cy.url().should("includes", "/notes");
    cy.location("pathname").should("include", "/notes");
    cy.visit("/archives");
    cy.url().should("includes", "/archives");
    cy.location("pathname").should("include", "/archives");
  });

  it("Test to see if Alert is shown on adding empty note", () => {
    cy.visit("/notes");
    cy.get('textarea[name="note"]').clear();
    cy.get('[data-cy="submit"]').click();
    cy.on("window:alert", (alert) => {
      expect(alert).to.contains("Dont keep note empty");
    });
  });

  it("Test to see if note is added or not", () => {
    cy.visit("/notes");
    cy.get('textarea[name="note"]')
      .clear()
      .type("This is my First Note")
      .should("have.focus")
      .should("have.value", "This is my First Note");
    cy.get('[data-cy="submit"]').click();
    cy.get("#all-notes").each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName("noteText")[0].innerHTML ===
          "This is my First Note"
        ) {
          cy.get(".noteText").should("have.text", "This is my First Note");
        }
      });
    });
  });

  it("Test for adding Note", () => {
    cy.visit("/notes");
    cy.get('textarea[name="note"]')
      .clear()
      .type("This is my First Note")
      .should("have.focus")
      .should("have.value", "This is my First Note");
    cy.get('[data-cy="submit"]').click();
  });

  it("Test for adding Two Notes", () => {
    cy.visit("/notes");
    cy.get('textarea[name="note"]')
      .clear()
      .type("This is my First Note")
      .should("have.focus")
      .should("have.value", "This is my First Note");
    cy.get('[data-cy="submit"]').click();
    cy.get('textarea[name="note"]')
      .clear()
      .type("This is my First Note")
      .should("have.focus")
      .should("have.value", "This is my First Note");
    cy.get('[data-cy="submit"]').click();
  });

  it("Test for deleting a note and checking if it is deleted", () => {
    cy.visit("/notes");
    cy.get('textarea[name="note"]')
      .clear()
      .type("First Note")
      .should("have.focus")
      .should("have.value", "First Note");
    cy.get('[data-cy="submit"]').click();
    cy.get('textarea[name="note"]')
      .clear()
      .type("Note to Delete")
      .should("have.focus")
      .should("have.value", "Note to Delete");
    cy.get('[data-cy="submit"]').click();
    cy.get('textarea[name="note"]')
      .clear()
      .type("another")
      .should("have.focus")
      .should("have.value", "another");
    cy.get('[data-cy="submit"]').click();
    cy.get(".allNotes").each(($el) => {
      cy.wrap($el).within((el) => {
        // console.log(div[0].getElementsByClassName("noteText")[0]);
        if (
          el[0].getElementsByClassName("noteText")[0].innerHTML ===
          "Note to Delete"
        ) {
          cy.get(".noteText")
            .contains("Note to Delete")
            .parent()
            .within(() => {
              cy.get('[data-cy="delete"]')
                .should("have.text", "Delete Note")
                .click();
            });
        }
      });
    });
    cy.get(".allNotes")
      .get(".noteText")
      .contains("Note to Delete")
      .should("not.exist");
  });
});
