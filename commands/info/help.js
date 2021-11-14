const { stripIndents } = require("common-tags");
const { readdirSync } = require("fs");

module.exports = {
    name: 'help',
    aliases: ['h', 'commands', 'commandlist'],
    category: 'Info',
    description: 'Menampilkan daftar commands.',
    permission: ['Embed Link', 'Use External Emoji'],
    permissionUser: [],
    usage: ['help', 'help <command>', 'help <category>'],
    example: ['help', 'help play', 'help music'],
    run: async (chitanda, message, args) => {
      
      let music = ['Music', 'music'];
      //let admin = ['Admin', 'admin'];
      //let animals = ['Animals', 'animals'];
      //let anime = ['Anime', 'anime'];
      //let fun = ['Fun', 'fun'];
      let info = ['Info', 'info'];
      //let moderation = ['Moderation', 'moderation'];
      //let utility = ['Utility', 'utility'];
      //let perm = ['Perm', 'perm', 'Permission', 'permission']
      
       if (music.includes(args[0])) {
            return getMusic(chitanda, message)
        } else if
        //(admin.includes(args[0])) {
            //return getAdmin(echidna, message)
        //} else if
        //(animals.includes(args[0])) {
            //return getAnimals(echidna, message)
        //} else if
        //(anime.includes(args[0])) {
            //return getAnime(echidna, message)
        //} else if
        //(fun.includes(args[0])) {
            //return getFun(echidna, message)
        //} else if
        (info.includes(args[0])) {
            return getInfo(chitanda, message)
        } //else if
        //(moderation.includes(args[0])) {
            //return getModeration(echidna, message)
        //} else if
        //(utility.includes(args[0])) {
            //return getUtility(echidna, message)
        //} else if
        //(perm.includes(args[0])) {
            //return getPerm(echidna, message)
        //}
        if (args[0]) {
            return getCMD(chitanda, message, args[0]);
        } else {
            return getAll(chitanda, message);
        }
    }
}
/*const echidna1 = 'https://cdn.discordapp.com/attachments/757214843668529233/757266321183342642/echidna-1920-14247.gif';
const echidna2 = 'https://cdn.discordapp.com/attachments/757214843668529233/757266430340104192/echidna-1920-14240.gif';
const echidna3 = 'https://cdn.discordapp.com/attachments/757214843668529233/757265164046172208/echidna-1920-14242.gif';
const echidna4 = 'https://cdn.discordapp.com/attachments/757214843668529233/757265150326734959/echidna-1920-14241.gif';
const echidna5 = 'https://cdn.discordapp.com/attachments/757214843668529233/757264808889286656/echidna-1920-14243.gif';
const echidna6 = 'https://cdn.discordapp.com/attachments/757214843668529233/757263646039605309/echidna-1920-14244.gif';
const echidna7 = '';
const echidna8 = '';
const echidna9 = '';
const echidna10 = '';
const echidna11 = '';
const echidna12 = '';*/

  
function getAll(chitanda, message) {
 const chitanda0 = (chitanda.user.displayAvatarURL({ format: 'png', dynamic: true, size: 2048}))
 
//let echidnaRDM = [echidna1, echidna2, echidna3, echidna4, echidna5, echidna6];
//let hime = echidnaRDM[Math.floor(Math.random(0) * echidnaRDM.length)];
  
  const emot = `<a:Kuma_Rainbow:771649106891505694>`;
  const among = `<a:DanceAmongStick:771699462249644074>`;
  const pict = 'https://i.ya-webdesign.com/images/svg-gear-transparent-background-3.gif';
    const embed = chitanda.util.embed()
        .setColor(chitanda.warna.Chitanda)
        .setAuthor(`${chitanda.user.username} Commands`, pict)
        .setThumbnail(`${chitanda0}`)
        .setDescription(`To get additional information use \`${chitanda.config.discord.prefix[0]}help\`, Usage: \`${chitanda.config.discord.prefix[0]}help <category>\` to commands all detail description Category. Usage: \`${chitanda.config.discord.prefix[0]}help <command name>\` to commands all detail per commands.`) //  Usage: \`${prefix}help perm\` to show list my permission for your server
        //.addField(`⚙ Admin \`(3)\``, `\`goodbye\`, \`prefix\`, \`welcome\``)
        //.addField(`🐾 Animals \`(4)\``, `\`bird\`, \`cat\`, \`dog\`, \`duck\``)
        //.addField(`${emot} Anime \`(16)\``, `\`anime\`, \`av\`, \`baka\`, \`cuddle\`, \`feed\`, \`hug\`, \`kawai\`, \`kiss\`, \`loli\`, \`manga\`, \`neko\`, \`pat\`, \`poke\`, \`slap\`, \`smug\` \`waifu\``)
        //.addField(`Dev. \`(10)\``, `tes`)
        //.addField(`${among} Fun \`(8)\``, `\`8ball\`, \`ascii\`, \`gender\`, \`love\`, \`meme\`, \`say\`, \`sayembed\`, \`triggered\``)
        //.addField(`🕹 Games`, `\`play\``)
        //.addField(`ℹ Info \`(13)\``, ` \`afk\`, \`avatar\`, \`botinfo\`, \`channel\`, \`covid\`, \`help\`, \`invite\`, \`ping\`, \`serverinfo\`, \`spotify\`, \`uptime\`, \`userinfo\`, \`weather\``)
        //.addField(`🔨 Moderation \`(11)\``, `\`ban\`, \`clean\`, \`create-invite\`, \`kick\`, \`mute\`, \`report\`, \`setnickname\`, \`slowmode\`, \`tempban\`, \`unban\`, \`unmute\``) // verify.js
        .addField(`🔈 Music \`(15)\``, `\`join\`, \`leave\`, \`loop\`, \`lyrics\`, \`nowplaying\`, \`pause\`, \`play\`, \`queue\`, \`remove\`, \`resume\`, \`search\`, \`skip\`, \`skipto\`, \`stop\`, \`volume\``)
        //.addField(`✍ Utility \`(8)\``, `\`binary\`, \`calculate\`, \`docs\`, \`emojis\`, \`feedback\`, \`npm\`, \`suggestion\`, \`translate\``)
        //.setTimestamp()
        .setFooter(`Total Commands: 78 Commands, if there are bug, please report with: ${chitanda.config.discord.prefix[0]}bug`)
        //.setFooter(`Dev. by ${client.users.cache.find(c => c.id === "577495778747088896").tag}`, `${client.users.cache.find(c => c.id === "577495778747088896").avatarURL()}`)
      
      readdirSync("./commands/").forEach(category => {
      
        const commands = readdirSync(`./commands/${category}/`)//.filter(file => file.endsWith(".js"));
        
        //for (let file of commands) {
            //let command = require(`../commands/${category}/${file}`);
        embed.addField(
					`❯ ${category}`,
					commands.map(cmd => `\`${cmd}\``).join(', ').replace(/.js/g, '')
				)
        //}
      })
      message.channel.send(embed)

    //const commands = (category) => {
        //return client.commands
            //.filter(cmd => cmd.category === category)
            //.map(cmd => `- \`${cmd.name}\``)
            //.join("\n");
    //}

    //const info = client.categories
        //.map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
        //.reduce((string, category) => string + "\n" + category);

    //return message.channel.send(embed.setDescription(info));
}

