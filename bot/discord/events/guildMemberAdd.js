const humanizeDuration = require('humanize-duration');
const db = require("quick.db");
module.exports = async(client, member, guild) => {
    if (enabled.Welcome === true) {
        let welcomeChannel = client.channels.cache.get(config.DiscordBot.welcome);

        if (Date.now() - member.user.createdAt < 432000000) {
            await member.ban({
                reason: "ALT account - Under 5days, created: " + humanizeDuration(Date.now() - member.user.createdAt, {
                    round: true
                })
            }) && welcomeChannel.send('Bonk, Created days ago: ' + humanizeDuration(Date.now() - member.user.createdAt, {
                round: true
            }))

        } else if (Date.now() - member.user.createdAt < 863136000) {
            await member.user.send(`Sorry! We only allow accounts over the age of 10days to join. \nYour account was created ${humanizeDuration(Date.now() - member.user.createdAt, {round: true})} ago.\n\nYou are welcome to join again once this account is over 10days old!`)
            await member.kick()
            welcomeChannel.send(member.user.tag + ` has been auto-kicked as account is under 10days old.\nThat account was created ${humanizeDuration(Date.now() - member.user.createdAt, {round: true})}, ago`)
        }

        member.roles.add(config.DiscordBot.roles.member)
        if (userData.get(member.id) == null) {
            welcomeChannel.send("Welcome <@" + member + "> to the DanBot Hosting MC Server. To get started please read <#898041835002400768> and <#898041837535776788>");
        } else {
            member.roles.add(config.DiscordBot.roles.client)
            welcomeChannel.send("Welcome back <@" + member + "> to the DanBot Hosting MC Server!");
        }

        if (mutesData.get(member.id) != null) {
            member.roles.add(config.DiscordBot.roles.mute)
        }

        //Invites

        let guildInvites = await member.guild.cache.fetchInvites()

        const ei = invites[member.guild.id];
        invites[member.guild.id] = guildInvites;
        const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
        const inviter = member.guild.members.get(invite.inviter.id);
        if (inviter == null) return;

        let embed = new Discord.MessageEmbed()
            .setColor(`GREEN`)
            .addField(`New Members Username:`, member.user.tag, true)
            .addField(`New Members ID:`, '`' + member.id + '`', true)
            .addField('Account created:', member.user.createdAt.toDateString(), true)
            .addField("Members Status", member.user.presence !== null && member.user.presence.status !== null ? member.user.presence.status : "Offline")
            .addField('\u200b', '\u200b')
            .addField(`Invited by:`, inviter.user.tag, true)
            .addField(`Inviter's ID:`, '`' + inviter.id + '`', true)
            .addField(`Invite code used:`, '`' + invite.code + '`', true)
            .addField(`Invite used`, invite.uses + ' times', true);

        client.channels.cache.get('1013126986354397324').send(embed)

        let inviteChannel = client.channels.cache.get('1013126598834262037');

        if (Object.keys(config.DiscordBot.invites).includes(invite.uses.toString())) {
            await inviter.removeRoles(Object.values(config.DiscordBot.invites))
            inviter.addRole(config.DiscordBot.invites[invite.uses.toString()]).then(() => {
                inviteChannel.send(`<@${inviter.id}> just hit ${invite.uses} invites! Here's a role for you :)`);
            })
        }
    }
}