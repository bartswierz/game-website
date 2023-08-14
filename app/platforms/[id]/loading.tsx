import { Skeleton } from "@/components/ui/Shadcn/skeleton";
import { Key } from "react";

export default function Loading() {
  return (
    <div>
      <div className="flex text-4xl mb-6">
        {/* PLATFORM GAMES HEADER */}
        <Skeleton className="w-80 h-10"></Skeleton>
        {/* NUMBER OF GAMES WITHIN PLATFORM */}
        <Skeleton className="ml-2 self-end w-32 h-6"></Skeleton>
      </div>
      <div>
        <div className="grid grid-cols-1 px-4 sm:px-0 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 justify-center">
          {Array.from({ length: 12 }).map((_, idx: Key) => (
            <div className="flex flex-col max-w-[500px] rounded-xl overflow-hidden bg-gray-800 h-max" key={idx}>
              {/* IMAGE */}
              <Skeleton className="h-48"></Skeleton>

              <div className="text-center p-4">
                {/* GAME NAME */}
                <Skeleton className="mb-2 font-bold w-[60%] h-8 mx-auto"></Skeleton>

                {/* STORES */}
                <div className="flex flex-col gap-y-4 p-2">
                  {Array.from({ length: 4 }).map((_, idx: Key) => (
                    <Skeleton className="flex gap-x-2 items-center justify-center  border  rounded-full h-[42px]" key={idx}></Skeleton>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
