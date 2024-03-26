"use client";


import{useState}from "react";

import Button from "../components/Button";

import ColorPicker from "../components/ColorPicker";


const Homepage =()=>{
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  return (
  <div>
  <h1>wheather app</h1>
  
  <h2>Count: {count}</h2>

  <Button 

    label="Increment"
    
    clickHandler={()=>{
    setCount(count+1);
  }}>Increment</Button>
  
  <Button 
  label="Decrement"
  clickHandler={()=>{
    setCount(count-1);
  }}>Decrement</Button>

  <Button   label="Download"   />
  <Button   label="Register Now"     />
  <Button   label="Learn more"      />


  {count>5 && <div>Special message</div>}
  <br />
  <Button 
    label={isVisible ? "Hide message":"Show message"}
    clickHandler={()=>{
    setIsVisible(!isVisible);

  }} 
  
  />
    
    
 
  {isVisible && <p>Hello,world!</p>}
  <ColorPicker/>
  </div>
  );



};

export default Homepage;
