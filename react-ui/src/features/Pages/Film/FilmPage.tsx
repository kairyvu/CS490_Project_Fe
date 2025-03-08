import NavBar from "@/features/Modules/NavBar";
import FilmTable from "@/features/Modules/FilmTable";
import SearchBar from "@/features/Modules/SearchBar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const FilmPage = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const options = ["Title", "Category", "Actor"];
  const [searchBy, setSearchBy] = useState<string>(options[0]);

  return (
    <div className="bg-linear-to-b from-gray-100 to-blue-300 h-full">
      <NavBar />
      <div className="flex justify-center items-center pt-15 ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Filter</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Search By</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={searchBy}
              onValueChange={setSearchBy}
            >
              {options.map((option, id) => (
                <DropdownMenuRadioItem value={option} key={id}>
                  {option}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <FilmTable searchBy={searchBy} searchValue={searchValue} />
    </div>
  );
};

export default FilmPage;
