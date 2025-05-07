//Mounted / Unmounted


import Content from "./Content";
import { useState } from "react";

const App = () => {
  const [show , setShow] = useState(false)
  return (
    <>
    
      <button onClick={() => setShow(!show)}>Show</button>
      {show && <Content/>}
      
    </>
  );
};

export default App;



import React from 'react'

const Content = () => {
  return (
    <div><h1>Hi anh em</h1></div>
  )
}

export default Content