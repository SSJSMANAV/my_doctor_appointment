import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
// import { faPlus } from "@fortawesome/free-brands-svg-icons";

// function Questions() {
//   return (
//     <div className="font-semibold flex justify-between border border-gray-300 rounded-2xl mt-4">
//       <div>
//         <p className="px-4 py-4 ">What is your medical care?</p>
//       </div>
//       <div>
//         <button className="mr-4  rounded-md px-2 py-1 mt-3">
//           <FontAwesomeIcon icon={faPlus} />
//         </button>
//       </div>
//     </div>
//   );
// }
const Questions = (props) => {
  const [state, ChangeQuestionState] = useState(false);

  const toggleState = () => {
    ChangeQuestionState((prevState) => !prevState); // Use functional update to access the previous state
  };

  return (
    <div className="flex flex-col  border border-gray-300 rounded-2xl mt-4">
      <div className="font-semibold flex justify-between">
        <div>
          <p className="px-4 py-4 ">{props.question}</p>
        </div>
        <div>
          {state ? (
            <button
              onClick={toggleState}
              className="mr-4 rounded-md px-2 py-1 mt-3"
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
          ) : (
            <button
              onClick={toggleState}
              className="mr-4 rounded-md px-2 py-1 mt-3"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          )}
        </div>
      </div>
      <div
        className={
          state
            ? "transition-height max-height"
            : "transition-height1 min-height"
        }
      >
        <p className="px-4 pb-2">{props.answer}</p>
      </div>
    </div>
  );
};

export default Questions;
