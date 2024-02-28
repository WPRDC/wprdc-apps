import React from "react";
import { Preview } from "@storybook/react";
import "@wprdc/ui/styles.css";

// create a component that listens for the DARK_MODE event
function ThemeWrapper(props) {
  const [isDark, setDark] = React.useState(false);
  // render your custom theme provider
  return <div style={{ padding: "2em" }}>{props.children}</div>;
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
      darkClass: ["dark", "wprdc-dark"],
    },
  },
  decorators: [(renderStory) => <ThemeWrapper>{renderStory()}</ThemeWrapper>],
};

export default preview;
