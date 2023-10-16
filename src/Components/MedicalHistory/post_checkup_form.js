import React, { useState } from "react";

const DoctorForm = () => {
  const [diagnosis, setDiagnosis] = useState("");
  const [description, setDescription] = useState("");
  const [recommends, setRecommended] = useState("");
  const [recommendedList, setRecommendedList] = useState([]);
  const [notRecommendeds, setNotRecommended] = useState("");
  const [notRecommendedList, setNotRecommendedList] = useState([]);
  const [medicalReports, setMedicalReports] = useState([]);

  const handleAddRecommendedFood = () => {
    if (recommends.trim() !== "") {
      setRecommendedList([...recommendedList, recommends]);
      setRecommended("");
    }
  };

  const handleRemoveRecommendedFood = (index) => {
    const updatedList = recommendedList.filter((food, i) => i !== index);
    setRecommendedList(updatedList);
  };

  const handleAddNotRecommendedFood = () => {
    if (notRecommendeds.trim() !== "") {
      setNotRecommendedList([...notRecommendedList, notRecommendeds]);
      setNotRecommended("");
    }
  };

  const handleRemoveNotRecommendedFood = (index) => {
    const updatedList = notRecommendedList.filter((food, i) => i !== index);
    setNotRecommendedList(updatedList);
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    setMedicalReports([...medicalReports, ...files]);
  };

  const [diagnosisError, setDiagnosisError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validate diagnosis and description fields
    if (!diagnosis && !description) {
      setDiagnosisError("Diagnosis is required");
      setDescriptionError("Description is required");
      return;
    } else if (!diagnosis) {
      setDiagnosisError("Diagnosis is required");
      return;
    } else {
      setDiagnosisError("");
    }

    if (!description) {
      setDescriptionError("Description is required");
      return;
    } else {
      setDescriptionError("");
    }

    // Handle form submission here
    const formData = {
      diagnosis,
      description,
      recommendedFoods: recommendedList,
      notRecommendedFoods: notRecommendedList,
      medicalReports,
    };

    console.log(formData); // Replace this with your logic for handling the form data.
  };

  return (
    <div className="pt-24">
      <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Doctor's Form
        </h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label htmlFor="Diagnosis" className="text-gray-600">
              Diagnosis
            </label>
            <input
              type="text"
              id="Diagnosis"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              className="mt-1 p-2 rounded-md border border-gray-300 w-full"
            />
            {diagnosisError && <p className="text-red-600">{diagnosisError}</p>}
          </div>

          <div>
            <label htmlFor="Description" className="text-gray-600">
              Description
            </label>
            <input
              type="text"
              id="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 p-2 rounded-md border border-gray-300 w-full"
            />
            {descriptionError && (
              <p className="text-red-600">{descriptionError}</p>
            )}
          </div>

          <div>
            <label htmlFor="recommendedFoods" className="text-gray-600">
              Recommends
            </label>
            <div className="flex">
              <input
                type="text"
                id="recommendedFoods"
                value={recommends}
                onChange={(e) => setRecommended(e.target.value)}
                className="mt-1 p-2 rounded-md border border-gray-300 w-full"
              />
              {recommends.trim() !== "" && (
                <button
                  type="button"
                  onClick={handleAddRecommendedFood}
                  className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                >
                  Add
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-row w-full">
            {recommendedList.map((food, index) => (
              <div
                key={index}
                className="text-gray-600 text-sm border border-solid bg-gray-200 border-black px-2 mr-3 py-1 rounded-md flex"
              >
                {food}
                <button
                  type="button"
                  onClick={() => handleRemoveRecommendedFood(index)}
                  className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
                >
                  &#x2715;
                </button>
              </div>
            ))}
          </div>

          <div>
            <label htmlFor="notRecommendedFoods" className="text-gray-600">
              Not Recommended
            </label>
            <div className="flex">
              <input
                type="text"
                id="notRecommendedFoods"
                value={notRecommendeds}
                onChange={(e) => setNotRecommended(e.target.value)}
                className="mt-1 p-2 rounded-md border border-gray-300 w-full"
              />
              {notRecommendeds.trim() !== "" && (
                <button
                  type="button"
                  onClick={handleAddNotRecommendedFood}
                  className="ml-2 bg-red-500 text-white p   y-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                >
                  Add
                </button>
              )}
            </div>
          </div>

          <div>
            <ul className="list-disc pl-5">
              {notRecommendedList.map((food, index) => (
                <li key={index} className="text-gray-600">
                  {food}
                  <button
                    type="button"
                    onClick={() => handleRemoveNotRecommendedFood(index)}
                    className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    &#x2715;
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <label htmlFor="medicalReport" className="text-gray-600">
              Medical Reports (PDF)
            </label>
            <input
              type="file"
              id="medicalReport"
              onChange={handleFileUpload}
              multiple
              accept=".pdf"
              className="mt-1 p-2 rounded-md border border-gray-300 w-full"
            />
          </div>

          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorForm;
