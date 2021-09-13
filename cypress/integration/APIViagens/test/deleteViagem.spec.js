///<reference types = "cypress"/>
import * as DeletarViagem from "../request/deleteViagem.request"

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

    it.only("Validar sucesso cadastro viagem", () => {
        cy.getIdViagem(tokenUsuario).then(getId => {
            DeletarViagem.deletarViagem(tokenAdmin, getId)
                .should((response) => {
                    expect(response.status).to.be.equal(204)
                })
        })
    })
})