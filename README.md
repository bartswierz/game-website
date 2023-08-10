# Next-Level Games

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
<!-- [Usage](#usage) -->

## Project Overview

Next.js web application similar to Steam focused on giving users access to view information for over 850,000+ games. Visitors can browse virtually all games in the world via searchbar or through the sidebar containing over 19 genres and 51 platforms to choose from. Users can see their childhood favorites and new releases with frequently updated information. 

## Features
Feature  | Description
------------- | -------------
View Genres | **19** available game genres to browse through.
View Platforms | **51** available platforms to browse through.
View Stores | The stores page features links directly to available company sites such as Steam, Playstation, Xbox, Epic Games, etc.
View Developers | Access to over 420,000+ developers. Navigate to the developer page using the sidebar.
Game Page | The individual game page features valuable game information for users such as the following: About Description, Game Screenshots, Available Platforms, Metascore, Genre, Release Date, Developer(s), Publisher(s), Tags, Publisher Website, Reddit Game Posts, Available Stores for Game Purchase(i.e. Xbox, Steam, etc.)
Game Searchbar | Access to over 850,000+ games! Once the user inputs a game name into the field, games with similar names will be displayed with an infinite scroll.
Infinite Scroll | As the user reaches the bottom of the page, another 6-20 results(# varies depending on page) will be rendered. This was implemented for an improved user experience(UX) over navigation buttons.
Sidebar | A responsive sidebar containing an organized collection of available pages for users to choose from. The sidebar also features dropdown menus for various platforms organized by the parent company.

## Technologies Used
- Next.js
- TypeScript
- Tailwind CSS
- Postman
- Shadcn

## Getting Started
To run the application locally, follow the steps below(commands added for additional help):

1. Create an **empty directory** on your desktop
2. Clone the repository into the folder locally by using git clone: 
   1. **git clone https://github.com/bartswierz/employee-records.git**
3. Navigate into the directory:
   1. **cd game-website**
4. Install the necessary packages inside package.json:
   1. **npm install**
5. Navigate to RAWG API to get your API KEY(REQUIRED) -
   1. **https://rawg.io/apidocs**
6. **IMPORTANT: Create an free account with RAWG API to receive your API KEY(REQUIRED FOR DATA TO BE FETCHED)**
7. Create a **.env.local** file inside the root of your directory to paste our API KEY
8. Inside the .env.local file, add your API KEY with the line below:
   1. **RAWG_API_KEY=[YOUR API KEY]**
9. Start the app:
   1. **npm run dev**

You're all set! The app is ready to go, that's all you have to do to get the app running locally. Enjoy!     
