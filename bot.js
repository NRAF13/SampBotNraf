const { Client, MessageEmbed, Channel, Message } = require('discord.js');
const client = new Client;
global.config = require("./config.json")
const query = require("samp-query");
const prefix = "!";
let Samp_IP = "18.141.24.112";
let Samp_Port = 7777;
var channelid = '837571530904043601';

var options = {
    host: Samp_IP,
    port: Samp_Port
}
var s;

client.on('ready', () => {
    console.log(`Bot ${client.user.tag} is going online!!`);
    UpdateStatus();setInterval(UpdateStatus,1000);
    query(options, function(error, response){
        if(error)
        {
            status = "0 Players";
            count = 0;
            client.user.setActivity(status, {type: 'WATCHING'});
        }
        else
        {
            client.user.setActivity("0 Players", {type: 'WATCHING'});
        }
    })
    const interval = setInterval(function setStatus(){
        UpdateStatus();
        return setStatus;
    }, 30000)
});

function UpdateStatus()
{
    query(options, function(error, response){
        if(error)
        {
            status = "0 Players";
            client.user.setActivity(status, {type: 'PLAYING'});
        }
        else
        {
            status = `${response['online']} Players`;
            client.user.setActivity(status, {type: 'PLAYING'});
        }
    })
}

function getServerInfo(msg)
{
    query(options, function(error, response){
        if(error)
        {
            const embedColor = 0xff0000;

            const logMessage = {
                embed: {
                    title: 'DEWATA ROLEPLAY',
                    color: embedColor,
                    url: 'https://dewatarp.xyz/',
                    fields: [
                        { name: 'Server Name', value: 'Dewata Roleplay', inline: false },
                        { name: 'Website', value: 'https://dewatarp.xyz', inline: false },
                        { name: 'Ip', value: 'dewatarp.xyz', inline: false },
                        { name: 'Gamemode', value: 'DRP v2.1.3b', inline: false },
                        { name: 'Language', value: 'Bahasa Indonesia', inline: false },
                        { name: 'Status', value: '🔴Offline', inline: false },
                        { name: 'Players', value: '0/100', inline: false },
                    ],
                    thumbnail: {
                        url: 'https://dewatarp.xyz/DEWATA.png',
                    },
                    timestamp: new Date(),
                    footer: {
                        text: 'Join us @dewatarp.xyz',
                    }
                }
            }
            msg.edit(logMessage);
        }
        else
        {
            const embedColor = 0x800080;

            const logMessage = {
                embed: {
                    title: 'DEWATA ROLEPLAY',
                    color: embedColor,
                    url: 'https://dewatarp.xyz/',
                    fields: [
                        { name: 'Server Name', value: response['hostname'], inline: false },
                        { name: 'Website', value: 'https://dewatarp.xyz', inline: false },
                        { name: 'Ip', value: 'dewatarp.xyz', inline: false },
                        { name: 'Gamemode', value: response['gamemode'], inline: false },
                        { name: 'Mapname', value: response['mapname'], inline: false },
                        { name: 'Status', value: ':green_circle:Online', inline: false },
                        { name: 'Players', value: `${response['online']}/${response['maxplayers']}`, inline: false },
                    ],
                    thumbnail: {
                        url: 'https://dewatarp.xyz/DEWATA.png',
                    },
                    timestamp: new Date(),
                    footer: {
                        text: 'Join us @dewatarp.xyz',
                    }
                }
            }
            msg.edit(logMessage);
        }
    })
}
function helpinfo(msg)
{
    const embedColor = 0x800080;

    const logMessage = {
        embed: {
            title: 'List Command',
            color: embedColor,
            fields: [
                { name: `\`\`\`${prefix}help\`\`\``, value: 'list cmd', inline: false },
                { name: `\`\`\`${prefix}info\`\`\``, value: 'get server info', inline: false },
                { name: `\`\`\`${prefix}players\`\`\``, value: 'get players online', inline: false },
                { name: `\`\`\`${prefix}start\`\`\``, value: 'starting a live stats (beta)', inline: false },
                { name: `\`\`\`${prefix}takerole [IC NAME]\`\`\``, value: 'Taking some role on guild', inline: false },
                { name: `\`\`\`${prefix}stop\`\`\``, value: 'stop live stats', inline: false },
                { name: `\`\`\`${prefix}ping\`\`\``, value: 'getting ping', inline: false },
            ],
        }
    }
    msg.channel.send(logMessage);
}

client.on('message', msg => {
    if(msg.content.charAt(0) == prefix)
    {
        const request = msg.content.substr(1);
        let command, parameters = [];

        if(request.indexOf(" ") !== -1)
        {
            command = request.substr(0, request.indexOf(" "));
            parameters = request.split(" ");
            parameters.shift();
        }
        else
        {
            command = request;
        }
        switch(command.toLowerCase())
        {
            case "players":
                msg.channel.send(`Checking players...`)
                .then(msg => {
                    setTimeout(function(){
                        query(options, function (error, response) {
                            if(error)
                            {
                                msg.edit(`Server is now offline`)
                            }
                            else
                            {
                                msg.edit(`Players: ${response['online']}`)
                            }
                        })
                    }, 1000)
                })
                break;
            case "info":
                msg.channel.send(`Getting server info...`)
                .then(msg => {
                    setTimeout(function() {
                        getServerInfo(msg)
                    }, 1000)
                })
                break;
            case "start":
                if(msg.member.roles.has('805471217565433927'))
                {
                    msg.delete(command)
                    msg.channel.send('ONLINE STATUS')
                    .then(msg => {
                        s = setInterval(function() {
                            getServerInfo(msg)
                        }, 2000)
                    })
                }
                else
                {
                    msg.reply("You don't have permission")
                }
                break;
            case "stop":
                if(msg.member.roles.has('805471217565433927'))
                {
                    msg.react('👍')
                    clearInterval(s)
                }
                else
                {
                    msg.reply("You don't have permission")
                }
                break;
            case "takerole":
                if(msg.channel.id != '813750075736981534') return msg.channel.send("You can't use that command here")
                if(msg.member.roles.has('805473200422649876')) return msg.reply("You have role <@&805473200422649876>")
                if(msg.channel.type == "dm") return msg.channel.send("You can't use that on dm!!")
                let role = msg.guild.roles.find(r => r.id == "805473200422649876");
                let member = msg.mentions.members.first();
                if(!parameters.length) return msg.channel.send("Please input your rp name")
                const nick = "[WARGA]" + parameters.join("  ")
                if(nick.length > 32) return msg.channel.send("Your name is to long")
                msg.member.addRoles(role).catch(console.error)
                msg.member.setNickname(nick)
                msg.channel.send("You gain role <@&805473200422649876>");
                break;
            case "ping":
                msg.channel.send("Calculating ping...")
                .then(message => {
                    setTimeout(function(){
                        var ping = message.createdTimestamp - msg.createdTimestamp 
                        message.edit(`${ping}ms`)
                    }, 1000)
                })
                break;
            case "help":
                helpinfo(msg)
                break;
            default:
                msg.reply(`Unknown command`);
        }
    }
})

client.login(config.token);