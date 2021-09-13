///<reference types = "cypress"/>
import * as ConsultarViagens from "../request/getViagens.request"

describe("Teste API - Gerenciador Viagens..", () => {
    let tokenUsuario
    before(() => {
        cy.getTokenUsuario().then(getTokenUsuario => {
            tokenUsuario = getTokenUsuario
        })
    })

    it.only("Validar sucesso cadastro viagem", () => {
        ConsultarViagens.consultarViagens(tokenUsuario)
            .should((response) => {
                expect(response.status).to.be.equal(200)
                expect(response.body.data).have.length.greaterThan(0)
            })
    })
})