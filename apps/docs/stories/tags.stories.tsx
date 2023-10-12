import type { Meta, StoryObj } from "@storybook/react";
import type { TagsProps } from "ui";
import { Tags, Tag } from "ui";

const meta: Meta<typeof Tags> = {
  component: Tags,
};

export default meta;

type Story = StoryObj<typeof Tags>;

export const Primary: Story = {
  render: (props: TagsProps) => (
    <Tags {...props}>
      <Tag>Stuff</Tag>
      <Tag>Things</Tag>
      <Tag>One more</Tag>
    </Tags>
  ),
  name: "Tags",
  args: {
    size: "M",
  },
};

export const TagsAsProps: Story = {
  render: (props: TagsProps) => <Tags {...props} />,
  name: "Tags as Props",
  args: {
    size: "M",
    tags: [
      { id: 1, label: "stuff" },
      { id: 2, label: "things" },
      { id: 3, label: "more stuff" },
      { id: 4, label: "other things" },
    ],
  },
};
