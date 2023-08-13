import { Skeleton } from "@/components/ui/skeleton";
import { Key } from "react";

export default function Loading() {
  return (
    <div>
      {/* HEADER */}
      <Skeleton className="w-full mb-8 max-w-[400px] h-10"></Skeleton>

      {/* <div className="flex flex-wrap gap-4"> */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, idx: Key) => (
          <Skeleton className="w-full max-w-[640px] h-[448px]" key={idx}></Skeleton>
        ))}
      </div>
    </div>
  );
}
