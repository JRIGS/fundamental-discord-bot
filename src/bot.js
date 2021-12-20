require('dotenv').config();

const { Client, Intents, Guild } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES] });
const PREFIX = "$";

//confirm ready status from bot
client.on('ready', () => {
    console.log(`Bot ${client.user.tag} is online!`);
});

// If a message is created by a user then log it
client.on('messageCreate', (message) => {
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
            message.guild.members.ban(args[0])
                .catch((err) => console.log(err));
        }
        
    }
    console.log(`[${message.author.tag}]: ${message.content}`);
    if (message.content.toLowerCase() === 'hello') {
        message.reply('Hello there!');
    }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);