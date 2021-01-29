import React, { useState, useEffect } from "react";

const CleanUp: React.FC = () => {
  const [currentNum, setCurrentNum] = useState(0);
  const incrementNum = () => {
    console.log("mouseevent");
    setCurrentNum((prevNum) => prevNum + 1);
  };
  useEffect(() => {
    console.log("cleanup");
    window.addEventListener("mousedown", incrementNum);
    return () => {
      console.log("unmounted invold");
      window.removeEventListener("mousedown", incrementNum);
    };
  }, []);
  return <div>{currentNum}</div>;
};

export default CleanUp;
