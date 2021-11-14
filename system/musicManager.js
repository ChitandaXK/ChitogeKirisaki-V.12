//const { MessageEmbed } = require("discord.js")
//const ytdl = require('ytdl-core');
//const ytdl = require('discord-ytdl-core');
let playingMessage

module.exports = {
  async play(song, chitanda, message, filters) {
    
    const queue = chitanda.queue.get(message.guild.id);
    
    if (!song) {
      queue.channel.leave();
      chitanda.queue.delete(message.guild.id);
      let embed = chitanda.util.embed()
        .setColor(chitanda.warna.Chitanda)
        .setDescription("✔ | Antrian telah selesai, tambahkan lagu lagi untuk memutar :)")
      //embed.setDescription("✔ | Im leaving, because the song has ended :)")
      return queue.textChannel
        .send(embed)
        .catch(console.error);
    }

    let seekTime = 0;
    let oldSeekTime = queue.realseek;
    let encoderArgs;
    if (filters === "remove") {
        queue.filters = ['-af','dynaudnorm=f=200'];
        encoderArgs = queue.filters;
        //try{
          seekTime = (queue.connection.dispatcher.streamTime - queue.connection.dispatcher.pausedTime) / 1000// + oldSeekTime;
        //} catch{
          //seekTime = 0;
        //} 
          queue.realseek = seekTime;
    } else if (filters) {
      //try{
        seekTime = (queue.connection.dispatcher.streamTime - queue.connection.dispatcher.pausedTime) / 1000// + oldSeekTime;
      //} catch{
        //seekTime = 0;
      //} 
        queue.realseek = seekTime;
        queue.filters.push(filters)
        encoderArgs = ['-af', queue.filters]
    }
    
    if (filters || filters === 'remove') {
      const stream = await chitanda.dytdl(song.url,{
              
              filter: 'audioonly',
              quality: "highestaudio",
              encoderArgs: encoderArgs,
              opusEncoded: true,
              seek: seekTime,
              highWaterMark: 1 << 25,
              bitrate: 320
            });
    
    queue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id));
    
    const dispatcher = queue.connection
      .play(
            stream, { 
             type: 'opus',
             bitrate: 'auto'
            //ytdl(song.url, {
              //quality: 'highestaudio',
              //highWaterMark: 1 << 25, //1024 * 1024 * 10
              //type: "opus"
            })
          //)
    
         .on("finish", () => {
           //playingMessage.reactions.removeAll().catch(console.error);
        if (playingMessage && !playingMessage.deleted) {
          playingMessage.delete({ timeout: 3000 }).catch(console.error);
        }
        if (queue.loop === 1) {
          queue.songs.unshift(queue.songs[0]);
          module.exports.play(queue.songs[0], message);
          queue.songs.splice(0, 1)
        } else
        if (queue.loop === 2) {
          let lastsong = queue.songs.shift();
          queue.songs.push(lastsong);
          module.exports.play(queue.songs[0], message);
        } else {
          queue.songs.shift();
          module.exports.play(queue.songs[0], message);
        }
      })
      .on("error", (err) => {
        console.error(err);
        queue.songs.shift();
        module.exports.play(queue.songs[0], message);
      });
      
    }
      
    
    if (!filters) {

    //try {
      //var stream = await ytdlDiscord(song.url, {
        //highWaterMark: 1 << 25
      //});
    //} catch (error) {
      //if (queue) {
        //queue.songs.shift();
        //module.exports.play(queue.songs[0], message);
      //}

     //if (error.message.includes === "copyright") {
        //return message.channel.send("THIS VIDEO CONTAINS COPYRIGHT CONTENT");
      //} else {
        //console.error(error);
      //}
    //}
      if (queue.filters.length < 1) {
        encoderArgs = []
      } else {
    encoderArgs = ['-af', queue.filters]
      }
    const stream = await chitanda.dytdl(song.url,{
              
              filter: 'audioonly',
              quality: "highestaudio",
              encoderArgs: encoderArgs,
              opusEncoded: true,
              seek: seekTime,
              highWaterMark: 1 << 25,
              bitrate: 320
            });
    
    queue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id));
    
    const dispatcher = queue.connection
      .play(
            stream, { 
             type: 'opus',
             bitrate: 'auto'
            //ytdl(song.url, {
              //quality: 'highestaudio',
              //highWaterMark: 1 << 25, //1024 * 1024 * 10
              //type: "opus"
            })
          //)
    
         .on("finish", () => {
           //playingMessage.reactions.removeAll().catch(console.error);
        if (playingMessage && !playingMessage.deleted) {
          playingMessage.delete({ timeout: 3000 }).catch(console.error);
        }
        if (queue.loop === 1) {
          queue.songs.unshift(queue.songs[0]);
          module.exports.play(queue.songs[0], chitanda, message);
          queue.songs.splice(0, 1)
        } else
        if (queue.loop === 2) {
          let lastsong = queue.songs.shift();
          queue.songs.push(lastsong);
          module.exports.play(queue.songs[0], chitanda, message);
        } else {
          queue.songs.shift();
          module.exports.play(queue.songs[0], chitanda, message);
        }
      })
      .on("error", (err) => {
        console.error(err);
        queue.songs.shift();
        module.exports.play(queue.songs[0], message);
      });
    
    const serverQueue = message.client.queue.get(message.guild.id);
    dispatcher.setVolumeLogarithmic(queue.volume / 100); //VOLUME
    
    try {
      let videoEmbed = chitanda.util.embed()
      .setTitle('🎵 | Memutar Musik')
    //.setTitle('🎵 | Playing')
    //.setThumbnail(song.thumbnail)
    .setImage(song.thumbnail)
    .setDescription(`**[${song.title}](${song.url}) [${song.duration}] [<@${song.playUser}>]**`)
    //.setTimestamp()
    .setColor(chitanda.warna.Chitanda)
    .setFooter(`Source : ${song.channel}`)
    if (queue.songs[1]) videoEmbed.addField('Musik selanjutnya:', queue.songs[1].title)
    //if (queue.songs[1]) videoEmbed.addField('Next Song:', queue.songs[1].title)
       playingMessage = await queue.textChannel.send(videoEmbed)
       await playingMessage.react("⏭")
       await playingMessage.react("⏸")
       await playingMessage.react("▶")
       await playingMessage.react("🔂")
       await playingMessage.react("🔁")
       await playingMessage.react("⏹")
      //.then(msg => {
                //msg.react("⏭").then( r => {
                //msg.react("⏸")
                //msg.react("▶") // 🔄
                //msg.react("🔄") // ⏹
                //msg.react("⏹") // ❌
      } catch (error) {
      console.error(error);
    }
    //}
      
      const filter = (reaction, user) => user.id !== message.client.user.id;
    var collector = playingMessage.createReactionCollector(filter, {
      time: song.rawDuration > 0 ? song.rawDuration + 30000 : 20000000
    });

    collector.on("collect", async (reaction, user) => {
      if (!queue) return;
      const member = message.guild.member(user);

      switch (reaction.emoji.name) {
        case "⏭":
          queue.playing = true;
          reaction.users.remove(user).catch(console.error);
          if (member.voice.channel !== member.guild.me.voice.channel) return;
          //if (!kirisaki.nkm.canModifyQueue(member)) return;
          queue.connection.dispatcher.end();
          queue.textChannel.send(`${user.username} ⏩ Melompati Antian musik`).then(async message => {
            message.delete({ timeout: 3000 });
            }).catch(console.error);
          collector.stop();
          break;

        /*case "⏯":
          reaction.users.remove(user).catch(console.error);
          if (!kirisaki.nkm.canModifyQueue(member)) return;
          if (queue.playing) {
            queue.playing = !queue.playing;
            queue.connection.dispatcher.pause(true);
            queue.textChannel.send(`${user.username} ⏸ Menjeda Musik.`).then(async message => {
            message.delete({ timeout: 3000 });
            }).catch(console.error);
          } else {
            queue.playing = !queue.playing;
            queue.connection.dispatcher.resume();
            queue.textChannel.send(`${user.username} ▶ Melanjutkan Musik!`).then(async message => {
            message.delete({ timeout: 3000 });
            }).catch(console.error);
          }
          break;*/
          
        case "⏸":
          reaction.users.remove(user).catch(console.error);
          if (member.voice.channel !== member.guild.me.voice.channel) return;
          //if (!kirisaki.nkm.canModifyQueue(member)) return;
          if (queue.playing) {
            queue.playing = !queue.playing;
            queue.connection.dispatcher.pause(true);
            queue.textChannel.send(`${user.username} ⏸ Menjeda Musik.`).then(async message => {
            message.delete({ timeout: 3000 });
            }).catch(console.error);
          }
          break;
          
        case "▶":
          reaction.users.remove(user).catch(console.error);
          if (member.voice.channel !== member.guild.me.voice.channel) return;
          //if (!kirisaki.nkm.canModifyQueue(member)) return;
            queue.playing = !queue.playing;
            queue.connection.dispatcher.resume();
            queue.textChannel.send(`${user.username} ▶ Melanjutkan Musik!`).then(async message => {
            message.delete({ timeout: 3000 });
            }).catch(console.error);
          break;

        /*case "🔇":
          reaction.users.remove(user).catch(console.error);
          if (!kirisaki.nkm.canModifyQueue(member)) return;
          if (queue.volume <= 0) {
            queue.volume = 100;
            queue.connection.dispatcher.setVolumeLogarithmic(100 / 100);
            queue.textChannel.send(`${user} 🔊 unmuted the music!`).then(async message => {
            message.delete({ timeout: 3000 });
            }).catch(console.error);
          } else {
            queue.volume = 0;
            queue.connection.dispatcher.setVolumeLogarithmic(0);
            queue.textChannel.send(`${user} 🔇 muted the music!`).then(async message => {
            message.delete({ timeout: 3000 });
            }).catch(console.error);
          }
          break;

        case "🔉":
          reaction.users.remove(user).catch(console.error);
          //if (!kirisaki.nkm.canModifyQueue(member)) return;
          if (queue.volume - 10 <= 0) queue.volume = 0;
          else queue.volume = queue.volume - 10;
          queue.connection.dispatcher.setVolumeLogarithmic(queue.volume / 100);
          queue.textChannel
            .send(`${user} 🔉 decreased the volume, the volume is now ${queue.volume}%`).then(async message => {
            message.delete({ timeout: 3000 });
            })
            .catch(console.error);
          break;

        case "🔊":
          reaction.users.remove(user).catch(console.error);
          if (!kirisaki.nkm.canModifyQueue(member)) return;
          if (queue.volume + 10 >= 100) queue.volume = 100;
          else queue.volume = queue.volume + 10;
          queue.connection.dispatcher.setVolumeLogarithmic(queue.volume / 100);
          queue.textChannel
            .send(`${user} 🔊 increased the volume, the volume is now ${queue.volume}%`).then(async message => {
            message.delete({ timeout: 3000 });
            })
            .catch(console.error);
          break;*/

        case "🔂":
          reaction.users.remove(user).catch(console.error);
          if (member.voice.channel !== member.guild.me.voice.channel) return;
          //if (!kirisaki.nkm.canModifyQueue(member)) return;
          if (queue.loop === 0 || queue.loop === 2){
            serverQueue.loop = 1;
          } else {
            serverQueue.loop = 0;
          }
          queue.textChannel.send(`${user.username} ${serverQueue.loop ? "🔂 Mengulangi 1 musik diaktif" : "❌ Mengulangi 1 musik di nonaktifkan"}`).then(async message => {
            message.delete({ timeout: 3000 });
            }).catch(console.error);
          break;
          
        case "🔁":
          reaction.users.remove(user).catch(console.error);
          if (member.voice.channel !== member.guild.me.voice.channel) return;
          //if (!kirisaki.nkm.canModifyQueue(member)) return;
          if (queue.loop === 0 || queue.loop === 1){
            serverQueue.loop = 2;
          } else {
            serverQueue.loop = 0;
          }
          queue.textChannel.send(`${user.username} ${serverQueue.loop ? "🔄 Mengulangi semua musik diaktif" : "❌ Mengulangi semua musik di nonaktifkan"}`).then(async message => {
            message.delete({ timeout: 3000 });
            }).catch(console.error);
          break;

        case "⏹":
          reaction.users.remove(user).catch(console.error);
          if (member.voice.channel !== member.guild.me.voice.channel) return;
          //if (!kirisaki.nkm.canModifyQueue(member)) return;
          queue.songs = [];
          queue.textChannel.send(`⏹ Meninggalkan saluran suara!`).then(async message => {
            message.delete({ timeout: 3000 });
            }).catch(console.error);
          try {
            queue.connection.dispatcher.end();
          } catch (error) {
            console.error(error);
            queue.connection.disconnect();
          }
          collector.stop();
          break;

        default:
          reaction.users.remove(user).catch(console.error);
          break;

          /*case "🔀":
        reaction.users.remove(user).catch(console.error);
        if (!queue)
            return message.channel
                  .send("There is no queue.").then(async message => {
            message.delete({ timeout: 3000 });
            })
                  .catch(console.error);
          if (!kirisaki.nkm.canModifyQueue(member)) return;
          let songs = queue.songs;
          queue.songs = songs;
          for (let i = songs.length - 1; i > 1; i--) {
              let j = 1 + Math.floor(Math.random() * i);
              [songs[i], songs[j]] = [songs[j], songs[i]];
          }
          message.client.queue.set(message.guild.id, queue);
          queue.textChannel
            .send(`${user} 🔀 Shuffled The Queue.`).then(async message => {
            message.delete({ timeout: 3000 });
            })
            .catch(console.error);
          break;*/

      }
    });

    //collector.on("end", () => {
      //playingMessage.reactions.removeAll().catch(console.error);
      //if (playingMessage && !playingMessage.deleted) {
        //playingMessage.delete({ timeout: 3000 }).catch(console.error);
      //}
    //});

    queue.connection.on("finish", () => {
           //playingMessage.reactions.removeAll().catch(console.error);
        if (playingMessage && !playingMessage.deleted) {
          playingMessage.delete({ timeout: 3000 }).catch(console.error);
        }
    });
    }
      
                /*var backwardsFilter = (reaction, user) => reaction.emoji.name === "▶" && user.id === message.author.id;
                var fowardsFilter = (reaction, user) => reaction.emoji.name === "⏸" && user.id === message.author.id;
                var trackFilter = (reaction, user) => reaction.emoji.name === "🔂" && user.id === message.author.id;
                var loopFilter = (reaction, user) => reaction.emoji.name === "🔄" && user.id === message.author.id;
                var stopFilter = (reaction, user) => reaction.emoji.name === "⏭" && user.id === message.author.id;
                var nextFilter = (reaction, user) => reaction.emoji.name === "⏹" && user.id === message.author.id;
                var backwards = playingMessage.createReactionCollector(backwardsFilter);
                var fowards = playingMessage.createReactionCollector(fowardsFilter);
                var tracks = playingMessage.createReactionCollector(trackFilter);
                var loops = playingMessage.createReactionCollector(loopFilter);
                var stop = playingMessage.createReactionCollector(stopFilter);
                var next = playingMessage.createReactionCollector(nextFilter)
                
        
        backwards.on("collect", r => {
            serverQueue.connection.dispatcher.resume();
            playingMessage.reactions.resolve("▶").users.remove(message.author.id)
            message.channel.send("▶ Melanjutkan musik").then(async message => {
            //message.channel.send("▶ Resumed").then(async message => {
            message.delete({ timeout: 3000 });
           })
        })

        fowards.on("collect", r => {
            serverQueue.connection.dispatcher.pause();
            playingMessage.reactions.resolve("⏸").users.remove(message.author.id)
            message.channel.send("⏸ Menjeda musik").then(async message => {
            //message.channel.send("⏸ Song Paused").then(async message => {
            message.delete({ timeout: 3000 });
            })
        })
        stop.on("collect", r => {
            serverQueue.connection.dispatcher.end();
            playingMessage.reactions.resolve("⏭").users.remove(message.author.id)
            message.channel.send("⏭ Memberhentikan musik!").then(async message => {
            //message.channel.send("⏭ Song Stopped").then(async message => {
            message.delete({ timeout: 3000 });
            })
        })
        tracks.on("collect", r => {
          if (queue.loop === 0 || queue.loop === 2){
            serverQueue.loop = 1;
          } else {
            serverQueue.loop = 0;
          }
          playingMessage.reactions.resolve("🔂").users.remove(message.author.id)
          message.channel.send(`${serverQueue.loop ? "🔂 Mengulangi 1 musik diaktif" : "❌ Mengulangi 1 musik di nonaktifkan"}`).then(async message => {
          //message.channel.send(`${serverQueue.loop ? "🔄 Song Looped" : "❌ Song not Looped"}`).then(async message => {
          message.delete({ timeout: 3000 });
          })
        })
        loops.on("collect", r => {
          if (queue.loop === 0 || queue.loop === 1){
            serverQueue.loop = 2;
          } else {
            serverQueue.loop = 0;
          }
          playingMessage.reactions.resolve("🔄").users.remove(message.author.id)
          message.channel.send(`${serverQueue.loop ? "🔄 Mengulangi semua musik diaktif" : "❌ Mengulangi semua musik di nonaktifkan"}`).then(async message => {
          //message.channel.send(`${serverQueue.loop ? "🔄 Song Looped" : "❌ Song not Looped"}`).then(async message => {
          message.delete({ timeout: 3000 });
          })
        })
        next.on("collect", r => {
          serverQueue.songs.splice(0)
          serverQueue.connection.dispatcher.end()
          playingMessage.reactions.resolve("⏹").users.remove(message.author.id)
          message.channel.send("⏹ Meninggalkan saluran suara").then(async message => {
          //message.channel.send("⏹ Im leaving").then(async message => {
          message.delete({ timeout: 3000 });
          })
      })
        //})

        //})
    } catch (error) {
      console.error(error);
    }
      }*/  
    
    //queue.textChannel
      //.send(embed)
      //.catch(err => message.channel.send("UNABLE TO PLAY SONG"));
  }
};