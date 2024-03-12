const http = require('node:http')
require('dotenv').config()
const port = process.env.PORT || 3000
const fs = require('node:fs')
// const querystring = require('querystring')
const { log } = require('node:console')
const utils = require('./utils')

const server = http.createServer( (req, res) => {

    res.writeHead( 200, {'Content-Type': 'text/html; charset=utf-8'})

    if (req.method === 'GET' && req.url === '/') {
         log('=====================================================')
         utils.getView('/index.html', res)
    }

    else if ( req.method === 'POST') {

        const file_To_Write = 'write.txt'
        const data = "ÍRÁS, ékezetes szöveg íéáőúűóüööüóúőűáéí 333333"
        
        const sourceFile = './copyFROM/copyFileFROM.txt';
        const destinationFile = './copyTO/copyFileTO.txt';

        switch (req.url) {
            // Olvas SZinkron
            case '/readSync': 
                utils.read_Sync('./beolvasFajl.txt')
                utils.redirection(res)
                break;

            // Olvas Aszinkron
            case '/readAsync': 
                utils.read_Async ('/beolvasFajl.txt')
                utils.redirection(res)
                break;

            // Ír SZinkron
            case '/writeSync':
                utils.write_Sync(file_To_Write, data)
                utils.redirection(res)
                break;

            // Ír Aszinkron
            case '/writeAsync':
                utils.write_Async(file_To_Write, data)
                utils.redirection(res)
                break;

            // Másolás Szinkron
            case '/copySync':
                utils.copy_Sync (sourceFile, destinationFile)
                utils.redirection(res)
                break;

            // Másol Aszinkron
            case '/copyAsync':
                utils.copy_Async(sourceFile, destinationFile)
                utils.redirection(res)
                break;

            default: 
                utils.getView('/index.html', res)
                break;
        }
    }

})
server.listen(port, () => {
    log(`Server is running on port ${port}`)
})