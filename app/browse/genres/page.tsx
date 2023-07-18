import { getGamesGenres } from "@/utils";
import { GameGenres, GenreGamesList, GenreResults } from "@/types";
import Image from "next/image";
import Link from "next/link";

const Genres = async () => {
  const genres: GameGenres = await getGamesGenres();
  const { results } = genres;

  console.log("genres: ", genres);

  return (
    <div className="text-white">
      <p>GENRES PAGE</p>
      <div className="flex flex-row flex-wrap gap-4">
        {/* {results.map((genre: GenreResults) => ( */}
        {results.map(({ id, name, slug, games_count, image_background, games }: GenreResults) => (
          <Link
            href={{
              pathname: `/browse/genres/${slug}`,
              query: { id: JSON.stringify(id) },
            }}
            className="relative cursor-pointer rounded-lg overflow-hidden"
            key={id}
          >
            <div className="w-80 h-64">
              <Image src={image_background} alt="Game Genre" width={200} height={200} className="w-full h-full object-cover"></Image>
            </div>

            <ul className="absolute p-2 bottom-2 w-full text-center z-10">
              <li>Id: {id}</li>
              <li>{name}</li>
              <li>{games_count}</li>
            </ul>

            {/* LINEAR GRADIENT BACKGROUND EFFECT */}
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent text-white"></div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Genres;
