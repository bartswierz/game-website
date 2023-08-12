import { Skeleton } from "@/components/ui/skeleton";

//SKELETON WILL BE THE LOADING BACKGROUND - WE WANT TO SIZE THIS DEPENDING ON THE SIZE OF THE ACTUAL ITEM
//LOADING REQUIRES A LARGE WIDTH AND HEIGHT OF 5-6 ITEMS, PREFERRABLE 6 IMAGES
export default function Loading() {
  return (
    <div className="container bg-green-500">
      <div className="text-[60px] text-green-500 border"></div>
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
// import { Skeleton } from "@/components/ui/skeleton";

// export default function Loading() {
//   return (
//     <div className="max-w-full max-h-full flex items-center space-x-4 bg-green-500">
//       <div className="text-[60px] text-green-500 border"></div>
//       <Skeleton className="h-12 w-12 rounded-full" />
//       <div className="space-y-2">
//         <Skeleton className="h-4 w-[250px]" />
//         <Skeleton className="h-4 w-[200px]" />
//       </div>
//     </div>
//   );
// }
