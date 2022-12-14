import React, { useEffect, useRef, useState } from "react";

import "../styles/home.css";
import profileImg from "../assets/images/sff.JPG";

import { setValHome } from '../context/features/navSlices/navSlices'
import { useDispatch } from "react-redux";


const Home = () => {

  // let ref = useRef();
  let timeOut = useRef();

  const refNav = useRef();

  const dispatch = useDispatch();



  const titleArr = [
    "Frontend Developer",
    "Backend Developer",
    "Full-Stack Developer",
    "Code Addict",
    "Problem Solver",
  ];

  const [num, setNum] = useState(0);

  const onButtonClick = () => {
    fetch("resume.pdf").then((response) => {
      response.blob().then((blob) => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);
        // Setting various property values
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "resume.pdf";
        alink.click();
      });
    });
  };

  const setTitleName = () => {
    if (num === titleArr.length - 1) {
      setNum(0);
    } else {
      setNum((prev) => prev + 1);
    }
  };


  useEffect(() => {

    dispatch(setValHome(refNav.current.offsetTop));

    timeOut.current = setInterval(() => {
      setTitleName();
    }, 1500);

    // console.log(ref.current );
    return () => {
      clearInterval(timeOut.current);
      // console.log("end component");
    };
  });

  return (
    <>
      <div ref={refNav} className="containerHome">
        <div className="leftContainer">
          <h3>Hello, I am</h3>
          <h1>Vaibhav Joshi</h1>
          <h3>
          And I am a <span>{titleArr[num]}</span>
          </h3>

          <button onClick={onButtonClick}>Resume</button>
        </div>
        <div className="rightContainer">
          <div>
            <img src={profileImg} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