function getCMD(chitanda, message, input) {
  
    const embed = chitanda.util.embed()

    const owners = 'https://cdn.discordapp.com/emojis/739409625090228275.gif?v=1';
    const cmd = chitanda.commands.get(input.toLowerCase()) || chitanda.commands.get(chitanda.aliases.get(input.toLowerCase()));
    
    let info = `:no_entry_sign: **I don't have command \`${input.toLowerCase()}\`**`;

    if (!cmd) {
        return message.channel.send(embed.setColor(chitanda.warna.error).setDescription(info));
    }

    
    //if (cmd.name) info = `**•》 Command**\n${cmd.name}`;
    //if (cmd.description) info = `${cmd.description}`;
    if (cmd.aliases) info = `**•》 Aliases**\n${cmd.aliases.map(a => `\`${chitanda.config.discord.prefix[0]}${a}\``).join(", ") || '-'}`;
    //if (cmd.category) info += `\n**•》 Group**: ${cmd.category}`;
    if (cmd.permission) info += `\n**•》 Client Permissions**\n${cmd.permission.map(a => `\`${a}\``).join(", ") || '-'}`;
    if (cmd.permissionUser) info += `\n**•》 User Permissions**\n${cmd.permissionUser.map(a => `\`${a}\``).join(", ") || '-'}`;
    if (cmd.usage) info += `\n**•》 Usage**\n${cmd.usage.map(a => `\`${chitanda.config.discord.prefix[0]}${a}\``).join(", ") || '-'}`; //<query>
    if (cmd.example) {
        info += `\n**•》 Example**\n${cmd.example.map(a => `\`${chitanda.config.discord.prefix[0]}${a}\``).join(",") || '-'}`;
        embed.setAuthor(`Command info for ${cmd.name}`, `${owners}`)
        embed.setTitle(`${cmd.name} Command`)
        embed.setFooter(`ℹ️ Don't include <> or [], it's mean <> is required and [] is optional`);
        embed.setThumbnail(chitanda.user.displayAvatarURL({ format: 'png', size: 2048 }))
    }

    return message.channel.send(embed.setColor(chitanda.warna.Chitanda).setDescription(info));
}

function getMusic(chitanda, message, input) {
  
  const embed = chitanda.util.embed()
        .setColor(chitanda.warna.Chitanda)
        .setAuthor("The Detail of the Category of Music", chitanda.user.displayAvatarURL())
        .setThumbnail(chitanda.user.displayAvatarURL({ format: 'png', size: 2048 }))
        .setDescription(`These are the command Music ${chitanda.user.username}`)
        .setFooter(`ℹ️ Don't include <> or [], it's mean <> is required and [] is optional`);  
  
    let command = readdirSync("./commands/music")    

let i;
    for(i = 0; i < command.length; i++) {
      console.log(command[i])
      
      const CMD = chitanda.commands.get(command[i].replace(".js", ""))
      embed.addField(`${CMD.name}`, `•》Description\n${CMD.description}\n•》Command\n\`${chitanda.config.discord.prefix[0]}${CMD.example}\``, true)
      
    }
    
    message.channel.send(embed)
}

