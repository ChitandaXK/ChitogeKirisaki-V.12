const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'eval',
    aliases: ['e', 'ev'],
    category: 'Developer',
    description: 'Mengevaluasi kode.',
    permission: [],
    permissionUser: ['Owner Bot'],
    usage: ['eval <code>'],
    example: ['eval message'],
    run: async (chitanda, message, query) => {
      
      const owner = [chitanda.ownerID, chitanda.ownerID2],
            ownGuild = [chitanda.guildID, chitanda.guildID2];
      
      //if (!ownGuild.includes(message.guild.id)) {
      if (!owner.includes(message.author.id)) {
          let embed = chitanda.util.embed()
          .setColor(chitanda.warna.Error)
          .setTitle("Command Dev. Owner")
          .setDescription(`${message.author}, Hi Friend Kamu Bukan Developer`)
      return message.channel.send(embed).then(async message => {
           message.delete({ timeout: 15000 });
  });
      }
      //}
      
      //const bot = kirisaki; //hastebin
      const fubuki = chitanda,
            shirakami = chitanda,
            chitoge = chitanda,
            kirisaki = chitanda;
            
      const msg = message;
      const ytdl = require("ytdl-core"),
            youtubeSR = require("youtube-sr");
      const { args, flags } = parseQuery(query);
      
      try {
      if (!args.length) {
      throw new TypeError(`Try ${module.exports.example}`);
    }
    let code = args.join(" ");
    let depth = 0;
    if (flags.includes("async")) {
      code = `(async() => { ${code} })()`;
    }
    if (flags.some(x => x.includes("depth"))) {
      depth = flags.find(x => x.includes("depth")).split("=")[1];
      depth = parseInt(depth, 10);
    }
    let { evaled, type } = await parseEval(eval(code)); /* eslint-disable-line */
    if (flags.includes("silent")) return;
    if (typeof evaled !== "string") evaled = require("util").inspect(evaled, { depth });
    evaled = evaled
      .replace(/`/g, `\`${String.fromCharCode(8203)}`)
      .replace(/@/g, `@${String.fromCharCode(8203)}`);
    if (evaled.length > 2048) evaled = await chitanda.hastebin(evaled);
    else evaled = `\`\`\`${evaled}\`\`\``;
    const embed = chitanda.util.embed()
      .setAuthor("Evaled success")
      .setColor(chitanda.warna.Chitanda)
      .setDescription(evaled)
      .addField("Type", `\`\`\`${type}\`\`\``)
      .setFooter(`React to delete message.`);
    const m = await message.channel.send(embed);
    for (const chot of chitanda.emoji.red) {
      await m.react(chot);
    }
    const filter = (rect, usr) => chitanda.emoji.red.includes(rect.emoji.name) && usr.id === message.author.id;
    m.createReactionCollector(filter, { time: 600000, max: 1 }).on("collect", async col => {
      if (col.emoji.name === "🚫") return m.delete();
    });
  } catch (e) {
    const embed = chitanda.util.embed()
      .setColor(chitanda.warna.Error)
      .setAuthor("Evaled error")
      .setDescription(`\`\`\`${e}\`\`\``)
      .setFooter(`React to delete message.`);
    const m = await message.channel.send(embed);
    for (const chot of chitanda.emoji.red) {
      await m.react(chot);
    }
    const filter = (rect, usr) => chitanda.emoji.red.includes(rect.emoji.name) && usr.id === message.author.id;
    m.createReactionCollector(filter, { time: 60000, max: 1 }).on("collect", async col => {
      if (col.emoji.name === "🚫") return m.delete();
    });
  }
}
}

async function parseEval(input) {
  const isPromise =
    input instanceof Promise &&
    typeof input.then === "function" &&
    typeof input.catch === "function";
  if (isPromise) {
    input = await input;
    return {
      evaled: input,
      type: `Promise<${parseType(input)}>`
    };
  }
  return {
    evaled: input,
    type: parseType(input)
  };
}

function parseType(input) {
  if (input instanceof Buffer) {
    let length = Math.round(input.length / 1024 / 1024);
    let ic = "MB";
    if (!length) {
      length = Math.round(input.length / 1024);
      ic = "KB";
    }
    if (!length) {
      length = Math.round(input.length);
      ic = "Bytes";
    }
    return `Buffer (${length} ${ic})`;
  }
  return input === null || input === undefined ? "Void" : input.constructor.name;
}

function parseQuery(queries) {
  const args = [];
  const flags = [];
  for (const query of queries) {
    if (query.startsWith("--")) flags.push(query.slice(2).toLowerCase());
    else args.push(query);
  }
  return { args, flags };
}
MessageEmbed