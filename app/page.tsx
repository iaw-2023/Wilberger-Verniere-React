"use client";

import React from "react"
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from "react-router-dom"
import App from "../src/App"



export default function welcome(){
  return(
    <main>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </main>
  )
}