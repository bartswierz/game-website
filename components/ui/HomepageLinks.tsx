import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import DevelopersImage from "/public/images/Developers.png";
import PlatformsImage from "/public/images/Platforms.png";
import StoresImage from "/public/images/Store.png";
import GenresImage from "/public/images/Genres.png";

// LINEAR GRADIENT GENERATOR - https://hypercolor.dev/generator
// LINKS USER TO GENRES, DEVELOPERS, STORES, and PLATFORMS
const HomepageLinks = () => {
  interface linksProps {
    hrefText: string;
    linkText: string;
    secondaryText: string;
    imagePath: StaticImageData;
  }

  const LinkCard = ({ hrefText, linkText, secondaryText, imagePath }: linksProps) => {
    console.log("imagePath", imagePath);

    return (
      <Link
        href={`${hrefText}`}
        className="relative flex flex-col justify-center items-center bg-gradient-to-b from-slate-900 to-blue-700 font-semibold rounded-lg text-2xl sm:text-3xl hover:to-blue-500 group hover:bg-blue-700 w-full h-full overflow-hidden z-[1]"
      >
        <Image
          src={imagePath}
          alt="Category Link"
          fill
          className="absolute object-cover object-center w-full- h-full-  z-[-1] opacity-50 group-hover:opacity-100"
        />
        {linkText}
        <span className="text-base font-medium text-gray-500 group-hover:text-white group-hover:font-bold">{secondaryText}</span>
      </Link>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[70vh] p-4">
      <LinkCard hrefText="/dashboard/browse/genres" linkText="Genres" secondaryText="19 Genres" imagePath={GenresImage} />
      <LinkCard
        hrefText="/dashboard/browse/developers"
        linkText="Developers"
        secondaryText="436000+ Developers"
        imagePath={DevelopersImage}
      />
      <LinkCard hrefText="/dashboard/browse/platforms" linkText="Platforms" secondaryText="51 Platforms" imagePath={PlatformsImage} />
      <LinkCard hrefText="/dashboard/browse/stores" linkText="Stores" secondaryText="10 Stores" imagePath={StoresImage} />
    </div>
  );
};

export default HomepageLinks;
