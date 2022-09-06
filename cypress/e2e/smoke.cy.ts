/* eslint-disable no-undef */
/// <reference types="cypress" />

import {
  cypressConstants,
  noteConstants,
  routeConstants,
} from "../../src/constants/constants";

describe("Tests", () => {
  it("Test to visit all Routes", () => {
    cy.visit(routeConstants.dashboard);

    // Dashboard Test
    cy.get("a").contains("Dashboard").click();
    cy.location("pathname").should("eq", routeConstants.dashboard);

    // Notes Test
    cy.get("a").contains("Notes").click();
    cy.location("pathname").should("eq", routeConstants.notes);

    // Archived Test
    cy.get("a").contains("Archives").click();
    cy.location("pathname").should("eq", routeConstants.archives);
  });

  it("Test to see if Alert is shown on adding empty note", () => {
    cy.visit(routeConstants.notes);
    cy.get('textarea[name="note"]').clear();
    cy.get('[data-cy="submit"]').click();
    cy.on("window:alert", (alert) => {
      expect(alert).to.contains(noteConstants.emptyNoteAlert);
    });
  });

  it("Test to see if note is added or not", () => {
    cy.visit(routeConstants.notes);
    cy.get('textarea[name="note"]')
      .clear()
      .type(cypressConstants.noteOne)
      .should("have.focus")
      .should("have.value", cypressConstants.noteOne);
    cy.get('[data-cy="submit"]').click();
    cy.get("#all-notes").each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName("noteText")[0].innerHTML ===
          cypressConstants.noteOne
        ) {
          cy.get(".noteText").should("have.text", cypressConstants.noteOne);
        }
      });
    });
  });

  it("Test for adding Note", () => {
    cy.visit(routeConstants.notes);
    cy.get('textarea[name="note"]')
      .clear()
      .type(cypressConstants.noteOne)
      .should("have.focus")
      .should("have.value", cypressConstants.noteOne);
    cy.get('[data-cy="submit"]').click();
  });

  it("Test for adding Two Notes", () => {
    cy.visit(routeConstants.notes);
    cy.get('textarea[name="note"]')
      .clear()
      .type(cypressConstants.noteOne)
      .should("have.focus")
      .should("have.value", cypressConstants.noteOne);
    cy.get('[data-cy="submit"]').click();
    cy.get('textarea[name="note"]')
      .clear()
      .type(cypressConstants.noteOne)
      .should("have.focus")
      .should("have.value", cypressConstants.noteOne);
    cy.get('[data-cy="submit"]').click();
  });

  it("Test for deleting a note and checking if it is deleted", () => {
    cy.visit(routeConstants.notes);
    cy.get('textarea[name="note"]')
      .clear()
      .type(cypressConstants.noteOne)
      .should("have.focus")
      .should("have.value", cypressConstants.noteOne);
    cy.get('[data-cy="submit"]').click();
    cy.get('textarea[name="note"]')
      .clear()
      .type(cypressConstants.noteToDelete)
      .should("have.focus")
      .should("have.value", cypressConstants.noteToDelete);
    cy.get('[data-cy="submit"]').click();
    cy.get(".allNotes").each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName("noteText")[0].innerHTML ===
          cypressConstants.noteToDelete
        ) {
          cy.get(".noteText")
            .contains(cypressConstants.noteToDelete)
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
      .contains(cypressConstants.noteToDelete)
      .should("not.exist");
  });

  it("Test to Archive note and check if its shown in Archives Page", () => {
    cy.visit(routeConstants.notes);
    cy.get('textarea[name="note"]')
      .clear()
      .type(cypressConstants.noteOne)
      .should("have.focus")
      .should("have.value", cypressConstants.noteOne);
    cy.get('[data-cy="submit"]').click();
    cy.get('textarea[name="note"]')
      .clear()
      .type(cypressConstants.noteToArchive)
      .should("have.focus")
      .should("have.value", cypressConstants.noteToArchive);
    cy.get('[data-cy="submit"]').click();
    cy.get(".allNotes").each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName("noteText")[0].innerHTML ===
          cypressConstants.noteToArchive
        ) {
          cy.get(".noteText")
            .contains(cypressConstants.noteToArchive)
            .parent()
            .within(() => {
              cy.get('[data-cy="archive"]')
                .should("have.text", "Archive Note")
                .click();
            });
        }
      });
    });
    cy.get(".allNotes")
      .get(".noteText")
      .contains(cypressConstants.noteToDelete)
      .should("not.exist");
    cy.get("#side-bar").get("a").contains("Archives").click();
    cy.location("pathname").should("include", routeConstants.archives);
    cy.get(".archivedNotes").each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName("noteText")[0].innerHTML ===
          cypressConstants.noteToArchive
        ) {
          cy.get(".noteText").contains(cypressConstants.noteToArchive);
        }
      });
    });
  });
});
