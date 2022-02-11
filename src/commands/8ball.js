const {MessageEmbed} = require('discord.js');

module.exports= {
    name: "8ball",
    description: "magical 8 ball O_o",
    async execute(msg,args) {
        if(!args[0]) return msg.reply('That doesnt quite compute. Try again')

        const replies = ["Yes.","It is certain.","It is decidedly so.","Without a doubt.","Yes definitely.","You may rely on it.","As I see it, yes.","Most likely.","Outlook good.","Signs point to yes.","Reply hazy, try again.","Ask again later.","Better not tell you now.","Cannot predict now.","Concentrate and ask again.","Don't count on it.","My reply is no.","My sources say no.","Outlook not so good.","Very doubtful."]

        const result = Math.floor(Math.random()*replies.length);
        const question = args.slice().join(" ");

        const ballembed = new MessageEmbed()
        .setTitle(`${msg.author.username}`)
        .setColor('PURPLE')
        .addField("Answer",`${replies[result]}`)
        .setImage('https://static.wikia.nocookie.net/fortnite/images/a/a1/8_Ball_-_Outfit_-_Fortnite.png/revision/latest?cb=20191015231918')

        msg.channel.send({embeds:[ballembed]})
    }
}