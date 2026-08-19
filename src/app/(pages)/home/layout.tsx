import type { ReactNode } from "react";
import { SignOutButton } from "@/src/components/auth/sign-out-button";
import { HomeSidebar } from "@/src/components/page/home-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/src/components/ui/sidebar";
import { requireSession } from "@/src/library/auth/session";

type HomeLayoutProps = {
  children: ReactNode;
};

export default async function HomeLayout({ children }: HomeLayoutProps) {
  await requireSession();

  return (
    <SidebarProvider>
      <HomeSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />

          <section className="grow">
            <div className="flex items-center justify-end space-x-2">
              <SignOutButton />
            </div>
          </section>
        </header>

        <div className="flex grow flex-col p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
