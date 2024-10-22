import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import CamperDetailPage from "./pages/CamperDetailPage";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<CamperDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
