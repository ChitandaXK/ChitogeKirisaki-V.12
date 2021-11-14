const { Client, Collection } = require("discord.js");
const { MessageButton } = require("discord-buttons");
//const { Player } = require('discord-player');
//const Util = require("../util/Util.js");
//const MangaDex = require('./MangaDex.js');
//const Samehadaku = require('./Samehadaku.js');
//const Kusonime = require('./Kusonime.js');

module.exports = class ChitandaClient extends Client {

  constructor(opt) {
    super(opt);
    require("discord-buttons")(this);
    this.db = require('quick.db');
    this.ytdl = require('ytdl-core');
    this.dytdl = require('discord-ytdl-core');
    this.config = require("../config/config.json");
    this.emoji = require('../config/emoji.json');
    this.warna = require('../config/colors.json');
    this.util = require("../util/Util.js");
    this.nkm = require("../util/nkm.js");
    this.musicManager = require("../system/musicManager");
    //this.serial = process.env.SERIAL;
    this.token = process.env.TOKEN;
    this.commands = new Collection();
    this.aliases = new Collection();
    this.groups = new Collection();
    //this.helps = new Collection();
    this.cooldowns = new Collection();
    this.dataAttachment = new Collection();
    this.queue = new Collection()

    this.ownerID = process.env.OWNERID;
    this.ownerID2 = process.env.OWNERID2;
    this.guildID = process.env.GUILDID;
    this.guildID2 = process.env.GUILDID2;
    
    this.channelWEL = process.env.CHANNELWEL;
    this.channelLOG = process.env.CHANNELLOG;
    this.channelERROR = process.env.CHANNELERROR;
    this.channelSUGGESTION = process.env.CHANNELSUGGESTION;
    this.channelMUSIC = process.env.CHANNELMUSIC;
    
    //this.recent = new Set();
    //this.player = new Player(new Client());
    //this.mangadex = new MangaDex(this);
    //this.samehadaku = new Samehadaku(this);
   // this.kusonime = new Kusonime(this);


  }

};