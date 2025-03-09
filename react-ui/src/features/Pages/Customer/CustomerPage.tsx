import CustomerTable from "@/features/Modules/CustomerTable";
import NavBar from "@/features/Modules/NavBar";
import SearchBar from "@/features/Modules/SearchBar";
import SearchBarFilter from "@/features/Modules/SearchBarFilter";
import { useState } from "react";

const CustomerPage = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const options = ["Customer ID", "First Name", "Last Name"];
  const [searchBy, setSearchBy] = useState<string>(options[0]);

  return (
    <div className="bg-linear-to-b from-gray-100 to-blue-300 ">
      <NavBar />
      <div className="flex justify-center items-center pt-15 pb-3">
        <SearchBarFilter
          options={options}
          searchBy={searchBy}
          setSearchBy={setSearchBy}
        />
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <CustomerTable searchBy={searchBy} searchValue={searchValue} />
    </div>
  );
};

export default CustomerPage;
