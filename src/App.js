import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Bookshelf from "./components/Bookshelf";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/bookshelf" element={<Bookshelf />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
