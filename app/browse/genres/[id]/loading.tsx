import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-[1200px] text-white bg-slate-800 rounded-lg overflow-hidden mx-4 lg:mx-0">
      <Skeleton className="w-full h-[620px] lg:h-64"></Skeleton>
    </div>
  );
}
