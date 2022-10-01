import type {
  ButtonInteraction,
  CommandInteraction,
  GuildMember,
  MessageActionRowComponentBuilder,
  User,
  TextChannel,
} from "discord.js";
import {
  ActionRowBuilder,
  ApplicationCommandOptionType,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";
import { ButtonComponent, Discord, Slash, SlashOption } from "discordx";

@Discord()
export class Command {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  @Slash({
    name: "verify",
    description: "Verify yourself and join Leagues of Code!",
  })
  async verify(
    @SlashOption({
      description: "Enter your real name",
      name: "name",
      required: true,
      type: ApplicationCommandOptionType.String,
    })
    name: string | undefined,
    interaction: CommandInteraction
  ): Promise<void> {
    this.name = name!;

    await interaction.deferReply({ ephemeral: true });

    // Class Buttons
    const PythonButton = new ButtonBuilder()
      .setLabel("Python")
      .setEmoji("<:python:1025584887337590834>")
      .setStyle(ButtonStyle.Primary)
      .setCustomId("python");

    const CplusButton = new ButtonBuilder()
      .setLabel("C++")
      .setEmoji("<:cplus:1025584885034913802>")
      .setStyle(ButtonStyle.Primary)
      .setCustomId("cplus");

    // Button rows
    const row =
      new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
        PythonButton,
        CplusButton
      );

    // Selector
    await interaction.editReply({
      content: `${name}, Select your course!`,
      components: [row],
    });
  }

  // Events after button press
  @ButtonComponent({ id: "python" })
  PythonButton(interaction: ButtonInteraction): void {
    interaction.reply({
      ephemeral: true,
      content: `***${this.name}***, you've sent a verification request of **Python**<:python:1025584887337590834>! ${interaction.member}\nWait for an admin to approve your request.`,
    });
  }

  @ButtonComponent({ id: "cplus" })
  CplusButton(interaction: ButtonInteraction): void {
    interaction.reply({
      ephemeral: true,
      content: `***${this.name}***, you've sent a verification request of **C++**<:cplus:1025584885034913802>! ${interaction.member}\nWait for an admin to approve your request.`,
    });
  }
}
