const TelegramBot = require('node-telegram-bot-api');

require('dotenv').config()
const TOKEN = process.env.TOKEN

const bot = new TelegramBot(TOKEN, {polling: true});
const fs = require('fs');

const express = require('express')
const app = express()

app.get('/', (req, res) =>{
    res.send("Bot is alive")
})
const port = 3000;
app.listen(port, () => {
    console.log(`server running https://localhost:${port}`);
})

const commands = [

    {

        command: "start",
        description: "♻️ botni qayta ishga tushrish"

    },
    {

        command: "sagdiyana",
        description: "sagdiyana ofis"

    },
    {

        command: "galaosiyo",
        description: "galaosiyo ofis"

    },
    {

        command: "samarkanskiy",
        description: "samarkanskiy ofis"

    },
    {

        command: "lakatsiya",
        description: "📍 lakatsiya"

    },

]

bot.setMyCommands(commands);

// Kalit so'zlar
const keywords = ['sultan taxi ofis', 'admin', 'admn', 'yordam', 'aloo', 'tel nomer','tel nomir', 'tel raqam','pul yechish', 'pul chiqarish', 'qarz berib', 'qarz tashlab', 'limit' , 'админ', 'адмн', 'пул ечиш', 'пул чиқариш', 'тел номер', 'тел номир'];

// Habardagi kalit so'zlarni aniqlash uchun funksiya
function findKeywords(message) {
    const foundKeywords = [];
    keywords.forEach(keyword => {
        if (message.toLowerCase().includes(keyword)) {
            foundKeywords.push(keyword);
        }
    });
    return foundKeywords;
} 

