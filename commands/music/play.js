const moment = require('moment');
const youtube = require('youtube-sr');

module.exports = {
    name: 'play',
    aliases: ['p', 'add'],
    category: 'Music',
    description: 'Memutar semua lagu di youtube.',
    permission: ['Embed Links', 'View Channel','Send Messages','Connect', 'Speak', 'Add Reactions'],
    permissionUser: [],
    usage: ['play <nama lagu>', 'play <url lagu>'],
    example: ['play linkin park numb', 'play https://www.youtube.com'],
    run: async (chitanda, message, args) => {
      
    //await message.react("✅")
    

    let embed = chitanda.util.embed()
    .setColor(chitanda.warna.Chitanda)

    //FIRST OF ALL WE WILL ADD ERROR MESSAGE AND PERMISSION MESSSAGE
    if (!args.length) {
      //IF AUTHOR DIDENT GIVE URL OR NAME
      await message.react("❌");
      embed.setAuthor(`Tulis judul lagu!! Contoh: ${chitanda.prefixDB}${module.exports.example[0]}, ${chitanda.prefixDB}${module.exports.example[1]}`)
      return message.channel.send(embed);
    }
      
    const channel = message.member.voice.channel;   
    if (!channel) {
      await message.react("❌");
      let embed = chitanda.util.embed()
        .setColor(chitanda.warna.Chitanda)
        .setDescription('Kamu harus masuk kedalam saluran suara.')
        //.setDescription('Please enter a voice channel first.')
      return message.channel.send(embed).then(async message => {
           message.delete({ timeout: 15000 });
  });
    }
      
    if (!message.guild.me.hasPermission(['CONNECT', 'SPEAK', 'VIEW_CHANNEL', 'SEND_MESSAGES'])) {
      await message.react("❌");
      let embed = chitanda.util.embed()
        .setColor(chitanda.warna.Chitanda)
        .setDescription(`Aku tidak punya akses \`Connect\`, \`Speak\`, \`View Channel\`, \`Send Message\` di channel ini.`)
        //.setDescription(`I'm not have for \`Connect\`, \`Speak\`, \`View Channel\` Permission for this channel.`)
      return message.channel.send(embed).then(async message => {
           message.delete({ timeout: 15000 });
  });
    }

    //WE WILL ADD PERMS ERROR LATER :(

    const search = args.join(" ");
    const videoPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
    const playlistPattern = /^.*(list=)([^#\&\?]*).*/gi; // /^.*(youtu.be\/|list=)([^#\&\?]*).*/gi;
    const url = args[0];
    const urlcheck = videoPattern.test(args[0]);

    // Start the playlist if playlist url was provided
    if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
      return chitanda.commands.get("playlist").run(chitanda, message, args);
    }
    //if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
      //return client.commands.get("playlist").run(client, message, args);
      //embed.setAuthor("I am Unable To Play Playlist for now")
      //return message.channel.send(embed);
    //}

    const serverQueue = chitanda.queue.get(message.guild.id);

    const queueConstruct = {
      textChannel: message.channel,
      channel,
      connection: null,
      songs: [],
      loop: 0,
      volume: 100,
      additionalStreamTime: 0,
      filters: [],
      playing: true
    };
    
    //const voteConstruct = {
      //vote: 0,
      //voters: []
    //}

    let songData = null;
    let song = null;

    if (urlcheck) {
      try {
        const results = await youtube.YouTube.searchOne(url);
        const video = results;
        const videoId = `https://www.youtube.com/watch?v=${results.id}`;
        
        
        let duration = video.durationFormatted;
        if (duration == '0:00') duration = `:red_circle: Live Stream`;
        song = {
          playUser: message.author.id,
          title: video.title,
          url: videoId,
          channel: video.channel.name,
          channelUrl: video.channel.url,
          duration,
          rawDuration: video.duration,
          id: video.id,
          thumbnail: `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,
          uploader: video.uploadedAt,
          views: video.views,
          icon: video.channel.icon.url
        };
      } catch (error) {
        await message.react("❌");
        if (error.statusCode === 403) {
          return message
            .reply(message, "Max. uses of api Key, please refresh!")
            .catch(console.error);
        } if (error.statusCode === 404) {
          return message
            .reply(message, "Maintenance!")
            .catch(console.error);
        } else {
          console.error(error);
        }
      }
    } else {
          
      try {
        const results = await youtube.YouTube.searchOne(search);
        const video = results;
        const videoId = `https://www.youtube.com/watch?v=${results.id}`;
        
        
        let duration = video.durationFormatted;
        if (duration == '0:00') duration = `:red_circle: Live Stream`;
        song = {
          playUser: message.author.id,
          title: video.title,
          url: videoId,
          channel: video.channel.name,
          channelUrl: video.channel.url,
          duration,
          rawDuration: video.duration,
          id: video.id,
          thumbnail: `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,
          uploader: video.uploadedAt,
          views: video.views,
          icon: video.channel.icon.url
        };
      } catch (error) {
        await message.react("❌");
        if (error.statusCode === 403) {
          return message
            .reply(message, "Max. uses of api Key, please refresh!")
            .catch(console.error);
        } if (error.statusCode === 404) {
          return message
            .reply(message, "Maintenance!")
            .catch(console.error);
        } else {
          console.error(error);
        }
      let embed = chitanda.util.embed()
        .setColor(chitanda.warna.Error)
        .setDescription(`sedang Maintenance`)//('Not Found song with a matching title.')
      return message.channel.send(embed).then(async message => {
           message.delete({ timeout: 15000 });
  });
    }
      
        //return message.reply("No video was found with a matching title").catch(console.error);
        //if(error.errors[0].domain === "usageLimits") {
         //return message.channel.send("Your YT API limit is over and it will be restored under 24 hours")
        //}
      //}
    }

    if (serverQueue) {
        //return if member voice not same as bot
      if(channel.id !== serverQueue.channel.id) {
        await message.react("❌");
        let embed = chitanda.util.embed()
        .setColor(chitanda.warna.Chitanda)
        .setDescription('Kamu harus masuk dalam saluran suara denganku!')
        //.setDescription('You need join same voice channel with me!')
      return message.channel.send(embed).then(async message => {
           message.delete({ timeout: 15000 });
  });
      }
        //if(serverQueue.songs.length > Math.floor(QUEUE_LIMIT - 1) && QUEUE_LIMIT !== 0) {
      //return message.channel.send(`You can not add songs more than ${QUEUE_LIMIT} in queue`)
    //}
      
    await message.react("✅");
      serverQueue.songs.push(song);
      let embed = chitanda.util.embed()
        .setColor(chitanda.warna.Chitanda)
        //.setAuthor("Added New Song To Queue", client.user.displayAvatarURL())
        //.setDescription(`**[${song.title}](${song.url})** \n[${message.author}]`) // [${song.duration}]
        .setTitle('✅ Sukses Menambahkan Antrian')
        //.setTitle('✅ Success')
        .setDescription(`**[${song.title}](${song.url}) [${song.duration}]** [${message.author}] added to queue`)
        .setThumbnail(song.thumbnail)
        //.addField('Source:', song.channel)
        .setFooter(`Source: ${song.channel}`) // Likes: ${songData.videoDetails.likes} Dislikes: ${songData.videoDetails.dislikes}
      
      return serverQueue.textChannel
        .send(embed)
        .catch(console.error);
    } else {
      queueConstruct.songs.push(song);
    }

    if (!serverQueue)
      chitanda.queue.set(message.guild.id, queueConstruct);
       //client.vote.set(message.guild.id, voteConstruct);
    if (!serverQueue) {
      try {
        queueConstruct.connection = await channel.join();
        message.guild.me.voice.setSelfDeaf(true)
        chitanda.musicManager.play(queueConstruct.songs[0], chitanda, message).then(await message.react('✅'));
      } catch (error) {
        console.error(`Could not join voice channel: ${error}`);
        chitanda.queue.delete(message.guild.id);
        await channel.leave();
        return message.channel
          .send({
            embed: {
              description: `😭 | Could not join the channel: ${error}`,
              color: chitanda.warna.Error
            }
          })
          .catch(console.error);
      }
    }
      
    //sending title music my channel
  const owner = [chitanda.ownerID, chitanda.ownerID2]
      if(!owner.includes(message.author.id)) {
if (args.join(" ")) {
      const text  = args.join(" ");
      const kirim = chitanda.channels.cache.find(c => c.id === chitanda.channelMUSIC);
      let embed = chitanda.util.embed()
        .setColor(chitanda.warna.Chitanda)
        .setAuthor(`Command Play`)
        .setDescription(`•》<@${message.author.id}> / ${message.author.tag}\n•》in Guild : **${message.guild.name} (${message.guild.id})**\n•》Channel : **${message.channel.name} (${message.channel.id}**\n•》Title : **${text}**`)
      kirim.send(embed)  
}
  }
      
  }
};