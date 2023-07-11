import { Game, GameDetails, GameDevelopers } from "@/types";

// Creates a valid URL from a string i.e.) link: "Best of the Year" & title: Top Games" => "best-of-the-year"
export const formatLink = (title: string, link: string): string => {
  const formattedDirectory = title.replaceAll(" ", "-").toLowerCase();
  const formattedLink = link.replaceAll(" ", "-").toLowerCase();
  const formattedURL = "/" + formattedDirectory + "/" + formattedLink;
  // console.log(formattedURL);
  return formattedURL;
};

// Get the current page number from the URL by splitting the URL at the "page=". i.e.) https://api.rawg.io/api/developers?key=...&page=2 => page=2 => 2
export const getPage = (url: string): number => {
  const splitURL = url.split("page="); // ["https://api.rawg.io/api/developers?key=...", "2"]

  // Converting from string to number and subtracting 1 to get the current page number because the passed url is the NEXT URL TO FETCH
  const pageNumber = Number(splitURL[1]) - 1;
  console.log("pageNumber", pageNumber);

  return pageNumber;
};

// FETCHES 20 GAMES FROM RAWG API - USED ON HOME PAGE TO RENDER 20 GAMES
export const getGames = async (): Promise<Game[]> => {
  console.log("private key - get Games: ", process.env.RAWG_API_KEY);
  const res = await fetch(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}`);

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  const data = await res.json();

  return data.results;
};

// FETCH GAME DETAILS FOR A SPECIFIC GAME
export const getGameDetails = async (id: string): Promise<GameDetails[]> => {
  // const res = await fetch(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}`);
  console.log("private key - getGameDetails: ", process.env.RAWG_API_KEY);
  const res = await fetch(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&id=${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  //All games
  const data = await res.json();

  //Only want the results object containing game info
  let gamesInfo: GameDetails[] = data.results;

  // Grab only 1 game that matches our id
  const gameInfo: GameDetails[] = gamesInfo.filter((game: GameDetails) => {
    //Params is always a string so we need to convert our game.id from number to string
    let gameID = game.id.toString();
    return gameID === id;
  });

  return gameInfo;
};

// FETCH GAME DEVELOPERS
// export const getGameDevelopers = async (page?: number): Promise<GameDevelopers> => {
export const getGameDevelopers = async (): Promise<GameDevelopers> => {
  // const res = await fetch(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}`);
  console.log("private key: ", process.env.RAWG_API_KEY);

  const res = await fetch(`https://api.rawg.io/api/developers?key=${process.env.RAWG_API_KEY}`);
  // const res = await fetch(`https://api.rawg.io/api/developers?key=${key}`);

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  //All games
  const data: GameDevelopers = await res.json();
  console.log("data", data);

  return data;
};

// FETCH GAME DEVELOPERS PREVIOUS OR NEXT PAGE - PAGINATION
export const getNextGameDevelopersPage = async (request: string | null): Promise<GameDevelopers> => {
  if (request !== null) {
    const res = await fetch(request);
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    //All games
    const data: GameDevelopers = await res.json();
    console.log("data", data);

    return data;
  }

  // If request is null return empty object
  return {} as GameDevelopers;
};
