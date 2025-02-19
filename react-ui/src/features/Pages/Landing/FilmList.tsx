import { useEffect, useState } from "react";
import FilmFeed from "../../Modules/FilmFeed.tsx";
import axios from "axios";
import { Film } from "../../../types.ts";

const FilmList = () => {
  const [films, setFilms] = useState<Film[] | null>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/sakila_db/api/films/top")
      .then((response) => {
        setFilms(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="flex justify-around">
      {films?.map((film, id) => (
        <FilmFeed
          key={id}
          film_id={film.film_id}
          title={film.title}
          category={film.category}
          rental_count={film.rental_count}
        />
      ))}
    </div>
  );
};

export default FilmList;
