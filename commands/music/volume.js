

module.exports = {
    name: 'volume',
    aliases: ['change-volume'],
    category: 'Music',
    description: 'Mengganti volume.',
    permission: ['Embed Links', 'View Channel','Send Messages','Connect', 'Speak', 'Add Reactions'],
    permissionUser: [],
    usage: ['volume <0-200>'],
    example: ['volume 80'],
    run: async (chitanda, message, args) => {
    
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
    
    if(!args[0]) {
      let embed = chitanda.util.embed()
        .setColor(chitanda.warna.Chitanda)
        .setDescription(`Volume Sekarang : ${serverQueue.volume}`)
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
    
    if(args[0] > 200) {
      let embed = chitanda.util.embed()
        .setColor(chitanda.warna.Chitanda)
        .setDescription('Maksimal hanya boleh 200.')
      return message.channel.send(embed).then(async message => {
           message.delete({ timeout: 15000 });
  });
    }
    
    serverQueue.volume = args[0]
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100)
    
    let embed = chitanda.util.embed()
        .setColor(chitanda.warna.Chitanda)
        .setDescription(`Volume di set : ${args[0]}`)
      return message.channel.send(embed).then(async message => {
           message.delete({ timeout: 15000 });
  });
    
  }
};