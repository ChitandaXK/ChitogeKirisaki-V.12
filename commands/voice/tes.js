const { MessageEmbed } = require('discord.js');
const { MessageButton } = require("discord-buttons");

module.exports = {
    name: 'tes',
    aliases: [],
    category: 'Voice',
    description: 'Create name voice channel.',
    permission: ['Manage Channel', 'Manage Roles', 'Connect', 'Speak', 'Mute Members', 'Deafen Member', 'Move Members'],
    permissionUser: [],
    usage: ['name <name>'],
    example: ['name music'],
    run: async (chitanda, message, args) => {
      
      //const kuma = `✍`;
     let firstbutton = chitanda.util.button()
        .setStyle("green")
        .setID("1")
        .setLabel("◀")
         //.setEmoji(kuma)
        let secondbutton = chitanda.util.button()
        .setStyle("blurple")
        .setID("2")
        .setLabel("▶")
        let thirdbutton = chitanda.util.button()
        .setStyle("red")
        .setID("3")
        .setLabel("JUMP TO OVERVIEW")
        let linkingbutton = chitanda.util.button()
        .setStyle("url")
        .setLabel("JUMP TO OVERVIEW")
        .setURL("https://top.gg/bot/715861631279562803")
        
        var buttonarray = [firstbutton, secondbutton, thirdbutton, linkingbutton]
        let overviewembed = chitanda.util.embed()
        .setColor("RANDOM")
        .setDescription("OVERVIEW LOL")
        
        
        let mybuttonsmsg = await message.channel.send({ embed: overviewembed, buttons: buttonarray })
        
        var embedsarray = [overviewembed]
        for(let i = 0; i < 5; i++)
            embedsarray.push( new MessageEmbed().setColor("RANDOM").setDescription(i))

        var currentPage = 0;

        const collector = mybuttonsmsg.createButtonCollector((button)=> button.clicker.user.id === message.author.id, {time: 60000});
        
        collector.on("collect", (b) => {
            b.reply.defer();
            if(b.id == "3"){
                currentPage = 0;
                mybuttonsmsg.edit({ embed: embedsarray[currentPage], buttons: buttonarray })
            }
            else if(b.id == "1"){
                if(currentPage !== 0){
                    --currentPage;
                    mybuttonsmsg.edit({ embed: embedsarray[currentPage], buttons: buttonarray })
                }else {
                    currentPage = embedsarray.length - 1;
                    mybuttonsmsg.edit({ embed: embedsarray[currentPage], buttons: buttonarray })
                }
            }
            else if(b.id == "2"){
                if(currentPage < embedsarray.length - 1){
                    currentPage++;
                    mybuttonsmsg.edit({ embed: embedsarray[currentPage], buttons: buttonarray })
                }else {
                    currentPage = 0;
                    mybuttonsmsg.edit({ embed: embedsarray[currentPage], buttons: buttonarray })
                }
            }
        })
      
    }
}