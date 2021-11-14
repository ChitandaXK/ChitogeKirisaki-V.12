
module.exports = (chitanda) => {
    
    chitanda.on('message', async message => {
      
      if (message.author.bot) return;
      if (!message.guild) return;
      
      let queue = chitanda.queue.get(message.guild.id);
      
      if (queue) {
        if (chitanda.channels.cache.get(queue.channel.id).members.map(x => x.id) == chitanda.user.id) {
          chitanda.channels.cache.get(queue.textChannel.id).send(`:thinking: Saya Meninggalkan **${queue.channel.name}** dalam 2 menit karena saya di tinggalkan sendirian :(`)
            .then(
            setTimeout(async () => {
            queue.songs = [];
            queue.connection.dispatcher.end();
            }, 60000)
          );
          
        } else {
          return chitanda.channels.cache.get(queue.textChannel.id).send(':tada: Melanjutkan musik karena seseorang bergabung!')
        }
      } else {
        return
      }
    
    });
    
  }