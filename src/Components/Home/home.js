import react from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Questions from "../question";
// import Review from "../review";
import { useState } from "react";
import Header from "../Header/header";

import {
  faFacebookF,
  faInstagram,
  faLinkedin,
  faReddit,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faHippo,
  faPlus,
  faMinus,
  faArrowRight,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
library.add(faFacebookF);

const Home = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/appointment");
  }
  return (
    <main className="App my-0 mr-auto ml-auto mt-2">
      <Header />
      <section className="pb-24 flex lin-grad pt-16">
        <div className="w-4/6 flex my-0 mx-auto pt-4">
          <div className="lft_con w-1/2 my-0 text-left ">
            <p className="py-6">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
            <button onClick={handleClick} className="py-2 bg-blue-500 text-slate-200 px-2 rounded-md hover:bg-orange-500 transition ease-in-out duration-300 text-white">
              Make an Appointment
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
