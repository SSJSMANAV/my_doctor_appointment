// AddDoctorForm.js
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const AddDoctorForm = () => {

  const navigate = useNavigate();



  const initialValues = {
    fullName: "",
    age: "",
    gender: "",
    dateOfBirth: "",
    speciality: "",
    currentlyWorkingAt: "",
    experience: "",
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    age: Yup.number()
      .required("Age is required")
      .positive("Age must be a positive number")
      .integer("Age must be an integer"),
    gender: Yup.string().required("Gender is required"),
    dateOfBirth: Yup.date().required("Date of Birth is required"),
    speciality: Yup.string().required("Speciality is required"),
    currentlyWorkingAt: Yup.string().required(
      "Currently Working At is required"
    ),
    experience: Yup.number()
      .required("Experience is required")
      .positive("Experience must be a positive number")
      .integer("Experience must be an integer"),
  });

  const handleSubmit = (values) => {
    // Handle form submission, e.g., send data to the server
    console.log(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center mt-24 mb-5">
      <div className="bg-white p-8 rounded  flex w-2/3 mx-32 lin-grad shadow-2xl">
        <div className="w-1/2">
          <div className="flex flex-row justify-center items-center w-full h-full">
            <div className="pr-3 text-2xl font-semibold text-orange-400">myDoctor</div>
            <div className="text-2xl font-bold text-blue-600">Admin</div>
          </div>
        </div>
        <div className="w-1/2 pl-8 ">
          <h1 className="text-end font-semibold mb-4 text-gray-500">* Add Doctor </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="flex flex-col gap-4">
                <div>
                  <label htmlFor="fullName">Full Name</label>
                  <Field
                    type="text"
                    id="fullName"
                    name="fullName"
                    className="w-full p-2 border bg-slate-100"
                  />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className="text-red-600"
                  />
                </div>
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
                    className="text-red-600"
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
                    className="text-red-600"
                  />
                </div>
                <div>
                  <label htmlFor="dateOfBirth">Date of Birth</label>
                  <Field
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    className="w-full p-2 border bg-slate-100"
                  />
                  <ErrorMessage
                    name="dateOfBirth"
                    component="div"
                    className="text-red-600"
                  />
                </div>

                <div>
                  <label htmlFor="speciality">Speciality</label>
                  <Field
                    type="text"
                    id="speciality"
                    name="speciality"
                    className="w-full p-2 border bg-slate-100"
                  />
                  <ErrorMessage
                    name="speciality"
                    component="div"
                    className="text-red-600"
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
                    className="text-red-600"
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
                    className="text-red-600"
                  />
                </div>
              </div>
      
              <button
                type="submit"
                // onClick={() => {
                //   navigate('/proceed-to-add-doctor');
                // }}
                className="mt-4 bg-white text-blue-600 hover:bg-blue-600 border border-solid border-blue-600 hover:text-white rounded px-4 py-2"
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
