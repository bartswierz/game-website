"use client";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Shadcn/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/Shadcn/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Shadcn/popover";
import Link from "next/link";
import { platformOptions } from "@/constants";
// import { FilterType } from "@/types";
/* ORDERING FILTER OPTIONS
Available fields: name, released, added, created, updated, rating, metacritic. You can reverse the sort order adding a hyphen, for example: -released.
*/
//TODO - update types - value will be passed as the parameter for a call
// https://api.rawg.io/api/games?ordering=-metacritic

interface ComboboxPlatformsProps {
  searchTerm: string;
  ordering: string | null;
}

const handleLink = () => {
  console.log("handleLink clicked");
};
// export function Combobox({ searchTerm, filterOptions, type }: ComboboxProps) {
/*
 * we will pass the other filter option as a prop to this combobox, after a user chooses and option we will pass the two value together to the search page. If the other is null then we will only pass the value of the current combobox
 */

type FilterType = {
  value: string;
  label: string;
};

export function ComboboxPlatforms({ searchTerm, ordering }: ComboboxPlatformsProps) {
  const [open, setOpen] = useState(false);
  //TODO - update value to be a string array to be able to collect multiple value
  const [platforms, setPlatforms] = useState("");
  const [orderingFilter, setOrderingFilter] = useState(ordering);

  // console.log("COMBOBOX - value: ", value);
  //TODO - use useState to set content checking if type is platform or ordering
  const [filterOptions, setFilterOptions] = useState<FilterType[]>(platformOptions);
  // console.log("filterOptions: ", filterOptions);
  useEffect(() => {
    console.log("comboboxPlatforms - orderingFilter value: ", orderingFilter);
  });

  useEffect(() => {
    console.log("new platforms passed to combobox: ", platforms);
    setOrderingFilter(ordering);
  }, [ordering]);

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
          // type passed is either 'ordering' or 'platforms', option value = slug or id of the option to be passed
          <Link
            // href={{ pathname: `/search/${searchTerm}`, query: { platforms: option.value } }}
            href={
              orderingFilter
                ? { pathname: `/search/${searchTerm}`, query: { platforms: option.value, ordering: orderingFilter } }
                : { pathname: `/search/${searchTerm}`, query: { platforms: option.value } }
            }
            key={`${option.value}`}
            onClick={() => handleLink()}
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

  // const FilterOptions = () => {
  //   return (
  //     <>
  //       {filterOptions.map((option) => (
  //         // type passed is either 'ordering' or 'platforms', option value = slug or id of the option to be passed
  //         <Link
  //           href={{ pathname: `/search/${searchTerm}`, query: { platforms: option.value } }}
  //           key={`${option.value}`}
  //           onClick={() => handleLink()}
  //         >
  //           <CommandItem
  //             onSelect={(currentValue) => {
  //               //This would clear the value
  //               // setValue(currentValue === value ? '' : currentValue);
  //               setPlatforms(currentValue === platforms ? platforms : currentValue);
  //               setOpen(false);
  //             }}
  //             className="cursor-pointer"
  //           >
  //             <Check className={cn("mr-2 h-4 w-4", ordering === option.value ? "opacity-100" : "opacity-0")} />
  //             {option.label}
  //           </CommandItem>
  //         </Link>
  //       ))}
  //     </>
  //   );
  // };

  return (
    <div className="flex flex-col">
      <div>Platforms: {platforms}</div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="default"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between bg-slate-800 hover:bg-slate-500"
          >
            {platforms ? filterOptions.find((option) => option.value === platforms)?.label : "Order by"}
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
