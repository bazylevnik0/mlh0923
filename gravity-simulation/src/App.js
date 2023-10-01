//import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  //create "global" var for calling the canvas object in different functions
  var canvas = undefined; // canvas DOM element
  var ctx = undefined; // canvas context
  //and setting the getting of the canvas from document after loading/render
  window.addEventListener("load", (event) => {
    console.log("window is fully loaded");
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");
    //set mouse listeners for canvas
    canvas.addEventListener("mousedown", mouseDownCanvas);
    canvas.addEventListener("mouseup", mouseUpCanvas);
  });
  //prepare render object
  const renderApp = (
    <div className="App">
      <h1>click and push to add object</h1>
      <canvas width="600px" height="400px"></canvas>
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
        //mass of moon 73476730900000000000000 kg
        //distance to the moon 384000000 m
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
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, 600, 400); //clear
      //iterate trhrough the elements array
      elements.map((el) => {
        //draw circle
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(
          el.x - el.size / 2,
          el.y - el.size / 2,
          el.size,
          0,
          Math.PI * 2,
          true,
        ); // Outer circle
        ctx.fill();
      });
    },
    startAnimation: function () {
      Time.play = true;
      Time.interval = setInterval(() => {
        if (Time.play == true) {
          Time.recalculate();
          Time.redraw();
          console.log("interval");
        }
      }, 25);
    },
    pauseAnimation: function () {
      Time.play = false;
    },
  };
  //UI functional
  let active; // working only with one element -id
  //for creating element
  function mouseDownCanvas(e) {
    let x = e.clientX - canvas.offsetLeft;
    let y = e.clientY - canvas.offsetTop;
    //create element
    let temp = new Element(x, y, 0);
    //add id and push to array, also add timer for size
    temp.id = Math.random();
    active = temp.id; //working with this now
    elements.push(temp);
    elements.map((el) => {
      if (el.id == active) {
        el.timer = setInterval(() => {
          el.size++; //increase size
          Time.redraw();
        }, 10);
      }
    });
  }
  function mouseUpCanvas(e) {
    console.log("mouseUpCanvas", canvas);
    //delete interval
    elements.map((el) => {
      if (el.id == active) {
        clearInterval(el.timer);
      }
    });
    //clear temp id
    active = 0;
    console.log(elements); //!temp
  }
  //
  function onClickButton(e) {
    console.log(e.target.innerHTML);
    //toggle state of button
    //if first launch
    if (Time.play == undefined) {
      //start animation
      Time.startAnimation();
      e.target.innerHTML = "PAUSE"; //toggle text
      //if had started before
    } else if (Time.play == false) {
      //toggle time calc switch
      Time.play = true;
      e.target.innerHTML = "PAUSE";
      //if now playing
    } else {
      //toggle time calc switch
      Time.play = false;
      e.target.innerHTML = "START";
    }
    //if pause
    //pause animation
  }

  return renderApp;
}

export default App;
