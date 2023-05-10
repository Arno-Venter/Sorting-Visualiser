import Bar from "./bar.js";

let SIZE = 50;

//window.onload = setup;

let container = document.getElementById("barContainer");
let startBtn = document.getElementById("sortBtn");
let bars = [];
let data = [];

function setup() {
  for (let i = 0; i < SIZE; i++) data[i] = Math.random();

  buildBars(0);
}

function buildBars(current) {
  container.replaceChildren();

  bars = [];

  for (let i = 0; i < SIZE; i++) {
    const bar = new Bar(data[i]);
    bar.buildBar(container);
    bars.push(bar);
  }

  const currentBar = container.children[current];
  currentBar.style.backgroundColor = "green";
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
      buildBars(result.value);
      //const next = el.nextElementSibling;
      //el.parentElement.insertBefore(next, el);
      window.requestAnimationFrame(tick);
    } else {
      for (let i = 0; i < SIZE; i++) {
        bars[i].barDiv.style.backgroundColor = "green";
      }
    }
  }
}

function merge(arr, l1, r1, l2, r2) {
  let temp = [];
  let index = 0;
  while (l1 <= r1 && l2 <= r2) {
    if (arr[l1] <= arr[l2]) {
      temp[index] = arr[l1];
      index++;
      l1++;
    } else {
      temp[index] = arr[l2];
      index++;
      l2++;
    }
  }

  while (l1 <= r1) {
    temp[index] = arr[l1];
    index++;
    l1++;
  }

  while (l2 <= r2) {
    temp[index] = arr[l2];
    index++;
    l2++;
  }

  return temp;
}

function* mergeSortGen(n) {
  let len = 1;
  while (len < n) {
    let i = 0;
    while (i < n) {
      let l1 = i;
      let r1 = i + len - 1;
      let l2 = i + len;
      let r2 = i + 2 * len - 1;
      if (l2 >= n) {
        break;
      }
      if (r2 >= n) {
        r2 = n - 1;
      }
      let temp = merge(data, l1, r1, l2, r2);
      for (let j = 0; j < r2 - l1 + 1; j++) {
        data[i + j] = temp[j];
        yield i + j;
      }
      i = i + 2 * len;
    }
    len = len * 2;
  }
}

function mergeSort() {
  const gen = mergeSortGen(SIZE);
  tick();

  function tick() {
    const result = gen.next();
    if (!result.done) {
      buildBars(result.value);

      window.requestAnimationFrame(tick);
    } else
      for (let i = 0; i < SIZE; i++) {
        bars[i].barDiv.style.backgroundColor = "green";
      }
  }
}

setup();

let slider = document.getElementById("rangeSlider");
slider.addEventListener("input", () => {
  SIZE = slider.value;
  setup();
});

let select = document.getElementById("sortMethod");

select.addEventListener("change", () => {
  setup();
});

startBtn.addEventListener("click", () => {
  let sort = select.value;
  switch (sort) {
    case "bubble":
      bubbleSort();
      break;
    case "merge":
      mergeSort();
      break;
  }
});
