import React from "react";

const Dot = ({ index, paginationIndex }) => {
  const isActive = paginationIndex === index;

  return (
    <div
      className={`h-[3px] w-3 mx-0.5 rounded-lg bg-white transition-opacity duration-200 ${
        isActive ? "opacity-100" : "opacity-50"
      }`}
    />
  );
};

export default Dot;
