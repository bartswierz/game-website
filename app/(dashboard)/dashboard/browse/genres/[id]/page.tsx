import { getGenreInfo } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { ShowMore } from "@/components/ui";

const GenrePage = async ({ searchParams }: { params: { slug: string }; searchParams: { id: string } }) => {
  let data = await getGenreInfo(searchParams.id);
  const genreInfo = data;

  return (
    <div className="max-w-[1200px] text-white bg-slate-800 rounded-lg overflow-hidden mx-4 lg:mx-0">
      <div>
        {genreInfo && (
          <div className="flex flex-col lg:flex-row">
            {/* IMAGE BACKGROUND */}
            <div className="w-full min-w-[348px]">
              <Image src={genreInfo.image_background} width={300} height={300} alt="Genre" className="w-full h-full object-cover" />
            </div>

            {/* TEXT CONTAINER */}
            <div className="px-4 py-4">
              {/* HEADER */}
              <h1 className="flex flex-wrap justify-start items-end mb-2 gap-1">
                <span className="text-3xl font-semibold">{genreInfo.name}</span>{" "}
                <span className="text-gray-500 text-base">{genreInfo.games_count}+ Games</span>
              </h1>

              {/* DESCRIPITION */}
              <div className="mb-2">
                <h2 className="text-xl font-semibold">Description</h2>
                <ShowMore text={genreInfo.description} />
              </div>

              {/* NAVIGATES USER TO INDIVIDUAL GENRE PAGE - ex. /genres/action */}
              <div className="flex justify-center mt-4">
                <Link
                  href={{
                    pathname: `/dashboard/genres/${genreInfo.name.toLowerCase()}`,
                    query: { genres: searchParams.id, page_size: 6 },
                  }}
                  className="bg-gray-200 text-gray-500 font-semibold rounded-md py-1 px-2 text-center hover:bg-gray-300 w-full max-w-2xl"
                >
                  View {genreInfo.name} Games
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenrePage;
