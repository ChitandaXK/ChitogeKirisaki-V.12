

module.exports = {
    name: 'remove',
    aliases: ['re-queue', 're-music'],
    category: 'Music',
    description: 'menghapus lagu dari list antrian.',
    permission: ['Embed Links', 'View Channel','Send Messages','Connect', 'Speak', 'Add Reactions'],
    permissionUser: [],
    usage: ['remove <number song>'],
    example: ['remove 5'],
    run: async (chitanda, message, args) => {
    
    const songNumber = args[0]
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
        .setDescription('Tidak ada Antrian.')
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
   
    if(args[0] > serverQueue.songs.length) {
      let embed = chitanda.util.embed()
        .setColor(chitanda.warna.Chitanda)
        .setDescription('No. tidak ada.! Cari no. lagu yang ada di Antrian')
      return message.channel.send(embed).then(async message => {
           message.delete({ timeout: 15000 });
  });
    }
    
    
    serverQueue.songs.splice(args[0] - 1, 1)
      let embed = chitanda.util.embed()
        .setColor(chitanda.warna.Chitanda)
        .setDescription(`**Menghapus lagu no. ${songNumber} dari Antrian**`)
      return message.channel.send(embed).then(async message => {
           message.delete({ timeout: 15000 });
  });
    
  }
};