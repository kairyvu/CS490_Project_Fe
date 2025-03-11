import logo from "../../assets/search-logo.svg";

interface Props {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({ searchValue, setSearchValue }: Props) => {
  return (
    <div className="flex justify-between items-center w-[50%]">
      <div className="w-4/5 rounded-md">
        <input
          name="search-bar"
          className="grow m-2 pl-[6px] w-full pr-2 bg-inherit outline-none font-semibold text-slate-500"
          value={searchValue}
          onChange={({ target }) => setSearchValue(target.value)}
          placeholder="Search..."
        />
      </div>
      <div className="m-auto pl-[1px] pr-1 pb-1">
        <img src={logo} className="w-8/12 h-3/5" alt="logo" />
      </div>
    </div>
  );
};

export default SearchBar;
