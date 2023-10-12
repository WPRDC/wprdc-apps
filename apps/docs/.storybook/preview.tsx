import * as React from "react";
import { Preview } from "@storybook/react";
import { addons } from "@storybook/preview-api";
import { DARK_MODE_EVENT_NAME } from "storybook-dark-mode";
import { STORY_ARGS_UPDATED } from "@storybook/core-events";
import "ui/dist/index.css";
const channel = addons.getChannel();

// create a component that listens for the DARK_MODE event
function ThemeWrapper(props) {
  const [isDark, setDark] = React.useState(false);

  React.useEffect(() => {
    // listen to DARK_MODE event
    channel.on(DARK_MODE_EVENT_NAME, setDark);
    return () => channel.off(DARK_MODE_EVENT_NAME, setDark);
  }, [channel, setDark]);

  React.useEffect(() => {
    // listen to DARK_MODE event
    channel.on(STORY_ARGS_UPDATED, console.log);
    return () => channel.off(STORY_ARGS_UPDATED, console.log);
  }, [channel]);

  // render your custom theme provider
  return (
    <div
      className="ui-text-text dark:ui-text-textDark dark:ui-bg-backgroundDark ui-bg-background"
      style={{ padding: "2em" }}
    >
      {props.children}
    </div>
  );
}

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#f5f5f4",
        },
        {
          name: "dark",
          value: "#292524",
        },
      ],
    },
    darkMode: {
      stylePreview: true,
      classTarget: "html",
      darkClass: ["dark", "ui-dark"],
    },
  },
  decorators: [(renderStory) => <ThemeWrapper>{renderStory()}</ThemeWrapper>],
};

export default preview;
