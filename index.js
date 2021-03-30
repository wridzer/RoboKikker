require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = require('./config.json');

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.login("ODI2MTkzMzAxODc4MzQxNjYy.YGI6eQ.sV4z1rnGba0Mrrry69J9Ec2Gi58");

bot.on('message', msg => {
  if (msg.author == client.user){return}
  if (msg.author.bot){return}
  if (msg.content === 'maar echt') {
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