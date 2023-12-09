import React from "react";
import { Audio } from  'react-loader-spinner'

const Loader = () => {
  return (
    <>
    <div className="h-full w-full flex flex-col justify-center items-center">
    <Audio
        height="100"
        width="100"
        radius="9"
        color="#a75eec"
        ariaLabel="three-dots-loading"
        wrapperStyle
        wrapperClass
      />
    </div>
     
    </>
  );
};

export default Loader;
