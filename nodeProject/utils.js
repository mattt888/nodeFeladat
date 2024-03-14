const fs = require('node:fs')
const { log } = require('node:console')

module.exports = {

    getView_SYNC : function  (eredmeny, res) {
        const data = fs.readFileSync(__dirname + '/index2.html', { encoding: 'utf8' });
    
        if (data) {
            const finaldata = data.replace('</p>', eredmeny)
            res.write(finaldata);
        } else {
            console.log('Hiba keletkezett a folyamat során');
        }
        res.end();
    },

    getView : function (filename, res){
        fs.readFile(__dirname + filename, { encoding: 'utf8' }, (err, data) => {

            if (err) {
                console.error(`Hiba történt az oldalbetöltés során: ${err}`)
            } else {
                res.write(data)
            }
            res.end()
        })
    },

    // Fájl Szinkron beolvasása
    read_Async : function (callback){
            fs.readFile(__dirname + '/beolvasFajl.txt', { encoding: 'utf8' }, (err, data) => {
                if (err) {
                    callback(err)
                } else {
                    callback(null, data)
                }
            });
        },

////////////////////////////////////////////////////////////
// ez csak kimenetre küldi
        // fs.readFile(__dirname + filename, { encoding: 'utf8' }, (err, data) => {
        //     if (err) {
        //         console.error(`Hiba a fájl aszinkron olvasása során: ${err}`)
        //     } else {
        //         log('Olvas AAszinkron')
        //         log('Fájlnév:', filename)
        //         log('Tartalma:', data)
        //         log('=====================================================')
        //         res.write(data)
        //     }
        //     res.end()
        // })
////////////////////////////////////////////////////////////

    read_Sync : function(filename){
        try {
            const data = fs.readFileSync(filename, "utf8")
            log('Olvas SZSZinkron')
            log('Fájlnév:', filename)
            log('Tartalma:', data)
            return `<li>${data}</li>`
        } catch (error) {
            console.error("Hiba a fájl szinkron beolvasása során:", error)
        }
    },

    write_Async : function(file_To_Write, data_To_Write, res) {

        fs.writeFile(file_To_Write, data_To_Write, res, (err) => {
            if (err) {
                console.error('Hiba történt a fájl írása során:', err)
            } else {
                log(`Ír AAszinkron \nFájlnév:`, file_To_Write , '\nTartalma:', data_To_Write)
                log('=====================================================')
                res.write(data_To_Write)
            }
            res.end()
        })
    },

    write_Sync : function(filename_To_Write, data) {
        try {
            fs.writeFileSync(filename_To_Write, data, { encoding: "utf8"})
            log('Ír SZSZinkron')
            log('Fájlnév:', filename_To_Write)
            log('Tartalma:', data)
            return `<li>${data}</li>`
        } catch (error){
            console.error("Hiba a szinkron fájl írása során:", error)
        }
    },
    
    copy_Async : function (sourceFile, destinationFile, res) {
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
                    log('=====================================================')
                    res.write(data)
                } catch (error) {
                    console.error("Hiba a fájl szinkron beolvasása során:", error)
                }
            }
            res.end()
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
                return `<li>${data}</li>`
            } catch (error) {
                console.error("Hiba a szinkron fájl beolvasása során:", error)
            }
        } catch (error){
            console.error("Hiba a fájl szinkron másolása során:", error)
        }
    }
}