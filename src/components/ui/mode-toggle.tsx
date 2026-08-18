"use client";

import { MonitorIcon, MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import type { Selection } from "react-aria-components";

import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

const modes = [
  { id: "light", label: "Light", icon: SunIcon },
  { id: "dark", label: "Dark", icon: MoonIcon },
  { id: "system", label: "System", icon: MonitorIcon },
] as const;

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  function handleSelectionChange(keys: Selection) {
    if (keys === "all") return;
    const [mode] = keys;
    if (typeof mode === "string") setTheme(mode);
  }

  return (
    <DropdownMenuTrigger>
      <Button
        variant="outline"
        size="icon"
        aria-label="Toggle theme"
        className="relative"
      >
        <SunIcon className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
      <DropdownMenu
        placement="bottom end"
        selectionMode="single"
        disallowEmptySelection
        selectedKeys={theme ? [theme] : []}
        onSelectionChange={handleSelectionChange}
      >
        {modes.map(({ id, label, icon: Icon }) => (
          <DropdownMenuItem key={id} id={id} textValue={label}>
            <Icon />
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenu>
    </DropdownMenuTrigger>
  );
}
