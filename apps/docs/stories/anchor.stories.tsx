import type { Meta, StoryObj } from "@storybook/react";
import type { AProps } from "@wprdc/ui";
import { A } from "@wprdc/ui";

const meta: Meta<typeof A> = {
  component: A,
};

export default meta;

type Story = StoryObj<typeof A>;

export const Primary: Story = {
  render: (props: AProps) => (
    <div>
      Links might ask you to &quot;
      <A {...props} />
      .&quot;
    </div>
  ),
  name: "Anchor",
  args: {
    href: "#",
    children: "click me please",
  },
};
