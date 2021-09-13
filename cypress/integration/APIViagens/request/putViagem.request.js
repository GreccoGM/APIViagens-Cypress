///<reference types = "cypress"/>

function editarViagem(tokenAdmin, idViagem) {
    return cy.request({
        url: `/v1/viagens/${idViagem}`,
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${tokenAdmin}`,
            "Content-type": "application/json"
        },
        body: {
            "acompanhante": "Marques",
            "dataPartida": "2020-03-10",
            "dataRetorno": "2020-05-17",
            "localDeDestino": "Canoas",
            "regiao": "sul"
        }
    })
} export { editarViagem };
