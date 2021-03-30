require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = require('./config.json');

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.login(TOKEN);

bot.on('message', msg => {
  if (msg.content === 'lit') {
  if message.author == client.user:
        return
    if message.author.bot: return
    msg.channel.send('maar echt');

  } else if (msg.content.startsWith('!report')) {
    if (msg.mentions.users.size) {
      const taggedUser = msg.mentions.users.first();
      msg.channel.send(`You wanted to report: ${taggedUser.username}`);
    } else {
      msg.reply('Please tag a valid user!');
    }
  }
});