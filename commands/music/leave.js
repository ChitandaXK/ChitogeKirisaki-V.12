

module.exports = {
    name: 'leave',
    aliases: ['end'],
    category: 'Music',
    description: 'Untuk Keluar dari channel suara.',
    permission: ['Embed Links', 'View Channel','Send Messages','Connect', 'Speak', 'Add Reactions'],
    permissionUser: [],
    usage: ['leave'],
    example: ['leave'],
    run: async (chitanda, message, args) => {
      
      //await message.delete()

    //try {
  const voiceChannel = message.member.voice.channel;
		if (!voiceChannel) {
      let embed = chitanda.util.embed()
        .setColor(chitanda.warna.Chitanda)
        .setDescription('Kamu harus masuk kedalam saluran suara.')
      return message.channel.send(embed).then(async message => {
           message.delete({ timeout: 15000 });
  });
    }
      
      
      const connection = chitanda.voice.connections.get(message.guild.id);
		  if (!connection) {
        let embed = chitanda.util.embed()
          .setColor(chitanda.warna.Chitanda)
          .setDescription('Aku tidak di channel suara.')
        return message.channel.send(embed).then(async message => {
           message.delete({ timeout: 15000 });
  });
      }
      
		  connection.channel.leave();
      let embed = chitanda.util.embed()
        .setColor(chitanda.warna.Kirisaki)
        .setDescription(`Aku ${chitanda.user} Meninggalkan Channel **${connection.channel.name}**...`)
		  return message.channel.send(embed).then(async message => {
           message.delete({ timeout: 15000 });
  });
      
    
    //} catch (err) {
      //let embed = new MessageEmbed()
        //.setColor(COLOROWN)
        //.setDescription(`Im not even in voice channel, did you see?`)
			//return message.channel.send(embed);
 // }
  }
}