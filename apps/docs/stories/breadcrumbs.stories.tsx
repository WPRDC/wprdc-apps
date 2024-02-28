import type { Meta, StoryObj } from "@storybook/react";
import type { BreadcrumbsProps } from "@wprdc/ui";
import { Breadcrumbs } from "@wprdc/ui";

const meta: Meta<typeof Breadcrumbs> = {
  component: Breadcrumbs,
};

export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

export const Primary: Story = {
  render: (props: BreadcrumbsProps) => <Breadcrumbs {...props} />,
  name: "Breadcrumbs",
  args: {},
};
