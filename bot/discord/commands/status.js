const Discord = require("discord.js");
const fetch = require("node-fetch");

exports.run = async(client, message, args) => {
const sentMessage = await message.channel.send("Fetching statistics, please wait...")

        // Fetch statistics from mcapi.us
        const res = await fetch(`https://mcapi.us/server/status?ip=Sf4.danbot.cloud`)
        if (!res) return message.channel.send(`Looks like your server is not reachable... Please verify it's online and it isn't blocking access!`)
        // Parse the mcapi.us response
        const body = await res.json()

        const attachment = new Discord.MessageAttachment(Buffer.from(body.favicon.substr('data:image/png;base64,'.length), 'base64'), "icon.png")

        const embed = new Discord.MessageEmbed()
            .setAuthor("DBH MC Server")
            .attachFiles(attachment)
            .setThumbnail("attachment://icon.png")
            .addField("Version", body.server.name)
            .addField("Connected", `${body.players.now} players`)
            .addField("Maximum", `${body.players.max} players`)
            .addField("Status", (body.online ? "Online" : "Offline"))
            .setColor("#FF0000")
            .setFooter("DanBot Hosting MC")
        
        sentMessage.edit(`:chart_with_upwards_trend: Here are the stats for **Sf4.danbot.cloud**:`, { embed })
}
