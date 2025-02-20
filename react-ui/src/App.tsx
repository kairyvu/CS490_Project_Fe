import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "@/features/Pages/Landing/LandingPage.tsx";
import FilmPage from "@/features/Pages/Film/FilmPage.tsx";
import CustomerPage from "@/features/Pages/Customer/CustomerPage.tsx";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/films" element={<FilmPage />} />
          <Route path="/customers" element={<CustomerPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
