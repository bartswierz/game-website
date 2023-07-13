"use client";
import { useSearchParams } from "next/navigation";
import { getGenreInfo } from "@/utils";
import { GenreInfo } from "@/types";
import { useState, useEffect } from "react";
import Image from "next/image";
// const GenrePage = async ({ params }: { params: { slug: string; query: { id: string } } }) => {
const GenrePage = async () => {
  const searchParams = useSearchParams();
  const searchID = searchParams.get("id");
  const [genreInfo, setGenreInfo] = useState<GenreInfo>();

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

  const removeTags = (description: string): string[] => {
    // Removes <p> & </p>
    const removeParagraphTags = description.replace(/<\/?p>/g, "");

    const replaceHex = removeParagraphTags.replace(/&#39;/g, "'");

    const splitAtBreakTags = replaceHex.split("<br />");
    return splitAtBreakTags;
  };
  // const genreInfo: GenreInfo = await getGenreInfo(searchID);

  // console.log("genreInfo: ", genreInfo);
  // console.log("Genre search ID: ", search);
  // console.log("Genre params: ", params.query.id);

  // export interface GenreInfo {
  //   id: number;
  //   name: string;
  //   slug: string;
  //   games_count: number;
  //   image_background: string;
  //   description: string;
  // }

  return (
    <div className="border text-white">
      {genreInfo && (
        <div>
          <div>
            <Image src={genreInfo.image_background} width={300} height={300} alt="Genre" />
          </div>
          <ul key={genreInfo.id} className="p-2">
            <li>{genreInfo.name}</li>
            <li>Total Games: {genreInfo.games_count}</li>
            <li>
              <h2 className="text-xl">Description:</h2>
              {removeTags(genreInfo.description).map((sentence, idx) => (
                <p key={idx} className="my-2">
                  {sentence}
                </p>
              ))}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default GenrePage;
