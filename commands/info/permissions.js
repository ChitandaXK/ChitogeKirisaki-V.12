const { stripIndents } = require('common-tags');

module.exports = {
    name: 'permissions',
    aliases: ['perms'],
    category: 'Info',
    description: 'Cek permissions roles.',
    permission: ['Embed Links', 'Atach Files', 'Use External Emoji'],
    permissionUser: [],
    usage: ['permission'],
    example: ['permission'],
    run: async (chitanda, message, args) => {
    
    let user;
    if ( message.mentions.roles.first()) {
        user = message.mentions.roles.first()
    } else if ( args[0]) {
        user = message.guild.roles.cache.get(args[0]);
    } else if ( args.join(' ')) {
        user = message.guild.roles.cache.find(x => x.name === args.join(' '))
    }
      
    if (!user) {
      let embed = chitanda.util.embed()
        .setColor(chitanda.warna.Chitanda)
        .setDescription('tolong mention role atau id role')
      return message.channel.send(embed)
    }
    const role = message.guild.roles.cache.get(user.id).permissions.serialize()
    
    const bnar = '<a:1805_check_ravena:809015620582506496>';
    const slah = '<a:9612_uncheck_ravena:809015792351445002>';
    
      let invite;
      let kick;
      
    if (role[0] === 'CREATE_INSTANT_INVITE: true') invite = `${bnar} CREATE_INSTANT_INVITE`;
    if (role[0] === 'CREATE_INSTANT_INVITE: false') invite = `${slah} CREATE_INSTANT_INVITE`;
    if (role[1] === 'KICK_MEMBERS: true') kick = `${bnar} KICK_MEMBERS`;
    if (role[1] === 'KICK_MEMBERS: false') kick = `${slah} KICK_MEMBERS`;
      
      let embed = chitanda.util.embed()
        .setColor(chitanda.warna.Chitanda)
        .setDescription(`${invite}\n${kick}`)
      return message.channel.send(embed)
    
  }
}