import type { Meta, StoryObj } from "@storybook/react";
import type { MenuButtonProps } from "ui";
import { Section, Item, MenuButton } from "ui";

const meta: Meta<typeof MenuButton> = {
  component: MenuButton,
};

export default meta;

type Story = StoryObj<typeof MenuButton>;

export const Primary: Story = {
  render: (props: MenuButtonProps<object>) => (
    <MenuButton {...props}>
      <Section>
        <Item key="stuff">Stuff</Item>
        <Item key="things">Things</Item>
        <Item key="coral">Coral</Item>
      </Section>
      <Section>
        <Item key="stuff2">Stuff</Item>
        <Item key="things2">Things</Item>
        <Item key="coral2">Coral</Item>
      </Section>
    </MenuButton>
  ),
  name: "Menu",
  args: {
    label: "Open Me",
    onAction: alert,
  },
};
