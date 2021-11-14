//const createBar = require("string-progressbar");

module.exports = {
    name: 'nowplaying',
    aliases: ['np-song', 'np'],
    category: 'Music',
    description: 'Untuk Menampilan Lagu yang diputar.',
    permission: ['Embed Links', 'View Channel','Send Messages','Connect', 'Speak', 'Add Reactions'],
    permissionUser: [],
    usage: ['np'],
    example: ['np'],
    run: async (chitanda, message, args) => {
      
    const serverQueue = chitanda.queue.get(message.guild.id);
    if (!serverQueue) {
      let embed = chitanda.util.embed()
        .setColor(chitanda.warna.Chitanda)
        .setDescription('Tidak ada lagu yg di antrian.')
      return message.channel.send(embed).then(async message => {
           message.delete({ timeout: 15000 });
  });
    }
        
        //try{

    const video = serverQueue.songs[0];
    let description;
    if (video.duration == 'Live Stream') {
      description = 'Siaran Langsung';
      //description = 'Live Stream';
    } else {
      description = playbackBar(message, video);
    }
      const pict = 'https://cdn.discordapp.com/emojis/661059635687718932.gif?v=1';
      const videoEmbed = chitanda.util.embed()
      .setAuthor(`${chitanda.user.username} Sekarang Memutar`, pict)
      .setColor(chitanda.warna.Chitanda) //#cce7e8
      .setTitle(video.title)
      .setTimestamp()
      .setDescription(description);
      message.channel.send(videoEmbed);
   //} catch (e) {
      //message.say('Are u sure, you already play some song?')
  //}
    return;
  }
    }
  function playbackBar(message, video) {
    const passedTimeInMS = message.client.queue.get(message.guild.id).connection.dispatcher.streamTime;
    const passedTimeInMSObj = {
      seconds: Math.floor((passedTimeInMS / 1000) % 60),
      minutes: Math.floor((passedTimeInMS / (1000 * 60)) % 60),
      hours: Math.floor((passedTimeInMS / (1000 * 60 * 60)) % 24),
    };
    const passedTimeFormatted = formatDuration(
      passedTimeInMSObj
    );

    const totalDurationObj = video.rawDuration;//waktu;//video.rawDuration;
    const totalDurationFormatted = video.duration;//formatDuration(
      //totalDurationObj
    //);
    
    let totalDurationInMS = totalDurationObj;
    /*let totalDurationInMS = 0;
    Object.keys(totalDurationObj).forEach(function(key) {
      if (key == 'hours') {
        totalDurationInMS = totalDurationInMS + totalDurationObj[key] * 3600000;
      } else if (key == 'minutes') {
        totalDurationInMS = totalDurationInMS + totalDurationObj[key] * 60000;
      } else if (key == 'seconds') {
        totalDurationInMS = totalDurationInMS + totalDurationObj[key] * 100;
      }
    });*/
    
    const playBackBarLocation = Math.round(
      (passedTimeInMS / totalDurationInMS) * 10
    );
    let playBack = '';
    for (let i = 1; i < 20; i++) {
      if (playBackBarLocation == 0) {
        playBack = '🟡▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬';
        break;
      } else if (playBackBarLocation == 10) {
        playBack = '▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬🟡';
        break;
      } else if (i == playBackBarLocation * 2) {
        playBack = playBack + '🟡';
      } else {
        playBack = playBack + '▬';
      }
    }
    playBack = `${passedTimeFormatted}  ${playBack}  ${totalDurationFormatted}`;
    return playBack;
  }
  // prettier-ignore
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