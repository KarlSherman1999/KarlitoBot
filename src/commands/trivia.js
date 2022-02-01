const {MessageEmbed} = require('discord.js');
const questions = [
    {
        title:"pick a",
        options: ["a","b","c","d"],
        correct: 1
    },
    {

    }
]

module.exports={
    name:"trivia",
    description: "Quiz",
    category: "fun",
    execute(msg,args){
        const q = questions[Math.floor(Math.random()*(questions.length))]
        const embed = new MessageEmbed()
        .setTitle(q.title)
        .setDescription(q.options.map(opt => {
            i++;
            return `${i} - ${opt}\n`
        }))
        .setColor(`PURPLE`)
        .setFooter({ text: 'Reply to this message with the correct question number! You have 15 seconds.', iconURL: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Icon-round-Question_mark.svg' });
        msg.channel.send(embed);
        try {
            const msgs = await msg.channel.awaitMessages(u2=>u2.author.id === msg.author.id,{time:15000,max:1,errors: ["time"]})
            if (parseInt(msgs.first().content == q.correct)){
                return msg.channel.send('You got it correct!')
            }
            else{
                return msg.channel.send('You got it incorrect.')
            }
        } catch (error) {
            return msg.channel.send('You did not answer.')
        }
    }
}