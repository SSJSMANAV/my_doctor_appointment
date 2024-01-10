import React, { useState, useEffect, useRef } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDoctorsByName,
  fetchDoctorsList,
} from "../../action-creators/doctors_list_action";
import { doctorsListSliceActions } from "../../slices/doctors_slice";
import { ClipLoader } from "react-spinners";
import "../../css/find_doctors.css";
import DoctorsList from "./doctors_list";
import toast from "react-hot-toast";

const FindDoctors = () => {
  const authState = useSelector((state) => {
    return state.auth;
  });

  const token = authState.token;
  const [selectedDoctor, setSelectedDoctor] = useState("All");

  const dispatch = useDispatch();

  const doctorsListState = useSelector((state) => {
    return state.doctorslist;
  });

  const doctorsList = doctorsListState.doctorsList;

  const [searchTerm, setSearchTerm] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleSearchByName = async (searchTerm) => {
    console.log("this is for search by term");
    setSearchTerm(searchTerm);
    setIsLoading(true);
    await fetchDoctorsByName(searchTerm, token)
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
        setIsLoading(false);
      })
      .catch((e) => {
        toast.error(e.message);
        setIsLoading(false);
      });
  };

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
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };

  const scrollRef = useRef(0);

  useEffect(() => {
    console.log("running useEffect");
    const getDoctorApplications = async () => {
      console.log("this is running again for all");
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
          setIsLoading(false);
        })
        .catch((e) => {
          setIsLoading(false);
        });
    };
    getDoctorApplications();
    window.scrollTo(0, scrollRef.current);

    return () => {
    };
  }, [dispatch]);

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
                onChange={(e) => {
                  setSearchTerm("");
                  handleDoctorSelection(e.target.value);
                }}
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                onClick={() => {
                  handleSearchByName(searchTerm);
                }}
                className="bg-orange-500 text-white p-2 rounded-r-md hover:bg-orange-700"
              >
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
            <div className="text-center mt-5"> No doctors Available.</div>
          )}
          {!isLoading && !hasError && doctorsList.length !== 0 && (
            <DoctorsList doctors={doctorsList}></DoctorsList>
          )}
        </div>
      </div>
    </main>
  );
};

export default FindDoctors;
