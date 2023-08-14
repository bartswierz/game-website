import { Skeleton } from "@/components/ui/Shadcn/skeleton";

export default function Loading() {
  const numberOfGames = 20;

  const skeletonArray = Array.from({ length: numberOfGames });

  return (
    <div>
      <div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 px-4 md:px-0 gap-2">
          {skeletonArray.map((_, i) => (
            <Skeleton className="h-64 p-4 bg-gray-500" key={i}></Skeleton>
          ))}
        </ul>
      </div>
    </div>
  );
}
