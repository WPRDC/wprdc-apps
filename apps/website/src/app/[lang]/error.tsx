"use client";

import { PageLayout } from "@/components/page-layout";
import { A } from "@wprdc/ui";

export default function RootErrorBoundary() {
  return (
    <PageLayout>
      <h1 className="my-8 text-center text-5xl">Page Not Found</h1>
      <div className="mx-auto max-w-2xl space-y-2 text-center text-xl leading-relaxed">
        <p>
          Looks like something went wrong or this page does not exist. If you
          think this an error, you can <A href="/engage">let us know</A>.
        </p>
        <p>
          Otherwise, <A href="/">click here to go back to the home page.</A>
        </p>
      </div>
    </PageLayout>
  );
}
