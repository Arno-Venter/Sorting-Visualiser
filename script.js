import Bar from "./bar.js";

const SIZE = 100;

window.onload = setup;

let container = document.getElementById("barContainer");
let bars = [];

function setup() {
  let data = [];
  for (let i = 0; i < 100; i++) {
    data[i] = Math.random();
    const bar = new Bar(data[i]);
    bar.buildBar(container);
    bars.push(bar);
  }
}
