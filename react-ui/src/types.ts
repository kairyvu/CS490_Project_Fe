export interface Film {
  film_id: number;
  title: string;
  category: string;
  rental_count: number;
}
export interface FilmDetails {
  title: string;
  category: string;
  rental_count: number;
  description: string;
  release_year: number;
  rental_rate: number;
  length: number;
  rating: string;
  special_features: string;
}
export interface Actor {
  actor_id: number;
  first_name: string;
  last_name: string;
  movie_count: number;
}
