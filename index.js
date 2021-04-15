require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client({
    partials: ["REACTION", "MESSAGE"],
    ws: {
        intents: ["GUILD_MEMBERS", "GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"]
    }
});
const TOKEN = require('./config.json');

const port = process.env.PORT || 5000;

//var classreps = ["220190663780728842", "200954723962978304", "402552605106241546", "319156673916960769", "489711674815938560"];

//var isSend;

var initialized = false;

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);

  initialized = true;
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
  if ((!msg.content.startsWith('\"') && (!msg.attachments.size > 0)) && msg.channel.id == 768120241308958800)
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
  if (!msg.content.startsWith('!anon') && msg.channel.id == 828625609554788352)
  {
    msg.delete(1000);
    msg.author.send(`U used the command wrong, please start with !anon and than the name of the classrep. For example:\`\`\` !anon wridzer \`\`\` `);
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
  if (msg.content.startsWith('!anon wridzer') || msg.content.startsWith('!anon Wridzer'))
  {
    const message1 = msg.content.substring(14, msg.content.length);
    let client = msg.channel.client;
    let user = client.fetchUser('402552605106241546')
    .then(user => {
        user.send('You have recieved an anonymous message:```' + message1 + "```");
    msg.delete(1000);
    });
  }
  if (msg.content.startsWith('!anon ravi') || msg.content.startsWith('!anon Ravi'))
  {
    const message1 = msg.content.substring(14, msg.content.length);
    let client = msg.channel.client;
    let user = client.fetchUser('200954723962978304')
    .then(user => {
        user.send('You have recieved an anonymous message:```' + message1 + "```"); 
    msg.delete(1000);
    });
  }
  if (msg.content.startsWith('!anon sophie') || msg.content.startsWith('!anon Sophie'))
  {
    const message1 = msg.content.substring(14, msg.content.length);
    let client = msg.channel.client;
    let user = client.fetchUser('319156673916960769')
    .then(user => {
        user.send('You have recieved an anonymous message:```' + message1 + "```"); 
    msg.delete(1000);
    });
  }
  if (msg.content.startsWith('!anon roberto') || msg.content.startsWith('!anon Roberto'))
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

bot.on('raw', packet => {
    if (!initialized) return;
    if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;
    const channel = bot.channels.get(packet.d.channel_id);
    console.log(channel);
    channel.messages.fetch(packet.d.message_id).then(message => {
        const servers = bot.guilds.cache.get(packet.d.guild_id);
        if (packet.t === 'MESSAGE_REACTION_ADD'){
            if(packet.d.emoji.name === "✔️"){
                const servers = bot.guilds.get('757737687921852496');
                let role = reaction.message.guild.roles.find(role => role.id == '831547671110090774');
                servers.members.fetch(user.id).then(member => member.roles.add(role)).catch(console.error);
            }
        }
    });
});

/*
bot.on('messageReactionAdd', (reaction, user) => {
    if(reaction.emoji.name === "✔️")
    {
        //user.roles.add('831547671110090774');
        const servers = bot.guilds.get('757737687921852496');
        //var memberRole= server.roles.cache.find(role => role.name === "ArTisT")
        //let role = reaction.message.guild.roles.find(role => role.id == 831547671110090774);
        //if (!role) return;
        let role = reaction.message.mentions.roles.first();
        if (role.id == 831547671110090774)
        {
          console.log(role.id);
          
        }
        //console.log(servers.members);
        servers.members.fetch(user.id).then(member => member.roles.add(role)).catch(console.error);
        //console.log(reaction.message.guild.member);
        //console.log(reaction.message.guild.member.roles);
        //reaction.message.guild.member.roles.add(role);
    }
});*/