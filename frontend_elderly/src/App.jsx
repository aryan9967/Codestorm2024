import { Route, Router, Routes } from "react-router-dom";
import "./App.css";

import Chatbot from "./components/chatbot";
import Homepage from "./pages/Homepage";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import SearchResult from "./pages/SearchResult";
import DashBoard from "./pages/Dashboard";
import Community from "./pages/Community";
import Education from "./pages/Education";
import AuthPage from "./pages/AuthPage";

import Caregiver from "./pages/Caregiver";
import Doctor from "./pages/Doctor";
import CallPage from "./pages/CallPage";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/caretaker" element={<CareTaker />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/wishlist" element={<Wishlist />}></Route>
      {/* <Route path="/profile" element={<Profile />}></Route> */}
      <Route path="/cart" element={<Cart />}></Route>
      <Route path="/searchresult" element={<SearchResult />}></Route>
      <Route path="/dashboard" element={<DashBoard />}></Route>
      <Route path="/community" element={<Community />}></Route>
      {/* <Route path="/education" element={<Education />}></Route> */}
      {/* <Route path="/chat" element={<AuthPage />}></Route> */}
      <Route path="/caregiver" element={<Caregiver />}></Route>
      <Route path="/doctor" element={<Doctor />}></Route>
      <Route path="/connect" element={<CallPage />}></Route>
    </Routes>
  );
}

export default App;
