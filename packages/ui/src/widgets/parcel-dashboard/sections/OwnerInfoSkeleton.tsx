export function OwnerInfoSkeleton(): React.ReactElement {
  return (
    <div>
      <div className="mb-1 flex items-center">
        <div className="text-xs font-bold uppercase text-stone-500">Owner</div>
      </div>
      <div className="animate-pulse">
        <div className="mb-2.5 h-3.5 w-8/12 rounded-md bg-stone-400" />
        <div className="r mb-2 h-3.5 w-10/12 rounded-md bg-stone-400" />
      </div>
    </div>
  );
}
