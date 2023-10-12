import type { Meta, StoryObj } from "@storybook/react";
import type { HeadingProps } from "ui";
import { Heading, H1, H2, H3, H4, H5, H6 } from "ui";

const meta: Meta<typeof Heading> = {
  component: Heading,
};

export default meta;

type Story = StoryObj<typeof Heading>;

export const Primary: Story = {
  render: (props: HeadingProps) => <Heading {...props} />,
  name: "Heading",
  args: {
    level: 1,
    children: "Heading",
  },
};

export const Comparative: Story = {
  render: () => (
    <div>
      <H1>Heading level 1</H1>
      <H2>Heading level 2</H2>
      <H3>Heading level 3</H3>
      <H4>Heading level 4</H4>
      <H5>Heading level 5</H5>
      <H6>Heading level 6</H6>
    </div>
  ),
};
