"use client";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Shadcn/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/Shadcn/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Shadcn/popover";
import Link from "next/link";
import { orderingOptions } from "@/constants";
import { useSearchParams } from "next/navigation";

interface ComboboxOrderingProps {
  // platforms?: string | null;
  platforms?: string;
  path: string; //href="/search/${searchTerm}"
  uid?: string; //Required for platforms page -> href="/platforms/${id}"
}

type FilterType = {
  value: string;
  label: string;
};

// export function ComboboxOrdering({ platforms, path, uid }: ComboboxOrderingProps) {
export function ComboboxOrdering({ platforms, path }: ComboboxOrderingProps) {
  const [open, setOpen] = useState(false);
  const [ordering, setOrdering] = useState("");
  const [platformFilter, setPlatformFilter] = useState(platforms);
  const [filterOptions, setFilterOptions] = useState<FilterType[]>(orderingOptions);
  const searchParams = useSearchParams();
  const searchID = searchParams.get("id");
  const [id, setId] = useState(searchID);
  // const [id, setId] = useState(uid);
  // const id = uid;
  console.log("id passed to comboboxordering from searchParams: ", id);

  useEffect(() => {
    setId(searchID);
  }, [searchID]);

  // useEffect(() => {
  //   setId(uid);
  // }, [uid]);

  useEffect(() => {
    setPlatformFilter(platforms);
  }, [platforms]);

  // CLEAR ORDERING SELECTED FILTER & ROUTE BACK TO DEFAULT SEARCH PAGE PASSING THE PLATFORMS FILTER(IF EXISTS) OR DEFAULT SEARCH PAGE
  const ClearOrderingFilter = () => {
    return (
      <>
        <Link
          // If platformFilter is currently used, then pass it along otherwise pass default search link
          href={platformFilter ? { pathname: path, query: { platforms: platformFilter } } : path}
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

  // const handleHref = (optionValue: string, platformFilter?: string, id?: string) => {
  const handleHref = (optionValue: string) => {
    /* ORIGINAL
    platformFilter
       ? { pathname: path, query: { ordering: option.value, platforms: platformFilter } }
       : { pathname: path, query: { ordering: option.value } }
    */

    /*
    if (platformFilter && id) {
       return { pathname: path, query: { ordering: optionValue, platforms: platformFilter } };
     }
     //IF ONLY ID IS PRESENT, THEN PASS IT ALONG
     else if (platformFilter && !id) {
       return { pathname: path, query: { ordering: optionValue, platformFilter: platformFilter } };
     }
     //IF ONLY PLATFORM FILTER IS PRESENT, THEN PASS IT ALONG
     else if (!platformFilter && id) {
       return { pathname: path, query: { ordering: optionValue, id: id } };
     }
     //IF NEITHER ARE PRESENT, THEN PASS ONLY ORDERING FILTER
     else {
       return { pathname: path, query: { ordering: optionValue } };
     }
    */
    //IF id exists, then that means we are in the PLATFORMS PAGE, we need to pass the id along with the ordering filter
    const isPlatformPage = id ? true : false;

    //IF BOTH PLATFORM FILTER AND ID ARE PRESENT, THEN PASS THEM ALONG
    if (isPlatformPage) {
      return { pathname: path, query: { id: id, ordering: optionValue } };
      // return { pathname: path, query: { ordering: optionValue } };
    } else {
      //!isPlatformPage - THIS IS A SEARCH PAGE
      const platformFilterExists = platformFilter ? true : false;

      // IF PLATFORM FILTER EXISTS, THEN PASS IT ALONG WITH THE ORDERING FILTER
      if (platformFilterExists) return { pathname: path, query: { ordering: optionValue, platforms: platformFilter } };
      //PLATFORM FILTER DOES NOT EXISTS, ONLY PASS THE ORDERING FILTER
      else return { pathname: path, query: { ordering: optionValue } };
    }
  };

  //Creates our filter options list to be displayed
  const FilterOptions = () => {
    return (
      <>
        {filterOptions.map((option) => (
          //IF PLATFORM FILTER IS CURRENTLY USED, THEN PASS IT ALONG OTHERWISE ONLY PASS THE ORDERING FILTER
          <Link
            href={handleHref(option.value)}
            // href={
            //   platformFilter
            //     ? { pathname: path, query: { ordering: option.value, platforms: platformFilter } }
            //     : { pathname: path, query: { ordering: option.value } }
            // }
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

  //USER CHOICE DISPLAYED IN THE COMBOBOX
  const SelectedFilterText = () => {
    // SEARCH FOR MATCHING ORDERING VALUE IN OUR FILTER OPTIONS
    const selectedOption = filterOptions.find((option) => {
      return option.label.toLowerCase() === ordering.toLowerCase();
      // return option.value === ordering;
    })?.label;

    // IF NOT MATCH, RETURN DEFAULT TEXT
    if (!selectedOption) return "Order by";

    // IF MATCH, RETURN SELECTED OPTION TEXT TO DISPLAY IN COMBOBOX
    return selectedOption;
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
