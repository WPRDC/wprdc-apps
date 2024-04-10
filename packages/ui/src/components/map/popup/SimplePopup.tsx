import type { MapState } from "@wprdc/types";
import { Typography } from "../../typography";

export interface SimplePopupItem {
  id: string;
  label: string;
  description?: string;
}

export interface SimplePopupProps {
  title?: string;
  items?: SimplePopupItem[];
}

export function SimplePopup({
  title,
  items,
}: SimplePopupProps): React.ReactElement {
  return (
    <div className="max-w-xs">
      {!!title && <Typography.Label>{title}</Typography.Label>}
      <ul>
        {!!items &&
          items.map(({ id, label, description }) => (
            <li key={id}>
              <div className="text-lg font-semibold">{label}</div>
              {!!description && <div className="text-sm">{description}</div>}
            </li>
          ))}
      </ul>
    </div>
  );
}

export interface HoverPopupProps {
  mapState: MapState;
  idField: string;
  labelField: string;
  descriptionField?: string;
}

export function SimpleHoverPopup({
  mapState,
  idField,
  labelField,
  descriptionField,
}: HoverPopupProps): React.ReactElement {
  const { hoveredFeatures } = mapState;
  const items: SimplePopupItem[] = hoveredFeatures
    ? hoveredFeatures.map(({ properties }) => ({
        id: properties[idField] as string,
        label: properties[labelField] as string,
        description:
          descriptionField &&
          (properties[descriptionField] as string | undefined),
      }))
    : [];
  return <SimplePopup items={items} />;
}
