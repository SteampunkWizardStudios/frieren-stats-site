"use client";

import { useState, useEffect, useCallback } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Fuse from "fuse.js";

export interface SelectableItem {
  id: string;
  name: string;
  [key: string]: any;
}

interface FlexibleSelectorProps<T extends SelectableItem> {
  items: T[];
  onSelect: (item: T | null) => void;
  placeholder?: string;
  emptyMessage?: string;
}

export function FlexibleSelector<T extends SelectableItem>({
  items,
  onSelect,
  placeholder = "Select an item...",
  emptyMessage = "No item found.",
}: FlexibleSelectorProps<T>) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>("");
  const [search, setSearch] = useState("");

  const fuse = new Fuse(items, {
    keys: ["name"],
    threshold: 0.3,
  });

  const filteredItems = useCallback(
    (search: string) => {
      if (!search) return items;
      return fuse.search(search).map((result) => result.item);
    },
    [items, fuse]
  );

  useEffect(() => {
    const selectedItem = items.find((item) => item.id === value);
    onSelect(selectedItem || null);
  }, [value, items, onSelect]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="default"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value ? items.find((item) => item.id === value)?.name : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search..." onValueChange={setSearch} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup className="max-h-60 overflow-auto">
              {filteredItems(search).map((item) => (
                <CommandItem
                  key={item.id}
                  onSelect={() => {
                    setValue(item.id);
                    setOpen(false);
                    setSearch("");
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {/* Image  */}
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
