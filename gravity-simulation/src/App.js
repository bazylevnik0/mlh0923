//import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  //create "global" var for calling the canvas object in different functions
  var canvas = undefined;
  //and setting the getting of the canvas from document after loading/render
  window.addEventListener("load", (event) => {
    console.log("window is fully loaded");
    canvas = document.querySelector("canvas");
    //set mouse listeners for canvas
    canvas.addEventListener("mousedown", mouseDownCanvas);
    canvas.addEventListener("mouseup", mouseUpCanvas);
  });
  //prepare render object
  const renderApp = (
    <div className="App">
      <h1>click and push to add object</h1>
      <canvas width="300px" height="200px"></canvas>
      <br />
      <button onClick={onClickButton}>START</button>
    </div>
  );
  //UI functional
  function mouseDownCanvas() {
    console.log("mouseDownCanvas", canvas);
  }
  function mouseUpCanvas() {
    console.log("mouseUpCanvas", canvas);
  }
  function onClickButton() {
    console.log("onClickButton", canvas);
  }

  return renderApp;
}

export default App;
