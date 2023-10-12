import type { PlopTypes } from "@turbo/gen";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("component-story", {
    description: "Adds a new story for a react component.",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the component the story is for?",
      },
    ],
    actions: [
      // create component
      {
        type: "add",
        path: "stories/{{kebabCase name}}.stories.tsx",
        templateFile: "templates/story.hbs",
      },
    ],
  });
}
