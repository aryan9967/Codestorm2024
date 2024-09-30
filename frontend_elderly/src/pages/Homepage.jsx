import "../styles/homepage.css";

import { NavLink } from "react-router-dom";
import img1 from "../assets/urbanGardening1.png";
import img2 from "../assets/urbanGardening2.jpg";
import img3 from "../assets/urbanGardening3.jpg";
import Chatbot from "../components/chatbot";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Homepage() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    get_all_product();
  }, []);

  async function get_all_product() {
    try {
      const { data } = await axios.get("http://localhost:3000/all_products");
      console.log(data);
      setProducts(data.products);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="main_container">
      <div className="navbar_container">
        <Navbar />
      </div>
      <div className="main_screen">
        <section className="bg-center bg-no-repeat bg-[url('https://t4.ftcdn.net/jpg/06/39/13/91/240_F_639139165_d1c5LSKoQblVUFTKYck2tG0oevX8wYKG.jpg')] bg-gray-500 bg-blend-multiply bg-cover">
          <div className="px-4 mx-auto max-w-screen-xl text-center  lg:py-56 h-60 ">
            <h1 className=" text-4xl font-extrabold tracking-tight leading-none mt-0 text-white md:text-5xl lg:text-6xl ">
              Grow Fresh, Grow Local
            </h1>

            <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
              Join the urban farming revolution and transform your city into a
              green haven. From rooftops to community gardens, let's cultivate
              fresh, sustainable produce right where we live
            </p>
          </div>
        </section>

        <div className="section_header mb-3">Our Products</div>
        <div className="grid  grid-cols-2 w-11/12 mx-auto gap-5 md:gap-10 sm:grid-cols-3 md:grid-cols-4">
          {products?.map((singleprod, index) => (
            <ProductCard singleprod={singleprod} key={index} />
          ))}
        </div>
        <Chatbot />
      </div>
    </div>
  );
}
