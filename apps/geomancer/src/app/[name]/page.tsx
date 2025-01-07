import { Typography } from "@wprdc/ui";
import { Map } from "@/component/map";
import { getTileLayer } from "@wprdc/api";
interface Params {
  name: string;
}

export default async function MapPage({ params }: { params: Promise<Params> }) {
  const { name } = await params;
  const tilejson = await getTileLayer(name);
  return (
    <div className="flex h-full w-full space-x-4">
      <div>sdfasd</div>sa
      <div className="min-w-0 flex-grow">
        <Map name={name} layer={tilejson.vector_layers[0].id} />
      </div>
      <div>
        <h2>TileJSON</h2>
        <Typography.Code block className="text-xs">
          {JSON.stringify(tilejson, null, 2)}
        </Typography.Code>
      </div>
    </div>
  );
}
