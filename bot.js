const { Client, MessageEmbed, Channel, Message } = require('discord.js');
const discord = require('discord.js')
const { get } = require('request');
const client = new Client;
global.config = require("./config.json")
const query = require("samp-query");
const { getServerPing, getServerOnline } = require('./src/samp.js')
require('discord-buttons')(client)
const { MessageButton, MessageActionRow } = require('discord-buttons')
const ticket = require('djs-tickets')
const prefix = "!";
let Samp_IP = "18.141.24.112";
let Samp_Port = 1255;

ticket.token(config.token)
ticket.prefix(prefix)

var options = {
    host: Samp_IP,
    port: Samp_Port
}
var s;

client.on('ready', () => {
    console.log(`Bot ${client.user.tag} is going online!!`);
    UpdateStatus();setInterval(UpdateStatus,30000)
});

function CreateButton(msg)
{
    const embd = new MessageEmbed()
    .setTitle("Reaction Roles")
    .setColor(0x800080)
    .setDescription("Press the button to get roles <@&805473200422649876>")

    const add = new MessageButton()
    .setStyle("green")
    .setLabel("Take")
    .setID("1")

    msg.channel.send({buttons: add, embed: embd})
}

client.on('clickButton', async (button) => {
    if(button.id == '1')
    {
        button.reply.send(`You gain role <@&805473200422649876>`, true)
        const role = button.guild.roles.cache.get('805473200422649876')
        const member = button.clicker.member
        await member.roles.add(role)
    }
})

function UpdateStatus()
{
    const randpesan = [
        "DEWATA ROLEPLAY",
        "#DEWATARP",
        "Join us @dewatarp.xyz"
    ];
    const randommes = Math.floor(Math.random() * (randpesan.length));
    const newRandomMes = randpesan[randommes];
    const randstatus = [
        "PLAYING",
        "STREAMING",
        "LISTENING",
        "COMPETING",
        "WATCHING"
    ]
    const randomstats = Math.floor(Math.random() * (randstatus.length));
    const newRandomStats = randstatus[randomstats]
    query(options, function(error, response){
        if(error)
        {
            status = "SERVER OFFLINE";
            client.user.setActivity(status, {type: `${newRandomStats}`});
        }
        else
        {
            status = `${response['online']} Players | ${newRandomMes}`;
            client.user.setActivity(status, {type: `${newRandomStats}`});
        }
    })
}

function getServerInfo(msg)
{
    getServerPing("s1.dewatarp.xyz", 1255, function(error,response){
        if(!error)
        {
            spg = `${response}ms`
        }
        else
        {
            spg = "0ms"
        }
    })
    const randpesan = [
        "**```DEWATA ROLEPLAY```**",
        "**```#DEWATARP```**",
        "**```Join us @dewatarp.xyz```**"
    ];
    const randommes = Math.floor(Math.random() * (randpesan.length));
    const newRandomMes = randpesan[randommes];
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
                        { name: '**Server Name**', value: 'Dewata Roleplay', inline: false },
                        { name: '**Website**', value: 'https://dewatarp.xyz/', inline: false },
                        { name: '**IP**', value: 'dewatarp.xyz', inline: false },
                        { name: '**Gamemode**', value: 'DRP v2.1.3b', inline: false },
                        { name: '**Language**', value: 'Bahasa Indonesia', inline: false },
                        { name: '**Status**', value: '🔴Offline', inline: false },
                        { name: '**Players**', value: '0/100', inline: false },
                        { name: '**Ping**', value: '0ms', inline: false },
                        { name: '**Pesan**', value: `${newRandomMes}`, inline: false },
                    ],
                    thumbnail: {
                        url: 'https://dewatarp.xyz/DEWATA.png',
                    },
                    timestamp: new Date(),
                    footer: {
                        text: 'DEWATA ROLEPLAY',
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
                        { name: '**Server Name**', value: response['hostname'], inline: false },
                        { name: '**Website**', value: 'https://dewatarp.xyz/', inline: false },
                        { name: '**IP**', value: 'dewatarp.xyz', inline: false },
                        { name: '**Gamemode**', value: response['gamemode'], inline: false },
                        { name: '**Language**', value: response['mapname'], inline: false },
                        { name: '**Status**', value: ':green_circle:Online', inline: false },
                        { name: '**Players**', value: `${response['online']}/${response['maxplayers']}`, inline: false },
                        { name: '**Ping**', value: `${spg}`, inline: false },
                        { name: '**Pesan**', value: `${newRandomMes}`, inline: false },
                    ],
                    thumbnail: {
                        url: 'https://dewatarp.xyz/DEWATA.png',
                    },
                    timestamp: new Date(),
                    footer: {
                        text: 'DEWATA ROLEPLAY',
                    }
                }
            }
            msg.edit(logMessage);
        }
    })
}
function ServerStatus(msg)
{
    getServerPing("s1.dewatarp.xyz", 1255, function(error,response){
        if(!error)
        {
            spg = `${response}ms`
        }
        else
        {
            spg = "0ms"
        }
    })
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
                        { name: '**Server Name**', value: 'Dewata Roleplay', inline: false },
                        { name: '**Website**', value: 'https://dewatarp.xyz/', inline: false },
                        { name: '**IP**', value: 'dewatarp.xyz', inline: false },
                        { name: '**Gamemode**', value: 'DRP v2.1.3b', inline: false },
                        { name: '**Language**', value: 'Bahasa Indonesia', inline: false },
                        { name: '**Status**', value: '🔴Offline', inline: false },
                        { name: '**Players**', value: '0/100', inline: false },
                        { name: '**Ping**', value: '0ms', inline: false },
                    ],
                    thumbnail: {
                        url: 'https://dewatarp.xyz/DEWATA.png',
                    },
                    timestamp: new Date(),
                    footer: {
                        text: 'DEWATA ROLEPLAY',
                    }
                }
            }
            msg.channel.send(logMessage);
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
                        { name: '**Server Name**', value: response['hostname'], inline: false },
                        { name: '**Website**', value: 'https://dewatarp.xyz/', inline: false },
                        { name: '**IP**', value: 'dewatarp.xyz', inline: false },
                        { name: '**Gamemode**', value: response['gamemode'], inline: false },
                        { name: '**Language**', value: response['mapname'], inline: false },
                        { name: '**Status**', value: ':green_circle:Online', inline: false },
                        { name: '**Players**', value: `${response['online']}/${response['maxplayers']}`, inline: false },
                        { name: '**Ping**', value: `${spg}`, inline: false },
                    ],
                    thumbnail: {
                        url: 'https://dewatarp.xyz/DEWATA.png',
                    },
                    timestamp: new Date(),
                    footer: {
                        text: 'DEWATA ROLEPLAY',
                    }
                }
            }
            msg.channel.send(logMessage);
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
                { name: `**\`\`\`${prefix}help\`\`\`**`, value: '**list cmd**', inline: false },
                { name: `**\`\`\`${prefix}status\`\`\`**`, value: '**get server status**', inline: false },
                { name: `**\`\`\`${prefix}players\`\`\`**`, value: '**get players online**', inline: false },
                { name: `**\`\`\`${prefix}start\`\`\`**`, value: '**starting a live stats**', inline: false },
                { name: `**\`\`\`${prefix}takerole [IC NAME]\`\`\`**`, value: '**Taking some role on guild**', inline: false },
                { name: `**\`\`\`${prefix}stop\`\`\`**`, value: '**stop live stats**', inline: false },
                { name: `**\`\`\`${prefix}ping\`\`\`**`, value: '**getting ping**', inline: false },
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
    msg.channel.send(logMessage);
}

