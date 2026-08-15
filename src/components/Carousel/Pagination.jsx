import React from "react";
import Dot from "./Dot";
import { images } from "./images";

const Pagination = ({ paginationIndex }) => {
  return (
    <div className="flex flex-row mt-4 justify-center items-center">
      {images.map((_, index) => (
        <Dot index={index} key={index} paginationIndex={paginationIndex} />
      ))}
    </div>
  );
};

export default Pagination;
