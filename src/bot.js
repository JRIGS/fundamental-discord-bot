require('dotenv').config();

const { Client, Intents, Guild } = require('discord.js');
const client = new Client({ 
    partials: ['CHANNEL', 'REACTION', 'MESSAGE', 'USER'],
    intents: [Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING]
});
const PREFIX = "$";


//confirm ready status from bot
client.on('ready', () => {
    console.log(`Bot ${client.user.tag} is online!`);
});

// If a message is created by a user then log it
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
//Prefix conditional    
    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/);
        // console.log(CMD_NAME);
        // console.log(args);

        if (CMD_NAME === 'kick') {
            if (message.member.hasPermission('KICK_MEMBERS')) 
            return message.reply('You do not have permission to kick that user')
            
            if (args.length === 0) 
            return message.reply('Please provide an ID');
            
            const member = message.guild.members.cache.get(args[0]);
            if (member) {
                member.kick()
                .then((member) => message.channel.send(`${member} was kicked.`))
                .catch((err) => message.channel.send('I cannot kick that user'));
                // console.log(`${member.author.tag} kicked!`);
            } else {
                message.channel.send('That member was not found');
            }
        } 

        else if (CMD_NAME === 'ban') {
            if (!message.member.permissions.has('BAN_MEMBERS')) 
            return message.reply('You do not have permission to BAN that user');
            if (args.length === 0) 
            return message.reply('Please provide an ID');
            
            //async implemented
            try {
                const user = await message.guild.members.ban(args[0]);
                message.channel.setNSFW('User was banned successfully')
            } catch (err){
                message.channel.send('An error occured. Either I do not have permissions or the User is not found')
            }

        }
        
    }
    console.log(`[${message.author.tag}]: ${message.content}`);
    if (message.content.toLowerCase() === 'hello') {
        message.reply('Hello there!');
    }
});

client.on('messageReactionAdd', (reaction, user) => {

    console.log("test showing");

    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if (reaction.message.id === '922605976140521513') {
        console.log("Message ID Exists");
        switch (name){
            case '🍎':
                member.roles.add('922605357824626739');
                break;
            case '🍌':
                member.roles.add('922605507620003911');
                break;
            case '☕':
                member.roles.add('922605414758096897');
                break;
            case '🍑':
                member.roles.add('922605507620003911');
                break;
        }
    }
});

client.on('messageReactionRemove', (reaction, user) => {

    console.log("test showing");

    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if (reaction.message.id === '922605976140521513') {
        console.log("Message ID Exists");
        switch (name){
            case '🍎':
                member.roles.remove('922605357824626739');
                break;
            case '🍌':
                member.roles.remove('922605507620003911');
                break;
            case '☕':
                member.roles.remove('922605414758096897');
                break;
            case '🍑':
                member.roles.remove('922605507620003911');
                break;
        }
    }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);