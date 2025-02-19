import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./features/Pages/Landing/Landing.tsx";
import FilmList from "./features/Pages/Landing/FilmList.tsx";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/films" element={<FilmList />} />
          <Route path="/customers" element={<div></div>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
