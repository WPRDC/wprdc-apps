import type { Meta, StoryObj } from "@storybook/react";
import { useOverlayTrigger } from "react-aria";
import { useOverlayTriggerState } from "react-stately";
import { Modal, Button } from "ui";

const meta: Meta<typeof Modal> = {
  component: Modal,
};

export default meta;

type Story = StoryObj<typeof Modal>;

function Demo() {
  const state = useOverlayTriggerState({});
  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: "dialog" },
    state,
  );

  return (
    <div>
      <Button {...triggerProps}>Open the Modal</Button>

      <Modal state={state}>
        <div {...overlayProps} style={{ height: 100 }}>
          I&apos;m modal content!
        </div>
      </Modal>
    </div>
  );
}

export const Primary: Story = {
  render: () => <Demo />,
  name: "Modal",
  args: {},
};
