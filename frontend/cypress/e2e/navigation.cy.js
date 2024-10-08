describe("Navigation and layout testing", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/projects/data-upload");
    cy.intercept("GET", "http://localhost:5000/api/v1/run-projects", {
      fixture: "getRunProjects.json",
    });
  });

  it("Contains correct layout and navigation", () => {
    cy.contains(/time series visualize/i).should("be.visible");

    cy.location("pathname").should("equal", "/projects/data-upload");

    cy.get('[data-test="layout-header"]').within(() => {
      cy.get("> a").should("have.length", 1); // 1 brand logo

      cy.get("> a").eq(0).as("brand-btn");
    });

    cy.get('[data-test="topnav-menu"]').within(() => {
      cy.get("a").should("have.length", 1); // 1 top navigation routing

      cy.get("a").eq(0).as("projects-btn");
    });

    cy.get('[data-test="sider-menu"]').within(() => {
      cy.get("a").should("have.length", 3); // 3 sider menu

      cy.get("a").its(0).should("contains.text", "Data Upload");
      cy.get("a").its(1).should("contains.text", "Data Table");
      cy.get("a").its(2).should("contains.text", "Data Graph");

      cy.get("a").eq(1).click();

      cy.location("pathname").should(
        "equal",
        "/projects/data-table"
      );
      
      cy.get("@brand-btn").click();
      cy.location("pathname").should(
        "equal",
        "/projects/data-upload"
      );

      
      cy.get("a").eq(2).click();

      cy.location("pathname").should(
        "equal",
        "/projects/data-graph"
      );
      
      cy.get("@projects-btn").click();
      cy.location("pathname").should(
        "equal",
        "/projects/data-upload"
      );

    });
  });
});
