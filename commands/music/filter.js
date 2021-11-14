const { attentionembed } = require("../../util/attentionembed.js");

module.exports = {
    name: 'filter',
    aliases: ['f'],
    category: 'Music',
    description: 'Filter / efek saat memutar lagu.',
    permission: ['Embed Links', 'View Channel','Send Messages','Connect', 'Speak', 'Add Reactions'],
    permissionUser: [],
    usage: 'filter',
    example: ['filter <bassboost>', 'filter <nightcore>', 'filter <reverse>'],
    run: async (chitanda, message, args) => {

      let approveemoji = '✅'
    if (!message.guild) return;
    //define channel
    const { channel } = message.member.voice;
    //get serverqueue
    const queue = message.client.queue.get(message.guild.id);
    //react with approve emoji
    message.react(approveemoji).catch(console.error);
    //if the argslength is null return error
    //if there is already a search return error
    if (message.channel.activeCollector)
      return attentionembed(message, "There is a search active!");
    //if the user is not in a voice channel return error
    if (!message.member.voice.channel)
      return attentionembed(message, "Please join a Voice Channel first")
    //If not in the same channel return error
    if (queue && channel !== message.guild.me.voice.channel)
      return attentionembed(message, `You must be in the same Voice Channel as me`);
    //Define all filters with ffmpeg    https://ffmpeg.org/ffmpeg-filters.html
    const filters = [
      'bass=g=20,dynaudnorm=f=200', //bassboost
      'apulsator=hz=0.08', //8D gx bisa
      'aresample=48000,asetrate=48000*0.8', //vaporwave
      'aresample=48000,asetrate=48000*1.25', //nightcore
      'aphaser=in_gain=0.4', //phaser gx bisa
      'tremolo', //tremolo gx bisa
      'vibrato=f=6.5', //vibrato gx bisa
      'areverse', //reverse
      'treble=g=5', //treble gx bisa
      'dynaudnorm=f=200', //normalizer
      'surround', //surrounding gx bisa
      'apulsator=hz=1', //pulsator gx bisa
      'asubboost', //subboost gx bisa
      'stereotools=mlev=0.03', //karaoke gx bisa
      'flanger', //flanger
      'agate', //gate gx bisa
      'haas', //haas gx bisa
      'mcompand', //mcompand gx bisa
      "remove",
    ];
    //set some temporary variables
    let varforfilter; let choice;
    //get user input
    switch (args[0]) {
      case "bassboost":
        varforfilter = 0;
        break;
      case "8D":
        varforfilter = 1;
        break;
      case "vaporwave":
        varforfilter = 2;
        break;
      case "nightcore":
        varforfilter = 3;
        break;
      case "phaser":
        varforfilter = 4;
        break;
      case "tremolo":
        varforfilter = 5;
        break;
      case "vibrato":
        varforfilter = 6;
        break;
      case "reverse":
        varforfilter = 7;
        break;
      case "treble":
        varforfilter = 8;
        break;
      case "normalizer":
        varforfilter = 9;
        break;
      case "surrounding":
        varforfilter = 10;
        break;
      case "pulsator":
        varforfilter = 11;
        break;
      case "subboost":
        varforfilter = 12;
        break;
      case "karaoke":
        varforfilter = 13;
        break;
      case "flanger":
        varforfilter = 14;
        break;
      case "gate":
        varforfilter = 15;
        break;
      case "haas":
        varforfilter = 16;
        break;
      case "mcompand":
        varforfilter = 17;
        break;
      case "remove":
        varforfilter = 18;
        break;
      default:
        //fires if not valid input
        varforfilter = 404;
        message.channel.send(chitanda.util.embed()
        .setColor(chitanda.warna.Chitanda)
        .setTitle("Not a valid Filter, use one of those:")
        .setDescription(`
        \`bassboost\`
        \`8D\`
        \`vaporwave\`
        \`nightcore\`
        \`phaser\`
        \`tremolo\`
        \`vibrato\`
        \`surrounding\`
        \`pulsator\`
        \`subboost\`
        \`chorus\`
        \`karaoke\`
        \`sofa (makes audio suitable for earphone/headset)\`
        \`desilencer (removes silence in the song automatically)\`
        \`clear\`   ---  removes all filters`)
        .setFooter(`Example: ${chitanda.prefixDB}filter bassboost`)
        )
        break;
    }
    //set choice to zero
    choice = filters[varforfilter];
    if (varforfilter === 404) return;
    try {
      const song = queue.songs[0];
      //play the collected song song, message, client, filters
      message.channel.send(chitanda.util.embed()
      .setColor("#F0EAD6")
      .setAuthor("Applying: " + args[0], "https://cdn.discordapp.com/attachments/778600026280558617/781024479623118878/ezgif.com-gif-maker_1.gif","https://discord.com/api/oauth2/authorize?client_id=767885987740254291&permissions=49572160&scope=bot")).then(msg =>{
        msg.delete({timeout: 2000});
      })
      chitanda.musicManager.play(song, chitanda, message, choice);
      //queue.filter = !queue.filter
      //catch any errors while searching
    } catch (error) {
      //log them
      console.error(error);
      //set collector false, just incase its still true
      //message.channel.activeCollector = false;
    }
    
    
  }
}