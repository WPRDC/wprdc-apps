import type { Meta, StoryObj } from "@storybook/react";
import type { ParsedHTMLProps } from "ui";
import { defaultReplacers, ParsedHTML, makeReplacer } from "ui";

const meta: Meta<typeof ParsedHTML> = {
  component: ParsedHTML,
};

export default meta;

type Story = StoryObj<typeof ParsedHTML>;

export const Primary: Story = {
  render: (props: ParsedHTMLProps) => <ParsedHTML {...props} />,
  name: "Parsed Html",
  args: {
    replacer: makeReplacer(defaultReplacers),
    children: '<p>This paragraph has <a href="#">a link</a> in it!</p>',
  },
};
