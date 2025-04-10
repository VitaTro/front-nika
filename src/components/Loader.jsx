import React from "react";
import { BeatLoader } from "react-spinners";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <BeatLoader color="#4CAF50" size={15} />
    </div>
  );
};

export default Loader;
