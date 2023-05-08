export default class Bar {
  constructor(value) {
    this.value = value;
    this.barDiv = document.createElement("div");
  }

  buildBar(parent) {
    this.barDiv.style.width = "10px";
    this.barDiv.style.height = this.value * 100 + "%";
    this.barDiv.style.backgroundColor =
      "rgb(189, 190, 226)";
    parent.appendChild(this.barDiv);
  }
}
