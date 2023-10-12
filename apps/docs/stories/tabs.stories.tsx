import type { Meta, StoryObj } from "@storybook/react";
import type { TabsProps } from "ui";
import { Tabs, Item } from "ui";

const meta: Meta<typeof Tabs> = {
  component: Tabs,
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Primary: Story = {
  render: (props: TabsProps) => (
    <Tabs {...props}>
      <Item key="thing" title="hello">
        This is a thing of sorts
      </Item>
      <Item key="thing2" title="Boop">
        This is another thing
      </Item>
    </Tabs>
  ),
  name: "Tabs",
  args: {},
};
