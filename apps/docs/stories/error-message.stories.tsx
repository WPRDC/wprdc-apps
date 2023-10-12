import type { Meta, StoryObj } from "@storybook/react";
import type { ErrorMessageProps } from "ui";
import { ErrorMessage } from "ui";

const meta: Meta<typeof ErrorMessage> = {
  component: ErrorMessage,
};

export default meta;

type Story = StoryObj<typeof ErrorMessage>;

export const Primary: Story = {
  render: (props: ErrorMessageProps) => <ErrorMessage {...props} />,
  name: "Error Message",
  args: {
    variant: "",
  },
};
