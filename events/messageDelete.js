const Discord = require('discord.js');

module.exports = async (chitanda, message) => {
  
  chitanda.snipes = new Map()
  
  chitanda.snipes.set(message.channel.id,{
  content: message.content, 
  author: message.author, 
  image: message.attachments.first() ? message.attachments.first().proxyURL : null
  })
}