const react = ["◀", "▶"];

module.exports = {
    name: 'queue',
    aliases: ['song-list', 'q'],
    category: 'Music',
    description: 'Menampilkan list lagu di antrian.',
    permission: ['Embed Links', 'View Channel','Send Messages','Connect', 'Speak', 'Add Reactions'],
    permissionUser: [],
    usage: ['queue'],
    example: ['queue'],
    run: async (chitanda, message, args) => {

    let embed = chitanda.util.embed().setColor(chitanda.warna.Chitanda);
    const { channel } = message.member.voice;

    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      embed.setAuthor('Kamu harus masuk kedalam saluran suara.')
      return message.channel.send(embed);
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      embed.setAuthor("Tidak ada Antrian");
      return message.channel.send(embed);
    }

    let MUSIC = message.client.queue.get(message.guild.id).songs[0];
    let music = []
    music = message.client.queue.get(message.guild.id);
    music = music.songs.map((song, index) => `:small_blue_diamond: **${index + 1}. [${song.duration}] [${song.title.length > 30 ? `${song.title.substr(0,30)}...` : song.title}](${song.url})**`)
        music = chitanda.util.chunk(music, 10);
        let index = 0;
      
      //for (let i = 0; i < array.length; i += chunkSize) {
      			//temp.push(array.slice(i, i + chunkSize));
      
      let repet;
      if (serverQueue.loop == 1) {
        repet = '1 List';
      } else if (serverQueue.loop == 2) {
        repet = 'Semua List'
      } else if (serverQueue.loop == 0) {
        repet = 'Tidak'
      }
      let paus;
      if (serverQueue.playing == true) {
        paus = 'Tidak';
      } else if (serverQueue.playing == false) {
        paus = 'Ya';
      }
      
      if (music.length == 1) {
        const queue = chitanda.util.embed()
        .setTitle(`List Musik di Server ${message.guild.name}`)
        .setThumbnail(message.guild.iconURL({size: 2048, dynamic: true}))
        .setColor(chitanda.warna.Chitanda)
        .setDescription(`${music[index].join("\n")}\n:satellite: **Musik yg saat ini di putar\n[${MUSIC.title}](${MUSIC.url}) [${MUSIC.duration}]\nRequest dari:** ${message.guild.members.cache.get(MUSIC.playUser).user.tag}`)
        .addField(':star: Total List', `${serverQueue.songs.length} Musik`, true)
        .addField(':level_slider: Repeat / Pause', `${repet} / ${paus}`, true)
        .addField(':mega: Di putar di', `${serverQueue.channel.name}`, true)
        .setFooter(`Page ${index + 1} of ${music.length}`);
        message.channel.send(queue);
      } else {
        const queue = chitanda.util.embed()
        .setTitle(`List Musik di Server ${message.guild.name}`)
        .setThumbnail(message.guild.iconURL({size: 2048, dynamic: true}))
        .setColor(chitanda.warna.Chitanda)
        .setDescription(`${music[index].join("\n")}\n:satellite: **Musik yg saat ini di putar\n[${MUSIC.title}](${MUSIC.url}) [${MUSIC.duration}]\nRequest dari:** ${message.guild.members.cache.get(MUSIC.playUser).user.tag}`)
        .addField(':star: Total List', `${serverQueue.songs.length} Musik`, true)
        .addField(':level_slider: Repeat / Pause', `${repet} / ${paus}`, true)
        .addField(':mega: Di putar di', `${serverQueue.channel.name}`, true)
        .setFooter(`Page ${index + 1} of ${music.length}`);
        function awaitReactions(m) {
        const filter = (rect, usr) => react.includes(rect.emoji.name) && usr.id === message.author.id;
        m.createReactionCollector(filter, { max: 1 })
        .on("collect", col => {
          const emo = col.emoji.name;
          if (emo === react[0]) { index--;
            m.reactions.resolve(react[0]).users.remove(message.author.id)
            }
          if (emo === react[1]) { index++;
            m.reactions.resolve(react[1]).users.remove(message.author.id)                     
            }
          index = ((index % music.length) + music.length) % music.length;
          queue.setDescription(`${music[index].join("\n")}\n:satellite: **Musik yg saat ini di putar\n[${MUSIC.title}](${MUSIC.url}) [${MUSIC.duration}]\nRequest dari:** ${message.guild.members.cache.get(MUSIC.playUser).user.tag}`)
          queue.setFooter(`Page ${index + 1} of ${music.length}`);
          m.edit(queue);
          return awaitReactions(m);
        });
    }
    const thisMess = await message.channel.send(queue);
    for (const r of react) {
      await thisMess.react(r);
    }
    return awaitReactions(thisMess);
    }
  }
};
