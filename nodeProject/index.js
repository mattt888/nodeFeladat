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
            utils.read_Async ('/beolvasFajl.txt')
            utils.read_Sync('./beolvasFajl.txt')

            // Írás SZinkron:
            const filename_To_Write = 'write.txt'
            let data = "SZSZinkron ÍRÁS, ékezetes szöveg íéáőúűóüööüóúőűáéí"
            utils.write_Sync(filename_To_Write, data)

            // Írás Aszinkron:
            data = 'AAszinkron ÍRÁS __ Árvíztűrő tükörfúrógép'
            utils.write_Async(filename_To_Write, data)

            // Másolás Szinkron:
            const sourceFile = './copyFROM/copyFileFROM.txt';
            const destinationFile = './copyTO/copyFileTO.txt';
            utils.copy_Sync (sourceFile, destinationFile)

            // Másolás szinkron
            utils.copy_Async(sourceFile, destinationFile)
            

            setTimeout(() => log('*****************************************'), 1500)

    }

    
    else if ( req.method === 'POST') {

    }




})
server.listen(port, () => {
    log(`Server is running on port ${port}`)
})