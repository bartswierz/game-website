import { getGamesByGenre } from "@/utils";
import { GameLink, LoadMoreGenreGames } from "@/components/ui";

//ex. http://localhost:3000/genres/sports?genres=sports
const GenrePage = async ({ params }: { params: { slug: string } }) => {
  const content = await getGamesByGenre(params.slug);

  return (
    <div className="text-white mx-4 xsm:mx-0">
      <div className="text-4xl font-semibold uppercase flex flex-wrap mb-8">
        {params.slug} GAMES
        <span className="text-base text-gray-500 ml-2 items-end self-end justify-end">{content.count}+ Games</span>
      </div>

      {content && (
        <div className="grid grid-cols-1 px-2 sm:px-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-auto gap-4 ">
          {content.results.map(({ slug, name, background_image }) => (
            // Creates a Game Card Link for each game, links user to the Games page -> /games/[slug]
            <div key={slug} className="h-64">
              <GameLink slug={slug} name={name} background_image={background_image} />
            </div>
          ))}
        </div>
      )}

      {/* LOADING ICON AT THE BOTTOM */}
      {params.slug && <LoadMoreGenreGames searchQuery={params.slug} />}
    </div>
  );
};

export default GenrePage;
