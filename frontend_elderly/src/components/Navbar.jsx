import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/homepage.css";
import logo from "../assets/urbanlogo-removebg-preview.png";

const Navbar = () => {
  return (
    <nav className="bg-[#fff] h-[10vh] shadow-lg border-b">
      <div className="container flex items-center justify-between h-full">
        {/* Logo */}
        <img src={logo} alt="Logo" className="h-[35px] w-[120px] mr-7" />

        {/* Mobile Toggle Button */}
        <button
          className="lg:hidden text-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links and Search Bar */}
        <div
          className="hidden lg:flex w-full justify-between items-center"
          id="navbarSupportedContent"
        >
          <ul className="flex space-x-4 text-black">
            <li>
              <NavLink className="nav-link mr-3 text-black" to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link mr-3 text-black" to="/dashboard">
                DashBoard
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link mr-3 text-black" to="/wishlist">
                Wishlist
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link mr-3 text-black" to="/cart">
                Cart
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link mr-3 text-black" to="/caregiver">
                Care Givers
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link mr-3 text-black" to="/doctor">
                Doctors
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link mr-3 text-black" to="/community">
                Community
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link mr-3 text-black" to="/connect">
                Connect
              </NavLink>
            </li>
          </ul>

          {/* Search Form */}
          <form className="flex">
            <input
              className="form-input rounded-l-md p-2 border"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="bg-white text-[#315fb6] px-4 py-2 rounded-r-md border"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