/*function getAdmin(echidna, message, input) {
  
  let pref = db.get(`prefix.${message.guild.id}`);
   let prefix;
  
  if (!pref) {
     prefix = Prefix; // If the server doesn't have any custom prefix, return default.
  } else {
    prefix = pref;
  }
  
  const embed = new MessageEmbed()
        .setColor(COLOR)
        .setAuthor("The Detail of the Category of Admin", echidna.user.displayAvatarURL())
        .setThumbnail(echidna.user.displayAvatarURL({ format: 'png', size: 2048 }))
        .setDescription(`These are the command Admin ${echidna.user.username}`)
        .setFooter(`ℹ️ Don't include <> or [], it's mean <> is required and [] is optional`);
    
    let command = readdirSync("./commands/admin")    

let i;
    for(i = 0; i < command.length; i++) {
      console.log(command[i])
      
      const CMD = echidna.commands.get(command[i].replace(".js", ""))
      embed.addField(`${CMD.name}`, `•》Description\n${CMD.description}\n•》Command\n\`${prefix}${CMD.example}\``, true)
      
    }
    
    message.channel.send(embed)
}

function getAnimals(echidna, message, input) {
  
  let pref = db.get(`prefix.${message.guild.id}`);
   let prefix;
  
  if (!pref) {
     prefix = Prefix; // If the server doesn't have any custom prefix, return default.
  } else {
    prefix = pref;
  }
  
  const embed = new MessageEmbed()
        .setColor(COLOR)
        .setAuthor("The Detail of the Category of Animals", echidna.user.displayAvatarURL())
        .setThumbnail(echidna.user.displayAvatarURL({ format: 'png', size: 2048 }))
        .setDescription(`These are the command Animals ${echidna.user.username}`)
        .setFooter(`ℹ️ Don't include <> or [], it's mean <> is required and [] is optional`);
    
    let command = readdirSync("./commands/animals")    

let i;
    for(i = 0; i < command.length; i++) {
      console.log(command[i])
      
      const CMD = echidna.commands.get(command[i].replace(".js", ""))
      embed.addField(`${CMD.name}`, `•》Description\n${CMD.description}\n•》Command\n\`${prefix}${CMD.example}\``, true)
      
    }
    
    message.channel.send(embed)
}

function getAnime(echidna, message, input) {
  
  let pref = db.get(`prefix.${message.guild.id}`);
   let prefix;
  
  if (!pref) {
     prefix = Prefix; // If the server doesn't have any custom prefix, return default.
  } else {
    prefix = pref;
  }
  
  const embed = new MessageEmbed()
        .setColor(COLOR)
        .setAuthor("The Detail of the Category of Anime", echidna.user.displayAvatarURL())
        .setThumbnail(echidna.user.displayAvatarURL({ format: 'png', size: 2048 }))
        .setDescription(`These are the command Anime ${echidna.user.username}`)
        .setFooter(`ℹ️ Don't include <> or [], it's mean <> is required and [] is optional`);
    
    let command = readdirSync("./commands/anime")    

let i;
    for(i = 0; i < command.length; i++) {
      console.log(command[i])
      
      const CMD = echidna.commands.get(command[i].replace(".js", ""))
      embed.addField(`${CMD.name}`, `•》Description\n${CMD.description}\n•》Command\n\`${prefix}${CMD.example}\``, true)
      
    }
    
    message.channel.send(embed)
}

function getFun(echidna, message, input) {
  
  let pref = db.get(`prefix.${message.guild.id}`);
   let prefix;
  
  if (!pref) {
     prefix = Prefix; // If the server doesn't have any custom prefix, return default.
  } else {
    prefix = pref;
  }
  
  const embed = new MessageEmbed()
        .setColor(COLOR)
        .setAuthor("The Detail of the Category of Fun", echidna.user.displayAvatarURL())
        .setThumbnail(echidna.user.displayAvatarURL({ format: 'png', size: 2048 }))
        .setDescription(`These are the command Fun ${echidna.user.username}`)
        .setFooter(`ℹ️ Don't include <> or [], it's mean <> is required and [] is optional`);
    
    let command = readdirSync("./commands/fun")    

let i;
    for(i = 0; i < command.length; i++) {
      console.log(command[i])
      
      const CMD = echidna.commands.get(command[i].replace(".js", ""))
      embed.addField(`${CMD.name}`, `•》Description\n${CMD.description}\n•》Command\n\`${prefix}${CMD.example}\``, true)
      
    }
    
    message.channel.send(embed)
}*/

