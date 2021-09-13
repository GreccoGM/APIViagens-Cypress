///<reference types = "cypress"/>
import * as CadastrarViagem from "../request/postCadastrarViagem.request"
import { obj } from "../request/postCadastrarViagem.request"

describe("Teste API - Gerenciador Viagens..", () => {
    let tokenAdmin
    before(() => {
        cy.getTokenAdmin().then(getTokenAdmin => {
            tokenAdmin = getTokenAdmin
        })
    })

    it.only("Validar sucesso cadastro viagem", () => {
        CadastrarViagem.cadastrarViagem(tokenAdmin)
            .should((response) => {
                expect(response.status).to.be.equal(201)
                expect(response.body.data).to.have.property('id')
                expect(response.body.id).not.null

                expect(response.body.data).to.have.property('acompanhante', `${obj.acompanhante}`)
            })
    })
})