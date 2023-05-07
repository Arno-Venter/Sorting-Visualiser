export default class Bar {
  constructor(value) {
    this.value = value;
  }

  buildBar(parent) {
    const bar = document.createElement("div");
    bar.style.width = "10px";
    bar.style.height = this.value * 100 + "%";
    bar.style.backgroundColor = "red";
    parent.appendChild(bar);
  }
}
