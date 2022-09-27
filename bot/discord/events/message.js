const fetch = require('node-fetch');
const axios = require('axios');
const { weirdToNormalChars } = require('weird-to-normal-chars');
module.exports = async (client, message) => {
    if (message.mentions.users.size >= 20) {
        message.member.ban({ reason: 'Suspected raid. Pinging more than 20 users.' });
        message.channel.send(`${message.member.toString()} has been banned for pinging more than 20 users`);

        const embed = new Discord.MessageEmbed()
            .setTitle("User banned for pinging more than 20 users")
            .addField("User", "Banned " + message.member.toString(), true)
            .setColor(0xFF7700)
            .setTimestamp(new Date());

        client.channels.cache.get(config.DiscordBot.oLogs).send(embed)
    };
    if (message.channel.type === "dm") {
        if (message.author.id === "137624084572798976") {
            const args = message.content.trim().split(/ +/g);
            client.channels.cache.get(args[0]).send(message.content.split(' ').slice(1).join(' '))
        } else {
            if (message.author.id === "856176853719187506") {

            } else {
                client.channels.cache.get('1013146536991006791').send(message.author.username + " (ID: " + message.author.id + ", PING: <@" + message.author.id + ">)" + "\n" + message.content.replace('@', '@|'))
            }
        }
    };

    if (message.author.bot) return; // to stop bots from creating accounts, tickets and more.
    if (message.channel.type === "dm") return; //stops commands working in dms
    const prefix = config.DiscordBot.Prefix;
    if (message.content.indexOf(prefix) !== 0) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandargs = message.content.split(' ').slice(1).join(' ');
    const command = args.shift().toLowerCase();
    console.log(chalk.magenta("[DISCORD] ") + chalk.yellow(`[${message.author.username}] [${message.author.id}] >> ${prefix}${command} ${commandargs}`));
    let actualExecutorId;
    try {
        let blacklisted = [
            '1013082017593835542', //General
            '1013126650080280666', //Spam
            '1013085239586865253' //MC-Chat
        ]
        //Channel checker

        if ((blacklisted.includes(message.channel.id) || (message.channel.id == '754441222424363088' && command != 'snipe')) && (message.member.roles.cache.find(x => x.id === '898041751099539497') == null && message.member.roles.cache.find(x => x.id === '898041743566594049') == null) &&
            !(message.channel.id === '898041853096628267' && command === 'info')) return;

        if (sudo.get(message.member.id) && message.member.roles.cache.find(r => r.id === "898041747597295667") && args[0] != "sudo") { //Doubble check the user is deffinaly allowd to use this command
            actualExecutorId = JSON.parse(JSON.stringify({a: message.member.id})).a; // Deep clone actual sender user ID

            console.log(`Command being executed with sudo by ${actualExecutorId}`);
            let userToCopy = sudo.get(actualExecutorId);

            // await message.guild.members.fetch(userToCopy);  //Cache user data
            // await client.users.fetch(userToCopy); //Cache user data

            message.guild.member.id = userToCopy;
            message.author.id = userToCopy;
        };

        if (command === "staff" || command === "ticket") {
            //Cooldown setting
            if (!args[0]) {
                let commandFile = require(`../commands/${command}/help.js`);
                await commandFile.run(client, message, args);
            } else {
                let commandFile = require(`../commands/${command}/${args[0]}.js`);
                await commandFile.run(client, message, args);
            }
        } else {
            let commandFile = require(`../commands/${command}.js`);
            await commandFile.run(client, message, args);
        }

    } catch (err) {
        console.log(err)
    }

    //After command remove all clone traces
    if (actualExecutorId) {
        message.guild.member.id = actualExecutorId;
        message.author.id = actualExecutorId;
    };
};
