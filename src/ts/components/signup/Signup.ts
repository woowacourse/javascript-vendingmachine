import axios from "axios";
import { addEvent, selectDom, selectDomAll } from "../../utils/dom";
import { ConvertTemplate, RegisterUserProps } from "../../utils/interface";
import { validateEmailInfo, validateNameInfo, validatePasswordConfirmInfo, validatePasswordInfo } from "../../utils/validation";
import { showSnackbar } from "../snackbar/snackbar";
import { signupTemplate } from "./signupTemplate";

class Signup {
  vendingmachineFunctionWrap: HTMLElement;
  signupInputList: HTMLElement[]
  emailInfoInput: HTMLElement;
  nameInfoInput: HTMLElement;
  passwordInfoInput: HTMLElement;
  passwordConfirmInfoInput: HTMLElement;
  emailInfoMessage: HTMLElement;
  nameInfoMessage: HTMLElement;
  passwordInfoMessage: HTMLElement;
  passwordConfirmInfoMessage: HTMLElement;

  constructor(readonly convertTemplate: ConvertTemplate) {
    this.convertTemplate = convertTemplate;
    this.vendingmachineFunctionWrap = selectDom(".main");
  }

  bindSignupDom = () => {
    const signupForm = selectDom(".member-info-form");
  
    this.signupInputList = selectDomAll(".member-info-input");
    this.emailInfoInput = selectDom("#email-info-input");
    this.nameInfoInput = selectDom("#name-info-input");
    this.passwordInfoInput = selectDom("#password-info-input");
    this.passwordConfirmInfoInput = selectDom("#password-confirm-info-input");
    
    this.emailInfoMessage = selectDom("#email-info-message");
    this.nameInfoMessage = selectDom("#name-info-message");
    this.passwordInfoMessage = selectDom("#password-info-message");
    this.passwordConfirmInfoMessage = selectDom("#password-confirm-info-message");

    addEvent(signupForm, "submit", this.handleSubmitSignup);
    addEvent(this.emailInfoInput, "keydown", this.handleEmailInputKeyEvent);
    addEvent(this.emailInfoInput, "focusout", this.handleEmailInputMouseEvent);
    addEvent(this.nameInfoInput, "keydown", this.handleNameInputKeyEvent);
    addEvent(this.nameInfoInput, "focusout", this.handleNameInputMouseEvent);
    addEvent(this.passwordInfoInput, "keydown", this.handlePasswordInputKeyEvent);
    addEvent(this.passwordInfoInput, "focusout", this.handlePasswordInputMouseEvent);
    addEvent(this.passwordConfirmInfoInput, "keydown", this.handlePasswordConfirmInputKeyEvent);
    addEvent(this.passwordConfirmInfoInput, "focusout", this.handlePasswordConfirmInputMouseEvent);
  }

  handlePasswordConfirmInputKeyEvent = () => {
    const passwordConfirmInputValue = (this.passwordConfirmInfoInput as HTMLInputElement).value;

    if (passwordConfirmInputValue) {
      this.passwordConfirmInfoMessage.textContent = "";
    }
  }

  handlePasswordConfirmInputMouseEvent = () => {
    const passwordConfirmInputValue = (this.passwordConfirmInfoInput as HTMLInputElement).value;
    const passwordInputValue = (this.passwordInfoInput as HTMLInputElement).value;

    this.passwordConfirmInfoMessage.classList.add("member-info-error-text");
    this.passwordConfirmInfoMessage.classList.remove("member-info-correct-text");

    if (validatePasswordConfirmInfo({ passwordConfirmInputValue: passwordConfirmInputValue, passwordInputValue: passwordInputValue, passwordConfirmInfoMessage: this.passwordConfirmInfoMessage }) === false) {
      return;
    }

    this.passwordConfirmInfoMessage.textContent = "비밀번호가 일치합니다!";
    this.passwordConfirmInfoMessage.classList.remove("member-info-error-text");
    this.passwordConfirmInfoMessage.classList.add("member-info-correct-text");
  }

  handlePasswordInputKeyEvent = () => {
    const passwordInputValue = (this.passwordInfoInput as HTMLInputElement).value;

    if (passwordInputValue) {
      this.passwordInfoMessage.textContent = "";
    }
  }

