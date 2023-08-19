"use client";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Shadcn/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/Shadcn/command";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Shadcn/popover";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  // const handleRouting = () => {
  //   console.log("inside handRouting - value = ", value);
  //   setValue(currentValue === value ? "" : currentValue);
  //   router.push(`/search/${searchTerm}&orderBy=${value}`);
  // };

  //IF VALUE CHANGES THEN WE WANT TO PUSH TO THE SEARCH PAGE
  // useEffect(() => {
  //   // Call the api to get the data and send it to the search page
  //   if (value) {
  //     console.log("user selected: ", value);
  //     <Link
  //       href={{
  //         pathname: `/search/genres/${slug}`,
  //         query: { id: id },
  //       }}
  //       // className="relative cursor-pointer rounded-lg overflow-hidden w-full h-80 justify-self-stretch"
  //       // key={id}
  //     ></Link>;
  //   }
  //   // Else - not selected yet
  //   console.log("no value selected yet...", value);
  // }, [value]);

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
              {orderByOptions.map((framework) => (
                <CommandItem
                  key={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    /*TODO - CALLING API TO GET UPDATED SEARCH - ISSUE HERE IS WE NEED TO ALSO PASS THE QUERY 
                    href={{
                    pathname: `/genres/${genreInfo.name.toLowerCase()}`,
                    query: { genres: `${genreInfo.name.toLowerCase()}`, page_size: 6 },
                  }}
                    */
                    // router.push(`/search/${searchTerm}`);
                    // router.push(`/search/${searchTerm}&orderBy=${value}`);
                    // router.push(`/search/${searchTerm}&orderBy=${value}`);
                    // handleRouting();
                    // router.push(`/search/${searchTerm}`, value);
                    // router.push(`/search/${searchTerm}&${value}`);
                    // router.push(value);
                    // options: { orderBy: value }
                    // query: { orderBy: value },
                    // query: { genres: `${genreInfo.name.toLowerCase()}`, page_size: 6 });
                  }}
                >
                  {/* <Link href={{ pathname: `/search/${searchTerm}`, query: { orderBy: value } }}> */}
                  {/* <Link href={{ pathname: `/search/${searchTerm}`, query: { value: value } }}> */}
                  <Check className={cn("mr-2 h-4 w-4", value === framework.value ? "opacity-100" : "opacity-0")} />
                  {framework.label}
                  {/* </Link> */}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
