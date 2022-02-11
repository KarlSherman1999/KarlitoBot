const {MessageEmbed} = require('discord.js');

module.exports={
    name:"dangantrivia",
    description: "Danganronpa quiz",
    category: "fun",
    async execute(msg,args){
        const q = questions[Math.floor(Math.random()*(questions.length))]
        let i = 0;
        const embed = new MessageEmbed()
        .setTitle(`${q.title}`)
        .setDescription(q.options.map(opt => {
            i++;
            return `${i} - ${opt}\n`
        }).join(''))
        .setColor(`PURPLE`)
        .setImage(q.image)
        .setFooter({ text: 'Reply to this message with the correct question number! You have 15 seconds.', iconURL: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Icon-round-Question_mark.svg' });
        msg.channel.send({embeds:[embed]});
        try {
            const filter = u2=>u2.author.id === msg.author.id
            const msgs = await msg.channel.awaitMessages({filter,time:15_000,max:1,errors: ["time"]})
            if ((msgs.first().content === q.correct)){
                return msg.channel.send('You got it correct!')
            }
            else{
                return msg.channel.send(`You got it incorrect. The answer was ${q.correct}.`)
            }
        } catch (error) {
            return msg.channel.send(`Times up! the answer was ${q.correct}.`)
        }
    }
}

const questions = [
    {
        title:"Who is the mastermind in “Danganronpa V3: Killing Harmony”?",
        options: ["Junko Enoshima","Mukuro Ikusaba","Haiji Towa","Tsumugi Shirogane"],
        image: 'https://preview.redd.it/u3rbcm7seo221.jpg?auto=webp&s=db3ffbabf16642773dd135bbefa7cf5977cf6b3b',
        correct: `4`
    },
    {
        title:"In what year did the first Danganronpa premiere?",
        options: ["2008","2010","2013","2009"],
        image: 'https://cdn.akamai.steamstatic.com/steam/apps/413410/capsule_616x353.jpg?t=1611969331',
        correct: `2`
    },
    {
        title:"What is the name of the high school in which the game takes place?",
        options: ["Gintama High School","Kamiyama High School","Amagi High School","Hope's Peak Academy"],
        image: 'https://static.wikia.nocookie.net/danganronpa/images/2/22/Danganronpa_V3_CG_-_Hope%27s_Peak_Academy.png/revision/latest?cb=20180520132443',
        correct: `4`
    },
    {
        title:"What’s the name of the last execution in “Danganronpa: Trigger Happy Havoc”?",
        options: ["The Ultimate Punishment","After School Lesson","Excavator Destroyer","The Burning of the Versailles Witch"],
        image: 'https://static.wikia.nocookie.net/danganronpa/images/2/22/Danganronpa_V3_CG_-_Hope%27s_Peak_Academy.png/revision/latest?cb=20180520132443',
        correct: `1`
    },
    {
        title:"What is Byakuya’s Togami ultimate title?",
        options: ["Ultimate Affluent Progeny","Ultimate Fashionista","Ultimate Cosplayer","Ultimate Lucky Student"],
        image: 'https://static.wikia.nocookie.net/danganronpa/images/3/38/Danganronpa_Another_Episode_-_Byakuya_Togami_Sprite_Sidebar.png/revision/latest?cb=20180211164522',
        correct: `1`
    },
    {
        title:"Who committed suicide in “Danganronpa: Trigger Happy Havoc”?",
        options: ["Toko Kukawa","Celestia Ludenberg","Sakura Ogami","Yasuhiro Hagakure"],
        image: 'https://store-images.s-microsoft.com/image/apps.64573.13926025773515961.65bfebc1-45c3-4c37-966f-35fa549dd9ce.f60569b4-8d5f-4885-8e8c-a6a7e3a259e8?q=90&w=480&h=270',
        correct: `3`
    },
    {
        title:"Who was the “Ultimate Programmer” in Danganronpa: Trigger Happy Havoc?",
        options: ["Chihiro Fujisaki","Junko Enoshima","Celestia Ludenberg","Aoi Asahina"],
        image: 'https://imageio.forbes.com/specials-images/dam/imageserve/1018114246/0x0.jpg?format=jpg&width=1200&fit=bounds',
        correct: `1`
    },
    {
        title:"Who was the “Ultimate Breeder” in Danganronpa 2: Goodbye Despair?",
        options: ["Gundham Tanaka","Fuyuhiko Kuzuryu","Hiyoko Saionji","Kazuichi Soda"],
        image: 'https://nationaltoday.com/wp-content/uploads/2021/07/Guinea-Pig-Appreciation-Day.jpg',
        correct: `1`
    },
    {
        title:"How many class trials are there in “Danganronpa 2: Goodbye Despair”?",
        options: ["5","8","6","7"],
        image: 'https://static.wikia.nocookie.net/danganronpa/images/f/f6/Danganronpa_1_CG_-_Monokuma_explaining_the_Class_Trial.png/revision/latest?cb=20180216174641',
        correct: `3`
    },
    {
        title:"How many floors does Hope’s Peak Academy have?",
        options: ["4","6","2","5"],
        image: 'http://pm1.narvii.com/7087/a3a4bf3166f090ceaee4ec4421f989b58ebadc00r1-640-360v2_uhq.jpg',
        correct: `4`
    },
    {
        title:"Who is this character?",
        options: ["Junko Enoshima","Sakura Oogami","Celestia Ludenburg","Aoi Asahina"],
        image: 'https://i.pinimg.com/originals/95/f3/b1/95f3b1b0acab814301207ef0c508c9a0.png',
        correct: `1`
    },
    {
        title:"Who is this character?",
        options: ["Junko Enoshima","Tenko Chabashira","Kaede Akamatsu","Aoi Asahina"],
        image: 'https://dthezntil550i.cloudfront.net/em/latest/em1806130202179560006296975/9c17aa63-6363-451a-b600-dc7300c3dff3.png',
        correct: `2`
    },
    {
        title:"Who is this character?",
        options: ["Junko Enoshima","Tenko Chabashira","Kaede Akamatsu","Celestia Ludenburg"],
        image: 'https://cdn141.picsart.com/334452976036211.png',
        correct: `4`
    },
    {
        title:"Who is this character?",
        options: ["Sakura Oogami","Tenko Chabashira","Kaede Akamatsu","Celestia Ludenburg"],
        image: 'https://vignette.wikia.nocookie.net/danganronpa/images/f/ff/Sakura_Ogami_Sound_Gallery_Sprite.png/revision/latest?cb=20170401183549',
        correct: `1`
    },
    {
        title:"Which Character Likes curry the most?",
        options: ["Makoto Naegi","Teruteru Hanamura","Kaede Akamatsu","Hifumi Yamada"],
        image: 'https://64.media.tumblr.com/30e805203617bd14ae7385e726b02d8a/tumblr_p0myihabFZ1t2rr2bo1_1280.png',
        correct: `1`
    },
    {
        title:"Which Character dislikes pig feet?",
        options: ["Makoto Naegi","Teruteru Hanamura","Kokichi Oma","Kyoko Kirigiri"],
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1L-GPYCnoNwzLYJl-kC9ynwJxc9WcBpYKuVCZy3zYhEMddON4Vw-JpwBWee2jertdwfU&usqp=CAU',
        correct: `3`
    },
]