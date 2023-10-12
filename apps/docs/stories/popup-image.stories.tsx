import type { Meta, StoryObj } from "@storybook/react";
import type { PopupImageProps } from "ui";
import { PopupImage } from "ui";
import pic from "../assets/Portrait-of-tabby-cat-.jpeg";

const meta: Meta<typeof PopupImage> = {
  component: PopupImage,
};

export default meta;

type Story = StoryObj<typeof PopupImage>;

export const Primary: Story = {
  render: (props: PopupImageProps) => <PopupImage {...props} />,
  name: "Popup Image",
  args: {
    src: pic as string,
    width: 400,
    height: 300,
  },
};
