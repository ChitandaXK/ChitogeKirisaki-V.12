const { stripIndents } = require('common-tags');

module.exports = {
    name: 'ping',
    aliases: ['pong'],
    category: 'Info',
    description: 'Cek Websocket bot.',
    permission: ['Embed Links', 'Atach Files'],
    permissionUser: [],
    usage: ['ping'],
    example: ['ping'],
    run: async (chitanda, message, args) => {
    
      let embed2 = chitanda.util.embed()
        .setColor(chitanda.warna.Chitanda)
        .setTitle('Result')
        .setDescription(`💥 Pong!!`)
    const pinging = await message.channel.send(embed2);
		const ping = Math.round(pinging.createdTimestamp - message.createdTimestamp);
    
    		const embed = chitanda.util.embed()
    		.setColor(chitanda.warna.Chitanda)
    		.setTitle('Result')
		    .setDescription(stripIndents`
			  🏓 **Latency**: \`${chitanda.util.formatNumber(ping)}ms\`
			  💖 **API Latency:** \`${chitanda.util.formatNumber(Math.round(chitanda.ws.ping))}ms\``)
    		.setFooter(message.author.username)
    		.setTimestamp();
    		message.delete()
    	return pinging.edit(embed);	
      //return message.channel.send(embed);
    
  }
}