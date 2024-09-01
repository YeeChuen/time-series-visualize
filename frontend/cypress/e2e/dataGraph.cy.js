describe("Data Graph testing", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/client-fermentation");

    // set up basic mock for all request used
    cy.intercept(
      "GET",
      "http://localhost:5000/api/v1/run-clients/bc107046-6c90-473a-b00b-faa2e818c037/run-time-series",
      {
        fixture: "getRunTimeSeriesByRunId.json",
      }
    );
    cy.intercept("POST", "http://localhost:5000/api/v1/run-clients", {
      fixture: "postRunClients.json",
    });
    cy.intercept("POST", "http://localhost:5000/api/v1/run-time-series/batch", {
      fixture: "postAllRunTimeSeries.json",
    });
  });

  it("Contains correct UI during no data.", () => {
    cy.intercept("GET", "http://localhost:5000/api/v1/run-clients", {
      fixture: "emptyRunClients.json",
    });
    cy.get('[data-test="sider-menu"]').within(() => {
      cy.get('[data-test="sider-btn"]').should("have.length", 3); // 3 sider menu

      cy.get('[data-test="sider-btn"]').eq(2).click();
    });
    cy.location("pathname").should("equal", "/client-fermentation/data-graph");

    cy.contains(/no data/i).should("be.visible");
    cy.get('[data-test="client-selecter"]').should("have.length", 1);
    cy.get('[data-test="client-selecter"]').click();

    cy.get(".ant-select-dropdown").within(() => {
      cy.contains(/no data/i).should("be.visible");
    });
  });

  it("Contains correct Data Graph behavior.", () => {
    cy.intercept("GET", "http://localhost:5000/api/v1/run-clients", {
      fixture: "getRunClients.json",
    });
    cy.get('[data-test="sider-menu"]').within(() => {
      cy.get('[data-test="sider-btn"]').should("have.length", 3); // 3 sider menu

      cy.get('[data-test="sider-btn"]').eq(2).click();
    });
    cy.location("pathname").should("equal", "/client-fermentation/data-graph");

    cy.contains(/no data/i).should("be.visible");
    cy.contains(/client test001/i).should("not.be.exist");
    cy.contains(/client test002/i).should("not.be.exist");
    cy.get('[data-test="client-selecter"]').should("have.length", 1);
    cy.get('[data-test="client-selecter"]').click();

    cy.contains(/client test001/i).should("be.visible");
    cy.contains(/client test002/i).should("be.visible");
    cy.get(".ant-select-item-option-content").should("have.length", 2);

    // ensure data exists here for graph
    cy.get('[data-chart-source-type="Ant Design Charts"]').should(
      "not.be.exist"
    );
    cy.contains(/Run client time series data/i).should("not.be.exist");
    cy.get(".ant-select-item-option-content").eq(0).click();
    cy.contains(/Run client time series data/i).should("be.visible");
    cy.get('[data-chart-source-type="Ant Design Charts"]').should("be.exist");
  });
});
