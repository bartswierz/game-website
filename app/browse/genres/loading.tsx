import { Skeleton } from "@/components/ui/Shadcn/skeleton";
import { Key } from "react";

export default function Loading() {
  return (
    <div className="grid gap-5 text-white 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xsm:grid-cols-1">
      {Array.from({ length: 19 }).map((_, idx: Key) => (
        <Skeleton className="relative cursor-pointer rounded-lg overflow-hidden  w-full h-80 justify-self-stretch"></Skeleton>
      ))}
    </div>
  );
}
