const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection } = require(`discord.js`);
const fs = require('fs');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] }); 

client.commands = new Collection();

require('dotenv').config();

const functions = fs.readdirSync("./src/Functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/Events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/Commands");

(async () => {
    for (file of functions) {
        require(`./Functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./src/Events");
    client.handleCommands(commandFolders, "./src/Commands");
    client.login(process.env.DISCORD_TOKEN)
})();

