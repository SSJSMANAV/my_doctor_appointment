// AddDoctorForm.js
import React, { useEffect, useRef, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const AddDoctorForm = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(0);

  const [imageFiles, setImageFiles] = useState([]);
  const [showFields, setShowFields] = useState(false);
  const [instituteName, setInstitution] = useState("");
  const [grade, setGrade] = useState("");
  const [educationList, setEducationList] = useState([]);

  const handleAddEducation = () => {
    if (instituteName.trim() && grade.trim()) {
      const newEducation = { instituteName: instituteName, grade: grade };
      setEducationList([...educationList, newEducation]);
      setInstitution("");
      setGrade("");
    }
  };

  const initialValues = {
    age: "",
    gender: "",
    speciality: "",
    currentlyWorkingAt: "",
    experience: "",
  };

  const validationSchema = Yup.object().shape({
    age: Yup.number()
      .required("* Age is required.")
      .positive("* Age must be a positive number.")
      .integer("* Age must be an integer."),
    gender: Yup.string().required("* Gender is required."),
    speciality: Yup.string().required("* Speciality is required."),
    currentlyWorkingAt: Yup.string().required(
      "* Currently Working At is required."
    ),
    experience: Yup.number()
      .required("* Experience is required.")
      .positive("* Experience must be a positive number.")
      .integer("* Experience must be an integer."),
  });

  const handleSubmit = (values) => {
    navigate("/proceed-doctor-fillup-form", {
      state: {
        ...values,
        ...{ education: educationList },
        ...{ imageFiles: imageFiles },
      },
    });
  };

  const handleDeleteEducation = (id) => {
    const updatedEducationList = educationList.filter(
      (edu, index) => index !== id
    );
    setEducationList(updatedEducationList);
  };

  useEffect(() => {
    window.scrollTo(0, scrollRef.current);
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center mt-24 mb-5">
      <div className="bg-white p-8 rounded  flex lg:w-2/3 sm:w-4/5   sm:justify-center  lin-grad shadow-2xl">
        <div className="lg:w-1/2 sm:hidden lg:flex ">
          <div className="flex flex-row justify-center items-center w-full h-full">
            <div className="text-2xl font-semibold text-orange-400">my</div>
            <div className="text-2xl font-bold text-blue-600">Doctor</div>
          </div>
        </div>
        <div className="lg:w-1/2 sm:w-11/12 lg:pl-8 ">
          <h1 className="text-end font-semibold mb-4 text-gray-500">
            * Apply{" "}
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="flex flex-col gap-4">
                <div>
                  <label htmlFor="age">Age</label>
                  <Field
                    type="text"
                    id="age"
                    name="age"
                    className="w-full p-2 border bg-slate-100"
                  />
                  <ErrorMessage
                    name="age"
                    component="div"
                    className="text-red-600 pt-1.5"
                  />
                </div>

                <div>
                  <label htmlFor="gender">Gender</label>
                  <Field
                    as="select"
                    id="gender"
                    name="gender"
                    className="w-full p-2 border bg-slate-100"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Field>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="text-red-600 pt-1.5"
                  />
                </div>

                <div>
                  <label htmlFor="speciality">Speciality</label>
                  <Field
                    as="select"
                    id="speciality"
                    name="speciality"
                    className="w-full p-2 border bg-slate-100"
                  >
                    <option value="">Select Speciality</option>
                    <option value="Alltergist">Alltergist</option>
                    <option value="Anesthesiologist">Anesthesiologist</option>
                    <option value="Cardiologist">Cardiologist</option>
                    <option value="Endocrinologist">Endocrinologist</option>
                    <option value="Hemaologist">Hemaologist</option>
                    <option value="female">Immunologist</option>
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
                  </Field>
                  <ErrorMessage
                    name="speciality"
                    component="div"
                    className="text-red-600 pt-1.5"
                  />
                </div>

                <div>
                  <label htmlFor="currentlyWorkingAt">
                    Currently Working at
                  </label>
                  <Field
                    type="text"
                    id="currentlyWorkingAt"
                    name="currentlyWorkingAt"
                    className="w-full p-2 border bg-slate-100"
                  />
                  <ErrorMessage
                    name="currentlyWorkingAt"
                    component="div"
                    className="text-red-600 pt-1.5"
                  />
                </div>

                <div>
                  <label htmlFor="experience">Experience (in years)</label>
                  <Field
                    type="number"
                    id="experience"
                    name="experience"
                    className="w-full p-2 border bg-slate-100"
                  />
                  <ErrorMessage
                    name="experience"
                    component="div"
                    className="text-red-600 pt-1.5"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(event) => {
                      console.log("changed");
                      const files = event.target.files;
                      const theFiles = Array.from(files);
                      const fileList = [];
                      theFiles.forEach((file) => {
                        const newFile = new File([file], file.name);
                        fileList.push(newFile);
                      });
                      setImageFiles(fileList);
                    }}
                  />
                </div>
                {imageFiles.length === 0 && (
                  <div className="text-red-500 text-sm">File is Required</div>
                )}
                <button
                  className="bg-blue-500 mt-5 text-white p-2 rounded-sm"
                  onClick={() => setShowFields(!showFields)}
                  type="button"
                >
                  Add Education
                </button>

                {showFields && (
                  <div className="mt-2 ">
                    <input
                      type="text"
                      placeholder="Institution"
                      value={instituteName}
                      onChange={(e) => setInstitution(e.target.value)}
                      className="rounded-md p-2 border mr-3"
                    />
                    <input
                      type="text"
                      placeholder="Degree"
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="rounded-md p-2 border mt-2"
                    />
                    <button
                      type="button"
                      onClick={handleAddEducation}
                      className="bg-transparent px-8 border border-solid border-orange-500 text-orange-500 hover:text-white hover:bg-orange-500 p-2 rounded-md mt-2"
                    >
                      Add
                    </button>
                  </div>
                )}
                {educationList.length !== 0 && (
                  <div className="mt-4 ">
                    <h3>Education Details:</h3>
                    <ul>
                      {educationList.map((education, index) => (
                        <li
                          key={education.id}
                          className="flex justify-between items-center border border-solid border-black rounded-sm p-2 mb-2"
                        >
                          <div className="flex flex-row">
                            <p className="pr-1">
                              {" "}
                              {education.instituteName} -{" "}
                            </p>
                            <p className="font-bold"> {education.grade}</p>
                          </div>
                          {/* <button
                        onClick={() => handleDeleteEducation(education.id)}
                        className="bg-red-500 text-white p-2 rounded-md ml-2"
                      >
                        Delete
                      </button> */}
                          <FontAwesomeIcon
                            onClick={() => {
                              handleDeleteEducation(index);
                            }}
                            icon={faTrash}
                            className="cursor-pointer text-red-600"
                          ></FontAwesomeIcon>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="mt-6 bg-white text-blue-600 hover:bg-blue-600 border border-solid border-blue-600 hover:text-white rounded px-4 py-2"
              >
                Proceed
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddDoctorForm;
