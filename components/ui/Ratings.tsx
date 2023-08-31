import { Ratings } from "@/types";
import { Progress } from "@/components/ui/Shadcn/progress";

type RatingsProps = {
  averageRating: number; //'rating' within the list -> 3.64
  ratingsList: Ratings[]; //ratings: [{ id: 1, title: "Exceptional", count: 0, percent: 0 }]
  ratingsCount: number; //2
};

const Ratings = ({ averageRating, ratingsList, ratingsCount }: RatingsProps) => {
  const exceptional = ratingsList[0];
  const recommended = ratingsList[1];
  const meh = ratingsList[2];
  const skip = ratingsList[3];

  const averageRatingPercent = ((averageRating / 5) * 100).toFixed(2) + "%"; //78.75%

  // Each individual rating component
  const RatingComponent__ = ({ ratingObject, name }: { ratingObject: Ratings; name: string }) => {
    const { id, percent, count } = ratingObject;

    return (
      <div className="flex w-full items-center" key={id}>
        <p className="w-max pr-2">
          {/* {name} */}
          {id}-Star
          {/* DISPLAY ABOVE 480px */}
          <span className="hidden xsm:block">({count})</span>
          {/* DISPLAY BELOW 480px */}
          <span className="block xsm:hidden">{percent}%</span>
        </p>
        <Progress value={percent} className="w-[60%] bg-gray-700 flex-grow h-6- h-8- h-[28px] rounded-md" />

        {/* Display ABOVE 480px */}
        <span className="hidden xsm:block w-[68px] pl-2">{percent}%</span>
      </div>
    );
  };

  return (
    <div className="my-4">
      <div>Game Ratings({ratingsCount} Ratings)</div>
      <div>
        Overall Rating: {averageRating} out of 5({averageRatingPercent})
      </div>
      <div className="flex flex-col max-w-[700px] gap-2 flex-grow- items-center justify-center">
        <RatingComponent__ ratingObject={exceptional} name="5-Star" />
        <RatingComponent__ ratingObject={recommended} name="4-Star" />
        <RatingComponent__ ratingObject={meh} name="3-Star" />
        <RatingComponent__ ratingObject={skip} name="1-Star" />
      </div>
    </div>
  );
};

export default Ratings;
