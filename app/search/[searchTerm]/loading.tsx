import { Skeleton } from "@/components/ui/Shadcn/skeleton";

export default function Loading() {
  const numberOfGames = 20;

  const skeletonArray = Array.from({ length: numberOfGames });

  return (
    <div>
      <div>
        {/* Header 225x43*/}
        <div className="flex justify-center md:justify-start">
          <Skeleton className="w-[225px] h-[43px]">
            {/* <span className="capitalize"></span>
                <span className="text-xl text-gray-600 block"></span> */}
          </Skeleton>
        </div>

        {/* FILTER BUTTONS 200-40 */}
        <div className="flex justify-center items-center md:justify-start md:items-start gap-4 my-4">
          <Skeleton className="w-[200px] h-[40px]"></Skeleton>
          <Skeleton className="w-[200px] h-[40px]"></Skeleton>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 px-4 md:px-0 gap-4">
          {skeletonArray.map((_, i) => (
            <>
              {/* FILTER BUTTONS */}
              {/* <Skeleton className="flex- justify-center- items-center- md:justify-start- md:items-start- gap-4 my-4"></Skeleton>
              <Skeleton className="flex- justify-center- items-center- md:justify-start- md:items-start- gap-4 my-4"></Skeleton> */}

              {/* GAME CARD */}
              <Skeleton className="h-64 bg-gray-500" key={i}></Skeleton>
            </>
          ))}
        </ul>
      </div>
    </div>
  );
}

// import { Skeleton } from "@/components/ui/Shadcn/skeleton";

// export default function Loading() {
//   const numberOfGames = 20;

//   const skeletonArray = Array.from({ length: numberOfGames });

//   return (
//     <div>
//       <div>
//         <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 px-4 md:px-0 gap-4">
//           {skeletonArray.map((_, i) => (
//             <Skeleton className="h-64 bg-gray-500" key={i}></Skeleton>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }
