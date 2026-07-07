import NavBar from "./components/nav-bar.js";
import LeftContainer from "./components/left-container.js";

const navMount = document.querySelector("#navbar");
if (navMount) {
  navMount.innerHTML = NavBar();
}

const leftMount = document.querySelector('#container__left');
if (leftMount) {
  leftMount.innerHTML = LeftContainer();
}


const btn = document.querySelector("#navbar__menu-button");
const menu = document.querySelector("#navbar__menu");

if (btn && menu) {
  btn.addEventListener("click", () => {
    menu.classList.toggle("show");
  });
}
