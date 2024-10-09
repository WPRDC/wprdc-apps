import { A, Breadcrumb, Breadcrumbs as WPRDCBreadcrumbs } from "@wprdc/ui";

export interface BreadcrumbItem {
  id: string;
  label: string;
  href: string;
}

export interface BreadcrumbsProps {
  path: BreadcrumbItem[];
}

/** Wraps our UI to allow only needing a path prop */
export function Breadcrumbs({ path }: BreadcrumbsProps) {
  return (
    <div className="py-6">
      <WPRDCBreadcrumbs>
        {path.map(({ id, label, href }, i) => (
          <Breadcrumb
            key={id}
            className="inline after:content-['/'] last:after:content-none"
          >
            {i < path.length - 1 ? (
              <A href={href} className="mr-3 capitalize">
                {label}
              </A>
            ) : (
              <span className="mr-3 capitalize">{label}</span>
            )}
          </Breadcrumb>
        ))}
      </WPRDCBreadcrumbs>
    </div>
  );
}
