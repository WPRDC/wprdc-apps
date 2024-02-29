import type { Meta, StoryObj } from "@storybook/react";
import type { BreadcrumbsProps } from "@wprdc/ui";
import { A, Breadcrumb, Breadcrumbs } from "@wprdc/ui";

const meta: Meta<typeof Breadcrumbs> = {
  component: Breadcrumbs,
};

export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

export const Primary: Story = {
  render: (props: BreadcrumbsProps<object>) => (
    <Breadcrumbs {...props}>
      <Breadcrumb>
        <A href="#">Home</A>
      </Breadcrumb>
      <Breadcrumb>
        <A href="#">Intermediate</A>
      </Breadcrumb>
      <Breadcrumb>Last</Breadcrumb>
    </Breadcrumbs>
  ),
  name: "Breadcrumbs",
  args: {},
};
