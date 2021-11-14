

module.exports = {
    name: 'reload',
    aliases: ['re'],
    category: 'Developer',
    description: 'Memuat Ulang module.',
    permission: [],
    permissionUser: ['Owner Bot'],
    usage: ['reload <category> <command>'],
    example: ['reload music play'],
    run: async (chitanda, message, args) => {
      
      const owner = [chitanda.ownerID, chitanda.ownerID2],
            ownGuild = [chitanda.guildID, chitanda.guildID2];
      //if(message.guild.id === kirisaki.guildID) {
      //if(message.author.id !== kirisaki.ownerID) {
      
      //if (!ownGuild.includes(message.guild.id)) {
      if (!owner.includes(message.author.id)) {
       
          let embed = new chitanda.util.embed()
          .setColor(chitanda.warna.Error)
          .setTitle("Command Dev. Owner")
          .setDescription(`${message.author}, Hi Friend Kamu Bukan Developer`)
      return message.channel.send(embed).then(async message => {
             message.delete({ timeout: 15000 });
  });
      }
      //}
      try {
      if (!args.length) {
        throw new TypeError(`Try ${module.exports.example}`);
       /*const embed = chitanda.util.embed()
        .setColor(chitanda.warna.Kirisaki)
        .setDescription(`Try ${module.exports.example}`)
  return message.channel.send(embed).then(async message => {
           message.delete({ timeout: 15000 });
      })*/
    }
      
      let category = args[0];
      let command = args[1];
      const owners = '<a:6181_check:809015715994402837>';
      
      try {
      delete require.cache[require.resolve(`../../commands/${category}/${command}.js`)];
          chitanda.commands.delete(command);
          
          const pull = require(`../../commands/${category}/${command}.js`);
          chitanda.commands.set(command, pull);
          
        let embed = chitanda.util.embed()
          .setColor(chitanda.warna.Chitanda)
          .setDescription(`${owners} Successfully reload **${command}**`)
          return message.reply(embed);
  } catch (e) {
    const embed = chitanda.util.embed()
      .setColor(chitanda.warna.Error)
      .setAuthor("reloaded error")
      .setDescription(`\`\`\`${e.message}\`\`\``)
      .setFooter(`React to delete message.`);
    const m = await message.channel.send(embed);
    for (const chot of chitanda.emoji.red) {
      await m.react(chot);
    }
    const filter = (rect, usr) => chitanda.emoji.red.includes(rect.emoji.name) && usr.id === message.author.id;
    m.createReactionCollector(filter, { time: 60000, max: 1 }).on("collect", async col => {
      if (col.emoji.name === "🚫") return m.delete();
    });
  }
  } catch (e) {
    const embed = chitanda.util.embed()
      .setColor(chitanda.warna.Error)
      .setAuthor("Reloaded error")
      .setDescription(`\`\`\`${e}\`\`\``)
      .setFooter(`React to delete message.`);
    const m = await message.channel.send(embed);
    for (const chot of chitanda.emoji.red) {
      await m.react(chot);
    }
    const filter = (rect, usr) => chitanda.emoji.red.includes(rect.emoji.name) && usr.id === message.author.id;
    m.createReactionCollector(filter, { time: 60000, max: 1 }).on("collect", async col => {
      if (col.emoji.name === "🚫") return m.delete();
    });
  }
}
}