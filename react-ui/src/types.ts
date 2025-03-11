export interface Film {
  film_id: number;
  title: string;
  category: string;
  rental_count: number;
  actors: string;
}
export interface FilmDetails {
  film_id: number;
  title: string;
  category: string;
  rental_count: number;
  description: string;
  release_year: number;
  rental_rate: number;
  length: number;
  rating: string;
  special_features: string;
  actors: string;
}
export interface Actor {
  actor_id: number;
  first_name: string;
  last_name: string;
  movie_count: number;
}

export interface Customer {
  customer_id: number;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  district: string;
  city: string;
  country: string;
  phone: string;
  active?: number;
  create_date?: string;
}

export interface Rental {
  film_id: number;
  customer_id: number;
  first_name: string;
  last_name: string;
  film_title: string;
  rental_date: string;
  return_date: string;
  rental_status: string;
}
