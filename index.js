require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = require('./config.json');

const port = process.env.PORT || 5000;

//var classreps = ["220190663780728842", "200954723962978304", "402552605106241546", "319156673916960769", "489711674815938560"];

//var isSend;

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.login(TOKEN.token);

bot.on('message', msg => {
  //not respond to self or other bots
  if (msg.author == bot.user){return}
  if (msg.author.bot){return}
  //maar echt
  if ((msg.content === 'maar echt' || msg.content === 'Maar echt') && (msg.guild.id == 757737687921852496))
  {
      msg.channel.send('Maar echt');
  }
  //report command
  if (msg.content.startsWith('!report'))
  {
    if (msg.mentions.users.size)
    {
      const taggedUser = msg.mentions.users.first();
      //let user = msg.guild.member(msg.mentions.users.first());
      msg.channel.send(`You wanted to report: ${taggedUser.username}`);
      //const strafhoek = bot.channels.get(765951880236105758);
      //user.voice.setChannel(strafhoek);
      msg.guild.member(taggedUser.id).voice.setChannel(msg.guild.channels.find(channel => channel.name === "Slaapkanaal").toString());
    } else {
      msg.reply('Please tag a valid user!');
    }
  }
  //delete non quotes from quote channel
  if ((!msg.content.startsWith('\"') /*|| (!msg.attachments.size > 0)*/) && msg.channel.id == 768120241308958800)
  {
    msg.delete(1000);
    msg.author.send(`this is not a quote, you freakin pancake`);
  }
  //stupid question
  if (msg.content.startsWith('!stupid') && msg.channel.id == 831216690415140895)
  {
    const message1 = msg.content.substring(8, msg.content.length);
    msg.delete(1000);
    msg.channel.send(message1);
  }
  if (!msg.content.startsWith('!stupid') && msg.channel.id == 831216690415140895)
  {
    msg.delete(1000);
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
  if (msg.content.startsWith('!anon wridzer'))
  {
    const message1 = msg.content.substring(14, msg.content.length);
    let client = msg.channel.client;
    let user = client.fetchUser('402552605106241546')
    .then(user => {
        user.send('You have recieved an anonymous message:```' + message1 + "```");
    msg.delete(1000);
    });
  }
  if (msg.content.startsWith('!anon ravi'))
  {
    const message1 = msg.content.substring(14, msg.content.length);
    let client = msg.channel.client;
    let user = client.fetchUser('200954723962978304')
    .then(user => {
        user.send('You have recieved an anonymous message:```' + message1 + "```"); 
    msg.delete(1000);
    });
  }
  if (msg.content.startsWith('!anon sophie'))
  {
    const message1 = msg.content.substring(14, msg.content.length);
    let client = msg.channel.client;
    let user = client.fetchUser('319156673916960769')
    .then(user => {
        user.send('You have recieved an anonymous message:```' + message1 + "```"); 
    msg.delete(1000);
    });
  }
  if (msg.content.startsWith('!anon roberto'))
  {
    const message1 = msg.content.substring(14, msg.content.length);
    let client = msg.channel.client;
    let user = client.fetchUser('489711674815938560')
    .then(user => {
        user.send('You have recieved an anonymous message:```' + message1 + "```"); 
    msg.delete(1000);
    });
  }
  if(msg.content.startsWith('!art'))
  {
    //var role = msg.guild.roles.find(role => role.name === "ArTisT");
    const commandMessage = msg;
    msg.react('✔️');
    msg.react('❌');
  }
});

bot.on('messageReactionAdd', (reaction, user) => {
    if(reaction.emoji.name === "✔️")
    {
        //user.roles.add('757737687921852496');
        //let server = bot.guilds.cache.get('757737687921852496')
        //var memberRole= server.roles.cache.find(role => role.name === "ArTisT")
        let role = reaction.message.guild.roles.find(role => role.id == 831547671110090774);
        //if (!role) return;
        console.log(role.id);
        //reaction.message.guild.member.roles.add(role);
    }
});