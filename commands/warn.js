var Discord = require('discord.js');



exports.run = async(client, msg, args) => {
    if(!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.reply('<a:RMX:747720808541061190> You do not have perms for this');

    var user = msg.mentions.users.first();
    if(!user) return msg.reply('<a:RMX:747720808541061190> You didn\'t mention anyone!');

    var member;

    try {
        member = await msg.guild.members.fetch(user);
    } catch(err) {
        member= null;
    }

    if(!member) return msg.reply('<a:RMX:747720808541061190> They aren\'t in the server!')

    var reason = args.splice(1).join(' ');
    if(!reason) return msg.reply('<a:RMX:747720808541061190> You need to give a reason!')

    var channel = msg.guild.channels.cache.find(c => c.name === 'logs');

    var log = new Discord.MessageEmbed()
    .setTitle('User Warned')
    .addField('User:', user, true)
    .addField('By:', msg.author, true)
    .addField('Reason:', reason)
    channel.send(log);

    var embed = new Discord.MessageEmbed()
    .setTitle('You were warned')
    .setColor('#ad4056')
    .setDescription(reason)

    try {
        user.send(embed);
    } catch(err) {
        console.warn(err);
    }

    msg.channel.send(`<a:tik:741685150114644020> **${user}** has been warned by **${msg.author}**!`)
}

