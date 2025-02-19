export interface Film {
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

export interface FilmDetails {
  description: string;
  release_year: number;
  rental_rate: number;
  length: number;
  rating: string;
  special_features: string;
}
