const { Client, Collection, MessageEmbed } = require("discord.js");

module.exports = {
 async  attentionembed(message, titel) {

    try{
      await message.reactions.removeAll();
       await message.react('<a:9612_uncheck_ravena:809015792351445002>');
      }catch{
        }

    let resultsEmbed = new MessageEmbed()
      .setTitle(":x: " + titel)
      .setColor("#F0EAD6")
      
      message.channel.send(resultsEmbed);
    return;

  }
};