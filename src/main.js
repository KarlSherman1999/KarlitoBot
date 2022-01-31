const { default: axios } = require('axios');
const {Client,Intents, MessageEmbed} = require('discord.js');
const client = new Client({intents:[Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES]})
require('dotenv').config();
const prefix = '!'
const privateMessage = require('./commands/private-message');

client.login(process.env.TOKEN);
client.on("ready",() => {
    console.log(`Logged in as ${client.user.tag}!`)
    client.user.setActivity("!Help for commands");
})
client.on('messageCreate', msg =>{
    if(!msg.content.startsWith(prefix)|| msg.author.bot) return;
    const embed = new MessageEmbed()
    .setColor('PURPLE')
    .setTitle('KarlitoBot')
    .setDescription('Hello!, here below will be a list of commands for you to use!\n!dog - cute doggo\n!cat - cute catto\n!duck - cute ducko\n!quote - random quotes\n!trendinggif - random gifs that are currently popular\n!insult - insult your friends by @ them e.g (!insult @testest)\n!joke - funny jokes (some are pretty bad)\n!agent - gives you a random valorant agent and their abilities and other useful stuff\n This is a WIP, i hope you like it so far and any ideas are appreciated!!! <3')
    privateMessage(client,'!help', {embeds:[embed]} )
})
client.on('messageCreate',msg =>{
    if(!msg.content.startsWith(prefix)|| msg.author.bot) return;

    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "hello"){
        msg.reply("hello there, i hope you are having a great day :smiling_imp:");
    }

    // Api Calls
    else if(command === "dog"){
        axios.get("https://dog.ceo/api/breeds/image/random")
        .then((res)=>{
            msg.reply(res.data.message)
        })
        .catch((err)=>{
            console.error('ERR:',err)
        })
        
    }
    else if(command === "cat"){
        axios.get("https://api.thecatapi.com/v1/images/search ")
        .then((res)=>{
            msg.reply(res.data[0].url)
        })
        .catch((err)=>{
            console.error('ERR:',err)
        })
        
    }
    else if(command === "quote"){
        axios.get("https://zenquotes.io/api/random")
        .then((res)=>{
            msg.reply(`${res.data[0].q} Quoted by ${res.data[0].a}`)
        })
        .catch((err)=>{
            console.error('ERR:',err)
        })
        
    }
    else if(command === "duck"){
        axios.get("https://random-d.uk/api/random")
        .then((res)=>{
            // msg.reply();
            msg.reply(res.data.url);
        })
        .catch((err)=>{
            console.error('ERR:',err)
        })
        
    }
    // else if(command === "yugioh"){
    //     axios.get("https://db.ygoprodeck.com/api/v7/cardinfo.php/")
    //     .then((res)=>{
    //         // msg.reply();
    //         // msg.reply(res);
    //         console.log(res);
    //     })
    //     .catch((err)=>{
    //         console.error('ERR:',err)
    //     })
        
    // }
    else if(command === "trendinggif"){
        axios.get(`https://g.tenor.com/v1/trending?id=8776030&key=${process.env.TENOR_API}`)
        .then((res)=>{
            msg.reply(res.data.results[Math.floor(Math.random()*20)].itemurl);
            console.log(res.data.results[0].itemurl);
        })
        .catch((err)=>{
            console.error('ERR:',err)
        })
        
    }
    else if(command === `agent`){
        axios.get(`https://valorant-api.com/v1/agents`)
        .then((res)=>{
            const randomNum = Math.floor(Math.random()*18)
            const embed = new MessageEmbed()
                .setColor('PURPLE')
                .setAuthor({name: 'To wiki',iconURL: res.data.data[randomNum].killFeedPortrait,url:`https://valorant.fandom.com/wiki/${res.data.data[randomNum].displayName}`})
                .setTitle(res.data.data[randomNum].displayName)
                .setDescription(res.data.data[randomNum].description)
                .setThumbnail(res.data.data[randomNum].displayIconSmall)
                .addFields(
                    {name: res.data.data[randomNum].role.displayName, value:res.data.data[randomNum].role.description }
                )
                .addFields(
                    {name:res.data.data[randomNum].abilities[0].displayName,value:res.data.data[randomNum].abilities[0].description},
                    {name:res.data.data[randomNum].abilities[1].displayName,value:res.data.data[randomNum].abilities[1].description},
                    {name:res.data.data[randomNum].abilities[2].displayName,value:res.data.data[randomNum].abilities[2].description},
                    {name:res.data.data[randomNum].abilities[3].displayName,value:res.data.data[randomNum].abilities[3].description}
                )
            const agent = msg.reply({
                embeds:[embed]
            })
            return agent
        })
        .catch((err)=>{
            console.error('ERR:',err)
        })
        
    }
    else if(command === "insult"){
        axios.get(`https://evilinsult.com/generate_insult.php?lang=en&type=json`)
        .then((res)=>{
            const taggedUser = msg.mentions.users.first();
            msg.channel.send(`${taggedUser}, ${res.data.insult}`);
        })
        .catch((err)=>{
            console.error('ERR:',err)
        })
        
    }
    else if(command === "joke"){
        axios.get(`https://v2.jokeapi.dev/joke/Any`)
        .then((res)=>{
            if(res.data.type === "twopart"){
                msg.reply(`${res.data.setup} ${res.data.delivery}`);
            }else{
                msg.reply(res.data.joke);
            }
        })
        .catch((err)=>{
            console.error('ERR:',err)
        })
    }
})