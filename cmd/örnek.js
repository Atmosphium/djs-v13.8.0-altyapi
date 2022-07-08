const { MessageEmbed } = require ('discord.js')

exports.eylem = (Uygulama, Etkileşim) => {
    const Seçenekler = Etkileşim.options

    Etkileşim.reply ({
        content: 'Aleyküm selam, <@' + Etkileşim.member + '>! Sana da selam, ' + Seçenekler.get ('ad').value + '!',
        ephemeral: true
    })
}

exports.yapılandırma = {
    ad: 'selam',
    açıklama: 'Robotla selamlaşırsınız.',
    seçenekler: [
        {
            type: 'STRING',
            name: 'ad',
            description: 'Esenleyen kişinin adı.',
            required: false
        }
    ]
}