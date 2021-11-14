const PlayStore = require("google-play-scraper");

module.exports = {
    name: 'playstore',
    aliases: ['store'],
    category: 'Info',
    description: 'Cek spekfikasi apk.',
    permission: ['Embed Links', 'Atach Files'],
    permissionUser: [],
    usage: ['playstore'],
    example: ['playstore <PUGB>'],
    run: async (chitanda, message, args) => {
    
    if (!args) {
      let embed = chitanda.util.embed()
        .setColor(chitanda.warna.Chitanda)
        .setDescription(`Masukan Nama apk. Contoh : ${chitanda.prefixDB}playstore \`pugb\``)
    }

    PlayStore.search({
      term: args.join(" "),
      num: 1
    }).then(Data => {
      let ps;

      try {
        ps = JSON.parse(JSON.stringify(Data[0]));
      } catch (error) {
        return message.channel.send({embed: { description: "Apk tidak di temukan, coba lagi", color: chitanda.warna.error}})
      }

      let Embed = chitanda.util.embed()
        .setColor(chitanda.warna.Chitanda)
        .setThumbnail(ps.icon)
        .setURL(ps.url)
        .setTitle(`${ps.title}`)
        .setDescription(ps.summary)
        .addField(`⚙️ Developer`, ps.developer, true)
        .addField(`🗂️ Application ID`, ps.appId, true)
        .addField(`💵 Price`, ps.priceText, true)
        .addField(`🥉 Score`, ps.scoreText, true)
        .setFooter(ps.title)
        .setTimestamp();

      return message.channel.send(Embed);
    });
    
  }
}