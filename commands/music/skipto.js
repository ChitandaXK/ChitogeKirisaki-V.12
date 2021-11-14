

module.exports = {
    name: 'skipto',
    aliases: ['st', 'jump'],
    category: 'Music',
    description: 'Melompati lagu dari list antrian, masukan no. sesuai di list antrian.',
    permission: ['Embed Links', 'View Channel','Send Messages','Connect', 'Speak', 'Add Reactions'],
    permissionUser: [],
    usage: ['skipto <number queue>'],
    example: ['skipto 5'],
    run: async (chitanda, message, args) => {
      
    //await message.delete()
    const { channel } = message.member.voice;
    if (!channel) {
      let embed = chitanda.util.embed()
        .setColor(chitanda.warna.Chitanda)
        .setDescription('Kamu harus masuk kedalam saluran suara.')
      return message.channel.send(embed).then(async message => {
           message.delete({ timeout: 15000 });
  });
    }

    const serverQueue = chitanda.queue.get(message.guild.id);

    if (!serverQueue) {
      let embed = chitanda.util.embed()
      .setColor(chitanda.warna.Chitanda)
      .setAuthor('Tidak ada Antrian')
      return message.channel.send(embed);
    }
      
     if(!args[0]) {
      let embed = chitanda.util.embed()
        .setColor(chitanda.warna.Chitanda)
        .setDescription('Masukan No. lagu yang mau di lompati.')
      return message.channel.send(embed).then(async message => {
           message.delete({ timeout: 15000 });
  });
    }
    
      if(isNaN(args[0])) {
      let embed = chitanda.util.embed()
        .setColor(chitanda.warna.Chitanda)
        .setDescription('Masukan Karakter angka')
      return message.channel.send(embed).then(async message => {
           message.delete({ timeout: 15000 });
  });
    }
    
  if(serverQueue.songs.length < args[0]) {
      let embed = chitanda.util.embed()
        .setColor(chitanda.warna.Chitanda)
        .setDescription('No. tidak ada.! Cari no. lagu yang ada di Antrian')
      return message.channel.send(embed).then(async message => {
           message.delete({ timeout: 15000 });
  });
    }
    
    serverQueue.songs.splice(0, Math.floor(args[0] - 2))
    serverQueue.connection.dispatcher.end()
    
    
      let embed = chitanda.util.embed()
        .setColor(chitanda.warna.Chitanda)
        .setDescription(`Lagu telah di lompati no. ${args[0]}`)
      return message.channel.send(embed).then(async message => {
           message.delete({ timeout: 15000 });
  });
    
    
  }
}