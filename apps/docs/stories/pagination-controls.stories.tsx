import type { Meta, StoryObj } from "@storybook/react";
import type { PaginationControlsProps } from "ui";
import { PaginationControls } from "ui";

const meta: Meta<typeof PaginationControls> = {
  component: PaginationControls,
};

export default meta;

type Story = StoryObj<typeof PaginationControls>;

export const Primary: Story = {
  render: (props: PaginationControlsProps) => <PaginationControls {...props} />,
  name: "Pagination Controls",
  args: {
    pageCount: 4,
    currentPage: 1,
    makeHref: () => "#",
  },
};
