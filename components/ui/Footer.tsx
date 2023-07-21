import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex justify-center items-center  text-white gap-x-1 p-4">
      Data provided by
      <Link href="https://rawg.io/apidocs" target="_blank" className="underline">
        RAWG API
      </Link>
      <span> - Over 500,000+ Games!</span>
    </footer>
  );
};

export default Footer;
