import { Skeleton } from "@/components/ui/Shadcn/skeleton";
import { Key } from "react";

export default function Loading() {
  return (
    <div className="flex justify-center flex-wrap gap-4">
      {Array.from({ length: 10 }).map((_, idx: Key) => (
        <Skeleton
          className="flex flex-col sm:flex-row sm:justify-start gap-2 rounded-lg w-80 max-w-[86vw] p-2  sm:gap-4 h-[66px]"
          key={idx}
        ></Skeleton>
      ))}
    </div>
  );
}
