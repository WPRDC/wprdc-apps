import sanitizeHtml from "sanitize-html";

export interface PopupRowProps {
  content: string;
}

/**
 * Renders a single row of popup content based on the layers under the cursor and the action being performed.
 * @param content - content of popup
 */
export function PopupRow({
  content: _content,
}: PopupRowProps): React.ReactElement {
  const content: string = sanitizeHtml(_content, {
    allowedClasses: {
      "*": false,
    },
  });

  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}
