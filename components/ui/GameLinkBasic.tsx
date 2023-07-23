import Link from "next/link";
import { BsBoxArrowRight } from "react-icons/bs";

interface GameLinkBasicProps {
  id: number;
  name: string;
  games_count: number;
  games: {
    id: number;
    slug: string;
    name: string;
    added: number;
  }[];
}

const GameLinkBasic = ({ id, name, games_count, games }: GameLinkBasicProps) => {
  return (
    <div key={id}>
      <h2 className="mb-6">
        <span className="text-3xl font-bold">{name}</span> <span className="text-gray-500 pl-1">{games_count}+ Games</span>
      </h2>

      <div className="flex flex-row flex-wrap gap-4 mb-4">
        {games.map(({ id, slug, name }) => (
          <Link href={`/games/${slug}`} key={slug} className="relative flex flex-col shadow-xl w-56 h-64 group cursor-pointer">
            <div className="text-center pt-6">
              <p className="text-xl text-bold">{name}</p>
              <p>id: {id}</p>
            </div>

            {/* GRADIENT BACKGROUND EFFECT */}
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

            {/* GAME NAME TEXT */}
            <p className="absolute flex  justify-center items-center text-white  bottom-5 w-full text-center ">
              <BsBoxArrowRight size={40} color="gray" className="group-hover:fill-white" />
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GameLinkBasic;
