const fs = require('node:fs')
const { log } = require('node:console')

module.exports = {

    getView : function (filename, res){

        fs.readFile(__dirname + filename, { encoding: 'utf8' }, (err, data) => {

            if (err) {
                console.error(`Hiba történt az olvasás során: ${err}`)
            } else {
                // console.log('A fájl tartalma:', data);
                res.write(data)
            }
            res.end()
        })
        // ezzel is jó lenne így is működik:
        // fs.createReadStream(__dirname + '/index.html').pipe(res)
    }




}