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
              pathname: `/genres/${slug}`,
              query: { id: JSON.stringify(id) },
            }}
            className="border cursor-pointer"
            key={id}
          >
            <Image src={image_background} alt="Game Genre" width={300} height={300}></Image>
            <p>Id: {id}</p>
            <p>{name}</p>
            <p>{games_count}</p>
            {/* TODO - Move this into a Link for individual Genres */}
            {/* <p>
              {games.map(({ id, slug, name, added }: GenreGamesList) => (
                <div className="border">
                  <div>Game: {id}</div>
                  <div>Game: {slug}</div>
                  <div>Game: {name}</div>
                  <div>Game: {added}</div>
                </div>
              ))}
            </p> */}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Genres;