function getInfo(chitanda, message, input) {
  
  const embed = chitanda.util.embed()
        .setColor(chitanda.warna.Chitanda)
        .setAuthor("The Detail of the Category of Information", chitanda.user.displayAvatarURL())
        .setThumbnail(chitanda.user.displayAvatarURL({ format: 'png', size: 2048 }))
        .setDescription(`These are the command Info ${chitanda.user.username}`)
        .setFooter(`ℹ️ Don't include <> or [], it's mean <> is required and [] is optional`);
    
    let command = readdirSync("./commands/info")    

let i;
    for(i = 0; i < command.length; i++) {
      console.log(command[i])
      
      const CMD = chitanda.commands.get(command[i].replace(".js", ""))
      embed.addField(`${CMD.name}`, `•》Description\n${CMD.description}\n•》Command\n\`${chitanda.config.discord.prefix[0]}${CMD.example}\``, true)
      
    }
    
    message.channel.send(embed)
}

/*function getModeration(echidna, message, input) {
  
  let pref = db.get(`prefix.${message.guild.id}`);
   let prefix;
  
  if (!pref) {
     prefix = Prefix; // If the server doesn't have any custom prefix, return default.
  } else {
    prefix = pref;
  }
  
  const embed = new MessageEmbed()
        .setColor(COLOR)
        .setAuthor("The Detail of the Category of Moderation", echidna.user.displayAvatarURL())
        .setThumbnail(echidna.user.displayAvatarURL({ format: 'png', size: 2048 }))
        .setDescription(`These are the command Moderation ${echidna.user.username}`)
        .setFooter(`ℹ️ Don't include <> or [], it's mean <> is required and [] is optional`);
    
    let command = readdirSync("./commands/moderation")    

let i;
    for(i = 0; i < command.length; i++) {
      console.log(command[i])
      
      const CMD = echidna.commands.get(command[i].replace(".js", ""))
      embed.addField(`${CMD.name}`, `•》Description\n${CMD.description}\n•》Command\n\`${prefix}${CMD.example}\``, true)
      
    }
    
    message.channel.send(embed)
}

function getUtility(echidna, message, input) {
  
  let pref = db.get(`prefix.${message.guild.id}`);
   let prefix;
  
  if (!pref) {
     prefix = Prefix; // If the server doesn't have any custom prefix, return default.
  } else {
    prefix = pref;
  }
  
  const embed = new MessageEmbed()
        .setColor(COLOR)
        .setAuthor("The Detail of the Category of Utility", echidna.user.displayAvatarURL())
        .setThumbnail(echidna.user.displayAvatarURL({ format: 'png', size: 2048 }))
        .setDescription(`These are the command Utility ${echidna.user.username}`)
        .setFooter(`ℹ️ Don't include <> or [], it's mean <> is required and [] is optional`);
    
    let command = readdirSync("./commands/utility")    

let i;
    for(i = 0; i < command.length; i++) {
      console.log(command[i])
      
      const CMD = echidna.commands.get(command[i].replace(".js", ""))
      embed.addField(`${CMD.name}`, `•》Description\n${CMD.description}\n•》Command\n\`${prefix}${CMD.example}\``, true)
      
    }
    
    message.channel.send(embed)
}

function getPerm(echidna, message, input) {
  
  let pref = db.get(`prefix.${message.guild.id}`);
   let prefix;
  
  if (!pref) {
     prefix = Prefix; // If the server doesn't have any custom prefix, return default.
  } else {
    prefix = pref;
  }
  const permss = require('../../assets/json/permissions.json');
  const owners = '<a:6181_check:809015715994402837>';
  const embed = new MessageEmbed()
        .setColor(COLOR)
        .setAuthor("List My Permissions", echidna.user.displayAvatarURL())
        .setThumbnail(echidna.user.displayAvatarURL({ format: 'png', size: 2048 }))
        .setDescription(permss.map(a => `${owners} ${a}`))
        .setFooter(`ℹ️ Please give a permission on the list`);
    message.channel.send(embed)
}*/