import type { Meta, StoryObj } from "@storybook/react";
import type { TextFieldProps } from "ui";
import { TextField } from "ui";

const meta: Meta<typeof TextField> = {
  component: TextField,
};

export default meta;

type Story = StoryObj<typeof TextField>;

export const Primary: Story = {
  render: (props: TextFieldProps) => <TextField {...props} />,
  name: "Text Field",
  args: {},
};
