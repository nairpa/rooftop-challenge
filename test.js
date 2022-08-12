const test = require('node:test');
const http = require('http');

const assert = require('node:assert/strict');
const jsonIndex = require('./jsonIndex.json');
const jsonABC = require('./jsonABC.json');

test('Debería encontrar la clave de la letra y asociarla su índice en el array de la url', () => {
    Object.entries(jsonIndex).forEach((symbol) => {
        Object.keys(jsonABC).forEach(key => {
            let [symbolKey, symbolIndex] = symbol;
            
            if(jsonABC[key] === symbolKey) {
                assert.strictEqual(jsonABC[key], symbolKey)
            }
        })
    })
})

test('La clave del nuevo json debería corresponder al índice de la letra en el array', () => {
    let urlJson = {};

    Object.entries(jsonIndex).forEach((symbol) => {
        Object.keys(jsonABC).forEach(key => {
            let [symbolKey, symbolIndex] = symbol;
            
            if(jsonABC[key] === symbolKey) {
                symbolIndex.forEach(index => {
                    urlJson = {
                        ...urlJson,
                        [index]: key
                    }

                    assert.strictEqual(urlJson[index], key)
                })
            }
        })
    })
})

test('El string de la url debería devolver una respuesta no erronea', () => {
    let urlJson = {}
        
    Object.entries(jsonIndex).forEach((symbol) => {
        Object.keys(jsonABC).forEach(key => {
            let [symbolKey, symbolIndex] = symbol;
            
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

    Object.keys(urlJson).forEach(key => {
        urlArray.push(urlJson[key])
    })

    let url = urlArray.join().replaceAll(',','');
    let testUrl = url.replace(/https:\/\//, '');
    let [host, path] = testUrl.split('/', 1);

    const options = {
        host: host,
        method: 'HEAD',
        path: path
    }
    
    const req = http.request(options, res => {
        let noError = res.statusCode >= 100 && res.statusCode <= 399;
        assert.strictEqual(true, noError)
    })

    req.end()
})

