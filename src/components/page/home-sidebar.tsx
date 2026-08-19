"use client";

import {
  CaretRightIcon,
  CompassIcon,
  FolderIcon,
  PlaylistIcon,
  RadioIcon,
  ThumbsUpIcon,
} from "@phosphor-icons/react";
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
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarRail,
} from "@/src/components/ui/sidebar";

const home = [
  {
    page: "For You",
    icon: CompassIcon,
  },
  {
    page: "Liked Music",
    icon: ThumbsUpIcon,
  },
  {
    page: "Radio Stations",
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
  return (
    <Sidebar {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Home</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {home.map((item) => (
                <SidebarMenuItem key={item.page}>
                  <SidebarMenuButton>
                    <item.icon />
                    {item.page}
                  </SidebarMenuButton>
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
function Tree({ item }: { item: TreeNode }) {
  if (item.type === "playlist") {
    return (
      <SidebarMenuButton className="data-[active=true]:bg-transparent">
        <PlaylistIcon />
        {item.name}
      </SidebarMenuButton>
    );
  }
  return (
    <SidebarMenuItem>
      <Collapsible className="group/collapsible [&[data-expanded]>button>svg:first-child]:rotate-90">
        <SidebarMenuButton slot="trigger">
          <CaretRightIcon className="transition-transform" />
          <FolderIcon />
          {item.name}
        </SidebarMenuButton>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.children.map((child) => (
              <Tree key={child.id} item={child} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}
