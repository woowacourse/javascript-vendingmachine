import "./css/index.css";
import App from "./ts/components/App";

function startVendingmachine() {
  new App();
}

document.addEventListener("DOMContentLoaded", startVendingmachine);
