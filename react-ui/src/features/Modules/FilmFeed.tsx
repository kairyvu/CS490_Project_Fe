import FilmAlt from "../../assets/film_alt.svg";
import { Film, FilmDetails } from "../../types";
import { useState, useEffect } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import axios from "axios";
import FilmDialog from "./FilmDialog";

const FilmFeed = ({ film_id, title, category, rental_count }: Film) => {
  const [filmDetails, setFilmDetails] = useState<FilmDetails | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/sakila_db/api/film/${film_id}`)
      .then((response) => {
        setFilmDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [film_id]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="font-monserrat flex flex-col justify-between gap-5 w-50 h-60 bg-yellow-50 duration-300 hover:ease-in-out hover:bg-yellow-100 hover:scale-110 rounded-3xl drop-shadow-lg">
          <div className="flex justify-center items-center">
            <img src={FilmAlt} className="size-20 m-4" />
          </div>
          <div className="flex flex-col text-center justify-between h-full">
            <div className="text-sm font-semibold">{title.toUpperCase()}</div>
            <div className="text-sm py-2">
              <div className="font-semibold">
                Category: <span className="font-normal">{category}</span>
              </div>
              <div className="font-semibold">
                Rental Count:{" "}
                <span className="font-normal"> {rental_count}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogTrigger>
      {filmDetails ? <FilmDialog {...filmDetails} /> : null}
    </Dialog>
  );
};

export default FilmFeed;
