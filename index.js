const Discord = require("discord.js");
const client = new Discord.Client();
const CONFIG = require("./storage/config.json");
const PREFIX = CONFIG.defaultPrefix;
const TOKEN = CONFIG.token;
const SERVERNAME = CONFIG.serverName;
const helppage = new Discord.RichEmbed()
  .setColor('#275BF0')
  .setTitle("Page d'aide:")
  .setDescription("*help - affiche la page d'aide\n*say [votre phrase] - Le bot écrit votre phrase\n*purge 1-99 - Supprime le nombre choisi (compris entre 1 et 99)\n*ban @user#0000 - banni l\'utilisateur mentionné\n*kick @user#0000 - kick l\'utilisateur mentionné\n*avatar - affiche l\'avatar de l\'utilisateur")


client.on('ready', () => {
  console.log(`Connecté en tant que : ${client.user.tag}!`);
  client.user.setPresence({
        game: {
            name: ' *help',
            type: 'Utilisé'
        }
    });
});

client.on('message', message => {
  if (!message.guild) return;

  if (message.content.startsWith('*ban')) {
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member.ban('Optional reason that will display in the audit logs').then(() => {
          message.reply(`L'utilisateur ${user.tag} à bien été banni`);
        }).catch(err => {
          message.reply('Je ne peux pas bannir cet utilisateur');
          console.error(err);
        });
      } else {
        message.reply('Cet utilisateur n\'est pas sur le discord');
      }
    } else {
      message.reply('Vous n\'avez pas mentionnez la personne à bannir.');
    }
  }
});


function purgeCommand(message, adminRole, prefix, args) {
  async function purge(){
    let amount = parseInt(args.substring(6))

    if (amount == undefined) {
      message.channel.send(`:x: S'il vous plait, donnez une valeur. Usage : \'*purge <amount>\'`)
      return
    }

    if (!message.member.roles.has(adminRole.id)) {
      message.channel.send(`Vous n'avez pas le rôle attribuez pour utilisez *purge`)
      return
    }

    if(isNaN(amount)) {
      message.channel.send('Pas possible')
      return
    }

    if (amount > 100 && amount > 0) amount = 100;

    const fetched = await message.channel.fetchMessages({limit:parseInt(amount+1)})
    console.log((fetched.size) + ' Message en cours de suppression')

    message.channel.bulkDelete(fetched).catch(error => message.channel.send(`*Erreur ${error}`))

    message.channel.send(`:wastebasket: J'ai supprimé : ${amount} messages pour vous.`)
  }
  purge();
}
client.on('message', message => {
  if(message.content.startsWith("*say")) {
    var text = message.content.split(' ').slice(1).join(' ');
    if(!text) return message.reply("Usage incorrect utilise : *say");
    message.delete().catch(O_o=>{});
    message.channel.send(text);
  }﻿
});


client.on('message', message => {
  if (!message.guild) return;

  if (message.content.startsWith('*kick')) {
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member.kick('Optional reason that will display in the audit logs').then(() => {
          message.reply(`L'utilisateur ${user.tag} à bien été kick`);
        }).catch(err => {
          message.reply('Je ne peux pas kick cet utilisateur');
          console.error(err);
        });
      } else {
        message.reply('Cet utilisateur n\'est pas sur le discord');
      }
    } else {
      message.reply('Vous n\'avez pas mentionnez la personne à kick.');
    }
  }
});

// Create an event listener for messages
client.on('message', message => {
  // If the message is "ping"
  if (message.content === '*Melkyes') {
    // Send "pong" to the same channel
    message.channel.send('Le plus beau !');
  }
});

// Create an event listener for messages
client.on('message', message => {
  // If the message is "ping"
  if (message.content === '*Mush') {
    // Send "pong" to the same channel
    message.channel.send('Ptdr :joy: il est gros');
  }
});

client.on('message', message => {
    if (message.content === '*avatar') {
      // Remove the "var" line; it isn't necessary.
      let embed = new Discord.RichEmbed()
      // Replace "message.member" with "message.author"
    .setImage(message.author.avatarURL)
    .setColor('#275BF0')
      message.channel.send(embed)
    }
});

client.on('message', message => {
  var args = message.content.toLowerCase().substring(PREFIX.length)
  let adminRole = message.guild.roles.find("id", "548136198695157760" && "518497375728304128" && "544203614269341727" && "452561749720170499" && "459634323415498762" && "548143174816759819") && message.author.names.find("id", "327731712215744514")
  if (args.startsWith("purge")) {
    purgeCommand(message, adminRole, PREFIX, args)
  }
});


client.on('message', (message) => {
  if (message.content.startsWith(PREFIX + "VIP")) {
    let perms = message.member.permissions;
    message.member.addRole('548270072863391774')
  }
});



client.on('message', message => {
  if (message.content === '*help') {
    message.channel.send(helppage)
  }
});


client.login(process.env.POLOLO);
