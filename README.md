# Next-Level Games
<!-- ![NLG-browse-genre](https://github.com/bartswierz/game-website/assets/100662080/10561d73-faa9-4024-9f8a-125152d01777) -->
![NLG-gamepage](https://github.com/bartswierz/game-website/assets/100662080/99fb6852-c4b3-4379-9243-4dca1b10a1a2)

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Getting Started](#getting-started)
5. [Usage](#usage) 

## Project Overview

Next.js web application similar to Steam focused on giving users access to view information for over 850,000+ games. Visitors can browse virtually all games in the world via searchbar or through the sidebar containing over 19 genres and 51 platforms to choose from. Users can see their childhood favorites and new releases with frequently updated information. 

## Features
Feature  | Description
------------- | -------------
Login | Clean beautiful login component that captures that game theme feel while also being relatively minimal to make the process quick and easy! Demo Credentials are also provided with copy link buttons provided for those who would like to view the application quickly without the need for a signup.
Signup | Clean beautiful signup component that captures that game theme feel while also being relatively minimal to make the process quick and easy! Redirect link back to the login screen is provided for a seamless transition.
Game Searchbar | Access to over 850,000+ games! Once the user inputs a game name into the field, games that start with those characters will do be used to fetch from RAWG API DB and retrieve all the game information. Games will then be displayed with an infinite scroll. Implemented **debounce** to prevent unecessary search requests each character, the search will be delayed for 300ms until the user's last input before sending the request. This dramatically improves the performance of the application!
Sidebar | A responsive sidebar containing an organized collection of available pages for users to choose from. The sidebar also features dropdown menus for various platforms organized by the parent company.
View Genres | **19** available game genres to browse through.
View Platforms | **51** available platforms to browse through.
View Stores | The stores page features links directly to available digital distribution services such as Steam, Playstation, Xbox, Epic Games, etc.
View Developers | Access to over 420,000+ developers. Navigate to the developer page using the sidebar.
Game Page | The individual game page features valuable game information for users such as the following: About Description, Game Screenshots, Available Platforms, Metascore, Genre, Release Date, Developer(s), Publisher(s), Tags, Publisher Website, Reddit Game Posts, Available Stores for Game Purchase(i.e. Xbox, Steam, etc.)
Infinite Scroll | As the user reaches the bottom of the page, another 6-20 results(# varies depending on page) will be rendered. This was implemented for an improved user experience(UX) over navigation buttons.


## Technologies Used
- Next.js
- TypeScript
- Tailwind CSS
- Postman
- Shadcn UI

## Getting Started
**To run the application locally, follow the steps below(commands added for additional help):**

1. Create an **empty directory** on your desktop
2. Clone the repository into the folder locally by using git clone: 
   1. **git clone https://github.com/bartswierz/game-website.git**
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

## Usage

### LOGIN PAGE
The Sign In page allows registered users to securely access their accounts and the wide range of site features in store for them. Note: Demo Account Credentials are provided for those who would like to quickly view the application without requiring a signup. Simply click the copy button icons, paste them in the input fields, and you're good to go!

![NLG-Login](https://github.com/bartswierz/game-website/assets/100662080/7c362f67-8a24-494c-9744-e4095731461e)

### SIGNUP PAGE
The Sign Up page welcomes new users to join the platform, offering a straightforward registration process to create an account. Login redirect included for easy navigation back to the login screen.

![NLG-Signup](https://github.com/bartswierz/game-website/assets/100662080/286730f0-b448-42d7-bce3-6b8d17ed00c3)

### HOME PAGE
- Home page contains quick links for Genres, Developers, Platforms, and Stores. Users can also access these sections(and more!) through the sidebar menu if they have a specific topic in mind.

![NLG-homepage](https://github.com/bartswierz/game-website/assets/100662080/2df9704c-d0a2-48b0-bab6-fd418a2332c2)

### GAME PAGE
- Game page has an extensive amount of valuable information regarding the game that can prove useful to the user who wants an in-depth overview of the game.
  
![NLG-gamepage](https://github.com/bartswierz/game-website/assets/100662080/99fb6852-c4b3-4379-9243-4dca1b10a1a2)

### BROWSE GENRE PAGE PAGE
- User can browse 19 different genres, upon choosing, the user will be redirected to games based on that genre.
   
![NLG-browse-genre](https://github.com/bartswierz/game-website/assets/100662080/10561d73-faa9-4024-9f8a-125152d01777)

### BROWSE PLATFORMS PAGE
- User can browse 51 platforms, upon choosing, the user will be redirected to the games page with that platform(additional platforms that are available for that game are also included as an icon list)
   
![NLG-browse-platforms](https://github.com/bartswierz/game-website/assets/100662080/05ca3134-f6a1-41fd-b64c-320d910d12e0)

### GENRES PAGE
- Games within the chosen **genre** are rendered with **infinite scroll** functionality to increase user experience(UX) to load more games without the need of navigation buttons.
   
![NLG-genres](https://github.com/bartswierz/game-website/assets/100662080/a2183f7b-ec11-4e8d-9ceb-a41312095144)

### PLATFORMS PAGE
- Games within the chosen **platform** are rendered with **infinite scroll** functionality to increase user experience(UX) to load more games without the need of navigation buttons.
   
![NLG-platforms](https://github.com/bartswierz/game-website/assets/100662080/a9dddc41-1c27-40fa-939e-7eaa324a92fd)
