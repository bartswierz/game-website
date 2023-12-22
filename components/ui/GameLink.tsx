// "use client";
import Link from "next/link";
import Image from "next/image";
import { MdBrokenImage } from "react-icons/md";

interface GameLinkProps {
  slug: string;
  name: string;
  background_image: string;
}
// DISPLAYS A GAME AS A LINK TO THE GAME PAGE
const GameLink = ({ slug, name, background_image }: GameLinkProps) => {
  // const { slug, name, background_image } = props;

  //BACKGROUND IMAGE USING PASSED IMAGE URL & FALLBACK IMAGE IF NO IMAGE URL
  const BackgroundImage = () => {
    return background_image ? (
      <div className="w-full h-full">
        <Image src={background_image} width={300} height={300} alt="Game" className="w-full h-full object-cover" />
      </div>
    ) : (
      // IF NO IMAGE URL, DISPLAY BROKEN IMAGE ICON
      <div className="flex justify-center items-center h-full">
        <MdBrokenImage size={80} color="grey" />
      </div>
    );
  };

  return (
    // <div className="cursor-pointer rounded-xl overflow-hidden">
    <div className="cursor-pointer rounded-xl overflow-hidden w-full h-full">
      <Link href={`/dashboard/games/${slug}`} key={slug} className="cursor-pointer rounded-lg overflow-hidden h-full bg-green-500">
        <div className="relative h-full">
          <BackgroundImage />

          {/* GRADIENT BACKGROUND EFFECT */}
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

          {/* GAME NAME TEXT */}
          <p className="absolute text-white  bottom-8 w-full h-5 text-center">{name}</p>
        </div>
      </Link>
    </div>
  );
};

export default GameLink;