bot.on('message', (msg) => {
    if (!msg.text) return;
    const chatId = msg.chat.id;
    const messageText = msg.text.toString().toLowerCase();
    const foundKeywords = findKeywords(messageText);

    
    // const userId = msg.from.id;
    // const username = msg.from.username;
    // const text = msg.text;
    
    // const messageData = {
    //     userId: userId,
    //     username: username,
    //     messageText: text,
    // };
    
    let replay = {reply_to_message_id: msg.message_id};
    let htmlTeg = { parse_mode: 'HTML'}
    
    // JSON ma'lumotlarini faylga qo'shish
    // fs.appendFile('messages.json', JSON.stringify(messageData)  + '\n ', (err) => {
        //         if (err) {
    //         console.error('Xatolik yuz berdi:', err);
    //         return;
    //     }
    //     console.log('Ma\'lumotlar faylga saqlandi.');
    // });
    const locations = [
        {
            name: "SAGDIYANA",
            work_time: "24/7",
            phone: "+998918223393",
            telegram: "@sultantaxi_bukhara",
            url: "https://maps.app.goo.gl/f4C42HZhcFsxs9GXA",
        },
        {
            name: "GALOSIYO",
            work_time: "(08:00-00:00)",
            phone: "+998948263393",
            telegram: "@sultantaxi_bukhara_galaosiyo",
            url: "https://maps.app.goo.gl/GQsVQ8wwXzxDFpv78",
        },
        {
            name: "SAMARKANDSKI",
            work_time: "(08:00-00:00)",
            phone: "+998948293393",
            telegram: "@sultantaxibuxara_samarkansdki",
            url: "https://maps.google.com/maps?q=39.784087,64.420057&ll=39.784087,64.420057&z=16",
        }
    ];
    
    // Avtomatik javoblar
    if (messageText === '/start') {
        bot.sendMessage(chatId, ' ASSALOMU ALAYKUM SULTAN TAXI YORDAMCHI BOTGA XUSH KELIBSIZ ');
    } 
    if (messageText === 'salom') {
        const messageText = 'Assalomu alaykum sizga qanday yordam bera olishim mumkin?'; 
        bot.sendMessage(chatId, messageText);
    }
    if (messageText === '/sagdiyana') {
        const options = {
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Lokatsiya', url: 'https://yandex.ru/maps/?whatshere%5Bzoom%5D=19&whatshere%5Bpoint%5D=64.412080,39.748646&si=fu1tcvz7b1hgzjw15a01kmppxw' }]
                ]
            }
        };
        bot.sendMessage(chatId,
            `<b> SAGDIYANA </b> \n` +
            `💠  ISH VAQTI 24/7 \n` +
            `☎️ +998918223393 \n` +
            `📝 @sultantaxi_bukhara \n\n` + 
            
            `🔘 OFISNING IMKONYATLARI \n `+
            `🔴 Taximetrdagi muammolaringizni bartaraf etish \n ` +
            `🔴 Hisobingizni to'ldirganingizda +20% Bonus \n ` +
            `🔴 Hisobdan pul yechish 24/7 (T/g bot) \n ` +
            `🔴 Avto Sug'irta \n ` +
            `🔴 Litsenziya taxi \n ` +
            `🔴 Oynalar tusini o'zgartrish (ruxsatnoma) \n ` +
            'Lokatsiya uchun tugmani bosing: ', {...replay ,...htmlTeg, ...options});
        }
        if (messageText === '/samarkanskiy') {
            const options = {
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Lokatsiya', url: 'https://yandex.ru/maps/?whatshere%5Bzoom%5D=19&whatshere%5Bpoint%5D=64.419926,39.784101&si=fu1tcvz7b1hgzjw15a01kmppxw6' }]
                    ]
                },
            };
            bot.sendMessage(chatId,
                `<b> SAMARKANDSKI </b> \n` +
                `💠 ISH VAQTI (08:00-00:00) \n` +
                `☎️ +998948293393 \n` +
                `📝 @sultantaxibuxara_samarkansdki \n\n` + 
                
                `🔘 OFISNING IMKONYATLARI \n `+
                `🔴 Taximetrdagi muammolaringizni bartaraf etish \n ` +
                `🔴 Hisobingizni to'ldirganingizda +20% Bonus \n ` +
                `🔴 Hisobdan pul yechish 24/7 (T/g bot) \n ` +
                `🔴 Avto Sug'irta \n ` +
                `🔴 Litsenziya taxi \n ` +
                `🔴 Oynalar tusini o'zgartrish (ruxsatnoma) \n ` +
                'Lokatsiya uchun tugmani bosing: ', {...replay ,...htmlTeg, ...options});
                
            }
            if (messageText === '/galaosiyo') {
                const options = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: 'Lokatsiya', url: 'https://maps.app.goo.gl/GQsVQ8wwXzxDFpv78' }]
                        ]
                    }
                };
                bot.sendMessage(chatId,
                    `<b> GALOSIYO </b> \n` +
                    `💠 ISH VAQTI (08:00-00:00) \n` +
                    `☎️ +998948263393 \n` +
                    `📝 @sultantaxi_bukhara_galaosiyo \n\n` + 
                    
                    `🔘 OFISNING IMKONYATLARI \n `+
                    `🔴 Taximetrdagi muammolaringizni bartaraf etish \n ` +
                    `🔴 Hisobingizni to'ldirganingizda +20% Bonus \n ` +
                    `🔴 Hisobdan pul yechish 24/7 (T/g bot) \n ` +
                    `🔴 Avto Sug'irta \n ` +
                    `🔴 Litsenziya taxi \n ` +
                    `🔴 Oynalar tusini o'zgartrish (ruxsatnoma) \n ` +
                    'Lokatsiya uchun tugmani bosing: ', {...replay ,...htmlTeg, ...options});
                }
                if (foundKeywords.length > 0 && foundKeywords[0] === "pul yechish" || foundKeywords[0] === "pul chiqarish" || foundKeywords[0] === "пул чиқариш" || foundKeywords[0] === "пул ечиш") {
                    bot.sendMessage(chatId,
                        ` ASSALOMU ALAYKUM  PUL YECHISH ''SULTAN TAXI''NING MAXSUS BOTI ORQALI 24/7 YECHIB OLISHINGIZ MUMKIN \n` +
                        ` https://t.me/SultanTaxi_Bukharabot \n` + 
                        `  \n\n`,
                        {...replay ,...htmlTeg})
                    } 
                    if (foundKeywords.length > 0 && foundKeywords[0] === 'admin' || foundKeywords[0] === 'admn' || foundKeywords[0] === 'aloo' || messageText === 'yordam'  || foundKeywords[0] === 'админ' || foundKeywords[0] === 'адмн' || foundKeywords[0] === 'qarz berib' || foundKeywords[0] === 'qarz tashlab' || foundKeywords[0] === 'limit' || messageText === '?' || messageText === '.') {
                        bot.sendMessage(chatId, 
                            `👋Assalomu alaykum \n`+
                            `🧐Sizga qanday yordam bera olaman ? \n`+
                            `🙋‍♂️ Iltimos operator javobini kuting \n`+
                            `✈️@sultantaxi_bukhara  \n `+
                            `✈️@sultantaxibuxara_samarkansdki \n `+
                            `✈️@sultantaxi_bukhara_galaosiyo \n `+
                            `📱+998918223393 biz bilan bog'laning \n`,
                            {...replay ,...htmlTeg})
                        }
                        if (foundKeywords.length > 0 && foundKeywords[0] === 'tel nomir' || foundKeywords[0] === 'tel nomer' || foundKeywords[0] === 'тел номер' || foundKeywords[0] === 'тел номир' || messageText === 'tel raqam' ) {
                            bot.sendMessage(chatId, 
                                `👋Assalomu alaykum \n`+
                                `🧐Sizga qanday yordam bera olaman ? \n`+
                                `+998918223393 SAGDIYANA \n `+
                                `+998948293393 SAMARKANSKIY \n `+
                                `+998948263393 GALAOSIYO biz bilan bog'laning \n `,
                                {...replay ,...htmlTeg})
                            }
                            if (messageText === '/lakatsiya') {
                                // Har bir ofis uchun xabar va lokatsiya tugmalarini jo'natish
                                locations.forEach(location => {
                                    const options = {
                                        parse_mode: 'HTML',
                                        reply_markup: {
                                            inline_keyboard: [
                                                [{ text: ` Lokatsiya`, url: location.url }]
                                            ]
                                        }
                                    };
                                    
                                    let message = `<b>${location.name}</b> \n` +
                                    `💠 ISH VAQTI (${location.work_time}) \n` +
                                    `☎️ ${location.phone} \n` +
                                    `📝 ${location.telegram} \n\n`
                                    // `Lokatsiya uchun tugmani bosing: `
                                    bot.sendMessage(chatId, message, options);
                                });
                            }
                            
                            if(foundKeywords.length > 0 && foundKeywords[0] === 'sultan taxi ofis' || messageText === '/malumot' || messageText === '/malumot@sultantaxibuhoroyordamchi_bot'){
                                const servicesMessage = `👨🏻‍💻  ASSALOMU ALAYKUM HAYDOVCHILAR SIZNI OFFICEMIZDA KUTIB QOLAMIZ VA TURLI XIL XIZMATLARIMIZNI TAKLIF QILAMIZ\n\n`
                                +
                                `❇️ LITSENZIYA \n`+
                                `❇️ ISHONCHNOMA (DAVERNOS) \n`+
                                `❇️ OYNALAR TUSINI O'ZGARTIRISH \n`+
                                `❇️ SUG'URTA \n`+
                                `❇️ HAYDOVCHILIK GUVOHNOMASINI ALMASHTIRISH \n`+
                                `❇️ BUNDAY IMKONIYAT FAQAT SULTAN TAXIDA \n\n`
                                + 
                                `1.🔔 SAGDIYANA \n`+
                                `💠   ISH VAQTI 24/7 \n`+
                                `☎️   +998918223393 \n`+
                                `📝   @sultantaxi_bukhara \n\n`
                                +
                                `2.🔔 SAMARKANDSKI \n `+
                                `💠  ISH VAQTI (08:00-00:00) \n `+
                                `☎️  +998948293393 \n `+
                                `📝  @sultantaxibuxara_samarkansdki \n\n`
                                +
                                `3.🔔 GALOSIYO \n`+
                                `💠  ISH VAQTI (08:00-00:00) \n`+
                                `☎️  +998948263393 \n`+
                                `📝  @sultantaxi_bukhara_galaosiyo \n\n` 
                                +
                                
                                `<b> Оfisimiz orqali  taksometr balansini to'ldirsangiz +20% BONUSga ega bo'lasiz! </b> \n\n`+
                                `<b> Click va Payme orqali  taksometr balansini to'ldirsangiz +20% BONUSga ega bo'lasiz! </b> \n\n` +
                                `<b> Endi karta orqali qilingan to'lov va bonuslarni TELEGRAM BOT @multidriver_sultantaxibot da foizsiz yechvolishingiz mumkin </b> \n\n` +
                                
                                `☎️ Ma'lumotlar:  \n `+
                                `☎️ +998918223393 \n `+
                                `⌨️ 24/7  \n `+
                                `📝 @sultantaxibukhara \n `
                                ;
                                bot.sendMessage(chatId, servicesMessage, {...replay, ...htmlTeg});
                            }
                        });
