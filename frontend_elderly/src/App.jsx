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
import MedicalHistoryPage from "./pages/MedicalHistory";

import Caregiver from "./pages/Caregiver";
import Doctor from "./pages/Doctor";
import CallPage from "./pages/CallPage";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/wishlist" element={<Wishlist />}></Route>

      <Route path="/cart" element={<Cart />}></Route>
      <Route path="/searchresult" element={<SearchResult />}></Route>
      <Route path="/dashboard" element={<DashBoard />}></Route>
      <Route path="/community" element={<Community />}></Route>
      
      <Route path="/medical" element={<MedicalHistoryPage />}></Route>
      <Route path="/caregiver" element={<Caregiver />}></Route>
      <Route path="/doctor" element={<Doctor />}></Route>
      <Route path="/connect" element={<CallPage />}></Route>
    </Routes>
  );
}

export default App;
