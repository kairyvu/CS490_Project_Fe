import NavBar from "@/features/Modules/NavBar";
import FilmTable from "@/features/Modules/FilmTable";
import SearchBar from "@/features/Modules/SearchBar";
import { useState } from "react";
import SearchBarFilter from "@/features/Modules/SearchBarFilter";

const FilmPage = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const options = ["Title", "Category", "Actor"];
  const [searchBy, setSearchBy] = useState<string>(options[0]);

  return (
    <div className="bg-linear-to-b from-gray-100 to-blue-300">
      <NavBar />
      <div className="flex justify-center items-center pt-15 pb-3">
        <SearchBarFilter
          options={options}
          searchBy={searchBy}
          setSearchBy={setSearchBy}
        />
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <FilmTable searchBy={searchBy} searchValue={searchValue} />
    </div>
  );
};

export default FilmPage;
