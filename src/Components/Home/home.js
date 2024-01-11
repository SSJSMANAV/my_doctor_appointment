import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Questions from "../Questions/question";
import { useEffect, useRef } from "react";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import "../../css/home/home.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { doctorsListSliceActions } from "../../slices/doctors_slice";
import { fetchDoctorsList } from "../../action-creators/doctors_list_action";
import "../../css/find_doctors.css";

import { faMinus, } from "@fortawesome/free-solid-svg-icons";
import Section2 from "./section_two";
import ImageSlider from "./image_slider";
import MedicalServices from "../Mobile/medicalservices";
library.add(faFacebookF);

const Home = () => {
  const navigate = useNavigate();

  const scrollRef = useRef(0);

  const dispatch = useDispatch();

  const doctorsListState = useSelector((state) => {
    return state.doctorslist;
  });

  const doctorsList = doctorsListState.doctorsList;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        console.log(entries);
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              "heading-text-1-active",
              "heading-text-2-active",
              "header-image-1-active",
              "header-image-2-active",
              "header-image-3-active",
              "header-data-active",
              "block1-active",
              "block2-active",
              "block3-active"
            );
          } else {
            entry.target.classList.remove(
              "heading-text-1-active",
              "heading-text-2-active",
              "header-image-1-active",
              "header-image-2-active",
              "header-image-3-active",
              "header-data-active",
              "block1-active",
              "block2-active",
              "block3-active"
            );
          }
        });
      },
      { threshold: 0.5, root: null }
    );
    const hiddenElements = document.querySelectorAll(
      ".heading-text-1, .heading-text-2, .header-image-1, .header-image-2, .header-image-3, .header-data, .block1, .block2, .block3"
    );
    hiddenElements.forEach((el) => observer.observe(el));

    const getDoctorApplications = async () => {
      await fetchDoctorsList("all")
        .then((data) => {
          if (data === null) {
            dispatch(
              doctorsListSliceActions.replaceDoctorsList({
                list: [],
              })
            );
          } else {
            dispatch(
              doctorsListSliceActions.replaceDoctorsList({
                list: data,
              })
            );
          }
          const hiddenElements = document.querySelectorAll(
            ".header-image-1, .heading-text-2"
          );
          hiddenElements.forEach((el) => observer.observe(el));
        })
        .catch((e) => {});
    };
    getDoctorApplications();
    window.scrollTo(0, scrollRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <main className="App my-0 mr-auto ml-auto mt-2">
      <section className="pb-24 flex lin-grad pt-16  ">
        <div className="w-4/6 flex my-0 mx-auto">
          <div class="left_container lg:w-2/5 lg:pt-8 sm:w-full sm:pt-20">
            <div class="lft_con_first">
              <h1 className="heading-text-1 font-bold text-left lg:text-5xl lg:leading-snug sm:text-4xl sm:leading-snug sm:pb-4">
                We help patients live a healthy, longer life
              </h1>
              <p className="heading-text-2 text-left">
                Discover a curated list of experienced and caring doctors to
                meet your healthcare needs. Browse through our diverse range of
                specialists to find the perfect match for you.
              </p>
              <div className="text-left">
                <button
                  onClick={() => {
                    navigate("/find-doctors");
                  }}
                  className="lg:p-3 lg:px-6 sm:p-3 sm:text-sm mt-6 font-semibold bg-orange-500 rounded-3xl text-white hover:scale-105 transition-all duration-300"
                >
                  Request an Appointment
                </button>
              </div>
            </div>
            <div className="header-data flex flex-row items-start  lg:flex lg:flex-row mt-10  sm:flex-col sm:items-center">
              <div className="lg:mr-8 sm:mb-4 cursor-pointer transition-all hover:scale-105 ">
                <p className="text-5xl font-semibold">30+</p>
                <p className="text-xs font-normal mt-2">Years of Service </p>
              </div>
              <div className="lg:mr-8 sm:mb-4 cursor-pointer transition-all hover:scale-105">
                <p className="text-5xl font-semibold">15+</p>
                <p className="text-xs font-normal mt-2">Clinic Location</p>
              </div>
              <div className="lg:mr-8 sm:mb-4 cursor-pointer transition-all hover:scale-105">
                <p className="text-5xl font-semibold">100%</p>
                <p className="text-xs font-normal mt-2">Patient Satisfaction</p>
              </div>
            </div>
          </div>
          <div className="lg:flex sm:hidden">
            <div className=" header-image-1  mt-20 mr-8 ml-12">
              <img
                src={process.env.PUBLIC_URL + "/img/doctor-1.png"}
                alt="alt"
                style={{ height: "70%", width: "45rem" }}
                className="object-cover"
              />
            </div>
            <div className="mt-28">
              <div className="mb-8  ">
                <img
                  src={process.env.PUBLIC_URL + "/img/doctor2.jpg"}
                  alt="alt"
                  style={{ height: "30%", width: "15rem" }}
                  className="header-image-2 object-cover "
                />
              </div>
              <div className="header-image-3">
                <img
                  src={process.env.PUBLIC_URL + "/img/doctor-3.jpg"}
                  alt="alt"
                  className="header-image-3 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {doctorsList.length !== 0 && (
        <div>
          <div className="w-5/12  mr-auto ml-auto my-7">
            <h3 className="heading-text-2 text-4xl font-semibold">
              Our Best doctors
            </h3>
            <p className="heading-text-2 mt-3 font-normal">
              World class for everyone. Our health System offers unmatched,
              expert healthcare
            </p>
          </div>
          <div className="header-image-1 w-full">
            <ImageSlider doctors={doctorsList}></ImageSlider>
          </div>
        </div>
      )}

      {/* {doctorsList.length !== 0 && (
        <div container="sixth_container" className="pb-32">
          <div className="w-4/6  mt-20 mx-auto">
            <div className="w-5/12 my-0 mr-auto ml-auto ">
              <h3 className="text-4xl font-semibold">Our great doctors</h3>
              <p className="mt-3 font-normal">
                World class for everyone. Our health System offers unmatched,
                expert healthcare
              </p>
            </div> */}

      {/* GRID CONTAINER */}
      {/* <div className="mt-24 grid grid-cols-3 gap-10">
              {doctorsList.map((doctor) => {
                return (
                  <div className="profile-card">
                    <div>
                      <img
                        src={`http://localhost:3009/assets/${doctor.image}`}
                        style={{ width: "90%", height: "22rem" }}
                        className="object-cover shadow-sm border border-solid border-slate-300"
                        alt="alt"
                      />
                    </div>
                    <div
                      className="mt-4 text-left px-2"
                      style={{ width: "90%" }}
                    >
                      <h1 className="font-semibold text-xl text-gray-700">
                        Dr. {doctor.name}
                      </h1>
                      <div className="flex justify-between">
                        <button className="mt-4 px-6 py-1 bg-sky-200 text-sky-700 rounded-xl font-semibold ">
                          {doctor.specialization}
                        </button>
                        <p className="mt-5">
                          {doctor.rating} <span className="font-light"></span>
                          <FontAwesomeIcon
                            icon={faStar}
                            className="text-yellow-400"
                          />
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-xs font-semibold  mt-5">
                          {doctor.hospital}
                        </p>
                        <button
                          onClick={() => {
                            navigate(
                              `/doctor-details/${doctor.doctorId}/appointmentdates`
                            );
                          }}
                          className="border border-black rounded-full px-3 py-1 mt-3 hover:transform hover:translate-x-2 transition-transform duration-300 ease-in-out"
                        >
                          <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )} */}
      {/* SECOND CONTAINER */}
      <Section2
        firstClassName="heading-text-1"
        secondClassName="heading-text-2"
        thirdClassName="block1"
        fourthClassName="block2"
        fifthClassName="block3"
      ></Section2>

      {/* FOURTH CONTAINER */}
      <div class="fourth_container pb-32">
        <div className="sm:w-4/6 my-0 mx-auto">
          <div className="lg:w-5/12 my-0 mr-auto ml-auto ">
            <h3 className="text-4xl font-semibold">Our medical services</h3>
            <p className="mt-3 font-normal">
              World class for everyone. Our health System offers unmatched,
              expert healthcare
            </p>
          </div>

          {/* Grid Container */}
          <MedicalServices></MedicalServices>
          {/* <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3  gap-10 mt-20  ">
            <div className=" bg-slate-300 p-4 rounded-2xl">
              <h1 className="text-xl text-left font-medium">Cancer Care</h1>
              <p className="text-left mt-2 text-sm font-normal w-4/5">
                World class for everyone. Our health System offers unmatched,
                expert healthcare
              </p>
              <div className="flex justify-between mt-5 mb-5">
                <button className="bg-blue-600 text-white  rounded-full px-5 py-1 mt-4 hover:transform transition-all  hover:translate-x-2 duration-300 ease-in-out">
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
                <div className="mt-4 ">
                  <p
                    className="bg-blue-200 px-3 py-1"
                    style={{ borderRadius: "8px" }}
                  >
                    1
                  </p>
                </div>
              </div>
            </div>
            <div className=" bg-slate-300 p-4 rounded-2xl">
              <h1 className="text-xl text-left font-medium">
                Labor & Delivery
              </h1>
              <p className="text-left mt-2 text-sm font-normal w-4/5">
                World class for everyone. Our health System offers unmatched,
                expert healthcare
              </p>
              <div className="flex justify-between mt-5 mb-5">
                <button className="bg-blue-600 text-white  rounded-full px-5 py-1 mt-4 hover:transform transition-all  hover:translate-x-2 duration-300 ease-in-out">
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
                <div className="mt-4 ">
                  <p
                    className="bg-purple-200 px-3 py-1"
                    style={{ borderRadius: "8px" }}
                  >
                    2
                  </p>
                </div>
              </div>
            </div>
            <div className=" bg-slate-300 p-4 rounded-2xl">
              <h1 className="text-xl text-left font-medium">
                Heart & Vascular
              </h1>
              <p className="text-left mt-2 text-sm font-normal w-4/5">
                World class for everyone. Our health System offers unmatched,
                expert healthcare
              </p>
              <div className="flex justify-between mt-5 mb-5">
                <button className="bg-blue-600 text-white  rounded-full px-5 py-1 mt-4 hover:transform transition-all  hover:translate-x-2 duration-300 ease-in-out">
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
                <div className="mt-4 ">
                  <p
                    className="bg-orange-200 px-3 py-1"
                    style={{ borderRadius: "8px" }}
                  >
                    3
                  </p>
                </div>
              </div>
            </div>
            <div className=" bg-slate-300 p-4 rounded-2xl">
              <h1 className="text-xl text-left font-medium">Mental Health</h1>
              <p className="text-left mt-2 text-sm font-normal w-4/5">
                World class for everyone. Our health System offers unmatched,
                expert healthcare
              </p>
              <div className="flex justify-between mt-5 mb-5">
                <button className="bg-blue-600 text-white  rounded-full px-5 py-1 mt-4 hover:transform transition-all  hover:translate-x-2 duration-300 ease-in-out">
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
                <div className="mt-4 ">
                  <p
                    className="bg-orange-200 px-3 py-1"
                    style={{ borderRadius: "8px" }}
                  >
                    4
                  </p>
                </div>
              </div>
            </div>
            <div className=" bg-slate-300 p-4 rounded-2xl">
              <h1 className="text-xl text-left font-medium">Neurology</h1>
              <p className="text-left mt-2 text-sm font-normal w-4/5">
                World class for everyone. Our health System offers unmatched,
                expert healthcare
              </p>
              <div className="flex justify-between mt-5 mb-5">
                <button className="bg-blue-600 text-white  rounded-full px-5 py-1 mt-4 hover:transform transition-all  hover:translate-x-2 duration-300 ease-in-out">
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
                <div className="mt-4 ">
                  <p
                    className="bg-blue-200 px-3 py-1"
                    style={{ borderRadius: "8px" }}
                  >
                    5
                  </p>
                </div>
              </div>
            </div>
            <div className=" bg-slate-300 p-4 rounded-2xl">
              <h1 className="text-xl text-left font-medium">Burn Treatment</h1>
              <p className="text-left mt-2 text-sm font-normal w-4/5">
                World class for everyone. Our health System offers unmatched,
                expert healthcare
              </p>
              <div className="flex justify-between mt-5 mb-5">
                <button className="bg-blue-600 text-white  rounded-full px-5 py-1 mt-4 hover:transform transition-all  hover:translate-x-2 duration-300 ease-in-out">
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
                <div className="mt-4 ">
                  <p
                    className="bg-purple-200 px-3 py-1"
                    style={{ borderRadius: "8px" }}
                  >
                    6
                  </p>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      {/* FIFTH CONTAINER */}
      <div class="fifth_container" className=" pb-32">
        <div className="w-4/6 lg:flex my-0 mx-auto">
          <div className=" sm:w-full  lg:w-1/2 text-left pt-16">
            <div className="sm:w-full">
              <h1 className="text-3xl font-semibold sm:text-center lg:text-left">
                Get virtual treatment anytime
              </h1>
            </div>
            <div className="mt-8">
              <p className="font-normal flex items-center ">
                <FontAwesomeIcon icon={faMinus} className="mr-2.5" />
                Schedule the appointment directly
              </p>
              <p className="mt-2 flex items-center">
                <FontAwesomeIcon icon={faMinus} className="mr-2.5" />
                Search for your physician here, and contact their office
              </p>
              <p className="mt-3 flex items-start">
                <FontAwesomeIcon icon={faMinus} className="mr-2.5 mt-1.5" />
                View our physicians who are accepting new patients, use the
                online scheduling tool to select an appointment time.
              </p>
            </div>
            <div className="mt-10">
              <button className="px-5 py-2 font-semibold bg-orange-400 text-white  hover:bg-blue-700 transition-all duration-300 rounded-3xl">
                Learn More
              </button>
            </div>
          </div>
          <div className="w-1/2 sm:hidden lg:flex ">
            <div className=" pl-40">
              <img
                src={process.env.PUBLIC_URL + "/img/doctor-4.jpg"}
                style={{ width: "90%", height: "25rem" }}
                alt="alt"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      {/* SIXTH CONTAINER */}

      {/* SEVENTH CONTAINER */}
      <div class="seventh_container" className="flex pb-32">
        <div className="w-4/6 lg:flex my-0 mx-auto">
          <div className="lg:w-1/3 pt-12 sm:hidden lg:flex ">
            <img
              src={process.env.PUBLIC_URL + "/img/doctor-5.jpg"}
              style={{ width: "100%", height: "26rem" }}
              alt="alt"
              className="object-cover"
            />
          </div>
          <div className="lg:ml-36 mt-14 text-left">
            <div className="mb-6">
              <h1 className="text-3xl font-semibold">
                Most questions by our beloved patients
              </h1>
            </div>
            <div className="w-full sm:text-sm">
              <Questions
                question={"How can I book an appointment with a doctor?"}
                answer={
                  "Simply log in to our app, browse available doctors, and choose a convenient time for your appointment."
                }
              />
              <Questions
                question={
                  "Is my personal information secure when booking through your app?"
                }
                answer={
                  " Absolutely! We prioritize your privacy and use industry-standard security measures to protect your data."
                }
              />
              <Questions
                question={
                  "What if I need to cancel or reschedule my appointment?"
                }
                answer={
                  "No problem! You can easily manage your appointments in the app, and we offer a hassle-free cancellation and rescheduling process."
                }
              />
              <Questions
                question={
                  "Are there any fees for using the doctor booking service?"
                }
                answer={
                  "Our basic booking service is free. Any additional charges, if applicable, will be clearly communicated during the booking process. "
                }
              />
            </div>
          </div>
        </div>
      </div>
      {/* EIGHT CONTAINER */}
      {/* <div class="eight_container" className="pb-32">
        <div className="sm:w-4/6 mx-auto">
          <div className="lg:w-5/12 lg:my-0 lg:mx-auto ">
            <h3 className="text-4xl font-semibold">Our medical services</h3>
            <p className="mt-3 font-normal">
              World class for everyone. Our health System offers unmatched,
              expert healthcare
            </p>
          </div>
          <div className="">
            <Review></Review>
          </div>
        </div>
      </div> */}
    </main>
  );
};

export default Home;
