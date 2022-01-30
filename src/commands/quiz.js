const Discord = require ('discord.js');
const dquiz = require('discord-quiz');
const client = new Discord.Client();
dquiz.add_question("how many eggs am i holding",'2',['4','56','9'])
module.exports = {
    name:'quiz',
    description:'a quiz handler',
    execute(msg,args){

        client.on ('msg', (msg) => {
            if (msg.content.toLowerCase().startsWith('!quiz'))
                dquiz.quiz(msg, 10, 'ffb7c5');
        }) 
        
    }
};