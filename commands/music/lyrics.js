const cheerio = require('cheerio');
const lyricsFinder = require('lyrics-finder');
const fetch = require('node-fetch');
const { geniusLyricsAPI } = (process.env); //ur own apiKEY
const GeniusLyricsAPI = geniusLyricsAPI;

module.exports = {
    name: 'lyrics',
    aliases: ['ly'],
    category: 'Music',
    description: 'Menampilkan Lirik Lagu.',
    permission: ['Embed Links', 'View Channel','Send Messages','Connect', 'Speak', 'Add Reactions'],
    permissionUser: [],
    usage: ['lyrics <Nama Band Judul lagu>'],
    example: ['lyrics linkin park numb'],
    run: async (chitanda, message, args) => {
    
      
    //if(!args[0]) {
    //let embed = chitanda.util.embed()
      //.setColor(chitanda.warna.Chitanda)
      //.setDescription(`Tulis Nama Band Judul Lagu. Contoh : \`${chitanda.prefixDB}${module.exports.example}\``)
    //return message.channel.send(embed).then(async message => {
           //message.delete({ timeout: 15000 });
  //});
  //}
      
    
      let singer;
      let song;
      //let pages = [];
      //let current  = 0;
      
      const filter = msg => msg.author.id == message.author.id;
      let options = {
        max : 1
      };
      
      let a = await message.channel.send('Q 1/2:\n\n Tulis Nama Band');
      let col = await message.channel.awaitMessages(filter, options);
      
      if (col.first().content == 'cancel') return message.channel.send('Cancelled');
      singer = col.first().content;
      a.delete()
      
      let b = await message.channel.send('Q 2/2:\n\nTulis Nama judul Lagu');
      let col2 = await message.channel.awaitMessages(filter, options);
      
      if (col2.first().content == 'cancel') return message.channel.send('Cancelled');
      song = col2.first().content;
      b.delete()
      
      let lyrics
      (async function(artist, title) {
      lyrics = await lyricsFinder(artist, title) || "Not Found!";
      })(singer, song);
      
      
      //const songName = args.slice(0).join(" ")
      const songName = singer + song;
     if (
      songName == '' &&
      message.guild.musicData.isPlaying &&
      !message.guild.triviaData.isTriviaRunning
    ) {
      songName = message.guild.musicData.nowPlaying.title;
    } else if (songName == '' && message.guild.triviaData.isTriviaRunning) {
      return message.say('Please try again after the trivia has ended');
    } else if (songName == '' && !message.guild.musicData.isPlaying) {
      return message.say(
        'There is no song playing right now, please try again with a song name or play a song first'
      );
    }
      let embed = chitanda.util.embed()
        .setColor(chitanda.warna.Chitanda)
        .setDescription('✅ | Sedang Mencari lirik lagu')
    const sentMessage = await message.channel.send(embed);
    var url = `https://api.genius.com/search?q=${encodeURI(songName)}`;

    const headers = {
      Authorization: `Bearer ${GeniusLyricsAPI}`
    };
    try {
      var body = await fetch(url, { headers });
      var result = await body.json();
      const songID = result.response.hits[0].result.id;

      url = `https://api.genius.com/songs/${songID}`;
      body = await fetch(url, { headers });
      result = await body.json();

      const song = result.response.song;

      //let lyrics = await getLyrics(song.url);
      //lyrics = lyrics.replace(/(\[.+\])/g, '');
      let urll = song.url;
      //if (lyrics.length > 4095)
        //return message.say(
          //'Lirik terlalu panjang, tidak muat di embed untuk menulis');
      
      if (lyrics.length < 2048) {
        const lyricsEmbed = chitanda.util.embed()
          .setAuthor('Genius', 'https://lh3.googleusercontent.com/e6-dZlTM-gJ2sFxFFs3X15O84HEv6jc9PQGgHtVTn7FP6lUXeEAkDl9v4RfVOwbSuQ')
          .setURL(urll)
          .setTitle(`**[ ${song.full_title} ]**`)
          .setThumbnail(song.header_image_thumbnail_url)
          .setColor(chitanda.warna.Chitanda)
          .setDescription(lyrics);
          //.setDescription(`${lyrics.trim()}`);
        return sentMessage.edit('', lyricsEmbed);
      } else {
        
      let pages = [`${lyrics.slice(0, 2048)}`, `${lyrics.slice(2048, lyrics.length)}`]  
      let page = 1; 
    
      let embed = chitanda.util.embed()
      .setAuthor('Genius', 'https://lh3.googleusercontent.com/e6-dZlTM-gJ2sFxFFs3X15O84HEv6jc9PQGgHtVTn7FP6lUXeEAkDl9v4RfVOwbSuQ')
      .setURL(urll)
      .setTitle(`**[ ${song.full_title} ]**`)
      .setThumbnail(song.header_image_thumbnail_url)
      .setColor(chitanda.warna.Chitanda)
      .setFooter(`Page ${page} of ${pages.length}`)
      .setDescription(pages[page-1])
      message.channel.send(embed).then(msg => {
	      
      		msg.react('⬅').then( r => {
      		msg.react('➡')
			
    const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id;
    const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id;

    const backwards = msg.createReactionCollector(backwardsFilter, {timer: 6000});
    const forwards = msg.createReactionCollector(forwardsFilter, {timer: 6000});
 
      backwards.on('collect', r => {
	      if (page === 1) return;
	      page--;
	      embed.setDescription(pages[page-1]);
	      embed.setFooter(`Page ${page} of ${pages.length}`);
	      msg.reactions.resolve("⬅").users.remove(message.author.id)
	      msg.edit(embed)

      })

      forwards.on('collect', r => {
	      if (page === pages.length) return;
	      page++;
	      embed.setDescription(pages[page-1]);
	      embed.setFooter(`Page ${page} of ${pages.length}`);
	      msg.reactions.resolve("➡").users.remove(message.author.id)
	      msg.edit(embed);
        })
      })
    })
        sentMessage.delete();
        return;
      }
    } catch (e) {
      	console.error(e);
      	return sentMessage.edit({embed: {color: chitanda.warna.Error, description: 'Ada sesuatu Kesalahan, Bisakah kamu lebih detail?'}});
    }
    async function getLyrics(url) {
      	const response = await fetch(url);
      	const text = await response.text();
      	const $ = cheerio.load(text);
      	return $('.lyrics').text().trim();
    }
    
  }
}