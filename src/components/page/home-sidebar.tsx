"use client";

import {
  CaretRightIcon,
  CompassIcon,
  FolderIcon,
  PlaylistIcon,
  RadioIcon,
  ThumbsUpIcon,
} from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import {
  Collapsible,
  CollapsibleContent,
} from "@/src/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuButtonLink,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarRail,
} from "@/src/components/ui/sidebar";

const home = [
  {
    page: "For You",
    href: "/home",
    icon: CompassIcon,
  },
  {
    page: "Liked Music",
    href: "/home/liked",
    icon: ThumbsUpIcon,
  },
  {
    page: "Radio Stations",
    href: "/home/radio",
    icon: RadioIcon,
  },
];

type SmartPlaylist = {
  type: "playlist";
  id: string;
  name: string;
};

type PlaylistFolder = {
  type: "folder";
  id: string;
  name: string;
  children: TreeNode[];
};

type TreeNode = PlaylistFolder | SmartPlaylist;

const playlists: TreeNode[] = [
  {
    type: "folder",
    id: "moods",
    name: "Moods",
    children: [
      { type: "playlist", id: "high-energy", name: "High Energy" },
      { type: "playlist", id: "wind-down", name: "Wind Down" },
      {
        type: "folder",
        id: "focus",
        name: "Focus",
        children: [
          { type: "playlist", id: "instrumental", name: "Instrumental Only" },
          { type: "playlist", id: "long-takes", name: "Long Takes" },
        ],
      },
    ],
  },
  {
    type: "folder",
    id: "discovery",
    name: "Discovery",
    children: [
      { type: "playlist", id: "never-played", name: "Never Played" },
      { type: "playlist", id: "deep-cuts", name: "Deep Cuts" },
    ],
  },
  { type: "playlist", id: "recently-added", name: "Recently Added" },
  { type: "playlist", id: "on-repeat", name: "On Repeat" },
];
export function HomeSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Home</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {home.map((item) => (
                <SidebarMenuItem key={item.page}>
                  <SidebarMenuButtonLink
                    href={item.href}
                    isActive={pathname === item.href}
                  >
                    <item.icon />
                    {item.page}
                  </SidebarMenuButtonLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Playlists</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {playlists.map((item) => (
                <Tree key={item.id} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
function playlistHref(id: string) {
  return `/home/playlists/${id}`;
}

function containsActivePlaylist(item: TreeNode, pathname: string): boolean {
  if (item.type === "playlist") {
    return pathname === playlistHref(item.id);
  }
  return item.children.some((child) => containsActivePlaylist(child, pathname));
}

function Tree({ item }: { item: TreeNode }) {
  const pathname = usePathname();

  if (item.type === "playlist") {
    const href = playlistHref(item.id);

    return (
      <SidebarMenuItem>
        <SidebarMenuButtonLink href={href} isActive={pathname === href}>
          <PlaylistIcon />
          {item.name}
        </SidebarMenuButtonLink>
      </SidebarMenuItem>
    );
  }
  const { children, name } = item;
  const hidesActivePlaylist = containsActivePlaylist(item, pathname);

  return (
    <SidebarMenuItem>
      <Collapsible className="group/collapsible [&[data-expanded]>button>svg:first-child]:rotate-90">
        {({ isExpanded }) => (
          <>
            <SidebarMenuButton
              slot="trigger"
              isActive={hidesActivePlaylist && !isExpanded}
            >
              <CaretRightIcon className="transition-transform" />
              <FolderIcon />
              {name}
            </SidebarMenuButton>
            <CollapsibleContent>
              <SidebarMenuSub>
                {children.map((child) => (
                  <Tree key={child.id} item={child} />
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </>
        )}
      </Collapsible>
    </SidebarMenuItem>
  );
}
