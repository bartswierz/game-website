import { Game, GameDetails, GameDevelopers, DeveloperInfo } from "@/types";

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

// // FETCH GAME DETAILS FOR A SPECIFIC GAME
// export const getGameDetails = async (id: string): Promise<GameDetails[]> => {
//   // const res = await fetch(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}`);
//   console.log("private key - getGameDetails: ", process.env.RAWG_API_KEY);
//   const res = await fetch(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&id=${id}`);

//   if (!res.ok) {
//     throw new Error("Failed to fetch");
//   }

//   //All games
//   const data = await res.json();

//   //Only want the results object containing game info
//   let gamesInfo: GameDetails[] = data.results;

//   // Grab only 1 game that matches our id
//   const gameInfo: GameDetails[] = gamesInfo.filter((game: GameDetails) => {
//     //Params is always a string so we need to convert our game.id from number to string
//     let gameID = game.id.toString();
//     return gameID === id;
//   });

//   return gameInfo;
// };

// FETCH GAME DETAILS FOR A SPECIFIC GAME
//TODO - replace this with an individual game call instead of pulling the entire section and then filtering. We DO NOT NEED FILTERING
export const getGameDetails = async (id: string): Promise<GameDetails> => {
  // const res = await fetch(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}`);
  console.log("private key - getGameDetails: ", process.env.RAWG_API_KEY);
  // const res = await fetch(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&id=${id}`);
  //https://api.rawg.io/api/games/3498?key=19bf6456aed44d52b0a064df2f54ef4a
  const res = await fetch(`https://api.rawg.io/api/games/${id}?key=${process.env.RAWG_API_KEY}`);

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  //All games
  const data: GameDetails = await res.json();
  console.log("GAME DETAILS: ", data);

  // //Only want the results object containing game info
  // let gamesInfo: GameDetails[] = data.results;

  // // Grab only 1 game that matches our id
  // const gameInfo: GameDetails[] = gamesInfo.filter((game: GameDetails) => {
  //   //Params is always a string so we need to convert our game.id from number to string
  //   let gameID = game.id.toString();
  //   return gameID === id;
  // });

  return data;
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
  // console.log("data", data);

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

// GET DEVELOPER INFO
// FETCH GAME DETAILS FOR A SPECIFIC GAME
export const getDeveloperInfo = async (id: string): Promise<DeveloperInfo> => {
  // const res = await fetch(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}`);
  console.log("private key - getDeveloperInfo: ", process.env.RAWG_API_KEY);
  // const res = await fetch(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&id=${id}`);
  const res = await fetch(`https://api.rawg.io/api/developers/405?key=${process.env.RAWG_API_KEY}&id=${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch developer info");
  }

  //All games
  const data = await res.json();
  console.log("developer data from getDeveloperInfo: ", data);
  //Only want the results object containing game info
  let developerData: DeveloperInfo = data.results;

  // Grab only 1 developer that matches our id
  // const developerInfo: DeveloperInfo = developerData.filter((dev: DeveloperInfo) => {
  //   //Params is always a string so we need to convert our game.id from number to string
  //   console.log("dev: ", dev);
  //   let devID = dev.id.toString();
  //   return devID === id;
  // });

  // return developerInfo;
  return data;
};
