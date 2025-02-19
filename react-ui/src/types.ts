export interface FilmFeedProps {
  film_id: number;
  title: string;
  category: string;
  rental_count: number;
}

export interface ActorFeedProps {
  actor_id: number;
  first_name: string;
  last_name: string;
  movie_count: number;
}
