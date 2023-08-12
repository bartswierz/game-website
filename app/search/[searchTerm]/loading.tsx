import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  const numberOfGames = 20;

  const skeletonArray = Array.from({ length: numberOfGames });

  return (
    <div>
      <div>
        <ul className="border grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 px-4 md:px-0 gap-5">
          {skeletonArray.map((_, i) => (
            <Skeleton className="h-64 p-4 bg-gray-500" key={i}></Skeleton>
          ))}
        </ul>
      </div>
    </div>
    // <div className="flex items-center space-x-4">
    //   <Skeleton className="h-12 w-12 rounded-full" />
    //   <div className="space-y-2">
    //     <Skeleton className="h-4 w-[250px]" />
    //     <Skeleton className="h-4 w-[200px]" />
    //   </div>
    // </div>
  );
}
