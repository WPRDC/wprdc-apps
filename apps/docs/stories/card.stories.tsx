import type { Meta, StoryObj } from "@storybook/react";
import type { CardProps } from "ui";
import { Card } from "ui";
import pic from "../assets/Portrait-of-tabby-cat-.jpeg";

const meta: Meta<typeof Card> = {
  component: Card,
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Primary: Story = {
  render: (props: CardProps) => (
    <div style={{ maxWidth: 300 }}>
      <Card {...props} />
    </div>
  ),
  name: "Card",
  args: {
    title: "I'm a card",
    subtitle: "I display content about a single thing.",
    thumbnailSrc: pic as string,
    children:
      "Atque debitis corrupti iure architecto non mollitia." +
      "Et facilis est nisi aspernatur eveniet. Hic ut odio quia odit aut qui.",
  },
};
