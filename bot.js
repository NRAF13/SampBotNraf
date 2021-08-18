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
let Samp_IP = "s1.dewatarp.xyz"
let Samp_Port = 7777
/*const mysql = require('mysql');
const RowDataPacket = require('mysql/lib/protocol/packets/RowDataPacket');
const sqlcon = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'uirp'
})*/
/*sqlcon.connect()
sqlcon.query('SELECT * FROM `samp` WHERE `id` = 0', [], function(err,row){
    if(row)
    {
        var server_port = sqlcon.escape(row[0].ip)
        var server_ip = parseInt(row[0].port)
        console.log('Row ', server_port)
        console.log('Row port ', server_ip)
        Samp_IP = row[0].ip
        Samp_Port = row[0].port
        console.log('IP: ', Samp_IP)
        console.log('Port: ', Samp_Port)
    }
    //Samp_Port = result
})*/
const prefix = "!";

ticket.token(process.env.BOT_TOKEN)
ticket.prefix(prefix)

var options = {
    host: Samp_IP,
    port: Samp_Port
}
var s;
var p1;

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
            status = `${response['online']} Players | World Time: ${response['rules'].worldtime}`;
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
                        { name: '**Map**', value: 'Unknown', inline: false },
                        { name: '**Weburl**', value: 'Unknown', inline: false },
                        { name: '**Weather**', value: 'Unknown', inline: false },
                        { name: '**Status**', value: ':mt:Offline', inline: false },
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
                        { name: '**Map**', value: response['rules'].mapname, inline: false },
                        { name: '**Weburl**', value: response['rules'].weburl, inline: false },
                        { name: '**Weather**', value: response['rules'].weather, inline: false },
                        { name: '**Status**', value: ':up:Online', inline: false },
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
                { name: `**\`\`\`${prefix}takerole(OFF)\`\`\`**`, value: '**Taking some role on guild**', inline: false },
                { name: `**\`\`\`${prefix}stop\`\`\`**`, value: '**stop live stats**', inline: false },
                { name: `**\`\`\`${prefix}ping\`\`\`**`, value: '**getting ping**', inline: false },
                { name: `**\`\`\`${prefix}rr\`\`\`**`, value: '**start the reaction role**', inline: false },
                { name: `**\`\`\`${prefix}clean\`\`\`**`, value: '**clean message**', inline: false },
                { name: `**\`\`\`${prefix}invite\`\`\`**`, value: '**Support Us!**', inline: false },
                { name: `**\`\`\`${prefix}samp\`\`\`**`, value: '**Getting information on other server**', inline: false },
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
        .setTitle(`Announcement from ${msg.author.username}`)
        .setDescription(`**${params}**`)
        .setThumbnail(`${msg.author.displayAvatarURL({format: 'png', dynamic: true })}`)
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
    const ammount = parseInt(params)
    if(ammount)
    {
        if(params < 2 ||params > 100) return msg.reply('Invalid Ammound')
        msg.channel.bulkDelete(ammount, true).catch(err => {
            console.log(err)
            msg.reply("An Error has ocurred")
        })
    }
    else
    {
        msg.reply("Usage: ```!clean [ammount]```")
    }
}

/*function stats(msg,params)
{
    if(params)
    {
        sqlcon.query(`SELECT * FROM accounts WHERE nickname = '${params}' LIMIT 1`, [], function(err,row){
            if(row)
            {
                if(row.length)
                {
                    var sex
                    if(row[0].sex == 0)
                    {
                        sex = "Unknown"
                    }
                    else if(row[0].sex == 1)
                    {
                        sex = "Male"
                    }
                    else if(row[0].sex == 2)
                    {
                        sex = "Female"
                    }
                    const statsemb = new MessageEmbed()
                    .setTitle(`${row[0].nickname}`)
                    .setColor(0x800080)
                    .setAuthor(`${msg.author.username}`, msg.author.displayAvatarURL({format: 'png', dynamic: true }))
                    .setDescription(`Your stats:\n💵**Money:** $${row[0].money}\t\t\t🏧**Bank Money:** $${row[0].bank}\n🎚️**Level:** ${row[0].level}\t\t\t🧯**Exp:** ${row[0].exp}\n👫**Gender:** ${sex}\t\t\t🔞**Age:** ${row[0].age}\n🥩**Hungry:** ${row[0].satiety}%\t\t\t🥤**Thirsty:** ${row[0].haus}%`)
                    .setFooter(`Requested by ${msg.author.username}`)
                    .setTimestamp(new Date())
                    msg.channel.send(statsemb)
                }
                else
                {
                    msg.reply('Username not found!')
                }
            }
            else
            {
                msg.reply(`SQL ERROR: ${err}`)
            }
        })
    }
    else
    {
        msg.reply('USAGE: ```!stats [IC NAME]```')
    }
}*/

