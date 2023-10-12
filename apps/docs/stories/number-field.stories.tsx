import type { Meta, StoryObj } from "@storybook/react";
import type { NumberFieldProps } from "ui";
import { NumberField } from "ui";

const meta: Meta<typeof NumberField> = {
  component: NumberField,
};

export default meta;

type Story = StoryObj<typeof NumberField>;

export const Primary: Story = {
  render: (props: NumberFieldProps) => <NumberField {...props}></NumberField>,
  name: "Number Field",
  args: {},
};
