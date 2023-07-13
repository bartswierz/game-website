// "use client";
// TODO Pass through Ratings
import { Ratings } from "@/types";
type RatingsProps = {
  averageRating: number;
  ratingsList: Ratings[];
  ratingsCount: number;
};

const Ratings = ({ averageRating, ratingsList, ratingsCount }: RatingsProps) => {
  // console.log("ratingsList: ", ratingsList);

  return (
    <div>
      <div className="flex items-center mb-2">
        <svg
          className="w-4 h-4 text-yellow-300 mr-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
        <svg
          className="w-4 h-4 text-yellow-300 mr-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
        <svg
          className="w-4 h-4 text-yellow-300 mr-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
        <svg
          className="w-4 h-4 text-yellow-300 mr-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
        <svg
          className="w-4 h-4 text-gray-300 mr-1 dark:text-gray-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
        <p className="ml-2 text-sm font-medium text-white">{averageRating} out of 5</p>
      </div>
      <p className="text-sm font-medium text-white">{ratingsCount} global ratings</p>

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

// import { Rating } from "flowbite-react";

// import { Ratings } from "@/types";
// type RatingsProps = {
//   averageRating: number;
//   ratingsList: Ratings[];
//   ratingsCount: number;
// };

// const Ratings = ({ averageRating, ratingsList, ratingsCount }: RatingsProps) => {
//   return (
//     <>
//       <Rating className="mb-2">
//         <Rating.Star />
//         <Rating.Star />
//         <Rating.Star />
//         <Rating.Star />
//         <Rating.Star />
//         <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">4.95 out of 5</p>
//       </Rating>
//       <p className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">1,745 global ratings</p>
//       <Rating.Advanced className="mb-2" percentFilled={70}>
//         <p>5 star</p>
//       </Rating.Advanced>
//       <Rating.Advanced className="mb-2 z-10" percentFilled={10}>
//         <p>4 star</p>
//       </Rating.Advanced>
//       <Rating.Advanced className="mb-2" percentFilled={8}>
//         <p>3 star</p>
//       </Rating.Advanced>
//       <Rating.Advanced className="mb-2" percentFilled={4}>
//         <p>2 star</p>
//       </Rating.Advanced>
//       <Rating.Advanced percentFilled={1}>1 star</Rating.Advanced>
//     </>
//   );
// };

// export default Ratings;

// {ratingsList.map((rating) => (
//   <div className="flex items-center my-4" key={rating.id}>
//     {/* RATING TITLE */}
//     <p className="flex-shrink-0 text-sm font-medium text-white">{rating.title.toUpperCase()}</p>

//     {/* PERCENTAGE BAR */}
//     <div className="flex items-center w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
//       {/* <div className={`h-5 bg-yellow-300 rounded w-[${rating.percent}%]`}></div> */}
//       <div className={`h-5 bg-yellow-300 rounded w-[70%]`}></div>
//     </div>
//     <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{rating.percent}%</span>
//   </div>
// ))}
