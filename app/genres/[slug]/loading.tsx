import { Skeleton } from "@/components/ui/skeleton";
import { Key } from "react";
export default function Loading() {
  const numberOfGames = 12;

  const skeletonArray = Array.from({ length: numberOfGames });

  return (
    <div className="grid grid-cols-1 px-2 sm:px-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-auto gap-4 ">
      {skeletonArray.map((_, idx: Key) => (
        <Skeleton key={idx} className="h-64"></Skeleton>
      ))}
    </div>
  );
}
