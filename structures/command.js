const { readdirSync, readdir } = require("fs");
const ascii = require("ascii-table");

let table = new ascii("Commands");
table.setHeading("Category", "Command", "Load status");

module.exports = async (chitanda) => {
    
    readdirSync("./commands/").forEach(category => {
      
        
        const commands = readdirSync(`./commands/${category}/`).filter(file => file.endsWith(".js"));
    
      
        for (let file of commands) {
            let command = require(`../commands/${category}/${file}`);
    
            if (command.name) {
                chitanda.commands.set(command.name, command);
                table.addRow(category , command.name, '✅');
            } else {
                table.addRow(category, file, `❌  -> missing a help.name, or help.name is not a string.`);
                continue;
            }
    
            // If there's an aliases key, read the aliases.
            if (command.aliases && Array.isArray(command.aliases)) command.aliases.forEach(alias => chitanda.aliases.set(alias, command.name));
        }
  
    });
    
    console.log(table.toString());
}

/**
 * This is the basic command layout
 * module.exports = {
 *  name: "Command name",
 *  aliases: ["array", "of", "aliases"]
 *  category: "Category name",
 *  description: "Command description"
 *  usage: "[args input]",
 *  run: (client, message, args) => {
 *      The code in here to execute
 *  }
 * }
 */