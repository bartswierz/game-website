// format string text to valid URL text i.e.) "Best of the Year" => "best-of-the-year"
// export const formatLink = (link: string, directory: string) => {
//   const formattedDirectory = directory.replaceAll(" ", "-").toLowerCase();
//   const formattedLink = link.replaceAll(" ", "-").toLowerCase();
//   const formattedURL = formattedDirectory + "/" + formattedLink;
//   console.log(formattedDirectory + "/" + formattedLink + "/");
//   return formattedURL;
// };

export const formatLink = (link: string, title: string) => {
  // const formattedDirectory = directory.replaceAll(" ", "").toLowerCase();
  const formattedDirectory = title.replaceAll(" ", "-").toLowerCase();
  const formattedLink = link.replaceAll(" ", "-").toLowerCase();
  const formattedURL = "/" + formattedDirectory + "/" + formattedLink;
  console.log(formattedURL);
  return formattedURL;
};
