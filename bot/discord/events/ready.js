const exec = require('child_process').exec;

module.exports = async (client) => {

    setInterval(() => { console.log("Users cached: " + users.length);}, 30000)
    setInterval(() => { console.log("Servers cached: " + servers.length);}, 30000)

    let guild = client.guilds.cache.get("1013082017015013468");

    global.browser = await puppeteer.launch({
        args: ["--no-sandbox" /*openvz*/ ]
    });
    console.log(chalk.magenta('[DISCORD] ') + chalk.green("Chromium launched"));

    let checkNicks = () => {
        guild.members.cache.filter(member => member.displayName.match(/^[a-z0-9]/i) == null).forEach(x => {
            x.setNickname('Moderated Nickname');
        })
    }

    checkNicks()

    console.log(chalk.magenta('[DISCORD] ') + chalk.green(client.user.username + " has logged in!"));
    //getUsers()


    // setInterval(() => {
    //     let _codes = codes.fetchAll();
    //     client.guilds.cache.get('639477525927690240').channels.cache.get('795884677688721448').setTopic(`There's a total of ${_codes.length} active codes (${_codes.map(x => typeof x.data == 'string'? JSON.parse(x.data).balance : x.data.balance).reduce((a, b) => a + b, 0)} servers)`)
    // }, 60000);v

    //Initializing Cooldown
    client.cooldown = {};

    //Automatic 30second git pull.
    /*setInterval(() => {
        exec(`git pull`, (error, stdout) => {
            let response = (error || stdout);
            if (!error) {
                if (response.includes("Already up to date.")) {
                    //console.log('Bot already up to date. No changes since last pull')
                } else {
                    client.channels.cache.get('898041843902742548').send('**[AUTOMATIC]** \nNew update on GitHub. Pulling. \n\nLogs: \n```' + response + "```" + "\n\n\n**Restarting bot**")
                    setTimeout(() => {
                        process.exit();
                    }, 1000)
                }
            }
        })
    }, 30000)*/

    setInterval(() => {
        //Auto Activities List
        const activities = [{
            "text": "over DanBot Hosting MC",
            "type": "WATCHING"
        }, {
            "text": "everyone play mc",
            "type": "WATCHING"
        }];

        const activity = activities[Math.floor(Math.random() * activities.length)];
        client.user.setActivity(activity.text, {
            type: activity.type
        });
    }, 30000);

    // Voice-Channels:

    client.pvc = new Discord.Collection();

    // end of Voice-Channels

    global.invites = {};
    client.guilds.cache.forEach(g => {
        g.fetchInvites().then(guildInvites => {
            invites[g.id] = guildInvites;
        });
    });


    //Voice channel stats updater
    setInterval(async () => {
        let DBHGuild = client.guilds.cache.get("1013082017015013468");
        let roleID1 = '1013123952526241863';
        let staffCount = DBHGuild.roles.cache.get(roleID1).members.size;
        client.channels.cache.get("1013145119282712616").edit({
            name: `Staff: ${staffCount}`,
            reason: "Staff count update"
        });

        let roleID2 = '898041757168697375';
        let memberCount = DBHGuild.roles.cache.get(roleID2).members.size;
        client.channels.cache.get("1013145079172579328").edit({
            name: `Members: ${memberCount}`,
            reason: "Member count update"
        });

        client.channels.cache.get("1013145202699014294").edit({
            name: `Total Members: ${DBHGuild.memberCount}`,
            reason: "TMembers count update"
        });

        const ticketcount = DBHGuild.channels.cache.filter(x => x.name.endsWith("-ticket")).size
        client.channels.cache.get("1013145279651909642").edit({
            name: `Tickets: ${ticketcount}`,
            reason: "Ticket count update"
        })
        client.channels.cache.get("1013145527149400176").edit({
            name: `Boosts: ${DBHGuild.premiumSubscriptionCount}`,
            reason: "Boosts count update"
        })
    }, 30000);
};
