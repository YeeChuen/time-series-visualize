describe("Data Table testing", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/projects");

    // set up basic mock for all request used
    cy.intercept("GET", "http://localhost:5000/api/v1/run-projects", {
      fixture: "getRunProjects.json",
    });
    cy.intercept(
      "GET",
      "http://localhost:5000/api/v1/run-projects/<uuid>/run-time-series",
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

  it("Contains correct Data Upload behavior, validation and upload.", () => {
    cy.contains(/Csv file/i).should("be.visible");
    cy.contains(/Click or drag file to this area to upload/i).should(
      "be.visible"
    );
    cy.contains(/Support for a single or bulk upload./i).should("be.visible");
    cy.contains(/upload/i).should("be.visible");

    cy.get('[data-test="data-upload-form"]').within(() => {
      cy.get("input").should("have.length", 1);

      cy.contains(/Please upload a .csv file. limit: 1/i).should(
        "not.be.exist"
      );
      cy.get("button[type='submit']").should("have.length", 1).click();
      cy.contains(/Please upload a .csv file. limit: 1/i).should("be.exist");
    });

    cy.contains(/You can only upload CSV files!/i).should("be.not.exist");
    cy.get('[data-test="data-upload-form"]').within(() => {
      cy.get("input[type=file]").selectFile(
        "./cypress/fixtures/emptyRunProjects.json",
        {
          force: true,
        }
      );
    });
    cy.contains(/You can only upload CSV files!/i).should("be.visible");

    cy.get('[data-test="data-upload-form"]').within(() => {
      cy.get("input[type=file]").selectFile("./cypress/fixtures/mock_csv.csv", {
        force: true,
      });
    });
    cy.contains(/Please upload a .csv file. limit: 1/i).should("not.be.exist");
    cy.contains(/mock_csv.csv/i).should("be.exist");


    cy.get('[data-test="data-upload-form"]').within(() => {
      cy.contains(/uploading.../i).should("not.be.exist");
      cy.get("button[type='submit']").should("have.length", 1).click();
      cy.contains(/uploading.../i).should("be.exist");
    });
  });
});
