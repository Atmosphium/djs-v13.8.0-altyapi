const log = (İçerik) => console.log (İçerik)

// Uygulama Yapılandırması

const { Client, Intents, Collection, MessageEmbed } = require ('discord.js'),
      FS = require ('fs')

const Uygulama = new Client ({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
})

Uygulama.bilgi = {
    ad: '', // Bot adı
    kimlik: '', // Bot ID'si
    anahtar: '' // Bot token'ı
}

Uygulama.Komutlar = new Collection ()

Uygulama.login (Uygulama.bilgi.anahtar)

Uygulama.on ('ready', () => {
    log (`${Uygulama.bilgi.ad} başarıyla etkinleştirildi!`)

    // Komutların Yüklenmesi

    FS.readdir ('./cmd/', (Yanlış, Belgeler) => {
        if (Yanlış) return

        Belgeler.forEach (Belge => {
            const Komut = require (`./cmd/${Belge}`)

            Uygulama.application?.commands?.create ({
                name: Komut.yapılandırma.ad,
                description: Komut.yapılandırma.açıklama,
                options: Komut.yapılandırma.seçenekler
            })

            Uygulama.guilds.cache.each (Dernek => {
                Dernek.commands?.create ({
                    name: Komut.yapılandırma.ad,
                    description: Komut.yapılandırma.açıklama,
                    options: Komut.yapılandırma.seçenekler
                })
            })

            Uygulama.Komutlar.set (Komut.yapılandırma.ad, Belge)
        })
    })
})

// Komutlar

Uygulama.on ('interactionCreate', Etkileşim => {
    if (!Etkileşim.isCommand ()) return

    const { commandName, options } = Etkileşim,
          [ Komut, Seçenekler ] = [ commandName, options ]

    const komutDosyası = require ('./cmd/' + Uygulama.Komutlar.get (Komut))

    if (Uygulama.Komutlar.has (Komut)) return komutDosyası.eylem (Uygulama, Etkileşim)
})