// "use client";
import Link from "next/link";
import Image from "next/image";

interface GameLinkProps {
  slug: string;
  name: string;
  background_image?: string;
}
// TODO - pass in the game content as a param,
const GameLink = ({ slug, name, background_image }: GameLinkProps) => {
  // const { slug, name, background_image } = props;

  return (
    <div className="cursor-pointer rounded-xl overflow-hidden">
      <Link href={`/games/${slug}`} key={slug} className="cursor-pointer rounded-lg overflow-hidden">
        {/* <h2>{game.name}</h2> */}
        <div className="w-80 h-80 relative">
          {background_image && (
            <Image src={background_image} width={300} height={300} alt="Game" className="w-full h-full object-cover" />
          )}
          {/* GRADIENT BACKGROUND EFFECT */}
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

          {/* GAME NAME TEXT */}
          <p className="absolute text-white  bottom-5 w-full h-5 text-center">{name}</p>
        </div>
      </Link>
    </div>
  );
};

export default GameLink;
