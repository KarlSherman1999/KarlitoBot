const { default: axios } = require('axios');
const Discord = require('discord.js');
const fs = require('fs');
const {Player,RepeatMode} = require('discord-music-player');
const {Client,Intents, MessageEmbed} = require('discord.js');
app.listen(3000)
const client = new Client({
    intents:[
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES
]})
require('dotenv').config();
const prefix = '--'
const privateMessage = require('./commands/private-message');

const player = new Player(client, {
    leaveOnEmpty: false, 
});
client.player = player;

client.login(process.env.TOKEN);

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./src/commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Command Embed
const embed2 = new MessageEmbed()
    .setColor('PURPLE')
    .setTitle('KarlitoBot')
    .setDescription('Hello!, here below will be a list of commands for you to use!\n--dog - cute doggo\n--cat - cute catto\n--duck - cute ducko\n--8ball\n--yugioh - random card\n--quote - random quotes\n--trendinggif - random gifs that are currently popular\n--insult - insult your friends by @ them e.g (--insult @testest)\n--joke - funny jokes (some are pretty bad)\n--agent - gives you a random valorant agent and their abilities and other useful stuff\n--GenshinQ - A Genshin related question\n--DanganQ - Danganronpa question')
    .setImage("https://c.tenor.com/vykUH_Lq8XMAAAAd/dance-cat.gif")
    .setTimestamp()
    .addFields(
        {name:'Music Commands!!!',value:'--play --playlist --pause --resume --skip --stop --shuffle --clearqueue'},
        )
        

client.on("ready",() => {
    console.log(`Logged in as ${client.user.tag}!`)
    client.user.setActivity("--Help for commands");
    privateMessage(client,'--help', {embeds:[embed2]} )
})

client.player
    // Emitted when channel was empty.
    .on('channelEmpty',  (queue) =>
        console.log(`Everyone left the Voice Channel, queue ended.`))
    // Emitted when a song was added to the queue.
    .on('songAdd',  (queue, song) =>
        console.log(`Song ${song} was added to the queue.`))
    // Emitted when a playlist was added to the queue.
    .on('playlistAdd',  (queue, playlist) =>
        console.log(`Playlist ${playlist} with ${playlist.songs.length} was added to the queue.`))
    // Emitted when there was no more music to play.
    .on('queueDestroyed',  (queue) =>
        console.log(`The queue was destroyed.`))
    // Emitted when the queue was destroyed (either by ending or stopping).    
    .on('queueEnd',  (queue) =>
        console.log(`The queue has ended.`))
    // Emitted when a song changed.
    .on('songChanged', (queue, newSong, oldSong) =>
        console.log(`${newSong} is now playing.`))
    // Emitted when a first song in the queue started playing.
    .on('songFirst',  (queue, song) =>
        console.log(`Started playing ${song}.`))
    // Emitted when someone disconnected the bot from the channel.
    .on('clientDisconnect', (queue) =>
        console.log(`I was kicked from the Voice Channel, queue ended.`))
    // Emitted when deafenOnJoin is true and the bot was undeafened
    .on('clientUndeafen', (queue) =>
        console.log(`I got undefeanded.`))
    // Emitted when there was an error in runtime
    .on('error', (error, queue) => {
        console.log(`Error: ${error} in ${queue.guild.name}`);
    });

client.on('messageCreate',async (msg) =>{
    if(!msg.content.startsWith(prefix)|| msg.author.bot) return;

    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "hello"){
        msg.reply("hello there, i hope you are having a great day :smiling_imp:");
    }

    if (command === "genshinq"){
        client.commands.get('genshintrivia').execute(msg,args);
    }

    if (command === "danganq"){
        client.commands.get('dangantrivia').execute(msg,args);
    }

    if (command === "8ball"){
        client.commands.get('8ball').execute(msg,args);
    }
    
    // Music
    const  guildQueue = client.player.getQueue(msg.guild.id);
    if(command === 'play') {
        const queue = client.player.createQueue(msg.guild.id);
        await queue.join(msg.member.voice.channel);
        const song = await queue.play(args.join(' ')).catch(_ => {
            if(!guildQueue)
                queue.stop();
        });
    }
    if(command === 'playlist') {
        const queue = client.player.createQueue(msg.guild.id);
        await queue.join(msg.member.voice.channel);
        const song = await queue.playlist(args.join(' ')).catch(_ => {
            if(!guildQueue)
                queue.stop();
        });
    }
    if(command === 'skip') {
        {guildQueue ? guildQueue.skip() : null };
    }
    if(command === 'stop') {
        {guildQueue ? guildQueue.stop() : null };
    }
    if(command === 'clearQueue') {
        {guildQueue ? guildQueue.clearQueue() : null };
    }
    if(command === 'shuffle') {
        {guildQueue ? guildQueue.shuffle() : null };
    }
    if(command === 'pause') {
        {guildQueue ? guildQueue.setPaused(true) : null };
    }
    if(command === 'resume') {
        {guildQueue ? guildQueue.setPaused(false) : null };
    }
    if(command === 'remove') {
        {guildQueue ? guildQueue.remove(parseInt(args[0])) : null };
    }
    if(command === 'nowPlaying') {
        console.log(`Now playing: ${guildQueue.nowPlaying}`);
    }
    if(command === 'getQueue') {
        console.log(guildQueue);
    }
    if(command === 'removeLoop') {
        {guildQueue ? guildQueue.setRepeatMode(RepeatMode.DISABLED) : null }; // or 0 instead of RepeatMode.DISABLED
    }
    if(command === 'toggleLoop') {
        {guildQueue ? guildQueue.setRepeatMode(RepeatMode.SONG) : null }; // or 1 instead of RepeatMode.SONG
    }
    if(command === 'toggleQueueLoop') {
        {guildQueue ? guildQueue.setRepeatMode(RepeatMode.QUEUE) : null }; // or 2 instead of RepeatMode.QUEUE
    }
    // Music

    // Api Calls
    if(command === "dog"){
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
    else if(command === "yugioh"){
        axios.get("https://db.ygoprodeck.com/api/v7/cardinfo.php/")
        .then((res)=>{
            const num = Math.floor(Math.random()*(res.data.data.length));
            const embed = new MessageEmbed()
            .setColor('PURPLE')
            .setTitle(res.data.data[num].name)
            .setDescription(res.data.data[num].desc)
            .setImage(res.data.data[num].card_images[0].image_url)
            msg.reply({embeds:[embed]})
        })
        .catch((err)=>{
            console.error('ERR:',err)
        })
        
    }
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
    // API Calls
})