const Discord = require('discord.js'),
      { Collection } = require('discord.js'),
      cooldowns = new Discord.Collection(),
      escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

module.exports = async (chitanda, message) => {

  if (message.channel.type === "dm" || message.author.bot || message.author === chitanda.user) {
    if (message.author.bot) return;
    if (message.guild) return;
  
  if(message.author.id !== chitanda.ownerID) {
    
    const lembed = chitanda.util.embed()
        	.setColor(chitanda.warna.Chitanda)
        	.setTitle('successfully sent')
          .setDescription(`Please wait for a response from the staff`)
       message.channel.send(lembed).then(async message => {
       message.delete({ timeout: 5000 });
            await message.react("1️⃣");
      			await message.react("2️⃣");      			
       
   })
          if (message){
      const text  = message
      const kirim = chitanda.users.cache.find(c => c.id === `${chitanda.ownerID}`);
      kirim.send(`${message.author} / ${message.author.username} (${message.author.id})\n${text}`)  
          }
  }
  }
  
    
  //require('../plugin/ar.js')(client, message)
  //require('../plugin/afk.js')(client, message)


  //if (message.attachments.size > 0) {

    //const AttachmentCollection = kirisaki.dataAttachment;
    //const attachment = Array.from(message.attachments)[0];
    //const image = attachment[1].url;
    //const format = image.match(/\.(gif|jpe?g|tiff?|png|webp|bmp|mp4|mp3|zip|rar|exe)$/i)[0];
    //const toBuffer = await require('got')(image).buffer();

    //AttachmentCollection.set(message.author.lastMessageID, { buffer: toBuffer, filename: image + format});
  //}
  let pref = chitanda.db.get(`prefix.${message.guild.id}`);
   let prefix;
  
  if (!pref) {
     prefix = chitanda.config.discord.prefix[0]; // If the server doesn't have any custom prefix, return default.
  } else {
    prefix = pref;
  }
  
  chitanda.prefix = chitanda.config.discord.prefix[0];
  chitanda.prefixDB = prefix;
  
  const prefixRegex = new RegExp(`^(<@!?${chitanda.user.id}>|${escapeRegex(prefix)})\\s*`);
    if (!prefixRegex.test(message.content)) return;
    const [matchedPrefix] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    //Prefix del
    message.flags = [];
    while (args[0] && args[0][0] === "-") {
      message.flags.push(args.shift().slice(1)); // Message Flags: -default, -ban, -parameter
    }
  
    if (cmd.length === 0) return;
    
    // Get the command
    let command = chitanda.commands.get(cmd) || chitanda.commands.get(chitanda.aliases.get(cmd));
    if (!command) {
      let embed = chitanda.util.embed()
        .setColor(chitanda.warna.Chitanda)
        .setDescription(`Command tidak ada. Dimohon lihat di command help \`${prefix}help\``)
      return message.channel.send(embed).then(async message => {
             message.delete({ timeout: 10000 });
  });
    }
  
    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Collection())
    }
      const now = Date.now();
      const timestamps = cooldowns.get(command.name);
      const cooldownAmount = (command.cooldown || 4) * 1000;
    
     //if (!timestamps.has(message.author.id)) {
    if (chitanda.ownerID.includes(message.author.id)) {
      timestamps.set(message.author.id, now);
    //}
  } else {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    //if (timestamps.has(message.author.id)) {
      //const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.channel.send(`⏱ | **${message.author.username}**! Mohon tunggu **${timeLeft.toFixed(1)}s** detik lagi baru bisa pakai!`).then(b =>{b.delete({timeout:5000})})
      //return message.channel.send(`⏱ | **${message.author.username}**! Please wait **${timeLeft.toFixed(1)}s** and try again!`).then(b =>{b.delete({timeout:5000})})
      }
    }
      timestamps.set(message.author.id, now);
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  
  try {
    if (command) {
        command.run(chitanda, message, args); 
    }
  
  } catch (e) {
      console.log(e.stack);
    }
  finally {
      console.log(`${message.guild.name}: ${message.author.tag} Used ${cmd} in #${message.channel.name}`);
    }
}