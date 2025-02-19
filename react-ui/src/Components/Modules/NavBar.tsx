import { To, useNavigate } from "react-router-dom";
import Logo from "../../assets/icon.svg";

const NavBar = () => {
  const navigate = useNavigate();
  const handleClick = (route: To) => {
    navigate(route);
  };
  return (
    <nav className="flex justify-between pl-8 h-12 bg-linear-to-r from-black to-blue-300 font-monserrat">
      <div
        className="flex items-center gap-6 hover:cursor-pointer"
        onClick={() => handleClick("/")}
      >
        <img src={Logo} className="size-8 rounded-full" />
        <div className="font-grench text-3xl text-yellow-600">Sakila</div>
      </div>
      <div className="flex justify-end">
        {["/Films", "/Customers"].map((route, i) => (
          <button
            key={i}
            className="px-7 duration-500 ease-in-out hover:bg-yellow-600 rounded-3xl hover:cursor-pointer"
            onClick={() => {
              if (route === "/Films") {
                return handleClick("/films");
              } else if (route === "/Customers") {
                return handleClick("/customers");
              }
            }}
          >
            {route.substring(1)}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
