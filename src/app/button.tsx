"use client"

import { useState } from "react";


import React from 'react'

function Button() {
  
  
  const [count,setcount]=useState(0);
const handleclick=()=>{
  setcount(count+1);
}

  
  return (
    <div>
 <button onClick={handleclick} className="bg-blue-500 hover:bg-blue-700 rounded">click me {count}</button>     
    </div>
  )
}
export default Button