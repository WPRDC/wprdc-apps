import type { Meta, StoryObj } from "@storybook/react";
import type { RadioGroupProps } from "ui";
import { RadioGroup, Radio } from "ui";

const meta: Meta<typeof RadioGroup> = {
  component: RadioGroup,
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Primary: Story = {
  render: (props: RadioGroupProps) => (
    <RadioGroup {...props}>
      <Radio value="1">One</Radio>
      <Radio value="2">Two</Radio>
      <Radio value="3">Three</Radio>
    </RadioGroup>
  ),
  name: "Radio Group",
  args: {},
};
