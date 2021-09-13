///<reference types = "cypress"/>

function deletarViagem(tokenAdmin, idViagem) {
    return cy.request({
        failOnStatusCode: false,  // segue o teste mesmo com erro
        url: `/v1/viagens/${idViagem}`,
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${tokenAdmin}`,
            "Content-type": "application/json"
        }
    })
} export { deletarViagem };
