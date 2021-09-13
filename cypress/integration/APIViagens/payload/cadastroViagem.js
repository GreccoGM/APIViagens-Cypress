import dayjs from 'dayjs'
var faker = require('faker');

let partida = dayjs().format('YYYY-MM-DD')
let retorno = dayjs(partida).add(Math.floor(Math.random() * 10), 'day').format('YYYY-MM-DD')
var regiao = [
    "Sul",
    "Nordeste",
    "Norte",
    "Centro-Oeste",
    "Sudeste"
]
const indiceRegiao = Math.floor(Math.random() * regiao.length);

function obj() {
    return {
        "acompanhante": faker.name.findName(),
        "dataPartida": partida,
        "dataRetorno": retorno,
        "localDeDestino": faker.address.cityName(),
        "regiao": regiao[indiceRegiao]
    }

    //return JSON.parse(objetoV);

} export { obj };