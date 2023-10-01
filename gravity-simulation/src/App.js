//import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  //create "global" var for calling the canvas object in different functions
  var canvas = undefined; // canvas DOM element
  var ctx = undefined; // canvas context
  //and setting the getting of the canvas from document after loading/render
  window.addEventListener("load", (event) => {
    console.log("ready");
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");
    //set mouse listeners for canvas
    canvas.addEventListener("mousedown", mouseDownCanvas);
    canvas.addEventListener("mouseup", mouseUpCanvas);
  });
  //prepare render object
  const renderApp = (
    <div className="App">
      <h1>click and hold to add an element</h1>
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
      for (let i = 0; i <= elements.length - 2; i++) {
        let A = elements[i];
        let B = elements[i + 1];
        //adapted forumala of gravity force from gravity law
        //f = k * sizeA * sizeB / distanceAB^2
        //kg and meters

        //analyze elements and find variables
        let k = 6.6743 * Math.pow(10, -11); //gravitational constant in kg/m (6.6743 × 10-11)
        let d; //distanceAB m
        let x_delta = B.x - A.x;
        let y_delta = B.y - A.y; //distance between coords in pixels
        d = x_delta * x_delta + y_delta * y_delta; //throug Pifagors theoreme, px

        //coefficients for convert pixels to ci
        //from neptune to sun 4.488*10^12 lets take this size for canvas size and normalize
        //600px = 4.488*10^12 => 600*x = 4.488*10^12 => x = 4.488*10^12/6; n_d = x
        let n_d = (4.488 * Math.pow(10, 12)) / 6; //each pixel have meters
        //mass of the sun 1.989 × 10^30 kg and it is 99.86%  of solar system mass mass
        //lets take 400px equal to sun
        //400px = 1.989×10^30 => 400*x = 1.989×10^30 => x = 1.989×10^30/400; n_m = x
        let n_m = (1.989 * Math.pow(10, 30)) / 400; //each pixel have kilograms

        //calc force
        let f = ((k * (A.size * n_m) * (B.size * n_m)) / (d * n_d)) * (d * n_d);
        //x_delta more than y_delta - in *c
        //normalize force(for more intuitive vizualization)
        f >= Math.pow(10, 50) ? (f /= Math.pow(10, 50)) : (f = f);
        f >= Math.pow(10, 49) ? (f /= Math.pow(10, 49)) : (f = f);
        f >= Math.pow(10, 48) ? (f /= Math.pow(10, 48)) : (f = f);
        f >= Math.pow(10, 47) ? (f /= Math.pow(10, 47)) : (f = f);
        f >= Math.pow(10, 46) ? (f /= Math.pow(10, 46)) : (f = f);
        f >= Math.pow(10, 45) ? (f /= Math.pow(10, 45)) : (f = f);
        //little bit a magic numbers but logic in many cases it is ~n*10^47 numbers
        //just trying to reduce this 10 based endings for popular cases

        let c = Math.abs(x_delta / y_delta); //realtion of horizontal vector and vertical vector
        //apply force
        console.log("deltas", x_delta, y_delta, f);
        x_delta >= 0 ? (B.x -= f * c) : (B.x += f * c);
        y_delta >= 0 ? (B.y -= f) : (B.y += f);
      }
    },
    redraw: function () {
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
          console.log(elements);
        }
      }, 1000);
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
        }, 100);
      }
    });
  }
  function mouseUpCanvas(e) {
    //delete interval
    elements.map((el) => {
      if (el.id == active) {
        clearInterval(el.timer);
      }
    });
    //clear temp id
    active = 0;
    console.log("mouseUpCanvas", elements);
  }
  //
  function onClickButton(e) {
    console.log("onClickButton", elements);
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
