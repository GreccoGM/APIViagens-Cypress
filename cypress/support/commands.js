// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add("getTokenUsuario", () => {
    cy.request({
        method: 'POST',
        url: '/v1/auth',
        body: {
            "email": "usuario@email.com",
            "senha": "123456"
        }
    }).its("body.data.token").should("not.be.empty").as('response')
        .then(token => {
            return token
        })
})

Cypress.Commands.add("getTokenAdmin", () => {
    cy.request({
        method: 'POST',
        url: '/v1/auth',
        body: {
            "email": "admin@email.com",
            "senha": "654321"
        }
    }).its("body.data.token").should("not.be.empty").as('response')
        .then(token => {
            //console.log("teste",token)
            return token
        })
})

Cypress.Commands.add("getIdViagem", (tokenUsuario) => {
    cy.request({
        url: '/v1/viagens',
        method: 'GET',
        headers: {
            Authorization: `Bearer ${tokenUsuario}`,
            "Content-type": "application/json"
        }
    }).then(res => {
        return res.body.data[0].id;
    })
})