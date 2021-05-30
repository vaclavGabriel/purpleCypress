import {
    queryStringToJSON,
    submitForm,
    randomCountries,
    randomPlatform,
    randomAccount,
    randomLeverage,
    randomCurrency,
    randomDeposit
} from "../../support/functions"

describe("Examples of BDD scenarios automation in Cypress", () => {

    it("P001 Send data from the form to the endpoint", () => {
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

    it("P002 Trigger validation of the form", () => {
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

    it.only("P00 ", () => {
        cy.visit("https://revolgy-forms-case-study-master.staging.axiory.com/jp/registration/demo")
        cy.get("#firstname").type("Evzen")
        cy.get("#lastname").type("Savojsky")
        cy.get("#phone").type("1234567890")
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

        // cy.intercept("POST", "/submit-form/", (req) => {
        //     req.body = `firstname=&lastname=jksdf&phone=%29%28*%26%5E%25%24%25%5E%26*%28&country=Haiti&email=fasdfasdfsdf%40dsfasd.cz&platform=mt4&accountType=nano&leverage=1%3A50&currency=JPY&deposit=1000&iAgreeDemo=&recaptcha=03AGdBq25_tAGTVHVg_TtF-WST60ZTyx_S51qVQ6pdtI1dTEq1rSzZLdYM_UtQ3t6YGqsjZZY1-gyWX8xclIEiuFhHCA_lvf2JOuY3CBGLjxGE3ng9DbiTs46UVesB5WfUn-tyX7flMdwxnEel7ZlU377rH03aE5pqyIadepokj_uxqFASDvgUdiLc-sUrOoEPYG_bUistrticuQueFBfh4nCMxcqpwG2xBxkCjzhuzB1Z1p5mONpRyHiNVyzJWg-AnvivK5gZo3OZMdXg9vTlEyjiPsgkNBf1xDHuw6vK8_xejGAOkW4JDEbkc-aatq5KInzWvLnabeA_9IXOGzRkCTTCkTY2-1SPiDssauitkoWmhmlxVOvD3u6JM4bYeZqrptZZGj_hpF58JM8FhCFjpMv4RqvL87vLe0xaAYUYezzWkKXm6hgELPV0DOtWEe7NVJRkBm-YiJwCxdgTW-A0N6x9Vm78lHvbw2fpst5DXvmJUu5Rlu30I4U&ibCode=&language=ja&browser=chrome+90.0.4430%2C+mobile%3A+false%2C+os%3A+Windows+10&step=intro&graphqlUrl=https%3A%2F%2Fjapn8252x0.execute-api.ap-northeast-1.amazonaws.com%2Fmaster%2Fgraphql&graphqlType=demoAccounts&graphqlResolver=submit`
        //     // send the modified request and skip any other matching request handlers
        //     req.continue()
        // })
    })
})

