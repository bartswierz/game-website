import { Skeleton } from "@/components/ui/skeleton";
import { Key } from "react";

export default function Loading() {
  return (
    <div>
      {/* HEADING */}
      <Skeleton className="font-bold mb-8 w-[440px] h-10"></Skeleton>

      {/* 6 CARD GRID */}
      <div className="grid xl:grid-cols-2 gap-10 border">
        {Array.from({ length: 6 }).map((_, idx: Key) => (
          <Skeleton className="w-full max-w-[640px] h-[448px]" key={idx}></Skeleton>
        ))}
      </div>
    </div>
  );
}
