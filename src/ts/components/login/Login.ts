import { addEvent, selectDom, selectDomAll } from "../../utils/dom";
import { ConvertTemplate } from "../../utils/interface";
import { showSnackbar } from "../snackbar/snackbar";
import { loginTemplate } from "./loginTemplate";

class Login {
  vendingmachineFunctionWrap: HTMLElement;

  constructor(readonly convertTemplate: ConvertTemplate) {
    this.convertTemplate = convertTemplate;
    this.vendingmachineFunctionWrap = selectDom(".main");
  }

  bindLoginDom() {
    const signupText = selectDom(".signup-text");
    const loginForm = selectDom("#login-form");

    addEvent(signupText, "click", this.handleSignupText);
    addEvent(loginForm, "submit", this.handleLoginForm);
  }

  handleLoginForm = async (event: Event) => {
    event.preventDefault();
    const [emailInput, passwordInput] = selectDomAll(".member-info-input");
    const emailInputValue = (emailInput as HTMLInputElement).value;
    const passwordValue = (passwordInput as HTMLInputElement).value;

    try {
      const response = await fetch("https://vendingdb.herokuapp.com/login", {
        method: "POST",
        body: JSON.stringify({
          email: emailInputValue,
          password: passwordValue,
        }),
        headers: {
          "Content-Type": "application/json",
        }
      });
      
      if (Math.floor(response.status/100) !== 2) {
        throw Error("가입된 계정이 없습니다.");
      }
      
      const { accessToken, user } = await response.json();
  
      localStorage.setItem("ACCESS_TOKEN", JSON.stringify(accessToken));
      localStorage.setItem("USER_ID", JSON.stringify(user.id));
      localStorage.setItem("USER_NAME", JSON.stringify(user.name));

      history.pushState({ path: "#product" }, null, "#product");
      this.convertTemplate("#product");
    } catch ({ message }) {
      showSnackbar(message);
      return;
    }
  }

  handleSignupText = () => {
    history.pushState({ path: "#signup" }, null, "#signup");
    this.convertTemplate("#signup");
  };

  render() {
    this.vendingmachineFunctionWrap.replaceChildren();
    this.vendingmachineFunctionWrap.insertAdjacentHTML("beforeend", loginTemplate);
    this.bindLoginDom();
  }
}

export default Login;
