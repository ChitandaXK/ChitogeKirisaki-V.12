const { readdirSync } = require("fs");

module.exports = chitanda => {
  const events = readdirSync("./events/");
  for (let event of events) {
    let file = require(`../events/${event}`);
    chitanda.on(event.split(".")[0], (...args) => file(chitanda, ...args));
  }
};