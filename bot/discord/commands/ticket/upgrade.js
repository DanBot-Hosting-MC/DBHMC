exports.run = async(client, message, args) => {
    let staffRole = message.guild.roles.cache.get('1013123952526241863');

    if (message.channel.name.includes('-ticket')) {
        message.reply("Only admins can see this ticket now.")
        await message.channel.updateOverwrite('1013123952526241863', {
            VIEW_CHANNEL: false,
            SEND_MESSAGES: false,
            READ_MESSAGE_HISTORY: false
        });
    } else {
        message.channel.send('This command is only to be used inside of ticket channels.')
    }
}
