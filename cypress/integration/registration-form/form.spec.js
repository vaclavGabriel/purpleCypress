import {
    queryStringToJSON,
    submitForm,
    randomCountries,
    randomPlatform,
    randomAccount,
    randomLeverage,
    randomCurrency,
    randomDeposit,
    randomPhoneNumber,
    randomLastName,
    randomFirstName
} from "../../support/functions"

describe("Examples of BDD scenarios automation in Cypress", () => {

    it("P001 Send data from the registration form to the endpoint", () => {
        cy.visit("/")
        cy.get("#firstname").type("Evzen").should("have.value", "Evzen")
        cy.get("#lastname").type("Savojsky").should("have.value", "Savojsky")
        cy.get("#phone").type("1234567890").should("have.value", "1234567890")
        cy.get("#countryLabel").type("Peru").blur().should("have.value", "Peru")
        cy.get("#email").type("test@example.com").should("have.value", "test@example.com")
        cy.get("#platform").select("mt4").should("have.value", "mt4")
        cy.get("#accountType").select("standard").should("have.value", "standard")
        cy.get("#leverage").select("1:25").should("have.value", "1:25")
        cy.get("#currency").select("JPY").should("have.value", "JPY")
        cy.get("#deposit").type("1000").should("have.value", "1000")
        cy.get("#iAgreeDemo").check()

        cy.intercept(/submit-form/).as("submit-form")
        submitForm()
        cy.wait("@submit-form").then((req) => {
            // check the query string directly
            expect(req.request.body).to.contain("firstname=Evzen")
            expect(req.request.body).to.contain("lastname=Savojsky")
            expect(req.request.body).to.contain("phone=1234567890")
            expect(req.request.body).to.contain("country=Peru")
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
                country: "Peru",
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
        cy.visit("/")
        cy.get("#firstname").type(randomFirstName)
        cy.get("#lastname").type(randomLastName)
        cy.get("#phone").type(randomPhoneNumber)
        cy.get("#countryLabel").type(randomCountries).blur()
        cy.get("#email").type("test@example.com") // email validation bug
        cy.get("#platform").select(randomPlatform)
        cy.get("#accountType").select(randomAccount)
        cy.get("#leverage").select(randomLeverage)
        cy.get("#currency").select(randomCurrency)
        cy.get("#deposit").type(randomDeposit)
        cy.get("#iAgreeDemo").check()
        submitForm()

        cy.intercept(/submit-form/).as("submit-form")
        cy.wait("@submit-form")
    })

    it("P003 Trigger validation of the registration form", () => {
        cy.visit("/")
        submitForm()
        cy.get('.error-level-error').should("be.visible").and("have.length", 10)
    })

    const sizes = ["iphone-8", "ipad-2"]
    const testId = ["P004", "P005"]
    sizes.forEach((size) => {
        it(`${testId.shift()} Display registration form on responsive device (${size})`, () => {
            cy.viewport(size)
            cy.visit("/")
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

    it("P006 Only valid email addresses are permitted in the email address field", () => {
        cy.visit("/")
        cy.findByRole('textbox', { name: /メールアドレス/i }).click({ force:true }).blur({ force:true })
        cy.findByText( /お客様のメールアドレスをご教示下さい。ご教示頂いたメールアドレスは、弊社サービスまたはお客様のお口座に関する重要な情報をお送りする際に使用させて頂きます。スパムの心配はございません。/i ).should("be.visible")
        cy.findByRole('textbox', { name: /メールアドレス/i }).type("test@email").blur()
        cy.findByText( /メールアドレスが正しくないフォーマットで記入されています。ご確認下さい。/i ).should("not.exist") //this is a bug
        cy.findByRole('textbox', { name: /メールアドレス/i }).type("test@@example.com").blur()
        cy.findByText( /メールアドレスが正しくないフォーマットで記入されています。ご確認下さい。/i ).should("not.exist") //this is a bug
        cy.findByRole('textbox', { name: /メールアドレス/i }).clear().type("testemail").blur()
        cy.findByText( /メールアドレスが正しくないフォーマットで記入されています。ご確認下さい。/i ).should("be.visible")
        cy.findByRole('textbox', { name: /メールアドレス/i }).clear().type(".testemail@fds.").blur()
        cy.findByText( /メールアドレスが正しくないフォーマットで記入されています。ご確認下さい。/i ).should("be.visible")
        cy.findByRole('textbox', { name: /メールアドレス/i }).clear().type("testemail   fds@example.com").blur()
        cy.findByText( /メールアドレスが正しくないフォーマットで記入されています。ご確認下さい。/i ).should("be.visible")
        cy.findByRole('textbox', { name: /メールアドレス/i }).clear().type("test@example.com").blur()
        cy.findByText( /メールアドレスが正しくないフォーマットで記入されています。ご確認下さい。/i ).should("not.exist")
    })
})

