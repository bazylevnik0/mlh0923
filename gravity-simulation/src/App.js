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
  //logic and data structure
  const elements = [];
  class Element {
    constructor(x, y, size) {
      this.x = x;
      this.y = y;
      this.size = size;
    }
  }
  const Time = {
    recalculate: function () {
      // Sort the objects based on size in descending order
      elements.sort((a, b) => b.size - a.size);
      // Iterate through the objects and calculate interactions
      for (let i = 0; i <= elements.length - 1; i++) {
        let cur = elements[i];
        let next = elements[i + 1];
        //calc direction
        let x_delta = next.x - cur.x;
        let y_delta = next.y - cur.y; //distance between coords
        x_delta *= 600000000;
        y_delta *= 200000000; //normalize in m 600millionsmeters*200
        let r = x_delta * x_delta + y_delta * y_delta; //radius, through Pifagors theorem in meters
        let g = 0.000022; //gravitational constant
        let f = (g * cur.size * next.size) / (r * r); //calc force - speed of changing
        //f = f/600*200;//not sure, but need also normalize
        //apply the force:
        let x_dir = x_delta >= 0 ? 1 : -1;
        let y_dir = y_delta >= 0 ? 1 : -1; //direction sign
        next.x += f * x_dir;
        next.y += f * y_dir; //need to test
      }
    },
    redraw: function () {
      console.log("redraw");
    },
    startAnimation: function () {
      // Start the animation loop
      // ...
      // Your animation code goes here
      // ...
    },
    pauseAnimation: function () {
      // Pause the animation
      // ...
      // Your pause code goes here
      // ...
    },
  };
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
