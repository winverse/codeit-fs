import { Routes, Route } from "react-router";
import { HomePage } from "./pages/Home";
import { AboutPage } from "./pages/About";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}
