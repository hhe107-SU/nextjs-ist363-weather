"use client";



import ButtonDemo from "../components/ButtonDemo"
import Button from "../components/Button";
import {getPeople} from "../lib/api";

import ColorPicker from "../components/ColorPicker";
import PeoplePicker from "../components/PeoplePicker"


const Homepage =()=>{
  const peopleArr = getPeople();
  //console.log({peopleArr})

  return (
  <div>
  <h1>wheather app</h1>
  <PeoplePicker people={peopleArr} />
  <ButtonDemo />
 
  <ColorPicker/>
  </div>
  );



};

export default Homepage;
