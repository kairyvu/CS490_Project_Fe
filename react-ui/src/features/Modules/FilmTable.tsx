import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Film, FilmDetails } from "@/types";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import axios from "axios";
import { useState, useEffect } from "react";
import FilmDialog from "./FilmDialog";

const FilmTable = () => {
  const [films, setFilms] = useState<Film[] | null>([]);
  const [selectedFilm, setSelectedFilm] = useState<FilmDetails | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/sakila_db/api/films/")
      .then((response) => {
        setFilms(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const fetchFilmDetails = async (film_id: number) => {
    setSelectedFilm(null);
    try {
      const response = await axios.get<FilmDetails>(
        `http://localhost:8000/sakila_db/api/film/${film_id}`
      );
      setSelectedFilm(response.data);
    } catch (error) {
      console.error("Error fetching film details:", error);
    }
  };

  return (
    <div className="w-[50vw] m-auto pt-15 ">
      <Table>
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Rental Count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {films
            ? films.map((film, id) => (
                <Dialog>
                  <DialogTrigger asChild>
                    <TableRow
                      key={id}
                      className="cursor-pointer"
                      onClick={() => fetchFilmDetails(film.film_id)}
                    >
                      <TableCell>{film.title}</TableCell>
                      <TableCell>{film.category}</TableCell>
                      <TableCell>{film.rental_count}</TableCell>
                    </TableRow>
                  </DialogTrigger>
                  {selectedFilm ? <FilmDialog {...selectedFilm} /> : null}
                </Dialog>
              ))
            : null}
        </TableBody>
      </Table>
    </div>
  );
};

export default FilmTable;
