import type { ReactNode } from "react";
import { HomeSidebar } from "@/src/components/page/home-sidebar";
import { Button } from "@/src/components/ui/button";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/src/components/ui/sidebar";

type HomeLayoutProps = {
  children: ReactNode;
};

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <SidebarProvider>
      <HomeSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />

          <section className="grow">
            <div className="flex items-center justify-end space-x-2">
              <Button variant="outline" type="button">
                <p>Sign Out</p>
              </Button>
            </div>
          </section>
        </header>

        <div className="flex grow flex-col p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
