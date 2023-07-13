import { getGamesGenres } from "@/utils";

const Genres = async () => {
  const genres = await getGamesGenres();
  console.log("genres: ", genres);

  return <div className="text-white">GENRES PAGE</div>;
};

export default Genres;
