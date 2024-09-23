describe("Data Table testing", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/projects");

    // set up basic mock for all request used
    cy.intercept(
      "GET",
      "http://localhost:5000/api/v1/run-projects/bc107046-6c90-473a-b00b-faa2e818c037/run-time-series",
      {
        fixture: "getRunTimeSeriesByRunId.json",
      }
    );
    cy.intercept("POST", "http://localhost:5000/api/v1/run-projects", {
      fixture: "postRunProjects.json",
    });
    cy.intercept("POST", "http://localhost:5000/api/v1/run-time-series/batch", {
      fixture: "postAllRunTimeSeries.json",
    });
  });

  it("Contains correct UI during no data.", () => {
    cy.intercept("GET", "http://localhost:5000/api/v1/run-projects", {
      fixture: "emptyRunProjects.json",
    });
    cy.get('[data-test="sider-menu"]').within(() => {
      cy.get('[data-test="sider-btn"]').should("have.length", 3); // 3 sider menu

      cy.get('[data-test="sider-btn"]').eq(1).click();
    });
    cy.location("pathname").should("equal", "/projects/data-table");

    cy.contains(/no data/i).should("be.visible");
    cy.get('[data-test="project-selecter"]').should("have.length", 1);
    cy.get('[data-test="project-selecter"]').click();

    cy.get('.ant-select-dropdown').within(() => {
      cy.contains(/no data/i).should("be.visible");
    });
  });

  it("Contains correct Data Table behavior.", () => {
    cy.intercept("GET", "http://localhost:5000/api/v1/run-projects", {
      fixture: "getRunProjects.json",
    });
    cy.get('[data-test="sider-menu"]').within(() => {
      cy.get('[data-test="sider-btn"]').should("have.length", 3); // 3 sider menu

      cy.get('[data-test="sider-btn"]').eq(1).click();
    });
    cy.location("pathname").should("equal", "/projects/data-table");

    cy.contains(/no data/i).should("be.visible");
    cy.contains(/project test001/i).should("not.be.exist");
    cy.contains(/project test002/i).should("not.be.exist");
    cy.get('[data-test="project-selecter"]').should("have.length", 1);
    cy.get('[data-test="project-selecter"]').click();

    cy.contains(/project test001/i).should("be.visible");
    cy.contains(/project test002/i).should("be.visible");
    cy.get('.ant-select-item-option-content').should("have.length", 2)

    // ensure data exists here
    cy.contains(/temperature/i).should("not.be.exist");
    cy.contains(/degc/i).should("not.be.exist");
    cy.get('.ant-select-item-option-content').eq(0).click()
    cy.contains(/temperature/i).should("be.visible");
    cy.contains(/degc/i).should("be.visible");
  });
});
