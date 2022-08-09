import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import styles from './Banner.module.css';
type Arrow = {
  onClick: () => void;
  direction?: string;
};

const Arrow = ({ onClick, direction }: Arrow) => {
  return (
    <>
      <button
      className={`${styles.arrow}  ${
        direction === "right" ? "right-6 group-hover:right-4" : "left-6 group-hover:left-4"
      }`}
      onClick={onClick}
    >
      {direction === "right" ? <FaAngleRight className={`${styles.icRight} float-left hover:text-black`} /> : <FaAngleLeft className={`${styles.icLeft} float-right hover:text-black`} />}
    </button>
    {/* <FaAngleRight /> */}
    </>

    
  );
};

export default Arrow;