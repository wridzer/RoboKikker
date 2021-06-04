require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client({ ws: { intents: new Discord.Intents(Discord.Intents.ALL) }});
const TOKEN = require('./config.json');
const cron = require('cron');

const port = process.env.PORT || 5000;

const yewID = '757737687921852496';
let commandMessage;
let artistRole;
let liveRole;
let MCRole;
let valoRole;
let unturnedRole;
let jackRole;
let pannenkoekrol;

bot.login(TOKEN.token);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
  const job = new cron.CronJob('0 0 8 * * *', () => {
    const yew = bot.guilds.get(yewID);
    let user = yew.guild.members.random();
    const Role = yew.guild.roles.cache.get(pannenkoekrol);
    Role.members.forEach((member, i) => { // Looping through the members of Role.
      setTimeout(() => {
        member.roles.remove(Role); // Removing the Role.
      }, i * 1000);
    });
    user.roles.add(pannenkoekrol);
  });
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
    await msg.delete();
    await msg.author.send(`this is not a quote, you freakin pancake`);
  }
  //stupid question
  if (msg.content.startsWith('!stupid') && msg.channel.id == 831216690415140895) {
    const message1 = msg.content.substring(8, msg.content.length);
    await msg.delete();
    await msg.channel.send(message1);
  }
  if (!msg.content.startsWith('!stupid') && msg.channel.id == 831216690415140895) {
    await msg.delete();
  }
  if (!msg.content.startsWith('!anon') && msg.channel.id == 828625609554788352) {
    await msg.delete();
    await msg.author.send(`U used the command wrong, please start with !anon and than the name of the classrep. For example:\`\`\` !anon wridzer \`\`\` `);
  }
  //Anon classrep
  if (msg.content.startsWith('!anon wridzer') || msg.content.startsWith('!anon Wridzer')) {
    const message1 = msg.content.substring(14, msg.content.length);
    let client = msg.channel.client;
    let user = client.fetchUser('402552605106241546')
        .then(user => {
          user.send('You have recieved an anonymous message:```' + message1 + "```");
          msg.delete();
        });
  }
  if (msg.content.startsWith('!anon ravi') || msg.content.startsWith('!anon Ravi')) {
    const message1 = msg.content.substring(14, msg.content.length);
    let client = msg.channel.client;
    let user = client.fetchUser('200954723962978304')
        .then(user => {
          user.send('You have recieved an anonymous message:```' + message1 + "```");
          msg.delete();
        });
  }
  if (msg.content.startsWith('!anon sophie') || msg.content.startsWith('!anon Sophie')) {
    const message1 = msg.content.substring(14, msg.content.length);
    let client = msg.channel.client;
    let user = client.fetchUser('319156673916960769')
        .then(user => {
          user.send('You have recieved an anonymous message:```' + message1 + "```");
          msg.delete();
        });
  }
  if (msg.content.startsWith('!anon roberto') || msg.content.startsWith('!anon Roberto')) {
    const message1 = msg.content.substring(14, msg.content.length);
    let client = msg.channel.client;
    let user = client.fetchUser('489711674815938560')
        .then(user => {
          user.send('You have recieved an anonymous message:```' + message1 + "```");
          msg.delete();
        });
  }
  //roles
  if(msg.content.startsWith('!role'))
  {
    await msg.delete();
    const rolemsg = await msg.channel.send('You already know how it works! just react with the emoji corresponding to the role you want and you get it!' +
        '\n🎨 for the artist role' +
        '\n🍿 for the live role' +
        '\n🟩 for the minecraft role' +
        '\n🔫 for the valorant role' +
        '\n🧟 for the unturned role' +
        '\n📦 for the jackbox role');
    commandMessage = rolemsg;
    artistRole = msg.guild.roles.cache.find(role => role.name === "ArTisT");
    liveRole = msg.guild.roles.cache.find(role => role.name === "Live");
    MCRole = msg.guild.roles.cache.find(role => role.name === "Minecraft");
    valoRole = msg.guild.roles.cache.find(role => role.name === "Valorant");
    unturnedRole = msg.guild.roles.cache.find(role => role.name === "Unturned");
    jackRole = msg.guild.roles.cache.find(role => role.name === "Jackbox");
    await rolemsg.react('🎨');
    await rolemsg.react('🍿');
    await rolemsg.react('🟩');
    await rolemsg.react('🔫');    
    await rolemsg.react('🧟');
    await rolemsg.react('📦');
  }
});

//reaction
bot.on('messageReactionAdd', async (reaction, user) => {
  const guild = reaction.message.guild;
  const memberWhoReacted = guild.members.cache.find(member => member.id === user.id);
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
  if (user.bot) {
    return
  }

  
  //Add role
  if(reaction.message === commandMessage)
  {
    //BotsOp mag geen rollen
    let client = reaction.message.channel.client;
    let botsop = client.users.cache.get('246993900118605825')
    if (memberWhoReacted.id === botsop.id) {
      botsop.send('jij mag geen rol');
      return
    }
  
    let roleToAdd;
    switch(reaction.emoji.name)
    {
      case '🎨': roleToAdd = artistRole; break;
      case '🍿': roleToAdd = liveRole; break;
      case '🟩': roleToAdd = MCRole; break;
      case '🔫': roleToAdd = valoRole; break;
      case '🧟': roleToAdd = unturnedRole; break;
      case '📦': roleToAdd = jackRole; break;
    }
    await memberWhoReacted.roles.add(roleToAdd);
  }
});



