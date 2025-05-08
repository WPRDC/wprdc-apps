# Map Layers

[//]: # (todo: write up documentation about our layer system)

## LayerSource

| Property   | Type   | Description                                              |
|------------|--------|----------------------------------------------------------|
| slug       | string | Slug used to identify this layer source.                 |
| title      | string | Human-friendly name                                      |
| url        | string | URL to source or to information about it. Used in links. |
| resourceID | string | CKAN resource ID for CKAN resources                      |

## TileSource

| Property       | Type              | Description                            |
|----------------|-------------------|----------------------------------------|
| tileJSONSource | string            | URL of tile JSON to override as source |
| sourceLayer    | string            | Override source-layer                  |
| minZoom        | number (optional) | Override min zoom                      |
| maxZoom        | number (optional) | Override max zoom                      |

## CommonLayerOptions Interface

| Property               | Type                           | Description                                        |
|------------------------|--------------------------------|----------------------------------------------------|
| slug                   | string                         | Slug used to identify this layer source.           |
| title                  | string                         | Human-friendly name                                |
| description            | string                         | Description of the layer/dataset                   |
| type                   | GeoType                        | Type of geometry used in layer                     |
| source                 | LayerSource                    | Data source being visualized by layer              |
| publisher              | Publisher                      | Publisher details                                  |
| tileSource             | TileSource                     | Tileserver details                                 |
| legend                 | LegendGroupOptions (optional)  | Options that define the layer's legend item if one |
| renderOptions          | object (optional)              | Additional rendering configuration                 |
| renderOptions.filter   | FilterSpecification (optional) | Filter dataset                                     |
| renderOptions.noLegend | boolean (optional)             | Set to true to ignore layer when generating legend |


## PopupFieldOptions Interface

| Property | Type                | Description                                                                            |
|----------|---------------------|----------------------------------------------------------------------------------------|
| field    | string              | Field ID - key in feature properties from which to grab data                           |
| label    | string              | Label for field                                                                        |
| format   | function (optional) | Function that formats value data to something renderable: (value: string) => ReactNode |
| asTitle  | boolean (optional)  | Use this field's value as the popup title                                              |

## InteractionOptions Interface

| Property         | Type                               | Description                                                                                       |
|------------------|------------------------------------|---------------------------------------------------------------------------------------------------|
| clickPopupFormat | string (optional)                  | Format for click popup                                                                            |
| hoverPopupFormat | string (optional)                  | Format for hover popup                                                                            |
| idField          | string                             | Property of layer feature that represents a unique ID. Used for selection and hover style states. |
| ignoreCase       | ExpressionSpecification (optional) | Maplibre expression that indicates which features to ignore with respect to interaction           |


