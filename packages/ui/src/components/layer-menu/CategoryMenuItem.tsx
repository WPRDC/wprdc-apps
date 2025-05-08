import { CategoryMenuItemProps } from "./LayerMenu.types";
import { TextField } from "../text-field";

export default function CategoryMenuItem({
  value = "",
  label = "",
  onChange,
}: CategoryMenuItemProps) {
  const handleTextChange = (field: string) => (newText: string) => {
    if (onChange) {
      if (field === "value") onChange({value: newText, label})
      if (field === "label") onChange({ value, label: newText });
    }
  };

  return (
    <div className="flex gap-3 w-full">
      <TextField className="text-xs" label="Value" type="text" value={value?.toString()} onChange={handleTextChange("value")} />
      <TextField inputClassName="w-full" className="text-xs w-full" label="Label" type="text" value={label} onChange={handleTextChange("label")}  />
    </div>
  );
}
