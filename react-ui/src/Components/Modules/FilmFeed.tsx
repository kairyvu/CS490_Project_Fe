import FilmAlt from "../../assets/film_alt.svg";
import { FilmFeedProps } from "../../types";

const FilmFeed = ({ title, category, rental_count }: FilmFeedProps) => {
  return (
    <div className="font-monserrat flex flex-col justify-between gap-5 w-50 h-60 bg-yellow-50 duration-300 hover:ease-in-out hover:bg-yellow-100 hover:scale-110 rounded-3xl drop-shadow-lg">
      <div className="flex justify-center items-center">
        <img src={FilmAlt} className="size-20 m-4" />
      </div>
      <div className="flex flex-col text-center justify-between h-full">
        <div className="text-sm font-semibold">{title.toUpperCase()}</div>
        <div className="text-sm py-2">
          <div className="font-semibold">Category: {category}</div>
          <span className="font-semibold">Rental Count: </span>
          {rental_count}
        </div>
      </div>
    </div>
  );
};

export default FilmFeed;
