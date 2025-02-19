import NavBar from "../../Modules/NavBar";
import FilmList from "./FilmList";
import ActorList from "./ActorList";

const LandingPage = () => {
  return (
    <div className="bg-linear-to-b from-gray-100 to-blue-300 h-ful">
      <NavBar />
      <h1 className="font-monserrat text-center text-5xl font-bold pt-10">
        Top Films
      </h1>
      <div className="h-[50svh] flex flex-col justify-center ">
        <FilmList />
      </div>
      <h1 className="font-monserrat text-center text-5xl font-bold pt-10">
        Top Actors
      </h1>
      <div className="h-[50svh] flex flex-col justify-center">
        <ActorList />
      </div>
    </div>
  );
};

export default LandingPage;
