import FilmAlt from "../../assets/film_alt.svg";

interface FilmFeedProps {
  name: string;
  rental: number;
}

const FilmFeed = ({ name, rental }: FilmFeedProps) => {
  return (
    <div className="font-monserrat flex flex-col justify-between gap-5 w-50 h-60 duration-300 hover:ease-in-out hover:bg-gray-200 hover:scale-110 rounded-3xl">
      <div className="flex justify-center items-center">
        <img src={FilmAlt} className="size-20 m-4" />
      </div>
      <div className="flex flex-col text-center justify-between h-full">
        <div className="text-sm font-semibold">{name.toUpperCase()}</div>
        <div className="text-sm py-2">
          <span className="font-semibold">Rental Count: </span>
          {rental}
        </div>
      </div>
    </div>
  );
};

export default FilmFeed;
