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
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Wrong from "./pages/Wrong";
import Exists from "./pages/Exists";
import Bookings from "./pages/Bookings";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/exists" element={<Exists />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<Hotels />} />
          <Route path="/wrong" element={<Wrong />} />
          <Route path="/hotels/:id/:user" element={<BookHotel />} />
          <Route path="/customer/:id" element={<Customer />} />
          <Route path="/add" element={<Hotel_add />} />
          <Route path="/update/:id" element={<Hotel_update />} />
          <Route path="/vechicle/:id" element={<Vechicle />} />
          <Route path="/vechicle_add/:id" element={<VechicleAdd />} />
          <Route path="/bookings/:id" element={<Bookings />} />
       </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
