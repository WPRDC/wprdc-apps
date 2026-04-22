import { Layer } from "react-map-gl/maplibre";

interface Thing extends Named {
  namePlural?: string;

  resources: Record<string, ResourceRelation>;
  fields: Record<string, FieldRelation>;

  relations: Relation[];
}

interface Named {
  slug: string;
  name: string;
}

interface Relation extends Named {
  thing: string;
  on: {};
}

interface ResourceRelation extends Named {
  /** ID for resource */
  resourceID: string;
  /** field in resource agaisnt which the thing's ID is compared */
  idField: string | string[];

  /** Field that holds a geometry representing the related thing */
  geomField?: string;

  /** series of where statements that limit resource to only intended records */
  filters?: string[];

  /** Include only the listed fields **/
  includeFields: string[];

  /** Include all but the listed fields.
   *
   * If "all", then no fields are included except those required for idField and geomField*/
  excludeFields: "all" | string[];
}

interface FieldRelation {
  /** Label to use when describing thing with this field */
  label: string;

  /** Field in resource from which to get the value */
  fieldName: string;

  /** Specifies how to render the value */
  type: string;

  /** If true, this field is the primary key */
  isPrimaryKey?: boolean;

  /** If true, this field's value is used as the thing's geometry */
  isGeometry?: boolean;
}