client.on('message', msg => {
    if(!msg.content.startsWith(prefix) || msg.author.bot) return
    const args = msg.content.trim().split(/\s+/g)
    const cmd = args.shift().toLowerCase()

    if(cmd == '!samp')
    {
        if(!args.length) return msg.channel.send("USAGE: !samp [Ip][Port]")
        else if(!args[1]) return msg.channel.send("You didn't input the port")
        else if(args[2]) return msg.channel.send("Error")

        let server_ip = args[0]
        let server_port = parseInt(args[1])
        console.log(`Debug: ${server_ip}:${server_port}`)
        var samp = {
            host: server_ip,
            port: server_port
        }
        query(samp, function(error,response){
            if(error)
            {
                msg.channel.send("Server Unavailable")
            }
            else
            {
                const serger = new MessageEmbed()
                .setTitle(`${response['hostname']}`)
                .setColor('#800080')
                .addFields(
                    { name: 'Gamemode', value: `${response['gamemode']}`, inline: false},
                    { name: 'Players', value: `${response['online']}/${response['maxplayers']}`, inline: false },
                    { name: 'Language', value: `${response['mapname']}`, inline: false},
                    { name: 'Version', value: `${response['rules'].version}`, inline: false},
                    { name: 'Website', value: `${response['rules'].weburl}`, inline: false},
                    { name: 'Map', value: `${response['rules'].mapname}`, inline: false}
                )
                .setThumbnail('https://dewatarp.xyz/DEWATA.png')
                .setFooter('Join us @dewatarp.xyz', 'https://dewatarp.xyz/DEWATA.png')
                .setTimestamp(new Date())
                 msg.channel.send(serger)
                 console.log(response)
            }
        })
    }
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
                        query(options, function(error,response){
                            if(error)
                            {
                                msg.edit("Server is Offline")
                            }
                            else
                            {
                                msg.edit(`${response['online']} Players`)
                            }
                        })
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
                        msg.mentions.members.first().kick().catch(err => {
                            console.log(err)//Debug
                            msg.reply("I Can't Kick This User")
                        });
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
                if(msg.channel.type == 'dm') return msg.reply("You can't use that here")
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
                if(msg.channel.type == 'dm') return msg.reply("You can't use that here")
                if(msg.member.hasPermission('MANAGE_MESSAGES'))
                {
                    msg.channel.bulkDelete(1)
                    clearmsg(msg, parameters.join(" "))
                }
                else
                {
                    msg.reply("You don't have permission")
                }
                break;
            case "invite":
                const inv = new MessageEmbed()
                .setTitle("DEWATA ROLEPLAY")
                .setDescription("Hello you can support us by invite our bot to your server. You can join to our samp server too\n**Join discord:\n__https://discord.dewatarp.xyz__**\n**Play on Our SAMP Server:\n__```css\ns1.dewatarp.xyz:1255\n```__**\n**Invite Me!:\n__https://discord.com/api/oauth2/authorize?client_id=838072866469445662&permissions=8&scope=bot__**\n***__Thanks to use me anyway!__***")
                .setColor(0x800080)
                .setImage('https://dewatarp.xyz/DEWATA.png')
                .setThumbnail('https://dewatarp.xyz/DEWATA.png')
                .setFooter("Join us @dewatarp.xyz")
                .setTimestamp(new Date())
                msg.channel.send(inv)
                break;
            /*case "stats":
                stats(msg, parameters.join(" "))
                break;*/
            case "help":
                helpinfo(msg)
                break;
        }
    }
})

client.login(process.env.BOT_TOKEN);
