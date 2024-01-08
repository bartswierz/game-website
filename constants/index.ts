import { FilterType } from "@/types";

// Hardcoded Sidebar Data due to different requirements needed for each route category(browse, platforms, generes, etc.) to display properly in the URL. Within the platforms, we have decided to hardcode the ID because the IDs aren't expected to be changed and saves us seconds of load time fetching and filtering through a large data request from the RAWG API.
export const sidebarData = {
  // BROWSE DATA
  browse: { title: "browse", linkList: ["genres", "developers", "stores", "platforms"] },

  // PLATFORMS DATA
  pc: { link: "PC", platformID: 4 },
  iOS: { link: "iOS", platformID: 3 },
  android: { link: "Android", platformID: 21 },
  linux: { link: "Linux", platformID: 6 },
  commodore: { link: "Commodore", platformID: 166 },
  // commodore: { link: "Commodore / Amiga", platformID: 166 },
  "3DO": { link: "3DO", platformID: 111 },
  "Neo Geo": { link: "Neo Geo", platformID: 12 },

  xbox: [
    { link: "Xbox Series X", platformID: 186 },
    { link: "Xbox One", platformID: 1 },
    { link: "Xbox 360", platformID: 14 },
    { link: "Xbox", platformID: 80 },
  ],
  playstation: [
    { link: "PlayStation 5", platformID: 187 },
    { link: "PlayStation 4", platformID: 18 },
    { link: "PlayStation 3", platformID: 16 },
    { link: "PlayStation 2", platformID: 15 },
    { link: "PlayStation", platformID: 27 },
    { link: "PS Vita", platformID: 19 },
    { link: "PSP", platformID: 17 },
  ],
  macOS: [
    { link: "macOS", platformID: 5 },
    { link: "Classic Macintosh", platformID: 55 },
    { link: "Apple II", platformID: 41 },
  ],
  nintendo: [
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
  ],
  atari: [
    { link: "Atari 7800", platformID: 28 },
    { link: "Atari 5200", platformID: 31 },
    { link: "Atari 2600", platformID: 23 },
    { link: "Atari Flashback", platformID: 22 },
    { link: "Atari 8-bit", platformID: 25 },
    { link: "Atari ST", platformID: 34 },
    { link: "Atari Lynx", platformID: 46 },
    { link: "Atari XEGS", platformID: 50 },
    { link: "Jaguar", platformID: 112 },
  ],
  SEGA: [
    { link: "Genesis", platformID: 167 },
    { link: "SEGA Saturn", platformID: 107 },
    { link: "SEGA CD", platformID: 119 },
    { link: "SEGA 32X", platformID: 117 },
    { link: "SEGA Master System", platformID: 74 },
    { link: "Dreamcast", platformID: 106 },
    { link: "Game Gear", platformID: 77 },
  ],

  // GENRES DATA
  genres: {
    linkList: [
      { genre: "action", id: 4 },
      { genre: "indie", id: 51 },
      { genre: "strategy", id: 10 },
      { genre: "casual", id: 40 },
      { genre: "RPG", id: 5 },
      { genre: "shooter", id: 2 },
      { genre: "adventure", id: 3 },
      { genre: "puzzle", id: 7 },
      { genre: "racing", id: 1 },
      { genre: "sports", id: 15 },
      { genre: "simulation", id: 14 },
      { genre: "arcade", id: 11 },
      { genre: "platformer", id: 83 },
      { genre: "MMO", id: 59 },
      { genre: "fighting", id: 6 },
      { genre: "family", id: 19 },
      { genre: "Board Games", id: 28 },
      { genre: "educational", id: 34 },
      { genre: "card", id: 17 },
    ],
  },
};

