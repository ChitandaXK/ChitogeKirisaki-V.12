const { stripIndents } = require("common-tags")

module.exports = {
    name: 'skip',
    aliases: ['skip-song'],
    category: 'Music',
    description: 'Skip lagu ke antrian berikutnya.',
    permission: ['Embed Links', 'View Channel','Send Messages','Connect', 'Speak', 'Add Reactions'],
    permissionUser: [],
    usage: ['skip'],
    example: ['skip'],
    run: async (chitanda, message, args) => {
    
let embed = chitanda.util.embed()
.setColor(chitanda.warna.Chitanda);


    const { channel } = message.member.voice;

    if (!channel) {
      let embed = chitanda.util.embed()
        .setColor(chitanda.warna.Chitanda)
        .setDescription('Kamu harus masuk kedalam saluran suara.')
      return message.channel.send(embed).then(async message => {
           message.delete({ timeout: 15000 });
  });
    }
      
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      let embed = chitanda.util.embed()
        .setColor(chitanda.warna.Chitanda)
        .setDescription('Tidak ada antrian.')
      return message.channel.send(embed).then(async message => {
           message.delete({ timeout: 15000 });
  });
    }
      
const vote = message.client.vote.get(message.guild.id)
    if (!serverQueue) {
      let embed = chitanda.util.embed()
        .setColor(chitanda.warna.Chitanda)
        .setDescription('Tidak ada Antrian.')
      return message.channel.send(embed).then(async message => {
           message.delete({ timeout: 15000 });
  });
    }
      
    if(!message.guild.voice.connection)
  {
    return;
  }
  //let userVoiceChannel = message.member.voice.channel;
  
  let clientVoiceConnection = message.guild.voice.connection;
  const { title, author, duration, url, thumbnail } = serverQueue.songs[0];
  if (channel === clientVoiceConnection.channel) {
    serverQueue.connection.dispatcher.end();
    //message.guild.musicData.songDispatcher.end(); 
    const embed = chitanda.util.embed()
    .setColor(chitanda.warna.Chitanda)
    .setAuthor('Skip' ,'https://cdn.discordapp.com/attachments/688763072864976906/706472099082141696/661493093811617803.gif')
    .setDescription(`**✔ | Successfully skipped**\n${stripIndents`
    ${serverQueue.playing ? ":arrow_forward: " : ":pause_button: "} **[${title}](${url})**`}`) //**${message.guild.musicData.nowPlaying.title}**
    .setTimestamp()
    .setFooter(`Skipped by ${message.author.username}`)
    message.say(embed);
  } else {
    message.channel.send('You can only execute this command if you share the same voiceChannel!');
  }
      
    /*if(message.member.voice.channel.id !== serverQueue.channel.id) {
      let embed = new MessageEmbed()
        .setColor(COLOR)
        .setDescription('You need join same voice channel with me!.')
      return message.channel.send(embed).then(async message => {
           message.delete({ timeout: 15000 });
  });
    }
      
    let song = serverQueue.songs[0]   
    let jumem = 1000//serverQueue.channel.members.filter(member => !member.user.bot).size
    if (serverQueue.songs[0].vote.includes(message.author.id)) return message.channel.send(`${message.author}, you have already VOTE!`); // \`\`${song.vote.length}/${jumem}\`\` votes.
    
    song.vote.push(message.author.id);
        message.channel.send(`${message.author} thank's for voted!`); // \`\`${song.vote.length}/${jumem}\`\` votes.
        if (song.vote.length >= jumem) return serverQueue.connection.dispatcher.end();
    
//}*/
    
    /*const vcvote = Math.floor(message.guild.me.voice.channel.members.size / 2)
    const okie = Math.floor(message.guild.me.voice.channel.members.size / 2 - 1)
    console.log(message.guild.me.voice.channel.members.size)
     if(!message.member.hasPermission("ADMINISTRATOR")) {
       if(vote.vote > okie) {
         serverQueue.connection.dispatcher.end();
    embed.setDescription("VOTE - SKIP | Skipping The Song")
    //embed.setThumbnail(client.user.displayAvatarURL())
    return message.channel.send(embed);
       }
       
       if(vote.voters.includes(message.author.id)) {
         return message.channel.send("You already voted for this song")
       }
       
       if(vcvote === 2) {
          serverQueue.connection.dispatcher.end();
    embed.setDescription("✔ | Skipping The Song")
    embed.setThumbnail(client.user.displayAvatarURL())
    return message.channel.send(embed);
       }
       
       
       
vote.vote++
       vote.voters.push(message.author.id)
       return message.channel.send(`You Voted for the Song to Skip, btw we currently need ${Math.floor(vcvote - vote.vote)} votes`)
    
     
     
     
     }

    serverQueue.connection.dispatcher.end();
    embed.setDescription("✔ | Skipping The Song")
    embed.setThumbnail(client.user.displayAvatarURL())
    message.channel.send(embed);*/
  }
};