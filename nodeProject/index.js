const http = require('node:http')
require('dotenv').config()
const port = process.env.PORT || 3000
const fs = require('node:fs')
const querystring = require('querystring')
const { log } = require('node:console')
const utils = require('./utils')

const server = http.createServer( (req, res) => {

    res.writeHead( 200, {'Content-Type': 'text/html; charset=utf-8'})

    if (req.method === 'GET') {

        if (req.url === '/') {
            utils.getView('/index.html', res)
        }
    }

    else if ( req.method === 'POST' ) {

        function readAsync (){
            let sent = ''

            req.on('data', chunk => {
            sent += chunk
            console.log('Feltöltött fájl tartalma: ' , sent)
            })

            req.on('end', () => {
                res.writeHead(302, {Location: '/'})
                res.end()
        
                // log('Hiba az átirányítás során')
                const now = new Date().toLocaleString('hu-HU')
                console.log(now)
            })
        }
        readAsync ()
    }

})
server.listen(port, () => {
    log(`Server is running on port ${port}`)
})