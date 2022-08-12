const jsonIndex = require('./jsonIndex.json');
const jsonABC = require('./jsonABC.json');

let urlJson = { };

/**
 * Por cada entrada del objeto de los índices recorre el json de las letras 
 * y compara el valor del jsonABC con la clave del jsonIndex
 */
Object.entries(jsonIndex).forEach((symbol) => {
    Object.keys(jsonABC).forEach(key => {
        let [symbolKey, symbolIndex] = symbol;

        /**
        * Busca coincidencia entre la clave del json de las letras con la clave en el json de los indices, 
        * si hay coincidencia entonces, para todos los índices de esa clave, 
        * se agrega en el nuevo json una clave (representada por el índice correspondiente) con la letra asociada.
        * */
        if(jsonABC[key] === symbolKey) {
            symbolIndex.forEach(index => {
                urlJson = {
                    ...urlJson,
                    [index]: key
                }
            })
        }
    })
})

let urlArray = []

/**
 * Crea un array con las letras ordenadas.
 */
Object.keys(urlJson).forEach(key => {
    urlArray.push(urlJson[key])
})

/**
 * Forma el string de la url.
 */
let url = urlArray.join().replaceAll(',','');

console.info(url)