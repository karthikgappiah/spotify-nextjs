"use client";

import { TanStackDevtools } from "@tanstack/react-devtools";
import { formDevtoolsPlugin } from "@tanstack/react-form-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";

export function Devtools() {
  return (
    <TanStackDevtools
      plugins={[
        formDevtoolsPlugin(),
        {
          id: "tanstack-query",
          name: "TanStack Query",
          render: <ReactQueryDevtoolsPanel style={{ height: "100%" }} />,
        },
      ]}
    />
  );
}
