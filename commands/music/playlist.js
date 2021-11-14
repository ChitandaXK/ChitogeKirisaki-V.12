const youtube = require('youtube-sr');

module.exports = {
    name: 'playlist',
    aliases: ['pl'],
    category: 'Music',
    description: 'memutar & menambahkan 20 playlist dari youtube.',
    permission: ['Embed Links', 'View Channel','Send Messages','Connect', 'Speak', 'Add Reactions'],
    permissionUser: [],
    usage: ['playlist <band song>', 'playlist <url>'],
    example: ['playlist linkin park', 'playlist https://www.youtube.com'],
    run: async (chitanda, message, args) => {
      
      const owner = [chitanda.ownerID, chitanda.ownerID2],
            ownGuild = [chitanda.guildID, chitanda.guildID2];
      if(ownGuild.includes(message.guild.id)) {
      if(owner.includes(message.author.id)) {
      
      //await message.react("✅")
      
 const channel = message.member.voice.channel;  

    if (!args.length) {
      await message.react("❌");
      let embed = chitanda.util.embed()
        .setColor(chitanda.warna.Chitanda)
        .setDescription(`Sign title song or ${chitanda.prefix}${module.exports.usage}`)
      return message.channel.send(embed).then(async message => {
           message.delete({ timeout: 15000 });
  });
    }
     
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

    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT")) {
      await message.react("❌");
      let embed = new chitanda.util.embed()
        .setColor(chitanda.warna.Chitanda)
        .setDescription(`Aku tidak punya akses \`Connect\` di channel ini.`)
        //.setDescription(`I'm not have for \`Connect\` Permission for this channel.`)
      return message.channel.send(embed).then(async message => {
           message.delete({ timeout: 15000 });
  });
    }
    if (!permissions.has("SPEAK")) {
      await message.react("❌");
      let embed = chitanda.util.embed()
        .setColor(chitanda.warna.Chitanda)
        .setDescription(`Aku tidak punya akses \`Speak\` di channel ini.`)
        //.setDescription(`I'm not have for \`Speak\` Permission for this channel.`)
      return message.channel.send(embed).then(async message => {
           message.delete({ timeout: 15000 });
  });
    }

    const search = args.join(" ");
    const pattern = /^.*(youtu.be\/|list=)([^#\&\?]*).*/gi;
    const url = args[0];
    const urlValid = pattern.test(args[0]);

    const serverQueue = message.client.queue.get(message.guild.id);
        
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

    let song = null;
    let playlist = null;
    let videos = [];

    /*if (urlValid) {
      try {
        playlist = await youtube.getPlaylist(url);
        videos = await playlist.getVideos()
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const results = await youtube.searchPlaylists(search, 1);
        playlist = results[0];
        videos = await playlist.getVideos(25);
      } catch (error) {
        console.error(error);
      }
    }*/
        
        
    if (urlValid) {
      try {
        let Videos = await youtube.YouTube.getPlaylist(url)
        videos = Videos.videos
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
        videos = await youtube.YouTube.search(search, { limit: 20 })
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
    }

    videos.forEach( async (Video) => {
      //const songData = await ytdl.getInfo(`https://www.youtube.com/watch?v=${video.id}`)
      //const results = await youtube.searchVideos(search, 1);
      
      const video = await youtube.YouTube.searchOne(`${Video.title}`)
      const videoId = `https://www.youtube.com/watch?v=${video.id}`;
        //const data = video.videos;
        //const finalData = []
        
      //let durate = convert(songData.videoDetails.lengthSeconds * 1000);
        
       function formatDuration(durationObj) {
    const duration = `${durationObj.hours ? (durationObj.hours + ':') : ''}${
      durationObj.minutes ? durationObj.minutes : '00'
    }:${
      (durationObj.seconds < 10)
        ? ('0' + durationObj.seconds)
        : (durationObj.seconds
        ? durationObj.seconds
        : '00')
    }`;
    return duration;
  }
      //const videoId = songData.videoDetails.videoId;
        //let vid
        //if (songData.videoDetails.thumbnails[4] == undefined) {
          //vid = songData.videoDetails.thumbnails[3].url
        //} else {
          //vid = songData.videoDetails.thumbnails[4].url
        //}
        //let Duration = formatDuration(durate)
        //if (Duration == '00:00') Duration = 'Live Stream';
        //let duration = formatDuration(Video.duration);
        //if (duration == '00:00') duration = 'Live Stream';
        let duration = video.durationFormatted;
        if (duration == '0:00') duration = `:red_circle: Live Stream`;
        //for(let i = 0; i < data.length; i++){
      song = {
          //title: songData.videoDetails.title,
          //channel:songData.videoDetails.author.name,
          //url: songData.videoDetails.video_url,
          //duration: Duration,
          //rawDuration: songData.videoDetails.lengthSeconds,
          //id: songData.videoDetails.videoId,
          //thumbnail: vid, //songData.videoDetails.thumbnails[4].url, //`https://i.ytimg.com/vi/${song.id}/hqdefault.jpg`,
          //thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
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
        //}
      if (serverQueue) {
        serverQueue.songs.push(song);
        if(channel.id !== serverQueue.channel.id) {
        let embed = chitanda.util.embed()
        .setColor(chitanda.warna.Chitanda)
        .setDescription('Kamu harus masuk dalam saluran suara denganku!')
        //.setDescription('You need join same voice channel with me!')
      return message.channel.send(embed).then(async message => {
           message.delete({ timeout: 15000 });
  });
      }
        message.channel
            .send(`✅ **${song.title}**  telah dimasukkan ke daftar musik [${message.author}]`)
            //.send(`✅ **${song.title}** has been added to the queue by ${message.author}`)
            .catch(console.error);
      } else {
        queueConstruct.songs.push(song);
      }
    });

    
    if (!serverQueue) message.client.queue.set(message.guild.id, queueConstruct);
    
    if (!serverQueue) {
      try {
        const connection = await channel.join();
        queueConstruct.connection = connection;
        message.guild.me.voice.setSelfDeaf(true)
        chitanda.musicManager.play(queueConstruct.songs[0], chitanda, message).then(await message.react('✅'));
      } catch (error) {
        await message.react("❌");
        console.error(`Could not join voice channel: ${error}`);
        message.client.queue.delete(message.guild.id);
        await channel.leave();
        return message.channel.send(`Could not join the channel: ${error}`).catch(console.error);
      }
    }
    }
}
    }
}