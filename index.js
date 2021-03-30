require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = require('./config.json');

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.login("ODI2MTkzMzAxODc4MzQxNjYy.YGI6eQ.sV4z1rnGba0Mrrry69J9Ec2Gi58");

bot.on('message', msg => {
  if (msg.content === 'lit') {
    msg.channel.send('maar echt');

  } else if (msg.content.startsWith('!kick')) {
    if (msg.mentions.users.size) {
      const taggedUser = msg.mentions.users.first();
      msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
    } else {
      msg.reply('Please tag a valid user!');
    }
  }
});