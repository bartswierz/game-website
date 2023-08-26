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
  genres?: string;
  page: string;
}

type FilterType = {
  value: string;
  label: string;
};

// export function ComboboxOrdering({ platforms, path, uid }: ComboboxOrderingProps) {
export function ComboboxOrdering({ platforms, path, page }: ComboboxOrderingProps) {
  const [open, setOpen] = useState(false);
  const [ordering, setOrdering] = useState("");
  const [platformFilter, setPlatformFilter] = useState(platforms);
  const [filterOptions, setFilterOptions] = useState<FilterType[]>(orderingOptions);
  const searchParams = useSearchParams();
  // PLATFORM PAGE - id is required for href="/platforms/${id}"
  const searchID = searchParams.get("id");
  const [id, setId] = useState(searchID);

  // GENRES PAGE - genres is required for href="/genres/${genres}"
  const searchGenres = searchParams.get("genres");
  const [genres, setGenres] = useState(searchGenres);

  useEffect(() => {
    setId(searchID);
  }, [searchID]);

  useEffect(() => {
    setPlatformFilter(platforms);
  }, [platforms]);

  useEffect(() => {
    setGenres(searchGenres);
  }, [searchGenres]);

  // CLEAR ORDERING SELECTED FILTER & ROUTE BACK TO DEFAULT SEARCH PAGE PASSING THE PLATFORMS FILTER(IF EXISTS) OR DEFAULT SEARCH PAGE
  const ClearOrderingFilter = () => {
    const handleClearOrderingFilter = (platformFilter?: string, genres?: string) => {
      //IF ITS A GENRE PAGE
      if (genres) {
        if (platformFilter) return { pathname: path, query: { genres: genres, platforms: platformFilter } };
        else return { pathname: path, query: { genres: genres } };
      }
      //NOT A GENRE PAGE, AND PLATFORM FILTER EXISTS
      else if (platformFilter) return { pathname: path, query: { platforms: platformFilter } };
      //NOT A GENRE PAGE AND PLATFORM FILTER DOES NOT EXIST
      else return path;
    };

    return (
      <>
        <Link
          // If platformFilter is currently used, then pass it along otherwise pass default search link
          href={handleClearOrderingFilter(platformFilter, genres ? genres : undefined)}
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
    //IF id exists, then that means we are in the PLATFORMS PAGE, we need to pass the id along with the ordering filter
    const isPlatformPage = id ? true : false;
    // If genre value exists then we are GENRES PAGE - need to pass ordering and genres
    // const isGenrePage = genres ? true : false;
    const platformFilterExists = platformFilter ? true : false;
    const isGenrePage = page === "genre" ? true : false;
    const isSearchPage = page === "search" ? true : false;
    // const isBrowsePlatformPage = page === "browse-platform" ? true : false;
    //if isPlatformPage YES, then we need to pass the id along with the ordering filter
    const handlePlatformPage = () => {
      if (platformFilterExists) return { pathname: path, query: { id: id, ordering: optionValue, platforms: platformFilter } };
      else return { pathname: path, query: { id: id, ordering: optionValue } };
    };

    //if isGenrePage YES, then we need to pass the genres along with the ordering filter
    const handleGenrePage = () => {
      if (platformFilterExists) return { pathname: path, query: { genres: genres, ordering: optionValue, platforms: platformFilter } };
      else return { pathname: path, query: { genres: genres, ordering: optionValue } };
    };

    const handleSearchPage = () => {
      //PASS PLATFORM FILTER & ORDERING FILTER
      if (platformFilterExists) return { pathname: path, query: { ordering: optionValue, platforms: platformFilter } };
      //PASS ORDERING FILTER ONLY
      else return { pathname: path, query: { ordering: optionValue } };
    };

    // const handleBrowsePlatformPage = () => {
    //   console.log("inside handleBrowsePlatformPage");
    //   if (platformFilterExists) return { pathname: path, query: { ordering: optionValue, platforms: platformFilter } };
    //   else return { pathname: path, query: { ordering: optionValue } };
    // };

    if (isPlatformPage) return handlePlatformPage();
    else if (isGenrePage) return handleGenrePage();
    else if (isSearchPage) return handleSearchPage();
    else return { pathname: path, query: { ordering: optionValue } };
  };

  //Creates our filter options list to be displayed
  const FilterOptions = () => {
    return (
      <>
        {filterOptions.map((option) => (
          //IF PLATFORM FILTER IS CURRENTLY USED, THEN PASS IT ALONG OTHERWISE ONLY PASS THE ORDERING FILTER
          <Link href={handleHref(option.value)} key={`${option.value}`}>
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
