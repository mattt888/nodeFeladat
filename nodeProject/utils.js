const fs = require('node:fs')
const { log } = require('node:console')

module.exports = {

    getView : function (filename, res){
        fs.readFile(__dirname + filename, { encoding: 'utf8' }, (err, data) => {

            if (err) {
                console.error(`Hiba történt az oldalbetöltés során: ${err}`)
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
    read_Async : function (filename){
        fs.readFile(__dirname + filename, { encoding: 'utf8' }, (err, data) => {
            if (err) {
                console.error(`Hiba történt az olvasás során: ${err}`)
            } else {
                log('Olvas AAszinkron')
                log('Fájlnév:', filename)
                log('Tartalma:', data)
                // log('------------------------------------------')
            }
        })
    },

    read_Sync : function(filename){
        try {
            const data = fs.readFileSync(filename, "utf8")
            log('Olvas SZSZinkron')
            log('Fájlnév:', filename)
            log('Tartalma:', data)
            // log('------------------------------------------')
        } catch (error) {
            console.error("Hiba a fájl szinkron beolvasása során:", error)
        }
    },

    write_Async : function(filename_To_Write, tartalom) {

        fs.writeFile(filename_To_Write, tartalom, (err) => {
            if (err) {
                console.error('Hiba történt a fájl írása során:', err)
            } else {
                log(`Ír AAszinkron \nFájlnév:`, filename_To_Write , '\nTartalma:', tartalom)
                // log('------------------------------------------')
            }
        })
    },

    write_Sync : function(filename_To_Write, data) {
        try {
            fs.writeFileSync(filename_To_Write, data, { encoding: "utf8"})
            log('Ír SZSZinkron')
            log('Fájlnév:', filename_To_Write)
            log('Tartalma:', data)
            // log('------------------------------------------')
        } catch (error){
            console.error("Hiba a szinkron fájl írása során:", error)
        }
    },
    
    copy_Async : function (sourceFile, destinationFile) {
        fs.copyFile(sourceFile, destinationFile, (err) => {
            if (err) {
                console.error(`Hiba történt a fájl másolásakor: ${err}`)
            } else {
                log('Másol AAszinkron')
                log('Forrásfájl neve:', sourceFile)
                log('Célfájl neve:', destinationFile)
                try {
                    const data = fs.readFileSync(destinationFile, "utf8")
                    log('Kiolvasás Fájlnév:', destinationFile)
                    log('Kiolvasott Fájl Tartalma:', data)
                } catch (error) {
                    console.error("Hiba a szinkron fájl beolvasása során:", error)
                }
                // log('------------------------------------------')
            }
            })
    },

    copy_Sync : function (sourceFile, destinationFile) {
        try {
            fs.copyFileSync(sourceFile, destinationFile)
            log('Másol SZSZinkron')
            log('Forrásfájl neve:', sourceFile)
            log('Célfájl neve:', destinationFile)
            try {
                const data = fs.readFileSync(destinationFile, "utf8")
                log('Kiolvasás Fájlnév:', destinationFile)
                log('Kiolvasott Fájl Tartalma:', data)
            } catch (error) {
                console.error("Hiba a szinkron fájl beolvasása során:", error)
            }
            // log('------------------------------------------')
        } catch (error){
            console.error("Hiba a fájl szinkron másolása során:", error)
        }
    },

    redirection : function(res){
        res.writeHead(302, {Location: '/'})
        res.end()
    }
}