const ChitandaClient = require("./structures/ChitandaClient");

const chitanda = new ChitandaClient({
  disableEveryone: true,
  disableMentions: 'everyone',
  disableEvents: ["TYPING_START"],
  cacheGuilds: true,
  cacheChannels: true,
  cacheOverwrites: false,
  cacheRoles: false,
  cacheEmojis: false,
  cachePresences: false,
  //fetchAllMembers: true,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  ws: { properties: { $browser: 'Discord Android' } }
  
});


//require('discord-logs')(client);
require("./structures/Uptime");
require("./structures/ExtendedMessage");
require("./structures/Event")(chitanda);
//require("./structures/jointocreate")(chitanda);
require("./structures/command")(chitanda);

//["command"].forEach(handler => {
    //require(`./structures/${handler}`)(kirisaki);
//});


chitanda.package = require("./package.json");
chitanda.on("warn", info => console.log(info));
chitanda.on("error", console.error);
chitanda.on("disconnect", () => console.log("Disconnected."));
chitanda.on("reconnecting", () => console.log("Reconnecting."));


chitanda.login(chitanda.token)//.catch(console.error);

/*process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", reason.stack || reason);
  console.error(reason);
});

process.on("uncaughtException", err => {
  console.error(new Date());
  console.error(`Caught exception: ${err}`);
  console.error(err);
  if (err.code == "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
    console.error("true");
  }
});*/