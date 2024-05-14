import type { PlopTypes } from "@turbo/gen";

// Learn more about Turborepo Generators at https://turbo.build/repo/docs/core-concepts/monorepos/code-generation

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // A simple generator to add a new React component to the internal UI library
  plop.setGenerator("react-component", {
    description: "Adds a new react component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the component?",
      },
      {
        type: "input",
        name: "description",
        message: "Describe the component.",
      },
    ],
    actions: [
      // create component
      {
        type: "add",
        path: "src/components/{{kebabCase name}}/{{pascalCase name}}.tsx",
        templateFile: "templates/component.hbs",
      },
      // create types file
      {
        type: "add",
        path: "src/components/{{kebabCase name}}/{{pascalCase name}}.types.ts",
        templateFile: "templates/component.types.hbs",
      },
      // create index
      {
        type: "add",
        path: "src/components/{{kebabCase name}}/index.ts",
        template:
          'export * from "./{{pascalCase name}}";\n' +
          'export * from "./{{pascalCase name}}.types";\n',
      },
      // append ui index
      {
        type: "append",
        path: "src/index.tsx",
        template: 'export * from "./components/{{kebabCase name}}";',
      },
    ],
  });
}
