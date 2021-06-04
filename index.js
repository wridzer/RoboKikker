require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client({ ws: { intents: new Discord.Intents(Discord.Intents.ALL) }});
const TOKEN = require('./config.json');

const port = process.env.PORT || 5000;

const yewID = '757737687921852496';
let commandMessage;

bot.login(TOKEN.token);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', async msg => {
  //not respond to self or other bots
  if (msg.author === bot.user) {
    return
  }
  if (msg.author.bot) {
    return
  }
  //maar echt
  if ((msg.content === 'maar echt' || msg.content === 'Maar echt') && (msg.guild.id == 757737687921852496)) {
    await msg.channel.send('Maar echt');
  }
  //report command
  if (msg.content.startsWith('!report')) {
    if (msg.mentions.users.size) {
      const taggedUser = msg.mentions.users.first();
      //let user = msg.guild.member(msg.mentions.users.first());
      msg.channel.send(`You wanted to report: ${taggedUser.username}`);
      //const strafhoek = bot.channels.get(765951880236105758);
      //user.voice.setChannel(strafhoek);
      msg.guild.member(taggedUser.id).voice.setChannel(msg.guild.channels.find(channel => channel.name === "Slaapkanaal").toString());
    } else {
      await msg.reply('Please tag a valid user!');
    }
  }
  //delete non quotes from quote channel
  if ((!msg.content.startsWith('\"') && (!msg.attachments.size > 0)) && msg.channel.id == 768120241308958800) {
    await msg.delete(1000);
    await msg.author.send(`this is not a quote, you freakin pancake`);
  }
  //stupid question
  if (msg.content.startsWith('!stupid') && msg.channel.id == 831216690415140895) {
    const message1 = msg.content.substring(8, msg.content.length);
    await msg.delete(1000);
    await msg.channel.send(message1);
  }
  if (!msg.content.startsWith('!stupid') && msg.channel.id == 831216690415140895) {
    await msg.delete(1000);
  }
  if (!msg.content.startsWith('!anon') && msg.channel.id == 828625609554788352) {
    await msg.delete(1000);
    await msg.author.send(`U used the command wrong, please start with !anon and than the name of the classrep. For example:\`\`\` !anon wridzer \`\`\` `);
  }
  //delete non pics from pet/froggy channel
  /*if ((!msg.attachments.size > 0) && (msg.channel.id == 827317762460221481 || msg.channel.id == 827659850065379338))
  {
    msg.delete(1000);
    msg.author.send(`stop doing this plz`);
  }*/
  //anon command
  /*if (msg.content.startsWith('!anon'))
  {
    if (msg.mentions.users.size)
    {
      const taggedUser = msg.mentions.users.first();
      if(taggedUser == bot.user)
      {
        msg.author.send(`Fuck off! :middle_finger:`);
      }
      var i;
      for(const element of classreps)
      {
        if(element == taggedUser.id)
        {
          const message1 = msg.content.substring(28, msg.content.length);
          taggedUser.send(message1);
          isSend = true;
        }
      }
      if (!isSend)
      {
        msg.author.send('Please tag a valid user!');
      }
      msg.delete(1000);
      isSend = false;
    } else {
      msg.delete(1000);
      msg.author.send('Please tag a valid user!');
    }
  }*/
  if (msg.content.startsWith('!anon wridzer') || msg.content.startsWith('!anon Wridzer')) {
    const message1 = msg.content.substring(14, msg.content.length);
    let client = msg.channel.client;
    let user = client.fetchUser('402552605106241546')
        .then(user => {
          user.send('You have recieved an anonymous message:```' + message1 + "```");
          msg.delete(1000);
        });
  }
  if (msg.content.startsWith('!anon ravi') || msg.content.startsWith('!anon Ravi')) {
    const message1 = msg.content.substring(14, msg.content.length);
    let client = msg.channel.client;
    let user = client.fetchUser('200954723962978304')
        .then(user => {
          user.send('You have recieved an anonymous message:```' + message1 + "```");
          msg.delete(1000);
        });
  }
  if (msg.content.startsWith('!anon sophie') || msg.content.startsWith('!anon Sophie')) {
    const message1 = msg.content.substring(14, msg.content.length);
    let client = msg.channel.client;
    let user = client.fetchUser('319156673916960769')
        .then(user => {
          user.send('You have recieved an anonymous message:```' + message1 + "```");
          msg.delete(1000);
        });
  }
  if (msg.content.startsWith('!anon roberto') || msg.content.startsWith('!anon Roberto')) {
    const message1 = msg.content.substring(14, msg.content.length);
    let client = msg.channel.client;
    let user = client.fetchUser('489711674815938560')
        .then(user => {
          user.send('You have recieved an anonymous message:```' + message1 + "```");
          msg.delete(1000);
        });
  }
  if(msg.content.startsWith('!role'))
  {
    commandMessage = msg;
    await msg.react('✔');
  }
});


bot.on('messageReactionAdd', async (reaction, user) => {
  // When a reaction is received, check if the structure is partial
  if (reaction.partial) {
    // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
    try {
      await reaction.fetch();
    } catch (error) {
      console.error('Something went wrong when fetching the message: ', error);
      // Return as `reaction.message.author` may be undefined/null
      return;
    }
  }
  //not respond to self or other bots
  if (reaction.user === bot.user) {
    return
  }
  if (reaction.user.bot) {
    return
  }
  if(reaction.emoji.name === "✔" && reaction.message === commandMessage)
  {
    let role = reaction.guild.roles.cache.find(role => role.name === "ArTisT");
    await user.member.roles.add(role);
  }
});



