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
  if (msg.author == bot.user){return}
  if (msg.author.bot){return}
  if (msg.content === 'maar echt')
  {
      msg.channel.send('Maar echt');
  }
  if (msg.content.startsWith('!report'))
  {
    if (msg.mentions.users.size)
    {
      const taggedUser = msg.mentions.users.first();
      msg.channel.send(`You wanted to report: ${taggedUser.username}`);
      msg.guild.member(taggedUser.id).voice.setChannel('776124955988590593');
    } else {
      msg.reply('Please tag a valid user!');
    }
  }
  if ((!msg.content.startsWith('\"') || msg.attachments.size > 0) && msg.channel.id == 768120241308958800)
  {
    msg.delete(1000);
    msg.author.send(`this is not a quote, you freakin pancake`);
  }
  if (msg.content.startsWith('!slidedm'))
  {
    if (msg.mentions.users.size)
    {
      const taggedUser = msg.mentions.member;
      if(taggedUser == bot.user)
      {
        msg.delete(1000);
        msg.author.send(`Fuck off! :middle_finger:`);
      } else {
      const message1 = msg.content.substring(10/*+taggedUser.displayName.length*/, msg.content.length)
      taggedUser.send(message1);
      msg.delete(1000);
      }
    } else {
      msg.reply('Please tag a valid user!');
    }
  }
});