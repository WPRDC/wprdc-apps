import type { Meta, StoryObj } from "@storybook/react";
import type { ButtonProps } from "ui";
import { Button } from "ui";

const meta: Meta<ButtonProps> = {
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
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
