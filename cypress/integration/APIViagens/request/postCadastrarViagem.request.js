///<reference types = "cypress"/>

import * as objViagem from "../payload/cadastroViagem.js"

//const objViagem = require("../payload/cadastroViagem.js") -- usado qnd obj eh um .json
let obj = objViagem.obj()
//console.log(obj)
function cadastrarViagem(tokenAdmin) {
    return cy.request({
        url: '/v1/viagens',
        method: 'POST',
        headers: {
            Authorization: `Bearer ${tokenAdmin}`,  /***/
            "Content-type": "application/json"
        },
        body: obj
    })

} export { cadastrarViagem }
export { obj };
