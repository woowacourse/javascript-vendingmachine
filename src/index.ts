import "./css/index.css";
import Vendingmachine from "./ts/components/Vendingmachine";

function startVendingmachine() {
  new Vendingmachine();
}

document.addEventListener("DOMContentLoaded", startVendingmachine);
