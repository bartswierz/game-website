"use client";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Shadcn/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/Shadcn/command";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Shadcn/popover";
import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useSearchParams } from "next/navigation";
/* ORDERING FILTER OPTIONS
Available fields: name, released, added, created, updated, rating, metacritic. You can reverse the sort order adding a hyphen, for example: -released.
*/
//TODO - update types - value will be passed as the parameter for a call
const orderByOptions = [
  {
    value: "name",
    label: "Name",
  },
  {
    value: "released",
    label: "Released",
  },
  {
    value: "added",
    label: "Date Added",
  },
  {
    value: "rating",
    label: "Rating",
  },
  {
    value: "metacritic",
    label: "Metacritic",
  },
];
// https://api.rawg.io/api/games?ordering=-metacritic

//TODO - WHEN value changes - meaning user selected an option, then we need to call the api to get the data and send it to the search page
interface ComboboxProps {
  searchTerm: string;
}
export function Combobox({ searchTerm }: ComboboxProps) {
  const [open, setOpen] = useState(false);
  //TODO - update value to be a string array to be able to collect multiple value
  const [value, setValue] = useState("");
  console.log("COMBOBOX - value: ", value);

  //ON VALUE CHANGE, call the api to get the data and send it to the search page
  return (
    <div>
      <div>User choice(value): {value}</div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="default"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between bg-transparent- bg-slate-800 hover:bg-slate-500"
          >
            {value ? orderByOptions.find((framework) => framework.value === value)?.label : "Order by..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search filter..." />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {/* OUR FILTER LIST OF OPTIONS */}
              {orderByOptions.map((framework) => (
                <Link href={{ pathname: `/search/${searchTerm}`, query: { ordering: framework.value } }}>
                  <CommandItem
                    key={framework.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                    className="cursor-pointer"
                  >
                    <Check className={cn("mr-2 h-4 w-4", value === framework.value ? "opacity-100" : "opacity-0")} />
                    {framework.label}
                  </CommandItem>
                </Link>
              ))}

              {/* CLEAR FILTER BUTTON - ROUTE BACK TO DEFAULT GAME PAGE */}
              <Link
                href={`/search/${searchTerm}`}
                onClick={() => {
                  setOpen(false);
                  setValue("");
                }}
              >
                <CommandItem key={"clearOrdering"} className="cursor-pointer bg-gray-300 hover:bg-gray-400 font-semibold pl-8">
                  Clear Filter
                </CommandItem>
              </Link>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
