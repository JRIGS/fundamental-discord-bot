require('dotenv').config();

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES] });

//initializing bot to a ready status
client.on('ready', () => {
    console.log(`Bot ${client.user.tag} is online!`);
});

// If a message is created by a user then log it
client.on('messageCreate', (message) => {
    console.log(message.content);
})

client.login(process.env.DISCORDJS_BOT_TOKEN);