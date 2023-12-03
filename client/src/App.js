import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Hotels from "./pages/Hotels";
import Hotel_add from "./pages/Hotel_add";
import Hotel_update from "./pages/Hotel_update";
import "./styles.css"
import Customer from "./pages/Customer";
import BookHotel from "./pages/BookHotel";
import Vechicle from "./pages/Vechicle";
import VechicleAdd from "./pages/VechicleAdd";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Routes>
          <Route path="/" element={<Hotels />} />
          <Route path="/hotels/:id" element={<BookHotel />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/add" element={<Hotel_add />} />
          <Route path="/update/:id" element={<Hotel_update />} />
          <Route path="/vechicle/:id" element={<Vechicle />} />
          <Route path="/vechicle_add/:id" element={<VechicleAdd />} />
       </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
