import { BrowserRouter } from "react-router-dom";
import Navbar from "./Components/Navbar";
import AppRouter from "./Router/AppRouter";
import Footer from "./Components/Footer"; // 👈 agregado

export default function App() {
  return (
    <BrowserRouter>
     
      <div className="pt-24 min-h-screen flex flex-col">
        <AppRouter />
         <Navbar />
        <Footer /> {/* 👈 aparece en TODAS las páginas */}
      </div>
    </BrowserRouter>
  );
}

