///<reference types = "cypress"/>
import dayjs from 'dayjs'
var faker = require('faker');

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
        let objCadastro = obj();
        cy.request({
            url: '/v1/viagens',
            method: 'POST',
            headers: {
                Authorization: `Bearer ${tokenAdmin}`,  /***/
                "Content-type": "application/json"
            },
            body: objCadastro

        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body.data).to.have.property('id')
            expect(res.body.data).to.have.property('acompanhante', `${objCadastro.acompanhante}`)
        })
    })

    it.only("Validar retorno de viagens cadastradas", () => {
        cy.request({
            url: '/v1/viagens',
            method: 'GET',
            headers: {
                Authorization: `Bearer ${tokenUsuario}`,
                "Content-type": "application/json"
            }
        }).as('response')
            .should("not.be.empty")
        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(200)
            expect(res.body.data).have.length.greaterThan(0)
        })
    })

    it.skip("Validar edição viagem", () => {
        cy.request({
            url: '/v1/viagens',
            method: 'GET',
            headers: {
                Authorization: `Bearer ${tokenUsuario}`,
                "Content-type": "application/json"
            }
        }).then(res => {
            cy.request({
                url: `/v1/viagens/${res.body.data[2].id}`,
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${tokenAdmin}`,
                    "Content-type": "application/json"
                },
                body: {
                    "acompanhante": "teste - alteração",
                    "dataPartida": "2020-03-10",
                    "dataRetorno": "2020-05-17",
                    "localDeDestino": "Canoas",
                    "regiao": "sul"
                }
            }).as('response')
                .should("not.be.empty")
            cy.get('@response').then(res => {
                expect(res.status).to.be.equal(204)
            })
        })
    })

    it.only("Validar sucesso ediçao viagem", () => {
        cy.getIdViagem(tokenUsuario).then(getId => {
            cy.request({
                url: `/v1/viagens/${getId}`,
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${tokenAdmin}`,
                    "Content-type": "application/json"
                },
                body: {
                    "acompanhante": "teste - alteração",
                    "dataPartida": "2020-03-10",
                    "dataRetorno": "2020-05-17",
                    "localDeDestino": "Canoas",
                    "regiao": "sul"
                }
            }).as('response')
                .should("not.be.empty")
            cy.get('@response').then(res => {
                expect(res.status).to.be.equal(204)
            })
        })
    })


    it.skip("Validar sucesso exclusao viagem", () => {
        cy.request({
            failOnStatusCode: false,  // segue o teste mesmo com erro
            url: '/v1/viagens/1',
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${tokenAdmin}`,
                "Content-type": "application/json"
            }
        }).as('response')
        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(204)
        })
    })
})


function obj() {
    let partida = dayjs().format('YYYY-MM-DD')
    let retorno = dayjs(partida).add(Math.floor(Math.random() * 10), 'day').format('YYYY-MM-DD')
    var regiao = ["Sul", "Nordeste", "Norte", "Centro-Oeste", "Sudeste"]
    const indiceRegiao = Math.floor(Math.random() * regiao.length);

    return {
        "acompanhante": faker.name.findName(),
        "dataPartida": partida,
        "dataRetorno": retorno,
        "localDeDestino": faker.address.cityName(),
        "regiao": regiao[indiceRegiao]
    }
}