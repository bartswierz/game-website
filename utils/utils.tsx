import { FaSteam, FaPlaystation, FaXbox, FaApple, FaGooglePlay } from "react-icons/fa";
import { SiNintendo, SiGogdotcom, SiItchdotio, SiEpicgames, SiNintendoswitch } from "react-icons/si";
import { PiDesktopTowerDuotone } from "react-icons/pi";
import { BsAndroid2 } from "react-icons/bs";

//Get a live distribution site link based on store slug passed. i.e. 'steam' will return 'https://store.steampowered.com/'
export const getPlatformStoreLink = (storeSlug: string): string => {
  switch (storeSlug.toLowerCase()) {
    case "steam":
      return "https://store.steampowered.com/";
    case "xbox-store":
      return "https://www.microsoft.com/";
    case "xbox360":
      return "https://marketplace.xbox.com/";
    case "xbox-one":
      return "https://www.microsoft.com/";
    case "xbox-series-x":
      return "https://www.microsoft.com/";
    case "playstation-store":
      return "https://store.playstation.com/";
    case "playstation5":
      return "https://store.playstation.com/";
    case "playstation4":
      return "https://store.playstation.com/";
    case "playstation3":
      return "https://store.playstation.com/";
    case "apple-appstore":
      return "https://www.apple.com/";
    case "gog":
      return "https://www.gog.com/";
    case "nintendo":
      return "https://www.nintendo.com/";
    case "nintendo-switch":
      return "https://www.nintendo.com/";
    case "google-play":
      return "https://play.google.com/";
    case "itch.io":
      return "https://itch.io/";
    case "epic-games":
      return "https://store.epicgames.com/";
    default:
      return "N/A";
  }
};

// Return a store icon based on slug passed. i.e. 'steam' will return the Steam icon.
export const getPlatformIcon = (storeSlug: string) => {
  const size = 20;
  switch (storeSlug.toLowerCase()) {
    case "steam":
      return <FaSteam size={size} />;
    case "xbox-store":
      return <FaXbox size={size} />;
    case "xbox360":
      return <FaXbox size={size} />;
    case "xbox-one":
      return <FaXbox size={size} />;
    case "xbox-series-x":
      return <FaXbox size={size} />;
    case "playstation-store":
      return <FaPlaystation size={size} />;
    case "playstation5":
      return <FaPlaystation size={size} />;
    case "playstation4":
      return <FaPlaystation size={size} />;
    case "playstation3":
      return <FaPlaystation size={size} />;
    case "apple-appstore":
      return <FaApple size={size} />;
    case "android":
      return <BsAndroid2 size={size} />;
    case "gog":
      return <SiGogdotcom size={size} />;
    case "nintendo":
      return <SiNintendo size={size} />;
    case "nintendo-switch":
      return <SiNintendoswitch size={size} />;
    case "google-play":
      return <FaGooglePlay size={size} />;
    case "itch.io":
      return <SiItchdotio size={size} />;
    case "epic-games":
      return <SiEpicgames size={size} />;
    case "pc":
      return <PiDesktopTowerDuotone size={size} />;
    case "macos":
      return <PiDesktopTowerDuotone size={size} />;
    case "linux":
      return <PiDesktopTowerDuotone size={size} />;
    default:
      return "N/A";
  }
};

// Creates a valid URL from a string i.e.) link: "Best of the Year" & title: Top Games" => "best-of-the-year"
export const formatLink = (title: string, link: string): string => {
  const formattedDirectory = title.replaceAll(" ", "-").toLowerCase();
  const formattedLink = link.replaceAll(" ", "-").toLowerCase();
  const formattedURL = "/" + formattedDirectory + "/" + formattedLink;

  return formattedURL;
};

// Get the current page number from the URL by splitting the URL at the "page=". i.e.) https://api.rawg.io/api/developers?key=...&page=2 => page=2 => 2
export const getPage = (url: string): number => {
  const splitURL = url.split("page="); // ["https://api.rawg.io/api/developers?key=...", "2"]

  // Converting from string to number and subtracting 1 to get the current page number because the passed url is the NEXT URL TO FETCH
  const pageNumber = Number(splitURL[1]) - 1;

  return pageNumber;
};

//Checks if there was ordering or platforms parameters passed, and if they were, adds the parameters to the URL
export function checkForParameters(ordering?: string, platforms?: string) {
  if (ordering && platforms) {
    return `&ordering=${ordering}&platforms=${platforms}`;
  } else if (ordering && !platforms) {
    return `&ordering=${ordering}`;
  } else if (!ordering && platforms) {
    return `&platforms=${platforms}`;
  } else {
    return;
  }
}

//Formats the description by splitting the text into paragraphs by splitting on P TAGS and BR TAGS, removing <em> tags, replaces &amp; with & and replaces &#39; with '
export const formatDescription = (description: string) => {
  // Split the text into paragraphs by splitting on P TAGS and BR TAGS
  const paragraphs = description.split(/<\/?p>|<br\s*\/?>/).filter((paragraph) => paragraph.trim() !== "");

  // Removes <em> tags, replaces &amp; with & and replaces &#39; with '
  const cleanedParagraphs = paragraphs.map((paragraph) =>
    paragraph
      .replace(/<\/?em\s*\/?>/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&#39;/g, "'")
  );

  return cleanedParagraphs;
};

//Grabs the platform page title. ex. /platforms/PC -> PC
export const getPageTitle = (platformID: string) => {
  switch (platformID) {
    case "4":
      return "pc";
    case "3":
      return "ios";
    case "21":
      return "android";
    case "6":
      return "linux";
    case "166":
      return "commodore";
    case "111":
      return "3do";
    case "12":
      return "neo-geo";
    case "186":
      return "xbox-series-x";
    case "1":
      return "xbox-one";
    case "14":
      return "xbox-360";
    case "80":
      return "xbox";
    case "187":
      return "playstation-5";
    case "18":
      return "playstation-4";
    case "16":
      return "playstation-3";
    case "15":
      return "playstation-2";
    case "27":
      return "playstation";
    case "19":
      return "ps-vita";
    case "17":
      return "psp";
    case "5":
      return "macos";
    case "55":
      return "classic-macintosh";
    case "41":
      return "apple-ii";
    case "7":
      return "nintendo-switch";
    case "8":
      return "nintendo-3ds";
    case "9":
      return "nintendo-ds";
    case "13":
      return "nintendo-dsi";
    case "83":
      return "nintendo-64";
    case "10":
      return "wii-u";
    case "11":
      return "wii";
    case "105":
      return "gamecube";
    case "24":
      return "game-boy-advance";
    case "43":
      return "game-boy-color";
    case "26":
      return "game-boy";
    case "79":
      return "snes";
    case "49":
      return "nes";
    case "28":
      return "atari-7800";
    case "31":
      return "atari-5200";
    case "23":
      return "atari-2600";
    case "22":
      return "atari-flashback";
    case "25":
      return "atari-8-bit";
    case "34":
      return "atari-st";
    case "46":
      return "atari-lynx";
    case "50":
      return "atari-xegs";
    case "112":
      return "jaguar";
    case "167":
      return "genesis";
    case "107":
      return "sega-saturn";
    case "119":
      return "sega-cd";
    case "117":
      return "sega-32x";
    case "74":
      return "sega-master-system";
    case "106":
      return "dreamcast";
    case "77":
      return "game-gear";
    default:
      return "unknown-platform";
  }
};
