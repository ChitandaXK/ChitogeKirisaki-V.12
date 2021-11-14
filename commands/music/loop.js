const modes = ["none", "track", "queue"];
const aliases = {
    single: "track",
    track: "track",
    one: "track",
    song: "track",
    current: "track",
    all: "queue",
    every: "queue",
    queue: "queue",
    off: "none",
    none: "none",
    nothing: "none"
};


module.exports = {
    name: 'loop',
    aliases: ['repeat', 'lp'],
    category: 'Music',
    description: 'Untuk Mengulangi saat memutar lagu.',
    permission: ['Embed Links', 'View Channel','Send Messages','Connect', 'Speak', 'Add Reactions'],
    permissionUser: [],
    usage: 'loop',
    example: ['loop <one>', 'loop <all>', 'loop <off>'],
    run: async (chitanda, message, args) => {

    const { channel } = message.member.voice;
    if (!channel) {
      let embed = chitanda.util.embed()
      .setColor(chitanda.warna.Chitanda)
      .setAuthor('Kamu harus masuk kedalam saluran suara.')
      return message.channel.send(embed);
    }

    const serverQueue = chitanda.queue.get(message.guild.id);

    if (!serverQueue) {
      let embed = chitanda.util.embed()
      .setColor(chitanda.warna.Chitanda)
      .setAuthor('Tidak ada Antrian')
      return message.channel.send(embed);
    }
    
    const cm = ['single', 'track', 'one', 'song', 'current', 'all', 'every', 'queue', 'off', 'none', 'nothing']
    if (!args.join(' ') || !cm.includes(args.join(' '))) {
      let embed = chitanda.util.embed()
      .setColor(chitanda.warna.Chitanda)
      .setDescription(`❌ | loop tidak boleh kosong.. Tulis ${chitanda.prefixDB}${module.exports.example}`)
      message.channel.send(embed).then(async message => {
           message.delete({ timeout: 15000 });
  });
    }
      let loopMode
      if (cm.includes(args.join(' '))) {
        loopMode = aliases[args[0].toLowerCase()];
      }
    if (loopMode && modes.includes(loopMode)) {
    serverQueue.loop = modes.indexOf(loopMode);
    
      let embed = chitanda.util.embed()
    .setColor(chitanda.warna.Chitanda)
    .setDescription(serverQueue.loop === 0 ? "❌ | Mengulangi musik dinonaktifkan." : `✅ | Set loop to ${modes[serverQueue.loop]}.`)
    //.setThumbnail(client.user.displayAvatarURL())
    message.channel.send(embed)
      
    }
    
  }
}