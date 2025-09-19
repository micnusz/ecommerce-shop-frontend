"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import {
  ArrowDownUp,
  CaseSensitive,
  Check,
  MoveRight,
  Star,
  Tag,
} from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { useSortStore } from "@/lib/store/useProductSortStore";

export const SortHub = () => {
  const { sortBy, sortOrder, setSortBy, setSortOrder, clearSort } =
    useSortStore();

  const [open, setOpen] = useState(false);

  let buttonLabel = "Sort By";
  if (sortBy === "title") {
    buttonLabel = sortOrder === "ASC" ? "Title (A → Z)" : "Title (Z → A)";
  }
  if (sortBy === "price") {
    buttonLabel =
      sortOrder === "ASC" ? "Price (Low → High)" : "Price (High → Low)";
  }
  if (sortBy === "rating") {
    buttonLabel =
      sortOrder === "ASC" ? "Rating (Low → High)" : "Rating (High → Low)";
  }

  return (
    <Popover
      open={open}
      onOpenChange={(openState) => setOpen(openState)}
      modal={true}
    >
      <PopoverTrigger asChild>
        <Button
          variant={sortBy ? "default" : "muted"}
          className="justify-between"
        >
          <ArrowDownUp className="h-4 w-4" />
          {buttonLabel}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="min-w-[15rem] w-fit max-w-[20rem] rounded-lg shadow-md p-1">
        <Command>
          <CommandInput placeholder="Search sort by..." />
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup>
            {/* TITLE */}
            <CommandItem
              onSelect={() => {
                setSortBy("title");
                setSortOrder("ASC");
              }}
            >
              <CaseSensitive className="text-muted-foreground" />
              Title (A <MoveRight className="mx-1 text-foreground" /> Z)
              {sortBy === "title" && sortOrder === "ASC" && (
                <Check className="ml-auto h-4 w-4" />
              )}
            </CommandItem>

            <CommandItem
              onSelect={() => {
                setSortBy("title");
                setSortOrder("DESC");
              }}
            >
              <CaseSensitive className="text-muted-foreground" />
              Title (Z <MoveRight className="mx-1 text-foreground" /> A)
              {sortBy === "title" && sortOrder === "DESC" && (
                <Check className="ml-auto h-4 w-4" />
              )}
            </CommandItem>

            {/* PRICE */}
            <CommandItem
              onSelect={() => {
                setSortBy("price");
                setSortOrder("ASC");
              }}
            >
              <Tag className="text-muted-foreground" />
              Price (Low <MoveRight className="mx-1 text-foreground" />
              High)
              {sortBy === "price" && sortOrder === "ASC" && (
                <Check className="ml-auto h-4 w-4 " />
              )}
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setSortBy("price");
                setSortOrder("DESC");
              }}
            >
              <Tag className="text-muted-foreground" />
              Price (High <MoveRight className="mx-1 text-foreground" />
              Low)
              {sortBy === "price" && sortOrder === "DESC" && (
                <Check className="ml-auto h-4 w-4 " />
              )}
            </CommandItem>

            {/* RATING */}
            <CommandItem
              onSelect={() => {
                setSortBy("rating");
                setSortOrder("ASC");
              }}
            >
              <Star className="text-muted-foreground" />
              Rating (Low <MoveRight className="mx-1 text-foreground" />
              High)
              {sortBy === "rating" && sortOrder === "ASC" && (
                <Check className="ml-auto h-4 w-4 " />
              )}
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setSortBy("rating");
                setSortOrder("DESC");
              }}
            >
              <Star className="text-muted-foreground" />
              Rating (High <MoveRight className="mx-1 text-foreground" />
              Low)
              {sortBy === "rating" && sortOrder === "DESC" && (
                <Check className="ml-auto h-4 w-4" />
              )}
            </CommandItem>
          </CommandGroup>

          <div className="p-2">
            <Button
              variant={sortBy ? "destructive" : "muted"}
              size="sm"
              className="w-full"
              onClick={() => clearSort()}
            >
              Clear
            </Button>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
