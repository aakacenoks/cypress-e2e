describe("Showcase intercept", () => {

  it.only("Dynamically moching Coingecko response in Superfluid", () => {
    cy.fixture("currencies").then((fixture) => {
      cy.intercept("GET", "**markets**", (request) => {
        request.continue((response) => {
          response.body[0]["current_price"] =
            fixture.fiatValues[request.query["vs_currency"]].multiplier *
            fixture.tokenValues[request.query["ids"]]
        })
      }).as("coingeckoRequest")
      cy.visit("https://app.superfluid.finance/streams/goerli/0x04c054715203c4c74d0a222c647106728971bbc357de456305fb4ee60a60c72d/26")
      let currencies = ["USD", "GBP", "EUR", "CNY"]
      currencies.forEach((currency) => {
        cy.get("[data-cy=fiat_currency]").click()
        cy.get("[data-cy=item-" + currency + "-multi]").filter(":visible").click()
        cy.wait("@coingeckoRequest")

        let flowRate = 9645061728395
        let secondsPerMonth = 2592000
        let result = (((flowRate * secondsPerMonth) / 1e18) * fixture.fiatValues[currency].multiplier).toFixed(2)

        cy.get("[data-cy=per_month]").should("have.text", result + " " + currency)
      })
    })
  })

})