import { Skeleton } from "@/components/ui/Shadcn/skeleton";

//MAIN APP LOADING PAGE
export default function Loading() {
  // const numberOfGames = 20;

  // const skeletonArray = Array.from({ length: numberOfGames });

  return (
    <main className="m-24 rounded-md grid grid-cols-4 gap-12">
      {/* // col-span-4 takes up all four columns of space making it 1 game per row, for md(768px) we have it display TWO GAMES */}
      {/* LOADING LOADING LOADING
      {Array.from({ length: 12 }, (_, i) => i + 1).map((id) => (
        <div className="p-8 col-span-4 md:col-span-2" key={id}>
          <Skeleton className="h-6 w-1/2 bg-gray-400"></Skeleton>
          <Skeleton className="h-6 w-1/4 mb-4 bg-gray-400"></Skeleton>
          <Skeleton className="rounded-md w-full h-80 bg-gray-400"></Skeleton>
          <div className="aspect-video relative"></div>
        </div>
      ))} */}
    </main>
  );
}
