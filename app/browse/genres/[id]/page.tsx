"use client";
import { useSearchParams } from "next/navigation";
import { getGenreInfo } from "@/utils";
import { GenreInfo } from "@/types";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShowMore } from "@/components/ui";

// const GenrePage = async ({ params }: { params: { slug: string; query: { id: string } } }) => {
const GenrePage = async () => {
  // Grabs the ID from the URL
  const searchParams = useSearchParams();
  const searchID = searchParams.get("id");
  const [genreInfo, setGenreInfo] = useState<GenreInfo>();

  // Fetch Genre Info using the passed ID from browse/genres Page
  useEffect(() => {
    const fetchGenreInfo = async (searchID: string) => {
      const data: GenreInfo = await getGenreInfo(searchID);

      if (data) {
        // console.log("data: ", data);
        setGenreInfo(data);
      } else throw new Error("No data returned from getGenreInfo");
    };

    if (searchID) fetchGenreInfo(searchID);
  }, [searchID]);

  // const removeTags = (description: string): string[] => {
  //   // Removes <p> & </p>
  //   const removeParagraphTags = description.replace(/<\/?p>/g, "");

  //   const replaceHex = removeParagraphTags.replace(/&#39;/g, "'");

  //   const splitAtBreakTags = replaceHex.split("<br />");
  //   return splitAtBreakTags;
  // };

  return (
    <div className="border text-white">
      {genreInfo && (
        <div>
          {/* IMAGE BACKGROUND */}
          <div>
            <Image src={genreInfo.image_background} width={300} height={300} alt="Genre" />
          </div>

          {/* PLATFORMS HEADER */}
          <h1>
            <span className="text-4xl font-semibold">{genreInfo.name}</span>{" "}
            <span className="text-gray-500 text-base">{genreInfo.games_count}+ Games</span>
          </h1>

          <ul key={genreInfo.id} className="p-2">
            <li>
              <h2 className="text-xl">Description:</h2>
              {/* {removeTags(genreInfo.description).map((sentence, idx) => (
                <p key={idx} className="my-2">
                  {sentence}
                </p>
              ))} */}
              {/* ADD SHOWMORE HERE */}
              <ShowMore text={genreInfo.description} />
            </li>
            <li>
              {/* NAVIGATES USER TO INDIVIDUAL GENRE PAGE - ex. /genres/action */}
              <Link
                href={{
                  pathname: `/genres/${genreInfo.name.toLowerCase()}`,
                  query: { genres: `${genreInfo.name.toLowerCase()}`, page_size: 6 },
                }}
                className="bg-gray-200 text-gray-500 text-sm font-semibold rounded-md py-1 px-2 hover:bg-gray-300 w-max"
              >
                View {genreInfo.name} Games
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default GenrePage;

// PREVIOUS
// const BrowseGenre = async () => {
//   return <div className="text-white">INDIVIDUAL GENRE</div>;
// };

// export default BrowseGenre;