export const sidebarPlatformData = [
  { linkTitle: "PC", link: "PC", linkID: 4 },
  {
    linkTitle: "Xbox",
    linkList: [
      { link: "Xbox Series X", linkID: 186 },
      { link: "Xbox One", linkID: 1 },
      { link: "Xbox 360", linkID: 14 },
      { link: "Xbox", linkID: 80 },
    ],
  },
  {
    linkTitle: "Playstation",
    linkList: [
      { link: "PlayStation 5", linkID: 187 },
      { link: "PlayStation 4", linkID: 18 },
      { link: "PlayStation 3", linkID: 16 },
      { link: "PlayStation 2", linkID: 15 },
      { link: "PlayStation", linkID: 27 },
      { link: "PS Vita", linkID: 19 },
      { link: "PSP", linkID: 17 },
    ],
  },
  {
    linkTitle: "Nintendo",
    linkList: [
      { link: "Nintendo Switch", linkID: 7 },
      { link: "Nintendo 3DS", linkID: 8 },
      { link: "Nintendo DS", linkID: 9 },
      { link: "Nintendo DSi", linkID: 13 },
      { link: "Nintendo 64", linkID: 83 },
      { link: "Wii U", linkID: 10 },
      { link: "Wii", linkID: 11 },
      { link: "GameCube", linkID: 105 },
      { link: "Game Boy Advance", linkID: 24 },
      { link: "Game Boy Color", linkID: 43 },
      { link: "Game Boy", linkID: 26 },
      { link: "SNES", linkID: 79 },
      { link: "NES", linkID: 49 },
    ],
  },
  { linkTitle: "iOS", link: "iOS", linkID: 3 },
  { linkTitle: "Android", link: "Android", linkID: 21 },
  {
    linkTitle: "Mac",
    linkList: [
      { link: "macOS", linkID: 5 },
      { link: "Classic Macintosh", linkID: 55 },
      { link: "Apple II", linkID: 41 },
    ],
  },
  { linkTitle: "Linux", link: "Linux", linkID: 6 },
  { linkTitle: "Commodore", link: "Commodore", linkID: 166 },
  { linkTitle: "3DO", link: "3DO", linkID: 111 },
  { linkTitle: "Neo Geo", link: "Neo Geo", linkID: 12 },
  {
    linkTitle: "Atari",
    linkList: [
      { link: "Atari 7800", linkID: 28 },
      { link: "Atari 5200", linkID: 31 },
      { link: "Atari 2600", linkID: 23 },
      { link: "Atari Flashback", linkID: 22 },
      { link: "Atari 8-bit", linkID: 25 },
      { link: "Atari ST", linkID: 34 },
      { link: "Atari Lynx", linkID: 46 },
      { link: "Atari XEGS", linkID: 50 },
      { link: "Jaguar", linkID: 112 },
    ],
  },
  {
    linkTitle: "SEGA",
    linkList: [
      { link: "Genesis", linkID: 167 },
      { link: "SEGA Saturn", linkID: 107 },
      { link: "SEGA CD", linkID: 119 },
      { link: "SEGA 32X", linkID: 117 },
      { link: "SEGA Master System", linkID: 74 },
      { link: "Dreamcast", linkID: 106 },
      { link: "Game Gear", linkID: 77 },
    ],
  },
];

// ORDERING FILTER OPTIONS
export const orderingOptions: FilterType[] = [
  {
    value: "name",
    label: "Name",
  },
  {
    value: "-released",
    label: "Released",
  },
  {
    // value: "-added",
    value: "-created",
    label: "Date Added",
  },
  {
    value: "-rating",
    label: "Rating",
  },
  {
    value: "-metacritic",
    label: "Metacritic",
  },
];

// PLATFORM FILTER OPTIONS
export const platformOptions: FilterType[] = [
  {
    value: "4",
    label: "PC",
  },
  {
    value: "186",
    label: "Xbox Series S/X",
  },
  {
    value: "187",
    label: "Playstation 5",
  },
  {
    value: "7",
    label: "Nintendo Switch",
  },
  {
    value: "1",
    label: "Xbox One",
  },
  {
    value: "18",
    label: "Playstation 4",
  },
  // {
  //   value: "3",
  //   label: "iOS",
  // },
  // {
  //   value: "21",
  //   label: "Android",
  // },
  // {
  //   value: "6",
  //   label: "Linux",
  // },
  // {
  //   value: "166",
  //   label: "Commodore",
  // },
  // {
  //   value: "111",
  //   label: "3DO",
  // },
  // {
  //   value: "12",
  //   label: "Neo Geo",
  // },
];
