import type { Meta, StoryObj } from "@storybook/react";
import type { NavbarProps } from "ui";
import { Navbar } from "ui";
import lightLogo from "ui/assets/wprdc-mark-light.png";
import darkLogo from "ui/assets/wprdc-mark-dark.png";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";

const meta: Meta<typeof Navbar> = {
  component: Navbar,
};

export default meta;

type Story = StoryObj<typeof Navbar>;

export const Primary: Story = {
  render: (props: NavbarProps) => <Navbar {...props} />,
  name: "Navbar",
  args: {
    logoSrc: lightLogo as StaticImport,
    darkLogoSrc: darkLogo as StaticImport,
    logoProps: {},
  },
};
