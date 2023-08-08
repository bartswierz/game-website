import Link from "next/link";

// LINEAR GRADIENT GENERATOR - https://hypercolor.dev/generator
const HomepageLinks = () => {
  interface linksProps {
    hrefText: string;
    linkText: string;
    secondaryText: string;
  }

  const LinkCard = ({ hrefText, linkText, secondaryText }: linksProps) => {
    return (
      <Link
        href={`${hrefText}`}
        className="flex flex-col justify-center items-center bg-gradient-to-b from-slate-900 to-blue-700 font-semibold rounded-lg text-2xl sm:text-3xl hover:to-blue-500 group hover:bg-blue-700"
      >
        {linkText}
        <span className="text-base font-medium text-gray-500 group-hover:text-white group-hover:font-bold">{secondaryText}</span>
      </Link>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[70vh] p-4">
      <LinkCard hrefText="/browse/genres" linkText="Genres" secondaryText="19 Genres" />
      <LinkCard hrefText="/browse/developers" linkText="Developers" secondaryText="436000+ Developers" />
      <LinkCard hrefText="/browse/platforms" linkText="Platforms" secondaryText="51 Platforms" />
      <LinkCard hrefText="/browse/stores" linkText="Stores" secondaryText="10 Stores" />
    </div>
  );
};

export default HomepageLinks;
