// required libraries and definitions
const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

// initialize the bot and the commands collection (holds all the commands from the commands directory)
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

// searches through commands directory for files that end with js
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// maps commands found in command directory to commands map
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

// when any message is posted, the bot inspects it for the prefix(! right now).
// if the prefix is there, and the following command after it is a command, then it will
// dynamically execute
bot.on('message', message => {
//  if doesn't have ! or the author is the bot, don't do anything
    if (!message.content.startsWith(prefix) || message.author.bot) return;

//  slice off everything from the command other than the root command
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

//  execute command if you can
    if (!bot.commands.has(commandName)) return;
    const command = bot.commands.get(commandName);

    try {
        command.execute(message, args);
    }
    catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});

bot.on('ready', () => {
	console.log('Ready!');
});

bot.login(token);
