import React, { useState, useEffect } from "react";
import ProfileCard from "./profile_card";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctorsList } from "../../action-creators/doctors_list_action";
import { doctorsListSliceActions } from "../../slices/doctors_slice";
import { ClipLoader } from "react-spinners";
import "../../css/find_doctors.css";

const FindDoctors = () => {
  const [selectedDoctor, setSelectedDoctor] = useState("All");

  const dispatch = useDispatch();

  const observer = new IntersectionObserver(
    (entries) => {
      console.log(entries);
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("card-enter-active");
        } else {
          entry.target.classList.remove("card-enter-active");
        }
      });
    },
    { threshold: 0.8, root: null }
  );
    
  const doctorsListState = useSelector((state) => {
    return state.doctorslist;
  });

  const doctorsList = doctorsListState.doctorsList;

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleDoctorSelection = async (speciality) => {
    console.log("here" + speciality);
    setSelectedDoctor(speciality);
    setIsLoading(true);
    await fetchDoctorsList(speciality)
      .then((data) => {
        if (data === null) {
          dispatch(
            doctorsListSliceActions.replaceDoctorsList({
              list: [],
            })
          );
        } else {
          console.log(data);
          dispatch(
            doctorsListSliceActions.replaceDoctorsList({
              list: data,
            })
          );
        }
        const hiddenElements = document.querySelectorAll(".profile-card");
        hiddenElements.forEach((el) => observer.observe(el));
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    console.log("running useEffect");
    const getDoctorApplications = async () => {
      setIsLoading(true);
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
          const hiddenElements = document.querySelectorAll(".profile-card");
          hiddenElements.forEach((el) => observer.observe(el));
          setIsLoading(false);
        })
        .catch((e) => {
          setIsLoading(false);
        });
    };
    getDoctorApplications();

    // Cleanup observer when component unmounts
    return () => {
      console.log("observer cleanup");
      observer.disconnect();
    };
  }, []);

  return (
    <main>
      <div>
        <div className="flex flex-col justify-start w-4/6 my-0 mx-auto py-28">
          <div className="flex lg:flex-row  sm:flex-col  lg:items-center lg:justify-between">
            <div className="flex flex-row items-center sm:mt-12 ">
              <p className="pr-4 lg:text-lg sm:text-sm font-semibold ">
                {" "}
                Sort By Speciality :
              </p>
              <select
                value={selectedDoctor}
                onChange={(e) => handleDoctorSelection(e.target.value)}
                className="py-2 lg:px-4 sm:px-0.5 border border-solid border-gray-300 flex sm:text-sm lg:text-lg"
              >
                <option value="all" className="px-2 py-2">
                  All
                </option>
                <option value="Alltergist">Alltergist</option>
                <option value="Anesthesiologist">Anesthesiologist</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Endocrinologist">Endocrinologist</option>
                <option value="Hemaologist">Hemaologist</option>
                <option value="Immunologist">Immunologist</option>
                <option value="Immunologist">Internist</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Pulmonologist">Pulmonologist</option>
                <option value="Oncologist">Oncologist</option>
                <option value="Otolaryngologist">Otolaryngologist</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Rheumatologist">Rheumatologist</option>
                <option value="Clinical Pathologist">
                  Clinical Pathologist
                </option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Hepatologist">Hepatologist</option>
                <option value="Pediatrist">Pediatrist</option>
                <option value="Dentist">Dentist</option>
                <option value="Physiotherapist">Physiotherapist</option>
              </select>
            </div>
            <div className="flex flex-row sm:mt-4">
              <input
                type="text"
                placeholder="Search Doctors"
                className="w-full p-2 border rounded-l-sm"
                // value={searchTerm}
                // onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="bg-orange-500 text-white p-2 rounded-r-md hover:bg-orange-700">
                <FontAwesomeIcon icon={faSearch} className="text-white px-2" />
              </button>
            </div>
          </div>
          {isLoading && (
            <div className="h-32 flex justify-center items-center">
              <ClipLoader></ClipLoader>
            </div>
          )}
          {!isLoading && !hasError && doctorsList.length === 0 && (
            <div className="text-center"> No doctors Available.</div>
          )}
          {!isLoading && !hasError && doctorsList.length !== 0 && (
            <div className="grid lg:grid-cols-3 sm:justify-center md:grid-cols-2 w-full mt-5 justify-between gap-x-10 gap-y-5 ">
              {doctorsList.map((doctorData) => (
                <ProfileCard
                  key={doctorData.email}
                  doctor={doctorData}
                  className="profile-card"
                ></ProfileCard>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default FindDoctors;
