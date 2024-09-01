import { gray } from "@ant-design/colors";

describe("Data Table testing", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/client-fermentation");

    // set up basic mock for all request used
    cy.intercept("GET", "http://localhost:5000/api/v1/run-clients", {
      fixture: "getRunClients.json",
    });
    cy.intercept(
      "GET",
      "http://localhost:5000/api/v1/run-clients/<uuid>/run-time-series",
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

  it("Contains correct Data Upload behavior, validation and upload.", () => {
    cy.contains(/Csv file/i).should("be.visible");
    cy.contains(/pump 1/i).should("be.visible");
    cy.contains(/pump 2/i).should("be.visible");
    cy.contains(/Click or drag file to this area to upload/i).should(
      "be.visible"
    );
    cy.contains(/Support for a single or bulk upload./i).should("be.visible");
    cy.contains(/upload/i).should("be.visible");

    cy.get('[data-test="data-upload-form"]').within(() => {
      cy.get("input").should("have.length", 3);

      cy.contains(/Please upload a .csv file. limit: 1/i).should(
        "not.be.exist"
      );
      cy.contains(/Please enter pump 1/i).should("not.be.exist");
      cy.contains(/Please enter pump 2/i).should("not.be.exist");
      cy.get("button[type='submit']").should("have.length", 1).click();
      cy.contains(/Please upload a .csv file. limit: 1/i).should("be.exist");
      cy.contains(/Please enter pump 1/i).should("be.exist");
      cy.contains(/Please enter pump 2/i).should("be.exist");

      cy.get("input[type='search']").should("have.length", 2);
    });

    cy.contains(/glucose/i).should("not.be.exist");
    cy.contains(/glycerol/i).should("not.be.exist");
    cy.get('[data-test="data-upload-form"]').within(() => {
      cy.get("input[type='search']").eq(0).click();
    });
    cy.get(".ant-select-item-option-content").should("have.length", 2);
    cy.contains(/glucose/i).should("be.exist");
    cy.contains(/glycerol/i).should("be.exist");
    cy.get(".ant-select-item-option-content").eq(0).click();
    cy.contains(/Please enter pump 1/i).should("be.not.exist");

    cy.contains(/base/i).should("not.be.exist");
    cy.contains(/acid/i).should("not.be.exist");
    cy.get('[data-test="data-upload-form"]').within(() => {
      cy.get("input[type='search']").eq(1).click();
    });
    cy.get(".ant-select-item-option-content").should("have.length", 4); // <-- 4 because previous stay on
    cy.contains(/base/i).should("be.exist");
    cy.contains(/acid/i).should("be.exist");
    cy.get(".ant-select-item-option-content").eq(2).click();
    cy.contains(/Please enter pump 1/i).should("be.not.exist");

    cy.contains(/You can only upload CSV files!/i).should("be.not.exist");
    cy.get('[data-test="data-upload-form"]').within(() => {
      cy.get("input[type=file]").selectFile(
        "./cypress/fixtures/emptyRunClients.json",
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
      cy.get("input[type=file]").selectFile("./cypress/fixtures/mock_csv.csv", {
        force: true,
      });
    });
    cy.contains(/Please upload a .csv file. limit: 1/i).should("be.exist");

    cy.get(".ant-btn-icon").should("have.length", 2);
    cy.get(".ant-btn-icon").eq(0).click({ force: true });

    cy.contains(/Please upload a .csv file. limit: 1/i).should("not.be.exist");

    cy.get('[data-test="data-upload-form"]').within(() => {
      cy.contains(/uploading.../i).should("not.be.exist");
      cy.get("button[type='submit']").should("have.length", 1).click();
      cy.contains(/uploading.../i).should("be.exist");
    });
  });
});
