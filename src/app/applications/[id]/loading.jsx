import React from "react";
import { ImSpinner2 } from "react-icons/im";
const loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
      <div className="text-4xl  text-gray-500 p-4 rounded-lg flex items-center animate-spin">
        <ImSpinner2 />
      </div>
    </div>
  );
};

export default loading;
