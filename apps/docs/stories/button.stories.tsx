import type { Meta, StoryObj } from "@storybook/react";
import type { ButtonProps } from "@wprdc/ui";
import { Button } from "@wprdc/ui";

const meta: Meta<ButtonProps> = {
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  render: (props: ButtonProps) => (
    <Button {...props} dense>
      Hello
    </Button>
  ),
  name: "Button",
  args: {
    children: "Hello",
    type: "button",
  },
};
