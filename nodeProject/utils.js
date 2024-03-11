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
    },

    // Fájl Szinkron beolvasása
    readAsync : function (filename){
        fs.readFile(__dirname + filename, { encoding: 'utf8' }, (err, data) => {
            if (err) {
                console.error(`Hiba történt az olvasás során: ${err}`)
            } else {
                log('Olvas AAszinkron')
                log('Fájlnév:', filename)
                log('Tartalma:', data)
                log('------------------------------------------')
            }
        })
    },

    readSync : function(filename){
        try {
            const data = fs.readFileSync(filename, "utf8")
            log('Olvas SZSZinkron')
            log('Fájlnév:', filename)
            log('Tartalma:', data)
            log('------------------------------------------')
        } catch (error) {
            console.error("Hiba a szinkron fájl beolvasása során:", error)
        }
    },


    writeFile_Async : function(fajlNev, tartalom) {

        fs.writeFile(fajlNev, tartalom, (err) => {
            if (err) {
                console.error('Hiba történt a fájl írása során:', err)
            } else {
                log(`Ír AAszinkron \nFájlnév:`, fajlNev , '\nTartalma:', tartalom)
                log('------------------------------------------')
            }
        })
    },

    writeFile_Sync : function(filename_To_Write_SYNC, data) {
        try {
            fs.writeFileSync(filename_To_Write_SYNC, data, { encoding: "utf8"})
            log('Ír SZSZinkron')
            log('Fájlnév:', filename_To_Write_SYNC)
            log('Tartalma:', data)
            log('------------------------------------------')
        } catch (error){
            console.error("Hiba a szinkron fájl írása során:", error)
        }
    }




}