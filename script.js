import Bar from "./bar.js";

const SIZE = 60;
const DELAY = 1;

//window.onload = setup;

let container = document.getElementById("barContainer");
let startBtn = document.getElementById("sortBtn");
let bars = [];
let data = [];

async function sleep(millis) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), millis);
  });
}

function setup() {
  for (let i = 0; i < SIZE; i++) data[i] = Math.random();
  buildBars();
}

function buildBars() {
  if (bars.length !== 0) {
    for (let i = 0; i < SIZE; i++) {
      bars[i].barDiv.remove();
    }
  }

  bars = [];

  for (let i = 0; i < SIZE; i++) {
    const bar = new Bar(data[i]);
    bar.buildBar(container);
    bars.push(bar);
  }
}

function* bubbleSortGen() {
  for (let i = 0; i < data.length; i++)
    for (let j = 0; j < data.length - 1; j++) {
      if (data[j] > data[j + 1]) {
        let temp = data[j];
        data[j] = data[j + 1];
        data[j + 1] = temp;
        yield j;
      }
    }
}

function bubbleSort() {
  const gen = bubbleSortGen();
  tick();

  function tick() {
    const result = gen.next();
    if (!result.done) {
      const el = container.children[result.value];
      const next = el.nextElementSibling;
      el.parentElement.insertBefore(next, el);
      window.requestAnimationFrame(tick);
    }
  }
}

setup();

startBtn.addEventListener("click", () => {
  bubbleSort();
});
