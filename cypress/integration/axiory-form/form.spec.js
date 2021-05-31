import {
    queryStringToJSON,
    submitForm,
    randomCountries,
    randomPlatform,
    randomAccount,
    randomLeverage,
    randomCurrency,
    randomDeposit, randomPhoneNumber
} from "../../support/functions"

describe("Examples of BDD scenarios automation in Cypress", () => {

    it("P001 Send data from the registration form to the endpoint", () => {
        cy.visit("https://revolgy-forms-case-study-master.staging.axiory.com/jp/registration/demo")
        cy.get("#firstname").type("Evzen")
        cy.get("#lastname").type("Savojsky")
        cy.get("#phone").type("1234567890")
        cy.get("#countryLabel").type("Japan").blur()
        cy.get("#email").type("test@example.com")
        cy.get("#platform").select("mt4")
        cy.get("#accountType").select("standard")
        cy.get("#leverage").select("1:25")
        cy.get("#currency").select("JPY")
        cy.get("#deposit").type("1000")
        cy.get("#iAgreeDemo").check()

        cy.intercept(/submit-form/).as("submit-form")

        submitForm()

        cy.wait("@submit-form").then((req) => {
            // check the query string directly
            expect(req.request.body).to.contain("firstname=Evzen")
            expect(req.request.body).to.contain("lastname=Savojsky")
            expect(req.request.body).to.contain("phone=1234567890")
            expect(req.request.body).to.contain("country=Japan")
            expect(req.request.body).to.contain("email=test%40example.com")
            expect(req.request.body).to.contain("platform=mt4")
            expect(req.request.body).to.contain("accountType=standard")
            expect(req.request.body).to.contain("leverage=1%3A25")
            expect(req.request.body).to.contain("currency=JPY")
            expect(req.request.body).to.contain("deposit=1000")
            expect(req.request.body).to.contain("iAgreeDemo=")

            //or deserialize query string to JSON object
            const requestObject = queryStringToJSON(req.request.body)
            expect(req.response.statusCode).to.equal(302)
            expect(requestObject).to.include({
                firstname: "Evzen",
                lastname: "Savojsky",
                phone: "1234567890",
                country: "Japan",
                email: "test@example.com",
                platform: "mt4",
                accountType: "standard",
                leverage: "1:25",
                currency: "JPY",
                deposit: "1000",
                iAgreeDemo: ""
            })
        })
    })

    it("P002 Submit the registration form with random data", () => {
        cy.visit("https://revolgy-forms-case-study-master.staging.axiory.com/jp/registration/demo")
        cy.get("#firstname").type("Evzen")
        cy.get("#lastname").type("Savojsky")
        cy.get("#phone").type(randomPhoneNumber)
        cy.get("#countryLabel").type(randomCountries).blur()
        cy.get("#email").type("test@example.com")
        cy.get("#platform").select(randomPlatform)
        cy.get("#accountType").select(randomAccount)
        cy.get("#leverage").select(randomLeverage)
        cy.get("#currency").select(randomCurrency)
        cy.get("#deposit").type(randomDeposit)
        cy.get("#iAgreeDemo").check()
        submitForm()

        cy.intercept(/submit-form/).as("submit-form")
        cy.wait("@submit-form")

        // cy.intercept(/submit-form/).as("submit-form")
        // cy.wait("@submit-form").then((req) => {
        //     const requestObject = queryStringToJSON(req.request.body)
        //     expect(req.response.statusCode).to.equal(302)
        //     expect(requestObject).to.include({
        //         firstname: "Evzen",
        //         lastname: "Savojsky",
        //         phone: "1234567890",
        //         country: queryString.stringify(parse(randomCountries)),
        //         email: "test@example.com",
        //         platform: randomPlatform,
        //         accountType: randomAccount,
        //         leverage: randomLeverage,
        //         currency: randomCurrency,
        //         deposit: randomDeposit.toString(),
        //         iAgreeDemo: ""
        //     })
        // })
    })

    it("P003 Trigger validation of the registration form", () => {
        cy.visit("https://revolgy-forms-case-study-master.staging.axiory.com/jp/registration/demo")
        submitForm()
        cy.get('.error-level-error').should("be.visible").and("have.length", 10)
    })

    const sizes = ["iphone-8", "ipad-2"]
    const testId = ["P003", "P004"]
    sizes.forEach((size) => {
        it(`${testId.shift()} Display registration form on responsive device (${size})`, () => {
            cy.viewport(size)
            cy.visit("https://revolgy-forms-case-study-master.staging.axiory.com/jp/registration/demo")
            cy.get("#firstname").should("be.visible")
            cy.get("#lastname").should("be.visible")
            cy.get("#phone").should("be.visible")
            cy.get("#countryLabel").should("be.visible")
            cy.get("#email").should("be.visible")
            cy.get("#platform").should("be.visible")
            cy.get("#accountType").should("be.visible")
            cy.get("#leverage").should("be.visible")
            cy.get("#currency").should("be.visible")
            cy.get("#deposit").should("be.visible")
            cy.get("#iAgreeDemo").should("be.visible")
            cy.get(".button").should("be.visible")
        })
    })


})

