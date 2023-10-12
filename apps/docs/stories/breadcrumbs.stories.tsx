import type { Meta, StoryObj } from "@storybook/react";
import type { BreadcrumbsProps } from "ui";
import { Breadcrumbs, BreadcrumbItem } from "ui";

const meta: Meta<typeof Breadcrumbs> = {
  component: Breadcrumbs,
};

export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

export const Primary: Story = {
  render: (props: BreadcrumbsProps) => (
    <Breadcrumbs {...props}>
      <BreadcrumbItem>Hey</BreadcrumbItem>
      <BreadcrumbItem href="#">There</BreadcrumbItem>
      <BreadcrumbItem href="#">Saylor</BreadcrumbItem>
    </Breadcrumbs>
  ),
  name: "Breadcrumbs",
  args: {},
};

export const BigTitle: Story = {
  render: (props: BreadcrumbsProps) => (
    <Breadcrumbs {...props} bigTitle>
      <BreadcrumbItem>Hey</BreadcrumbItem>
      <BreadcrumbItem href="#">There</BreadcrumbItem>
      <BreadcrumbItem href="#">Saylor</BreadcrumbItem>
    </Breadcrumbs>
  ),
  name: "with big title",
  args: {},
};