  handlePasswordInputMouseEvent = () => {
    const passwordInputValue = (this.passwordInfoInput as HTMLInputElement).value;

    this.passwordInfoMessage.classList.add("member-info-error-text");
    this.passwordInfoMessage.classList.remove("member-info-correct-text");

    if (!validatePasswordInfo({ passwordInputValue: passwordInputValue, passwordInfoMessage: this.passwordInfoMessage})) {
      return;
    }
    if (passwordInputValue.length >= 8) {
      this.passwordInfoMessage.textContent = "안전한 비밀번호네요!";
    }
    if (passwordInputValue.length >= 12) {
      this.passwordInfoMessage.textContent = "매우 안전한 비밀번호네요!";
    }

    this.passwordInfoMessage.classList.remove("member-info-error-text");
    this.passwordInfoMessage.classList.add("member-info-correct-text");
  }

  handleNameInputKeyEvent = () => {
    const nameInputValue = (this.nameInfoInput as HTMLInputElement).value;

    if (nameInputValue) {
      this.nameInfoMessage.textContent = "";
    }
  }

  handleNameInputMouseEvent = () => {
    const nameInputValue = (this.nameInfoInput as HTMLInputElement).value;
  
    this.nameInfoMessage.classList.add("member-info-error-text");
    this.nameInfoMessage.classList.remove("member-info-correct-text");

    if (!validateNameInfo({ nameInputValue: nameInputValue, nameInfoMessage: this.nameInfoMessage})) {
      return;
    }

    this.nameInfoMessage.textContent = "멋진 이름이네요!";
    this.nameInfoMessage.classList.remove("member-info-error-text");
    this.nameInfoMessage.classList.add("member-info-correct-text");
  }

  handleEmailInputKeyEvent = () => {
    const emailInputValue = (this.emailInfoInput as HTMLInputElement).value;

    if (emailInputValue) {
      this.emailInfoMessage.textContent = ""
    }
  }

  handleEmailInputMouseEvent = () => {
    const emailInputValue = (this.emailInfoInput as HTMLInputElement).value;

    this.emailInfoMessage.classList.add("member-info-error-text");
    this.emailInfoMessage.classList.remove("member-info-correct-text");
  
    if (!validateEmailInfo(emailInputValue, this.emailInfoMessage)) {
      return;
    }

    this.emailInfoMessage.textContent = "멋진 이메일이네요!";
    this.emailInfoMessage.classList.remove("member-info-error-text");
    this.emailInfoMessage.classList.add("member-info-correct-text");
  }

  handleSubmitSignup = async (event: Event) => {
    event.preventDefault();
    const emailInputValueResult =  (this.emailInfoInput as HTMLInputElement).value;
    const nameInputValue = (this.nameInfoInput as HTMLInputElement).value;
    const passwordInputValue = (this.passwordInfoInput as HTMLInputElement).value;
    const passwordConfirmInputValue = (this.passwordConfirmInfoInput as HTMLInputElement).value;
  
    if (
      !validateEmailInfo(emailInputValueResult, this.emailInfoMessage) ||
      !validateNameInfo({ nameInputValue: nameInputValue, nameInfoMessage: this.nameInfoMessage}) ||
      !validatePasswordInfo({ passwordInputValue: passwordInputValue, passwordInfoMessage: this.passwordInfoMessage}) ||
      !validatePasswordConfirmInfo({ passwordConfirmInputValue: passwordConfirmInputValue, passwordInputValue: passwordInputValue, passwordConfirmInfoMessage: this.passwordConfirmInfoMessage })
    ) {
      return;
    }

    try {
      const response = await fetch("https://vendingdb.herokuapp.com/register", {
        method: "POST",
        body: JSON.stringify({
          email: emailInputValueResult,
          name: nameInputValue,
          password: passwordInputValue,
        }),
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (Math.floor(response.status/100) !== 2) {
        throw Error("시스템에러 발생하였습니다. 잠시후 다시 시도해주세요.");
      }

      history.pushState({ path: "#login" }, null, "#login");
      this.convertTemplate("#login");
      showSnackbar("회원가입을 완료하였습니다.");
    } catch ({ message }) {
      showSnackbar(message);
      return;
    }
  }

  render() {
    this.vendingmachineFunctionWrap.replaceChildren();
    this.vendingmachineFunctionWrap.insertAdjacentHTML("beforeend", signupTemplate);
    this.bindSignupDom();
  }
}

export default Signup;
