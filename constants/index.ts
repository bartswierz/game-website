import { SidebarDataProps } from "@/types";

// Large Data Stored here if needed
export const sidebarData: SidebarDataProps[] = [
  // {
  //   title: "New Releases",
  //   links: ["Last 30 Days", "This week", "Next week", "Release Calendar"],
  // },
  // {
  //   title: "Top Games",
  //   links: ["Best of the Year", "Popular in 2022", "All time top 250"],
  // },
  {
    title: "browse",
    links: ["genres", "developers", "stores", "platforms"],
    // params: "",
    // ORIGINAL
    // links: ["Platforms", "Stores", "Collections", "Reviews", "Genres", "Creators", "Tags", "Developers", "Publishers"],
  },
  // {
  //   title: "Platforms",
  //   links: ["PC", "PlayStation 4", "Xbox One", "Nintendo Switch", "iOS", "Android"],
  // },
  {
    title: "genres",
    links: [
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
    // TODO - RPG, Massively Multiplayer, board-games is broken
    // query: { genres: "action", page_size: "6" },
  },
];

// {} object containing a title, and link
