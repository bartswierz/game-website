"use client";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Shadcn/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/Shadcn/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Shadcn/popover";
import Link from "next/link";
import { orderingOptions } from "@/constants";

interface ComboboxOrderingProps {
  searchTerm: string;
  platforms: string | null;
}

type FilterType = {
  value: string;
  label: string;
};

export function ComboboxOrdering({ searchTerm, platforms }: ComboboxOrderingProps) {
  const [open, setOpen] = useState(false);
  const [ordering, setOrdering] = useState("");
  const [platformFilter, setPlatformFilter] = useState(platforms);
  const [filterOptions, setFilterOptions] = useState<FilterType[]>(orderingOptions);

  useEffect(() => {
    setPlatformFilter(platforms);
  }, [platforms]);

  const ClearOrderingFilter = () => {
    return (
      <>
        <Link
          // If platformFilter is currently used, then pass it along otherwise pass default search link
          href={platformFilter ? { pathname: `/search/${searchTerm}`, query: { platforms: platformFilter } } : `/search/${searchTerm}`}
          onClick={() => {
            setOpen(false);
            setOrdering("");
          }}
        >
          <CommandItem className="cursor-pointer font-semibold pl-8">Clear Filter</CommandItem>
        </Link>
      </>
    );
  };

  //Creates our filter options list to be displayed
  const FilterOptions = () => {
    return (
      <>
        {filterOptions.map((option) => (
          //IF PLATFORM FILTER IS CURRENTLY USED, THEN PASS IT ALONG OTHERWISE ONLY PASS THE ORDERING FILTER
          <Link
            href={
              platformFilter
                ? { pathname: `/search/${searchTerm}`, query: { ordering: option.value, platforms: platformFilter } }
                : { pathname: `/search/${searchTerm}`, query: { ordering: option.value } }
            }
            key={`${option.value}`}
          >
            <CommandItem
              onSelect={(currentValue) => {
                //This would clear the value
                // setValue(currentValue === value ? '' : currentValue);
                setOrdering(currentValue === ordering ? ordering : currentValue);
                setOpen(false);
              }}
              className="cursor-pointer"
            >
              <Check className={cn("mr-2 h-4 w-4", ordering === option.value ? "opacity-100" : "opacity-0")} />
              {option.label}
            </CommandItem>
          </Link>
        ))}
      </>
    );
  };

  return (
    <div className="flex flex-col">
      <div>Ordering: {ordering}</div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="default"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between bg-slate-800 hover:bg-slate-500"
          >
            {/* Display default text 'Order By' or the SELECTED VALUE */}
            {ordering ? filterOptions.find((option) => option.value === ordering)?.label : "Order by"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search filter" />
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {/* OUR FILTER LIST OF OPTIONS */}
              <FilterOptions />
              {/* CLEAR FILTER & ROUTE BACK TO DEFAULT SEARCH PAGE */}
              <ClearOrderingFilter />
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
