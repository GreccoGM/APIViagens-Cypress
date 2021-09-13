///<reference types = "cypress"/>

function consultarViagens(tokenUsuario) {
    return cy.request({
        url: '/v1/viagens',
        method: 'GET',
        headers: {
            Authorization: `Bearer ${tokenUsuario}`,
            "Content-type": "application/json"
        }
    })
} export { consultarViagens };
