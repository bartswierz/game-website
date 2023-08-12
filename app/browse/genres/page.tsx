import { getGamesGenres } from "@/utils";
import { GameGenres, GenreResults } from "@/types";
import Image from "next/image";
import Link from "next/link";

const Genres = async () => {
  const genres: GameGenres = await getGamesGenres();
  const { results } = genres;

  return (
    <div className="grid gap-5 text-white 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xsm:grid-cols-1">
      {results.map(({ id, name, slug, games_count, image_background, games }: GenreResults) => (
        <Link
          href={{
            pathname: `/browse/genres/${slug}`,
            query: { id: id },
          }}
          className="relative cursor-pointer rounded-lg overflow-hidden w-full h-80 justify-self-stretch"
          key={id}
        >
          <Image src={image_background} alt="Game Genre" width={200} height={200} className="w-full h-full object-cover"></Image>

          {/* TEXT */}
          <ul className="absolute p-2 bottom-2 w-full text-center z-10">
            <li className="text-lg font-bold">{name}</li>
            <li className="text-gray-400">{games_count}+ Games</li>
          </ul>

          {/* LINEAR GRADIENT BACKGROUND EFFECT */}
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent text-white"></div>
        </Link>
      ))}
    </div>
  );
};

export default Genres;
