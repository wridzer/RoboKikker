require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = require('./config.json');

const port = process.env.PORT || 5000;

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.login(TOKEN.token);

bot.on('message', msg => {
  //@client.event
  //async def on_message(msg):
  if (msg.author == bot.user){return}
  if (msg.author.bot){return}
  if (msg.content === 'maar echt') {
      msg.channel.send('Maar echt');
  } else if (msg.content.startsWith('!simpreport')) {
    if (msg.mentions.users.size) {
      const taggedUser = msg.mentions.users.first();
      msg.channel.send(`You wanted to report for simping: ${taggedUser.username}`);
      taggedUser.voice.setChannel</776124955988590593>;
    } else {
      msg.reply('Please tag a valid user!');
    }
  }
});