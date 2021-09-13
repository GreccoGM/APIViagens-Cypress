///<reference types = "cypress"/>
import * as EditarViagem from "../request/putViagem.request"

describe("Teste API - Gerenciador Viagens..", () => {
    let tokenAdmin
    let tokenUsuario
    before(() => {
        cy.getTokenAdmin().then(getTokenAdmin => {
            tokenAdmin = getTokenAdmin
        })
        cy.getTokenUsuario().then(getTokenUsuario => {
            tokenUsuario = getTokenUsuario
        })
    })

    it.only("Validar sucesso ediçao viagem", () => {
        cy.getIdViagem(tokenUsuario).then(getId => {
            EditarViagem.editarViagem(tokenAdmin, getId)
                .should((response) => {
                    expect(response.status).to.be.equal(204)
                })
        })
    })
})