import { Skeleton } from "@/components/ui/skeleton";
import { Key } from "react";

export default function Loading() {
  const screenshotArray = 6;
  const skeletonScreenshotArray = Array.from({ length: screenshotArray });

  return (
    <div className="container">
      <div className="text-white flex flex-row gap-8 max-w-[1500px]">
        {/* LEFT COLUMN */}
        <div className="p-4 flex-[60]">
          <div className="flex flex-col gap-4 w-full">
            <div>
              <div className="flex flex-wrap gap-2">
                {/* RELEASED */}
                <Skeleton className="w-[176px] h-8"></Skeleton>

                {/* UPDATED */}
                <Skeleton className="w-[176px] h-8"></Skeleton>
              </div>

              {/* GAME TITLE & GAME ID */}
              <Skeleton className="w-[180px] h-10 mt-2"></Skeleton>
            </div>

            {/* SCREENSHOTS */}
            <div className="grid grid-cols-1 xsm:grid-cols-2 gap-4 lg:hidden">
              {skeletonScreenshotArray.map((_, idx: Key) => (
                <Skeleton className="h-32" key={idx}></Skeleton>
              ))}
            </div>

            {/* ABOUT/DESCRIPTION */}
            <h2 className="text-3xl font-bold">About</h2>
            <Skeleton className="w-full h-48"></Skeleton>

            {/* CONTAINER HOLDING: Platforms, Metascore, Genre, Release Date, Developer, Publisher, Age Rating, Other game in the series, Tags, Website */}
            <div className="flex flex-row flex-wrap mt-8 gap-4">
              {/* PLATFORMS */}
              <div className="">
                <h2 className="text-gray-500 font-semibold mb-2">Platforms</h2>
                <ul>
                  {/* Xbox Series S/X */}
                  <Skeleton className="w-32 h-6"></Skeleton>
                </ul>
              </div>

              {/* METASCORE */}
              <div>
                <h2 className="text-gray-500 font-semibold mb-2">Metascore</h2>
                {/* {metacritic ? ( */}
                <Skeleton className="h-8 w-9"></Skeleton>
              </div>

              {/* GENRES */}
              <div>
                <h2 className="text-gray-500 font-semibold mb-2">Genre</h2>
                <ul className="flex flex-row">
                  <Skeleton className="w-32 h-6"></Skeleton>
                </ul>
              </div>

              {/* RELEASE DATE */}
              <div>
                <h2 className="text-gray-500 font-semibold mb-2">Release Date</h2>
                <Skeleton className="w-[120px] h-6"></Skeleton>
              </div>

              {/* DEVELOPER */}
              <div>
                <h2 className="text-gray-500 font-semibold mb-2">Developer</h2>
                <Skeleton className="w-[120px] h-6"></Skeleton>
              </div>

              {/* PUBLISHER */}
              <div>
                <h2 className="text-gray-500 font-semibold mb-2">Publisher(s)</h2>
                <Skeleton className="w-[120px] h-6"></Skeleton>
              </div>

              {/* TAGS */}
              <div>
                <h2 className="text-gray-500 font-semibold mb-2">Tags</h2>
                <Skeleton className="w-[120px] h-6"></Skeleton>
              </div>

              {/* WEBSITE */}
              <div className="w-full">
                <h2 className="text-gray-500 font-semibold mb-2">Website(s)</h2>
                <div className="flex flex-wrap gap-2 pr-2 ">
                  <Skeleton className="w-[120px] h-6"></Skeleton>
                  <Skeleton className="w-[120px] h-6"></Skeleton>
                  <Skeleton className="w-[120px] h-6"></Skeleton>
                </div>
              </div>
            </div>
          </div>

          <br />

          {/* AVAILABLE STORES */}
          <div>
            <h2 className="text-gray-500 mb-2">Available Stores</h2>
            <div className="flex flex-row flex-wrap gap-2">
              <Skeleton className="w-32 h-6"></Skeleton>
              <Skeleton></Skeleton>
              <Skeleton></Skeleton>
            </div>
          </div>
        </div>

        {/* SCREENSHOTS - RIGHT COLUMN */}
        <div className="hidden lg:block flex-[30]">
          <div className="grid grid-cols-1 3xl:grid-cols-2 gap-4">
            {skeletonScreenshotArray.map((_, idx: Key) => (
              <Skeleton className="h-36 max-w-96"></Skeleton>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
