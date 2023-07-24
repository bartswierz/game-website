import { SidebarDataProps } from "@/types";

const obj = { data: { test: "text" } };
console.log("obj", obj.data.test);

// Hardcoded Sidebar Data due to different requirements needed for each route category(browse, platforms, generes, etc.) to display properly in the URL. Within the platforms, we have decided to hardcode the ID because the IDs aren't expected to be changed and saves us seconds of load time fetching and filtering through a large data request from the RAWG API.
export const sidebarData: SidebarDataProps = {
  // BROWSE DATA
  browse: { title: "browse", linkList: ["genres", "developers", "stores", "platforms"] },
  // PLATFORMS DATA
  platforms: {
    title: "platforms",
    linkList: [
      //PC
      { link: "PC", platformID: 4 },

      // Xbox
      { link: "Xbox Series X", platformID: 186 },
      { link: "Xbox One", platformID: 1 },
      { link: "Xbox 360", platformID: 14 },
      { link: "Xbox", platformID: 80 },

      // Playstation
      { link: "playStation 5", platformID: 187 },
      { link: "playStation 4", platformID: 18 },
      { link: "PlayStation 3", platformID: 16 },
      { link: "PlayStation 2", platformID: 15 },
      { link: "PlayStation", platformID: 27 },
      { link: "PS Vita", platformID: 19 },
      { link: "PSP", platformID: 17 },

      //iOS
      { link: "iOS", platformID: 3 },

      //Android
      { link: "Android", platformID: 21 },

      //Apple Macintosh
      { link: "macOS", platformID: 5 },
      { link: "Classic Macintosh", platformID: 55 },
      { link: "Apple II", platformID: 41 },

      // Linux
      { link: "Linux", platformID: 6 },

      //Nintendo
      { link: "Nintendo Switch", platformID: 7 },
      { link: "Nintendo 3DS", platformID: 8 },
      { link: "Nintendo DS", platformID: 9 },
      { link: "Nintendo DSi", platformID: 13 },
      { link: "Nintendo 64", platformID: 83 },
      { link: "Wii U", platformID: 10 },
      { link: "Wii", platformID: 11 },
      { link: "GameCube", platformID: 105 },
      { link: "Game Boy Advance", platformID: 24 },
      { link: "Game Boy Color", platformID: 43 },
      { link: "Game Boy", platformID: 26 },
      { link: "SNES", platformID: 79 },
      { link: "NES", platformID: 49 },

      //Atari
      { link: "Atari 7800", platformID: 28 },
      { link: "Atari 5200", platformID: 31 },
      { link: "Atari 2600", platformID: 23 },
      { link: "Atari Flashback", platformID: 22 },
      { link: "Atari 8-bit", platformID: 25 },
      { link: "Atari ST", platformID: 34 },
      { link: "Atari Lynx", platformID: 46 },
      { link: "Atari XEGS", platformID: 50 },
      { link: "Jaguar", platformID: 112 },

      //Commodore
      { link: "Commodore / Amiga", platformID: 166 },

      //SEGA
      { link: "Genesis", platformID: 167 },
      { link: "SEGA Saturn", platformID: 107 },
      { link: "SEGA CD", platformID: 119 },
      { link: "SEGA 32X", platformID: 117 },
      { link: "SEGA Master System", platformID: 74 },
      { link: "Dreamcast", platformID: 106 },
      { link: "Game Gear", platformID: 77 },

      //3DO
      { link: "3DO", platformID: 111 },

      //Neo Geo
      { link: "Neo Geo", platformID: 12 },
    ],
  },

  // platforms: {
  //   title: "platforms",
  //   linkList: [
  //     { link: "PC", platformID: 4 },
  //     { link: "playStation 5", platformID: 187 },
  //     { link: "Xbox Series X", platformID: 186 },
  //     { link: "Xbox One", platformID: 1 },
  //     { link: "playStation 4", platformID: 18 },
  //     { link: "Nintendo Switch", platformID: 7 },
  //     { link: "iOS", platformID: 3 },
  //     { link: "Android", platformID: 21 },
  //     { link: "Nintendo 3DS", platformID: 8 },
  //     { link: "Nintendo DS", platformID: 9 },
  //     { link: "Nintendo DSi", platformID: 13 },
  //     { link: "macOS", platformID: 5 },
  //     { link: "Linux", platformID: 6 },
  //     { link: "Xbox 360", platformID: 14 },
  //     { link: "Xbox", platformID: 80 },
  //     { link: "PlayStation 3", platformID: 16 },
  //     { link: "PlayStation 2", platformID: 15 },
  //     { link: "PlayStation", platformID: 27 },
  //     { link: "PS Vita", platformID: 19 },
  //     { link: "PSP", platformID: 17 },
  //     { link: "Wii U", platformID: 10 },
  //     { link: "Wii", platformID: 11 },
  //     { link: "GameCube", platformID: 105 },
  //     { link: "Nintendo 64", platformID: 83 },
  //     { link: "Game Boy Advance", platformID: 24 },
  //     { link: "Game Boy Color", platformID: 43 },
  //     { link: "Game Boy", platformID: 26 },
  //     { link: "SNES", platformID: 79 },
  //     { link: "NES", platformID: 49 },
  //     { link: "Classic Macintosh", platformID: 55 },
  //     { link: "Apple II", platformID: 41 },
  //     { link: "Commodore / Amiga", platformID: 166 },
  //     { link: "Atari 7800", platformID: 28 },
  //     { link: "Atari 5200", platformID: 31 },
  //     { link: "Atari 2600", platformID: 23 },
  //     { link: "Atari Flashback", platformID: 22 },
  //     { link: "Atari 8-bit", platformID: 25 },
  //     { link: "Atari ST", platformID: 34 },
  //     { link: "Atari Lynx", platformID: 46 },
  //     { link: "Atari XEGS", platformID: 50 },
  //     { link: "Genesis", platformID: 167 },
  //     { link: "SEGA Saturn", platformID: 107 },
  //     { link: "SEGA CD", platformID: 119 },
  //     { link: "SEGA 32X", platformID: 117 },
  //     { link: "SEGA Master System", platformID: 74 },
  //     { link: "Dreamcast", platformID: 106 },
  //     { link: "3DO", platformID: 111 },
  //     { link: "Jaguar", platformID: 112 },
  //     { link: "Game Gear", platformID: 77 },
  //     { link: "Neo Geo", platformID: 12 },
  //   ],
  // },
  // GENRES DATA
  genres: {
    title: "genres",
    linkList: [
      "action",
      "indie",
      "strategy",
      "casual",
      "RPG",
      "shooter",
      "adventure",
      "puzzle",
      "racing",
      "sports",
      "simulation",
      "arcade",
      "platformer",
      "massively-multiplayer",
      "fighting",
      "family",
      "board-games",
      "educational",
      "card",
    ],
  },
};
