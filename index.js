/*
    ____              ____        __     __  __           __  _
   / __ \____ _____  / __ )____  / /_   / / / /___  _____/ /_(_)___  ____ _
  / / / / __ `/ __ \/ __  / __ \/ __/  / /_/ / __ \/ ___/ __/ / __ \/ __ `/
 / /_/ / /_/ / / / / /_/ / /_/ / /_   / __  / /_/ (__  ) /_/ / / / / /_/ /
/_____/\__,_/_/ /_/_____/\____/\__/  /_/ /_/\____/____/\__/_/_/ /_/\__, /
Free Hosting forever!                                            /____/
*/

global.config = require("./config.json");
global.fs = require("fs");
global.chalk = require('chalk');
global.axios = require('axios');
global.pretty = require('prettysize');

require('./functions')

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Im Running on [DanBot Hosting](https://discord.gg/dbh)!')
})

app.listen(port, () => {
  console.log(`DBHMC Web listening on port ${port}`)
})

//Discord Bot
let db = require("quick.db");
global.Discord = require("discord.js");

global.messageSnipes = new Discord.Collection();
global.moment = require("moment");
global.client = new Discord.Client({
    restTimeOffset: 0,
    disableMentions: 'everyone',
    restWsBridgetimeout: 100,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

global.bot = client;
global.suggestionLog = new Discord.WebhookClient(config.DiscordSuggestions.channelID, config.DiscordSuggestions.channelID)
//require('./bot/discord/commands/mute').init(client)

//Event handler
fs.readdir('./bot/discord/events/', (err, files) => {
    files = files.filter(f => f.endsWith('.js'));
    files.forEach(f => {
        const event = require(`./bot/discord/events/${f}`);
        client.on(f.split('.')[0], event.bind(null, client));
        delete require.cache[require.resolve(`./bot/discord/events/${f}`)];
    });
});

//Bot login
client.login(config.DiscordBot.Token);
global.Allowed = ["137624084572798976"];
