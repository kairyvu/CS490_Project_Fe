import PersonAlt from "../../assets/personAlt.svg";
import { ActorFeedProps } from "../../types";

const ActorFeed = ({ first_name, last_name, movie_count }: ActorFeedProps) => {
  return (
    <div className="font-monserrat flex flex-col justify-between gap-5 w-50 h-60 bg-yellow-50 duration-300 hover:ease-in-out hover:bg-yellow-100 hover:scale-110 rounded-3xl drop-shadow-lg">
      <div className="flex justify-center items-center">
        <img src={PersonAlt} className="size-20 m-4" />
      </div>
      <div className="flex flex-col text-center justify-between h-full">
        <div className="text-sm font-semibold">
          {first_name.toUpperCase() + " " + last_name.toUpperCase()}
        </div>
        <div className="text-sm py-2">
          <div className="font-semibold">
            Movies: <span className="font-normal"> {movie_count}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActorFeed;
