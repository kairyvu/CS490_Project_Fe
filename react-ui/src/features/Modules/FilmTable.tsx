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
import { useState, useEffect, useMemo } from "react";
import FilmDialog from "./FilmDialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface FilmTableProps {
  searchBy: string;
  searchValue: string;
}

const FilmTable = ({ searchBy, searchValue }: FilmTableProps) => {
  const rowsPerPage = 20;
  const [films, setFilms] = useState<Film[] | null>([]);
  const [selectedFilm, setSelectedFilm] = useState<FilmDetails | null>(null);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);

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

  const filteredFilms = useMemo(() => {
    if (!films) return [];
    return films.filter((film) => {
      if (!searchValue.trim()) return true;

      if (searchBy === "Title") {
        return film.title.toLowerCase().includes(searchValue.toLowerCase());
      } else if (searchBy === "Actor") {
        return film.actors.toLowerCase().includes(searchValue.toLowerCase());
      } else {
        return film.category.toLowerCase().includes(searchValue.toLowerCase());
      }
    });
  }, [films, searchValue, searchBy]);
  const totalFilms = filteredFilms ? filteredFilms.length : 0;

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
    <div className="flex flex-col h-[90vh] justify-between w-[50vw] m-auto">
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
          {filteredFilms
            ? filteredFilms.slice(startIndex, endIndex).map((film, id) => (
                <Dialog key={id}>
                  <DialogTrigger asChild>
                    <TableRow
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
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={`${
                startIndex === 0 ? "pointer-events-none opacity-50" : undefined
              } cursor-pointer`}
              onClick={() => {
                setStartIndex(startIndex - rowsPerPage);
                setEndIndex(endIndex - rowsPerPage);
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className={`${
                endIndex >= totalFilms
                  ? "pointer-events-none opacity-50"
                  : undefined
              } cursor-pointer`}
              onClick={() => {
                setStartIndex(startIndex + rowsPerPage);
                setEndIndex(endIndex + rowsPerPage);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default FilmTable;
