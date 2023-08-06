"use client";
// TODO Pass through Ratings
import { Ratings } from "@/types";
import { useEffect, useState } from "react";
// import * as Progress from "@radix-ui/react-progress";

type RatingsProps = {
  averageRating: number;
  ratingsList: Ratings[];
  ratingsCount: number;
};

const Ratings = ({ averageRating, ratingsList, ratingsCount }: RatingsProps) => {
  // console.log("ratingsList: ", ratingsList);
  const [progress, setProgress] = useState(0);
  const [exceptional, setExceptional] = useState({ count: 0, id: -1, percent: 0, title: "" });
  const [recommended, setRecommended] = useState({ count: 0, id: -1, percent: 0, title: "" });
  const [meh, setMeh] = useState({ count: 0, id: -1, percent: 0, title: "" });
  const [skip, setSkip] = useState({ count: 0, id: -1, percent: 0, title: "" });

  // useEffect(() => {
  //   const timer = setTimeout(() => setProgress(70), 500);
  //   return () => clearTimeout(timer);
  // }, []);
  console.log("ratingsList: ", ratingsList);
  // useEffect(() => {
  //   // const exceptional = ratingsList.;

  //   console.log("exceptional Rating: ", exceptional);
  //   const timer = setTimeout(() => setProgress(ratingsList[0].percent), 500);
  //   return () => clearTimeout(timer);
  // }, []);

  // const ProgressRoot = 'position: relative overflow: hidden background: var(--black-a9) border-radius: 99999px width: 300px height: 25px transform: translateZ(0)';

  // const ProgressIndiciator = 'background-color: white width: 100%'
  // .ProgressIndicator {
  //   background-color: white;
  //   width: 100%;
  //   height: 100%;
  //   transition: transform 660ms cubic-bezier(0.65, 0, 0.35, 1);
  // }

  return (
    <div>
      <p className="text-sm font-medium text-white">{ratingsCount} global ratings</p>

      {/* PROGRESS BAR */}
      <div className="border h-64- w-full">
        {/* <Progress.Root className="ProgressRoot" value={progress}> */}
        {/* <Progress.Root className="ProgressRoot" value={10}>
          <Progress.Indicator className="ProgressIndicator" style={{ transform: `translateX(-${100 - progress}%)` }} />
        </Progress.Root>
        <Progress.Root className="ProgressRoot" value={10}>
          <Progress.Indicator className="ProgressIndicator" style={{ transform: `translateX(-${100 - progress}%)` }} />
        </Progress.Root>
        <Progress.Root className="ProgressRoot" value={10}>
          <Progress.Indicator className="ProgressIndicator" style={{ transform: `translateX(-${100 - progress}%)` }} />
        </Progress.Root>
        <Progress.Root className="ProgressRoot" value={10}>
          <Progress.Indicator className="ProgressIndicator" style={{ transform: `translateX(-${100 - progress}%)` }} />
        </Progress.Root> */}
        {ratingsList.map(({ id, title, count, percent }) => (
          <div>
            <div className="relative border w-full h-4 z-1 bg-gray-500 opacity-50">
              <div className={`absolute left-0 top-0 z-40 bg-yellow w-${Number(percent)}`} style={{ width: `${10}%` }}></div>
            </div>

            <p>{id}</p>
            <p>{title}</p>
            <p>{count}</p>
            <p>{percent} %</p>
          </div>
        ))}
      </div>

      {/* RATING BAR */}
      {ratingsList.map((rating) => (
        <div className="flex items-center my-4" key={rating.id}>
          {/* RATING TITLE */}
          <p className="w-28 text-sm font-medium text-white">{rating.title.toUpperCase()}</p>

          {/* PERCENTAGE BAR */}
          <div className="flex items-center flex-grow max-w-xs md:min-w-max h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
            {/* <div className={`h-5 bg-yellow-300 rounded w-[${rating.percent}%]`}></div> */}
            <div className={`h-5 bg-yellow-300 rounded w-[70%]`}></div>
          </div>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{rating.percent}%</span>
        </div>
      ))}
    </div>
  );
};

export default Ratings;

// PREVIOUS LAYOUT
// import { Ratings } from "@/types";
// type RatingsProps = {
//   averageRating: number;
//   ratingsList: Ratings[];
//   ratingsCount: number;
// };

// const Ratings = ({ averageRating, ratingsList, ratingsCount }: RatingsProps) => {
//   // console.log("ratingsList: ", ratingsList);

//   return (
//     <div>
//       <div className="flex items-center mb-2">
//         <svg
//           className="w-4 h-4 text-yellow-300 mr-1"
//           aria-hidden="true"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="currentColor"
//           viewBox="0 0 22 20"
//         >
//           <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//         </svg>
//         <svg
//           className="w-4 h-4 text-yellow-300 mr-1"
//           aria-hidden="true"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="currentColor"
//           viewBox="0 0 22 20"
//         >
//           <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//         </svg>
//         <svg
//           className="w-4 h-4 text-yellow-300 mr-1"
//           aria-hidden="true"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="currentColor"
//           viewBox="0 0 22 20"
//         >
//           <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//         </svg>
//         <svg
//           className="w-4 h-4 text-yellow-300 mr-1"
//           aria-hidden="true"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="currentColor"
//           viewBox="0 0 22 20"
//         >
//           <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//         </svg>
//         <svg
//           className="w-4 h-4 text-gray-300 mr-1 dark:text-gray-500"
//           aria-hidden="true"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="currentColor"
//           viewBox="0 0 22 20"
//         >
//           <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//         </svg>
//         <p className="ml-2 text-sm font-medium text-white">{averageRating} out of 5</p>
//       </div>
//       <p className="text-sm font-medium text-white">{ratingsCount} global ratings</p>

//       {/* RATING BAR */}
//       {ratingsList.map((rating) => (
//         <div className="flex items-center my-4" key={rating.id}>
//           {/* RATING TITLE */}
//           <p className="w-28 text-sm font-medium text-white">{rating.title.toUpperCase()}</p>

//           {/* PERCENTAGE BAR */}
//           <div className="flex items-center flex-grow max-w-xs md:min-w-max h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
//             {/* <div className={`h-5 bg-yellow-300 rounded w-[${rating.percent}%]`}></div> */}
//             <div className={`h-5 bg-yellow-300 rounded w-[70%]`}></div>
//           </div>
//           <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{rating.percent}%</span>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Ratings;
