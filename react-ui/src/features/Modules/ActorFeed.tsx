import PersonAlt from "../../assets/personAlt.svg";
import { Actor, Film } from "../../types";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";

const ActorFeed = ({ actor_id, first_name, last_name, movie_count }: Actor) => {
  const [actorFilms, setActorFilms] = useState<Film[] | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/sakila_db/api/actor/${actor_id}`)
      .then((response) => {
        setActorFilms(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [actor_id]);
  return (
    <Dialog>
      <DialogTrigger asChild>
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
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {first_name.toUpperCase() + " " + last_name.toUpperCase()}
          </DialogTitle>
          <DialogDescription>
            <div className="font-semibold py-2">Top Films: </div>
            {actorFilms
              ? actorFilms?.map((film, id) => (
                  <div className="flex justify-between" key={id}>
                    <div className="py-1 flex gap-8">
                      <span className="font-semibold">Title: </span>
                      {film.title}{" "}
                    </div>
                    <div className="flex justify-start py-1 gap-3">
                      <div className="font-semibold">Rental Count: </div>
                      <div>{film.rental_count}</div>
                    </div>
                  </div>
                ))
              : null}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ActorFeed;
