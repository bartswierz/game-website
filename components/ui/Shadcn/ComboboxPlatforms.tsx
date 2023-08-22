"use client";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Shadcn/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/Shadcn/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Shadcn/popover";
import Link from "next/link";
import { platformOptions } from "@/constants";

interface ComboboxPlatformsProps {
  searchTerm: string;
  ordering: string | null;
}

type FilterType = {
  value: string;
  label: string;
};

export function ComboboxPlatforms({ searchTerm, ordering }: ComboboxPlatformsProps) {
  const [open, setOpen] = useState(false);
  const [platforms, setPlatforms] = useState("");
  const [orderingFilter, setOrderingFilter] = useState(ordering);
  const [filterOptions, setFilterOptions] = useState<FilterType[]>(platformOptions);

  //UPDATING ORDERING FILTER STATE TO BE READY FOR THE NEXT FILTER SEARCH
  useEffect(() => {
    setOrderingFilter(ordering);
  }, [ordering]);

  // CLEAR PLATFORMS SELECTED FILTER & ROUTE BACK TO DEFAULT SEARCH PAGE PASSING THE ORDERING FILTER(IF EXISTS) OR DEFAULT SEARCH PAGE
  const ClearOrderingFilter = () => {
    return (
      <>
        <Link
          href={orderingFilter ? { pathname: `/search/${searchTerm}`, query: { ordering: orderingFilter } } : `/search/${searchTerm}`}
          onClick={() => {
            setOpen(false);
            setPlatforms("");
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
          //IF ORDERING FILTER IS CURRENTLY USED, THEN PASS IT ALONG OTHERWISE ONLY PASS THE PLATFORM FILTER
          <Link
            href={
              orderingFilter
                ? { pathname: `/search/${searchTerm}`, query: { platforms: option.value, ordering: orderingFilter } }
                : { pathname: `/search/${searchTerm}`, query: { platforms: option.value } }
            }
            key={`${option.value}`}
          >
            <CommandItem
              onSelect={(currentValue) => {
                //This would clear the value
                // setValue(currentValue === value ? '' : currentValue);
                setPlatforms(currentValue === platforms ? platforms : currentValue);
                setOpen(false);
              }}
              className="cursor-pointer"
            >
              <Check className={cn("mr-2 h-4 w-4", platforms === option.value ? "opacity-100" : "opacity-0")} />
              {option.label}
            </CommandItem>
          </Link>
        ))}
      </>
    );
  };

  //USER CHOICE DISPLAYED IN THE COMBOBOX
  const SelectedFilterText = () => {
    // SEARCH FOR MATCHING ORDERING VALUE IN OUR FILTER OPTIONS
    const selectedOption = filterOptions.find((option) => {
      return option.label.toLowerCase() === platforms.toLowerCase();
      // return option.value === ordering;
    })?.label;

    // IF NOT MATCH, RETURN DEFAULT TEXT
    if (!selectedOption) return "Platforms";

    // IF MATCH, RETURN SELECTED OPTION TEXT TO DISPLAY IN COMBOBOX
    return <span className="truncate">{selectedOption}</span>;
  };

  return (
    <div className="flex flex-col">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="default"
            role="combobox"
            aria-expanded={open}
            className="w-[143px] xsm:w-[200px] justify-between bg-slate-800 hover:bg-slate-500"
            // className="w-[200px] justify-between bg-slate-800 hover:bg-slate-500"
          >
            {/* Display Selected text in Combobox */}
            <SelectedFilterText />
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[143px] xsm:w-[200px] p-0">
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
