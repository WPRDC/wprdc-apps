import type { Meta, StoryObj } from "@storybook/react";
import type { LoadingMessageProps } from "ui";
import { LoadingMessage } from "ui";

const meta: Meta<typeof LoadingMessage> = {
  component: LoadingMessage,
};

export default meta;

type Story = StoryObj<typeof LoadingMessage>;

export const Primary: Story = {
  render: (props: LoadingMessageProps) => <LoadingMessage {...props} />,
  name: "Loading Message",
  args: {
    size: "L",
  },
};
