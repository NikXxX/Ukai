const Command = require("../../structures/Command.js"),
  Discord = require("discord.js"),
  fetch = require("node-fetch");

class ShortURL extends Command {
  constructor(client) {
    super(client, {
      name: "shorturl",
      description: language => language.get("SHORTURL_DESCRIPTION"),
      usage: language => language.get("SHORTURL_USAGE"),
      examples: language => language.get("SHORTURL_EXAMPLES"),
      commandPath: __dirname,
      enabled: true,
      guildOnly: false,
      aliases: ["minimize"],
      clientPermissions: ["EMBED_LINKS"],
      memberPermissions: [],
      nsfw: false,
      ownerOnly: false,
      cooldown: 5000
    });
  }

  async run(message, args, data) {
    let url = args[0];
    if (!url) {
      return message.reply(
        message.language.get("SHORTURL_ERR_INVALID_URL")
      );
    }

    let res = await fetch(
      `https://is.gd/create.php?format=simple&url=${encodeURI(url)}`
    );
    let body = await res.text();

    if (body === "Error: Please enter a valid URL to shorten") {
      return message.reply(
        message.language.get("SHORTURL_ERR_INVALID_URL")
      );
    }

    let embed = new Discord.MessageEmbed()
      .setColor(data.config.embed.color)
      .setFooter(data.config.embed.footer)
      .setDescription(body);
    message.channel.send(embed);
  }
}

module.exports = ShortURL;
