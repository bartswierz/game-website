"use client";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Shadcn/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/Shadcn/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Shadcn/popover";
import Link from "next/link";
import { platformOptions } from "@/constants";
import { useSearchParams } from "next/navigation";

interface ComboboxPlatformsProps {
  ordering: string | null;
  path: string; //href="/search/${searchTerm}"
  genres?: string;
  page?: string;
}

type FilterType = {
  value: string;
  label: string;
};

export function ComboboxPlatforms({ ordering, path, page }: ComboboxPlatformsProps) {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [platforms, setPlatforms] = useState("");
  const [orderingFilter, setOrderingFilter] = useState(ordering);
  const [filterOptions, setFilterOptions] = useState<FilterType[]>(platformOptions);

  // GENRES PAGE - genres is required for href="/genres/${genres}"
  const searchGenres = searchParams.get("genres");
  const [genres, setGenres] = useState(searchGenres);

  const searchID = searchParams.get("id");
  const [id, setId] = useState(searchID);

  useEffect(() => {
    setId(searchID);
  }, [searchID]);

  //UPDATING ORDERING FILTER STATE TO BE READY FOR THE NEXT FILTER SEARCH
  useEffect(() => {
    setOrderingFilter(ordering);
  }, [ordering]);

  useEffect(() => {
    setGenres(searchGenres);
  }, [searchGenres]);

  // CLEAR PLATFORMS SELECTED FILTER & ROUTE BACK TO DEFAULT SEARCH PAGE PASSING THE ORDERING FILTER(IF EXISTS) OR DEFAULT SEARCH PAGE
  const ClearPlatformFilter = () => {
    const handleClearPlatformFilter = (orderingFilter?: string, genres?: string) => {
      //IF ITS A GENRE PAGE
      if (genres) {
        if (orderingFilter) return { pathname: path, query: { genres: genres, ordering: orderingFilter } };
        else return { pathname: path, query: { genres: genres } };
      }
      //NOT A GENRE PAGE, AND PLATFORM FILTER EXISTS
      else if (orderingFilter) return { pathname: path, query: { ordering: orderingFilter } };
      //NOT A GENRE PAGE AND PLATFORM FILTER DOES NOT EXIST
      else return path;
    };

    return (
      <>
        <Link
          href={handleClearPlatformFilter(orderingFilter ? orderingFilter : undefined, genres ? genres : undefined)}
          // href={orderingFilter ? { pathname: path, query: { ordering: orderingFilter } } : path}
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

  // const handleHref = (optionValue: string, platformFilter?: string, id?: string) => {
  const handleHref = (optionValue: string) => {
    //IF id exists, then that means we are in the PLATFORMS PAGE, we need to pass the id along with the ordering filter
    const isPlatformPage = id ? true : false;
    // If genre value exists then we are GENRES PAGE - need to pass ordering and genres
    // const isGenrePage = genres ? true : false;
    const orderingFilterExists = orderingFilter ? true : false;
    const isGenrePage = page === "genre" ? true : false;
    const isSearchPage = page === "search" ? true : false;

    //if isPlatformPage YES, then we need to pass the id along with the ordering filter
    const handlePlatformPage = () => {
      if (orderingFilterExists) return { pathname: path, query: { id: id, ordering: orderingFilter, platforms: optionValue } };
      else return { pathname: path, query: { id: id, platforms: optionValue } };
    };

    //if isGenrePage YES, then we need to pass the genres along with the ordering filter
    const handleGenrePage = () => {
      if (orderingFilterExists) return { pathname: path, query: { genres: genres, ordering: orderingFilter, platforms: optionValue } };
      // else return { pathname: path, query: { genres: genres, ordering: optionValue } };
      else return { pathname: path, query: { genres: genres, platforms: optionValue } };
    };

    const handleSearchPage = () => {
      //PASS PLATFORM FILTER & ORDERING FILTER
      if (orderingFilterExists) return { pathname: path, query: { ordering: orderingFilter, platforms: optionValue } };
      //PASS PLATFORM FILTER ONLY
      else return { pathname: path, query: { platforms: optionValue } };
    };

    //IF USER ON PLATFORM PAGE
    if (isPlatformPage) return handlePlatformPage();
    //IF USER ON GENRE PAGE
    else if (isGenrePage) return handleGenrePage();
    //IF USER ON SEARCH PAGE
    else if (isSearchPage) return handleSearchPage();
    //RETURN PLATFORM FILTER ONLY
    else return { pathname: path, query: { platforms: optionValue } };
  };

  //Creates our filter options list to be displayed
  const FilterOptions = () => {
    return (
      <>
        {filterOptions.map((option) => (
          //IF ORDERING FILTER IS CURRENTLY USED, THEN PASS IT ALONG OTHERWISE ONLY PASS THE PLATFORM FILTER
          <Link
            href={handleHref(option.value)}
            // href={
            //   orderingFilter
            //     ? { pathname: path, query: { platforms: option.value, ordering: orderingFilter } }
            //     : { pathname: path, query: { platforms: option.value } }
            // }
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
              <ClearPlatformFilter />
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
