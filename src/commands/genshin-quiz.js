const {MessageEmbed} = require('discord.js');

module.exports={
    name:"trivia",
    description: "Genshin Quiz",
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
        title:"What is the Japanese name of Ningguang?",
        options: ["Kokusei","Gyoukou","Yukiaki","Nana"],
        image: 'https://img.gamewith.net/img/e63215f0ff883f2fe8996b8f06a7c092.jpg',
        correct: `2`
    },
    {
        title:"Which of the following characters can heal using Elemental Skill?",
        options: ["Mona","Kaeya","Diluc","Sayu"],
        image: 'https://img.gamewith.net/img/1b0857e9e3aae4cc14be6f7f3c75cb91.jpg',
        correct: `2`
    },
    {
        title:"How many Fatui Harbingers are there?",
        options: ["8","9","10","11"],
        image: 'https://img.gamewith.net/img/56f3b187bb5510fd3452e002f4e31099.jpg',
        correct: `4`
    },
    {
        title:"What is the name of the Sea Monster that Beidou defeated?",
        options: ["Osial","Dvalin","Haishan","Klee"],
        image: 'https://img.gamewith.net/img/7780f2e7323174091bfa481a756572b2.jpg',
        correct: `3`
    },
    {
        title:"How many Nations are there in Teyvat?",
        options: ["5","3","7","10"],
        image: 'https://img.gamewith.net/img/3135398c60b935c989dc4c46f199452f.jpg',
        correct: `3`
    },
    {
        title:"What is the item shown in the photo?",
        options: ["Mint Perfume","Streaming Essential Oil","Desiccant Potion","Holy Water"],
        image: 'https://img.gamewith.net/img/9b6c587659f195b34f1266ae55a4174c.jpg',
        correct: `4`
    },
    {
        title:"Which of the following characters has the highest total Elemental Burst multiplier?",
        options: ["Tartaglia (Childe)","Raiden Shogun","Chongyun","Amber"],
        image: 'https://img.gamewith.net/img/2fda49d2878da2b579b8a977d04bcc17.jpg',
        correct: `4`
    },
    {
        title:"What version did Scaramouche first appear?",
        options: ["1.1","1.2","1.3","1.4"],
        image: 'https://img.gamewith.net/img/d4ad60ccce08c14ef5d8da72ef69db4b.jpg',
        correct: `1`
    },
    {
        title:"What is the name of the current Grand Master of the Knights of Favonius?",
        options: ["Eula","Jean","Vanessa","Varka"],
        image: 'https://img.gamewith.net/img/575c0bce0e9c888d553b9b6bb91f4417.jpg',
        correct: `4`
    },
    {
        title:"Who out of the following Characters has the highest Charge Attack multiplier?",
        options: ["Lisa","Klee","Mona","Sucrose"],
        image: 'https://img.gamewith.net/img/bb97efadac0d9a1ac96a8ea98e287992.jpg',
        correct: `1`
    },
    {
        title:"Guess The Character! -- This character's mother wrote the Teyvat Travel Guide",
        options: ["Lisa","Klee","Diona","Jean"],
        image: 'https://www.chemistryviews.org/common/images/thumbnails/source/17a6473b7c0.jpg',
        correct: `2`
    },
    {
        title:"Guess The Character! -- This character hates Diluc very much",
        options: ["Kaeya","Klee","Diona","Jean"],
        image: 'https://www.chemistryviews.org/common/images/thumbnails/source/17a6473b7c0.jpg',
        correct: `3`
    },
    {
        title:"Guess The Character! -- This character was raised by their kidnappers",
        options: ["Kaeya","Rosaria","Yae Miko","Jean"],
        image: 'https://www.chemistryviews.org/common/images/thumbnails/source/17a6473b7c0.jpg',
        correct: `2`
    },
    {
        title:"Guess The Character! -- This character's idle animation shows them doing exercise stretches",
        options: ["Qiqi","Rosaria","Chongyun","Xinqqui"],
        image: 'https://www.chemistryviews.org/common/images/thumbnails/source/17a6473b7c0.jpg',
        correct: `1`
    },
    {
        title:"Guess The Character! -- This character still has a gift from their estranged sibling",
        options: ["Keqing","Xiao","Diluc","Albedo"],
        image: 'https://www.chemistryviews.org/common/images/thumbnails/source/17a6473b7c0.jpg',
        correct: `3`
    },
    {
        title:"Guess The Character! -- This character is often speculated to be a homunculus",
        options: ["Raiden Shogun","Xiao","Lisa","Albedo"],
        image: 'https://www.chemistryviews.org/common/images/thumbnails/source/17a6473b7c0.jpg',
        correct: `4`
    },
    {
        title:"Guess The Character! -- This character sees Vennessa as a role model	",
        options: ["Raiden Shogun","Jean","Amber","Zhongli"],
        image: 'https://www.chemistryviews.org/common/images/thumbnails/source/17a6473b7c0.jpg',
        correct: `2`
    },
    {
        title:"Guess The Character! -- This character regularly has 'tea breaks' with Jean	",
        options: ["Raiden Shogun","Eula","Amber","Lisa"],
        image: 'https://www.chemistryviews.org/common/images/thumbnails/source/17a6473b7c0.jpg',
        correct: `2`
    },
    {
        title:"Guess The Character! -- This character was once asked to play at the Wangsheng Funeral Parlour",
        options: ["Xinyan","Yunjin","Diona","Xingqui"],
        image: 'https://www.chemistryviews.org/common/images/thumbnails/source/17a6473b7c0.jpg',
        correct: `1`
    },
    {
        title:"Guess The Character! -- This character once claimed to be a pirate",
        options: ["Xinyan","Beidou","Kaeya","Xingqui"],
        image: 'https://www.chemistryviews.org/common/images/thumbnails/source/17a6473b7c0.jpg',
        correct: `3`
    },
    {
        title:"Guess The Character! -- This character is known for never having money",
        options: ["Zhongli","Traveller","Kaeya","Paimon"],
        image: 'https://www.chemistryviews.org/common/images/thumbnails/source/17a6473b7c0.jpg',
        correct: `1`
    },
    {
        title:"Guess The Character! -- This character wants to bury Qiqi",
        options: ["Zhongli","Traveller","Xiangling","Hu Tao"],
        image: 'https://www.chemistryviews.org/common/images/thumbnails/source/17a6473b7c0.jpg',
        correct: `4`
    },
    {
        title:"Guess The Character! -- This was the first released character from Inazuma",
        options: ["Raiden Shogun","Thoma","Kazuha","Hu Tao"],
        image: 'https://www.chemistryviews.org/common/images/thumbnails/source/17a6473b7c0.jpg',
        correct: `3`
    },
    {
        title:"Guess The Character! -- This character is the last of their original 'group'",
        options: ["Bennet","Thoma","Xiao","Hu Tao"],
        image: 'https://www.chemistryviews.org/common/images/thumbnails/source/17a6473b7c0.jpg',
        correct: `3`
    },
    {
        title:"Guess The Character! -- This character has an admirer named Albert",
        options: ["Barbara","Xinyan","Yunjin","Hu Tao"],
        image: 'https://www.chemistryviews.org/common/images/thumbnails/source/17a6473b7c0.jpg',
        correct: `1`
    },
    {
        title:"Guess The Character! -- This character drinks 37 glasses of wine in one quest",
        options: ["Barbara","Venti","Beidou","Zhongli"],
        image: 'https://www.chemistryviews.org/common/images/thumbnails/source/17a6473b7c0.jpg',
        correct: `2`
    },
]