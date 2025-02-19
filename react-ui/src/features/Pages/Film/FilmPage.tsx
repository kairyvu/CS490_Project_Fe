import React from "react";
import NavBar from "@/features/Modules/NavBar";
import FilmTable from "@/features/Modules/FilmTable";

const FilmPage = () => {
  return (
    <div className="bg-linear-to-b from-gray-100 to-blue-300">
      <NavBar />
      <FilmTable />
    </div>
  );
};

export default FilmPage;
