import FoundItems from "./Components/Components/Browse/FoundItems";
import LostItems from "./Components/Components/Browse/LostItems";
import Footer from "./Components/Components/Footer";
import Navbar from "./Components/Components/Navbar";
import ReportFoundItem from "./Components/Components/ReportFoundItem";
import ReportLostItem from "./Components/Components/ReportLostItem";
import Storage from "./Components/Components/Store/Storage";
import { Route, Routes } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Components/Components/Home";
import Contactus from "./Components/Components/Contactus";

function App() {
  return (
    <Storage>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/reportlostitem" element={<ReportLostItem />} />
        <Route path="/reportfounditem" element={<ReportFoundItem />} />
        <Route path="/browselostitem" element={<LostItems/>} />
        <Route path="/browsefounditem" element={<FoundItems />} />
        <Route path="/contactus" element={<Contactus />} />
      </Routes>
      <Footer/>
    </Storage>
  );
}

export default App;
