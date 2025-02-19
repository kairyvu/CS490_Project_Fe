import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./Components/Pages/Landing/Landing.tsx";
import FilmList from "./Components/Pages/Landing/FilmList.tsx";
import CustomerList from "./Components/Pages/CustomerList.tsx";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/films" element={<FilmList />} />
          <Route path="/customers" element={<CustomerList />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
