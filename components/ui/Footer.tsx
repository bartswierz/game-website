import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex flex-col sm:flex-row sm:justify-center items-center  text-white gap-x-1 p-4">
      <div>
        Data provided by{" "}
        <Link href="https://rawg.io/apidocs" target="_blank" className="underline">
          RAWG API
        </Link>
      </div>
      <span> - Over 850,000+ Games!</span>
    </footer>
  );
};

export default Footer;
