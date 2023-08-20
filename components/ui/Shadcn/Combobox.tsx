"use client";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Shadcn/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/Shadcn/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Shadcn/popover";
import Link from "next/link";
import { orderingOptions, platformOptions } from "@/constants";
import { FilterType } from "@/types";
/* ORDERING FILTER OPTIONS
Available fields: name, released, added, created, updated, rating, metacritic. You can reverse the sort order adding a hyphen, for example: -released.
*/
//TODO - update types - value will be passed as the parameter for a call
// https://api.rawg.io/api/games?ordering=-metacritic

interface ComboboxProps {
  searchTerm: string;
  // filterOptions: { value: string; label: string }[];
  type: "ordering" | "platforms";
}

const handleLink = () => {
  console.log("handleLink clicked");
};
// export function Combobox({ searchTerm, filterOptions, type }: ComboboxProps) {
export function Combobox({ searchTerm, type }: ComboboxProps) {
  const [open, setOpen] = useState(false);
  //TODO - update value to be a string array to be able to collect multiple value
  const [value, setValue] = useState("");
  // console.log("COMBOBOX - value: ", value);
  //TODO - use useState to set content checking if type is platform or ordering
  const [filterOptions, setFilterOptions] = useState<FilterType[]>(type === "ordering" ? orderingOptions : platformOptions);
  // console.log("filterOptions: ", filterOptions);
  //ON VALUE CHANGE, call the api to get the data and send it to the search page
  return (
    <div className="flex flex-col">
      <div>
        {type}: {value}
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="default"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between bg-slate-800 hover:bg-slate-500"
          >
            {value
              ? filterOptions.find((option) => option.value === value)?.label
              : `${type === "ordering" ? `Order by` : "Platforms"}`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search filter..." />
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {/* OUR FILTER LIST OF OPTIONS */}
              {filterOptions.map((option) => (
                // type passed is either 'ordering' or 'platforms', option value = slug or id of the option to be passed
                <Link
                  href={{ pathname: `/search/${searchTerm}`, query: { [type]: option.value } }}
                  key={`${option.value}`}
                  onClick={() => handleLink()}
                >
                  <CommandItem
                    onSelect={(currentValue) => {
                      //This would clear the value
                      // setValue(currentValue === value ? '' : currentValue);
                      setValue(currentValue === value ? value : currentValue);
                      setOpen(false);
                    }}
                    className="cursor-pointer"
                  >
                    <Check className={cn("mr-2 h-4 w-4", value === option.value ? "opacity-100" : "opacity-0")} />
                    {option.label}
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
                <CommandItem key={type} className="cursor-pointer font-semibold pl-8">
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
