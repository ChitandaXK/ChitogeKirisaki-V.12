const { version: djsVersion } = require('discord.js');
const ms = require("pretty-ms");
const { platform, arch, cpus } = require("os");
const os = require("os");
const cpuStat = require("cpu-stat");
const moment = require('moment');
const { version, dependencies } = require('../../package.json');
const permissions = require('../../assets/json/permissions');

module.exports = {
    name: 'botinfo',
    aliases: ['stats', 'info'],
    category: 'Info',
    description: 'Informasi tentang detail sytem.',
    permission: ['Embed Links', 'Atach Files', 'Use External Emoji'],
    permissionUser: [],
    usage: ['botinfo'],
    example: ['botinfo'],
    run: async (chitanda, message, args) => {
      
    message.channel.startTyping();
      
    const invite = await chitanda.generateInvite(permissions);
    const srvr = 'https://discord.gg/XYEcjWNVwn';
    const vte = 'https://top.gg/bot/715197480488403005';
		const emo = 'https://cdn.discordapp.com/attachments/688763072864976906/705776573546233937/702557406361550848.gif';
    const webs = 'https://Mrf.000webhostapp.com/'
    const created = `${moment.utc(chitanda.user.createdAt).format('ddd DD MMMM YYYY')} (${moment(chitanda.user.createdTimestamp).fromNow()})`;
    const uptime = ms(chitanda.uptime, { verbose : true })
    
    cpuStat.usagePercent(function(err, percent, seconds) {
        if (err) {
            return console.log(err);
        }
      
    const countCores = os.cpus().length
    const cpuModel = os.cpus()[0].model
    const arch = os.arch();
    const CPU = percent.toFixed(2)
    const totalMem = Math.round(require('os').totalmem / 1024 / 1024) - 5200;
  
		const embed = chitanda.util.embed()
      		.setAuthor(`${chitanda.user.username} Bot Info`, `${emo}`)
      		.setThumbnail(chitanda.user.displayAvatarURL({ format: 'png', size: 2048 })) //↣↢
      		.setColor(chitanda.warna.Chitanda)
		      .setFooter('©Kyuu', `${chitanda.users.cache.find(c => c.id === "577495778747088896").avatarURL()}`)
      		.setTimestamp()
          .addField('**👤  Dev**', `\`\`\`apache\n•》 Owner : ${chitanda.users.cache.find(c => c.id === "577495778747088896").tag}\`\`\``) // <@577495778747088896> / 
		      .addField('**📂 General Info**', `\`\`\`apache\n•》 Username : ${chitanda.user.tag}\n•》 Servers : ${chitanda.util.formatNumber(chitanda.guilds.cache.size)}\n•》 Users : ${chitanda.util.formatNumber(chitanda.users.cache.size)}\n•》 Channels : ${chitanda.util.formatNumber(chitanda.channels.cache.size)}\n•》 Created At : ${created}\n•》 Commands : ${chitanda.commands.size}\n•》 Prefix : ${chitanda.config.discord.prefix[0]}\n•》 Server Prefix : ${chitanda.prefixDB}\`\`\``) // •》 Commands : ${this.client.registry.commands.size}\n
      		//.addField('**⚙  Os Information**', `\`\`\`css\n•》 Platform : Windows X64\n•》 Cpu : Intel(R) Core(TM) i5 7200U 3.1GHz | 4 Cores\n•》 Memory Usage : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB (${(process.memoryUsage().heapUsed / 100000 - 350).toFixed(2)})\n•》 Shards : ${chitanda.options.shardCount}\n•》 Uptime : ${uptime}\n•》 Version : ${version}\n•》 Node.js : ${process.version}\n•》 Discord.js : v${djsVersion}\n•》 Websocket : ${chitanda.util.formatNumber(Math.round(chitanda.ws.ping))} ms\`\`\` `)
          .addField('**⚙  Os Information**', `\`\`\`css\n•》 Platform : ${platform} ${arch}\n•》 Cpu : ${cpuModel} | ${countCores} Cores\n•》 Cpu Usage : ${CPU}%\n•》 Memory Usage : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${totalMem} MB\n•》 Shards : ${chitanda.options.shardCount}\n•》 Uptime : ${uptime}\n•》 Version : ${version}\n•》 Node.js : ${process.version}\n•》 Discord.js : v${djsVersion}\n•》 Websocket : ${chitanda.util.formatNumber(Math.round(chitanda.ws.ping))} ms\`\`\` `)
      		//.addField("**📌 Other Stuff**", `•》  Support Server : ${embedURL(`${nameguild}`, srvr)}\n•》Website : ${embedURL('DEMO', webs)}\n•》  Invite Me : ${embedURL(`${namebot}`, invite)}\n•》  Vote Me : ${embedURL('VOTE', vte)}`)
      		//.addField('**👤  Dev**', `\|\|<@577495778747088896> OR ${chitanda.users.cache.find(c => c.id === "577495778747088896").tag}\|\|`)
		return message.channel.send(embed);
      
    })
      message.channel.stopTyping(true);
    }
}