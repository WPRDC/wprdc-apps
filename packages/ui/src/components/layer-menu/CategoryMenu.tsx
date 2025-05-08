"use client";

import { CategoryMenuProps } from "./LayerMenu.types";
import CategoryMenuItem from "./CategoryMenuItem.tsx";
import { CategoryOptionsRecord } from "@wprdc/types";
import { Button } from "../button";
import { TextField } from "../text-field";
import { BiPlus, BiX } from "react-icons/bi";

export function CategoryMenu({
  field,
  categories,
  onChange,
}: CategoryMenuProps) {
  function handleAddCategory() {
    onChange(field, [...categories, { value: "", label: "" }]);
  }

  const handleDeleteCategory = (index: number) => () => {
    onChange(
      field,
      categories.filter((c, i) => i !== index),
    );
  };

  const handleFieldChange = (value: string) => {
    onChange(value, categories);
  };

  const handleCategoryChange =
    (prevValue: string) =>
    ({ value: newValue, label: newLabel }: CategoryOptionsRecord) => {
      onChange(
        field,
        categories.map(({ value, label }) => {
          if (prevValue === value) return { value: newValue, label: newLabel };
          return { value, label };
        }),
      );
    };

  return (
    <div>
      <div className="mb-4">
        <TextField
          label="Field"
          className="text-xs"
          value={field}
          onChange={handleFieldChange}
        />
      </div>
      <div>
        {categories.map(({ value, label }, i) => (
          <div
            key={i}
            className="flex items-end justify-between border-t p-1 last:border-b"
          >
            <div className="flex-grow border">
              <CategoryMenuItem
                value={value}
                label={label}
                onChange={handleCategoryChange(value)}
              />
            </div>
            <div className="flex-shrink">
              <Button
                icon={BiX}
                onPress={handleDeleteCategory(i)}
                className="mb-1"
                aria-label="delete row"
              ></Button>
            </div>
          </div>
        ))}
      </div>
      <Button
        variant="success"
        type="button"
        isDisabled={!!categories.find((c) => !c.value)}
        onPress={handleAddCategory}
        icon={BiPlus}
      >
        Add Category
      </Button>
    </div>
  );
}
