const http = require('node:http')
require('dotenv').config()
const port = process.env.PORT || 3000
const fs = require('node:fs')
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
        const data_To_Write = "Írás fájl. Éáőúűóüööüóúőűáéí \n" + new Date().toLocaleString('hu-HU')
        
        const sourceFile = './copyFROM/copyFileFROM.txt';
        const destinationFile = './copyTO/copyFileTO.txt';

        switch (req.url) {
            // Olvas SZinkron
            case '/readSync': 
                const eredmeny_Read_Sync = utils.read_Sync('./beolvasFajl.txt')
                log('eredmeny_Read_Sync:', eredmeny_Read_Sync)
                log('=====================================================')
                utils.getView_SYNC(eredmeny_Read_Sync, res)
                break;

            // Olvas Aszinkron
            case '/readAsync':
                function processFile(err, data) {
                    if (err) {
                        console.error(`Hiba a fájl aszinkron olvasása során: ${err}`)
                    } else {
                        console.log('Olvas AAszinkron')
                        console.log('Fájlnév:', '/beolvasFajl.txt');
                        console.log('Tartalma:', data)
                        data = `<li>${data}</li>`
                        console.log('Tartalma:', data)
                        console.log('=====================================================')
                        utils.getView_SYNC(data, res)
                    }
                }
                
                utils.read_Async(processFile)
                break;

            // Ír SZinkron
            case '/writeSync':
                const eredmeny_Write_Sync = utils.write_Sync(file_To_Write, data_To_Write)
                log('eredmeny_Write_Sync:', eredmeny_Write_Sync)
                log('=====================================================')
                utils.getView_SYNC(eredmeny_Write_Sync, res)
                break;

            // Ír Aszinkron
            case '/writeAsync':
                utils.write_Async(file_To_Write, data_To_Write, res)
                break;

            // Másol Szinkron
            case '/copySync':
                const eredmeny_Copy_Sync = utils.copy_Sync (sourceFile, destinationFile)
                log('eredmeny_Copy_Sync:', eredmeny_Copy_Sync)
                log('=====================================================')
                utils.getView_SYNC(eredmeny_Copy_Sync, res)
                break;

            // Másol Aszinkron
            case '/copyAsync':
                utils.copy_Async(sourceFile, destinationFile, res)
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