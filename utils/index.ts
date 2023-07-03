import { Game, GameDetails } from "@/types";

// Creates a valid URL from a string i.e.) link: "Best of the Year" & title: Top Games" => "best-of-the-year"
export const formatLink = (title: string, link: string) => {
  const formattedDirectory = title.replaceAll(" ", "-").toLowerCase();
  const formattedLink = link.replaceAll(" ", "-").toLowerCase();
  const formattedURL = "/" + formattedDirectory + "/" + formattedLink;
  console.log(formattedURL);
  return formattedURL;
};

// FETCHES 20 GAMES FROM RAWG API - USED ON HOME PAGE TO RENDER 20 GAMES
export const getGames = async (): Promise<Game[]> => {
  const res = await fetch(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}`);
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const data = await res.json();
  // console.log("data", data.results);
  // console.log("DATA: ", data.results);
  return data.results;
};

// FETCH GAME DETAILS FOR A SPECIFIC GAME
export const getGameDetails = async (id: string): Promise<GameDetails[]> => {
  // const res = await fetch(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}`);
  const res = await fetch(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&id=${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  // await new Promise((resolve) => setTimeout(resolve, 2000));

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
