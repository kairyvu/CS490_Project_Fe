import { useEffect, useState } from "react";
import ActorFeed from "../../Modules/ActorFeed.tsx";
import axios from "axios";
import { ActorFeedProps } from "../../../types.ts";

const ActorList = () => {
  const [actors, setActors] = useState<ActorFeedProps[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/sakila_db/api/actors/top")
      .then((response) => {
        setActors(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="flex justify-around">
      {actors.map((actor, id) => (
        <ActorFeed
          key={id}
          actor_id={actor.actor_id}
          first_name={actor.first_name}
          last_name={actor.last_name}
          movie_count={actor.movie_count}
        />
      ))}
    </div>
  );
};

export default ActorList;