function pengumuman (msg,params)
{
    if(params)
    {
        msg.channel.send("@everyone")
        const ann = new MessageEmbed()
        .setTitle("Announcement")
        .setDescription(`**${params}**`)
        .setFooter("DEWATA ROLEPLAY")
        .setTimestamp(new Date())
        .setColor("ff0000")

        msg.channel.send(ann)
    }
    else
    {
        msg.channel.send("Usage: ```!ann [Text]```")
    }
}

function clearmsg(msg,params)
{
    if(params)
    {
        msg.channel.bulkDelete(params)
    }
    else
    {
        msg.reply("Usage: ```!clean [ammount]```")
    }
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
                var p1
                msg.channel.send(`Checking players...`)
                .then(msg => {
                    setTimeout(function(){
                        query(options, function(error,response){
                            if(error)
                            {
                                p1 = "Server is now Offline"
                            }
                            else
                            {
                                p1 = `${response['online']}`
                            }
                        })
                        msg.edit(`${p1} Players`)
                    }, 1000)
                })
                break;
            case "status":
                ServerStatus(msg);
                break;
            case "start":
                if(msg.member.roles.cache.has('805471217565433927'))
                {
                    msg.channel.bulkDelete(1)
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
                if(msg.member.roles.cache.has('805471217565433927'))
                {
                    if(!s) 
                    {
                        msg.reply("I Can't find any live Statistics running")
                    }
                    else
                    {
                        msg.react('👍')
                        clearInterval(s)
                    }
                }
                else
                {
                    msg.reply("You don't have permission")
                }
                break;
            /*case "takerole"://805473200422649876
                if(msg.channel.id != '859981291893424139') return
                if(msg.member.roles.cache.has('805473200422649876')) return msg.reply("You already have!")
                //if(msg.guild.members(guild.owner)) return msg.reply("I Can't Add Role For You")
                msg.member.roles.add('805473200422649876').then(msg.channel.send("You gain a role <@&805473200422649876>"))
                break;*/
            case "ping":
                var svping;
                getServerPing("s1.dewatarp.xyz", 7777, function(error,response){
                    if(error)
                    {
                        svping = `Server Ping: 0ms`
                    }
                    else
                    {
                        svping = `Server Ping: ${response}ms`
                    }
                })
                msg.channel.send("Calculating ping...")
                .then(message => {
                    setTimeout(function(){
                        var ping = message.createdTimestamp - msg.createdTimestamp 
                        message.edit(`Latency: ${ping}ms\n${svping}`)
                    }, 1000)
                })
                break;
            case "tendang":
                if(msg.member.roles.cache.has('805471217565433927'))
                {
                    if(msg.mentions.members.first()){
                        msg.mentions.members.first().kick().catch(msg.reply("I Can't kick this user"));
                    }
                    else
                    {
                        msg.reply("Plesae tag someone, EX:```!tendang @Alpa#1234```")
                    }
                }
                else
                {
                    msg.reply("You don't have permission")
                }
                break;
            case "rr":
                if(msg.channel.id != '859981291893424139') return
                if(!msg.member.hasPermission('ADMINISTRATOR')) return msg.reply("You can't use that")
                msg.channel.bulkDelete(1)
                CreateButton(msg)
                break;
            case "ann":
                if(msg.member.hasPermission('ADMINISTRATOR'))
                {
                    msg.channel.bulkDelete(1)
                    pengumuman(msg, parameters.join(" "))
                }
                else
                {
                    msg.reply("You don't have permission")
                }
                break;
            case "clean":
                if(msg.member.hasPermission('ADMINISTRATOR'))
                {
                    msg.channel.bulkDelete(1)
                    clearmsg(msg, parameters.join(" "))
                }
                else
                {
                    msg.reply("You don't have permission")
                }
                break;
            case "help":
                helpinfo(msg)
                break;
        }
    }
})

client.login(config.token);