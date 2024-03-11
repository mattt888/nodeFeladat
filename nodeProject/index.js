const http = require('node:http')
require('dotenv').config()
const port = process.env.PORT || 3000
const fs = require('node:fs')
// const querystring = require('querystring')
const { log } = require('node:console')
const utils = require('./utils')

const server = http.createServer( (req, res) => {

    res.writeHead( 200, {'Content-Type': 'text/html; charset=utf-8'})

    if (req.method === 'GET') {


        if (req.url === '/') {
            log('+++++++++++++++++++++++++++++++++++++++++++')
            
            utils.getView('/index.html', res)
            utils.readAsync ('/beolvasFajl.txt')
            utils.readSync('./beolvasFajl.txt')

            const fajlNev = 'write_AAsync.txt'
            const tartalom = 'AAszinkron ÍRÁS  íéáőúűóüööüóúőűáéí  33333333'
            utils.writeFile_Async(fajlNev, tartalom)

            const filename_To_Write_SYNC = 'writeSYNC.txt'
            const data = "SZSZinkron ÍRÁS ___ ékezetes szöveg űúóüőáéí    33333333"
            utils.writeFile_Sync(filename_To_Write_SYNC, data)



        }

    }

    
    else if ( req.method === 'POST') {

    }






})
server.listen(port, () => {
    log(`Server is running on port ${port}`)
})