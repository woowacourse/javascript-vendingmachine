import { addEvent, selectDom } from "../../utils/dom";
import { ConvertTemplate } from "../../utils/interface";
import { validateNameInfo, validatePasswordConfirmInfo, validatePasswordInfo } from "../../utils/validation";
import { showSnackbar } from "../snackbar/snackbar";
import { editMemberInfoTemplate } from "./editMemberInfoTemplate";

class  EditMember {
  vendingmachineFunctionWrap: HTMLElement;
  nameInfoInput: HTMLElement;
  passwordInfoInput: HTMLElement;
  passwordConfirmInfoInput: HTMLElement;
  nameInfoMessage: HTMLElement;
  passwordInfoMessage: HTMLElement;
  passwordConfirmInfoMessage: HTMLElement;

  constructor(readonly convertTemplate: ConvertTemplate) {
    this.convertTemplate = convertTemplate;
    this.vendingmachineFunctionWrap = selectDom(".main");
  }

  bindEditDom = () => {
    const signupForm = selectDom(".member-info-form");

    this.nameInfoInput = selectDom("#name-info-input");
    this.passwordInfoInput = selectDom("#password-info-input");
    this.passwordConfirmInfoInput = selectDom("#password-confirm-info-input");

    this.nameInfoMessage = selectDom("#name-info-message");
    this.passwordInfoMessage = selectDom("#password-info-message");
    this.passwordConfirmInfoMessage = selectDom("#password-confirm-info-message");

    addEvent(signupForm, "submit", this.handleSubmitEditMember);
    addEvent(this.nameInfoInput, "keydown", this.handleNameInputKeyEvent);
    addEvent(this.nameInfoInput, "focusout", this.handleNameInputMouseEvent);
    addEvent(this.passwordInfoInput, "keydown", this.handlePasswordInputKeyEvent);
    addEvent(this.passwordInfoInput, "focusout", this.handlePasswordInputMouseEvent);
    addEvent(this.passwordConfirmInfoInput, "keydown", this.handlePasswordConfirmInputKeyEvent);
    addEvent(this.passwordConfirmInfoInput, "focusout", this.handlePasswordConfirmInputMouseEvent);
  }

  handleSubmitEditMember = async (event: Event) => {
    event.preventDefault();
    
    const nameInputValue = (this.nameInfoInput as HTMLInputElement).value;
    const passwordInputValue = (this.passwordInfoInput as HTMLInputElement).value;
    const passwordConfirmInputValue = (this.passwordConfirmInfoInput as HTMLInputElement).value;
  
    if (
      !validateNameInfo(nameInputValue, this.nameInfoMessage) ||
      !validatePasswordInfo(passwordInputValue, this.passwordInfoMessage) ||
      !validatePasswordConfirmInfo(passwordConfirmInputValue, passwordInputValue, this.passwordConfirmInfoMessage)
    ) {
      return;
    }

    try {
      const response = await fetch(`https://vendingdb.herokuapp.com/users/${this.getUserId()}`, {
        method: "PATCH",
        body: JSON.stringify({
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
    
      const data = await response.json();
      localStorage.setItem("USER_NAME", JSON.stringify(data.name));
  
      history.pushState({ path: "#product" }, null, "#product");
      this.convertTemplate("#product");
      showSnackbar("수정을 완료하였습니다.");
    } catch ({ message }) {
      showSnackbar(message);
      return;
    }
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

    if (validatePasswordConfirmInfo(passwordConfirmInputValue, passwordInputValue, this.passwordConfirmInfoMessage) === false) {
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

    if (!validatePasswordInfo(passwordInputValue, this.passwordInfoMessage)) {
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

    if (!validateNameInfo(nameInputValue, this.nameInfoMessage)) {
      return;
    }

    this.nameInfoMessage.textContent = "멋진 이름이네요!";
    this.nameInfoMessage.classList.remove("member-info-error-text");
    this.nameInfoMessage.classList.add("member-info-correct-text");
  }

  render = async () => {
    try {
      const response = await fetch(`https://vendingdb.herokuapp.com/users/${this.getUserId()}`, {
        method: "GET",
      });
      
      if (Math.floor(response.status/100) !== 2) {
        throw Error("시스템에러 발생하였습니다. 잠시후 다시 시도해주세요.");
      }
      
      const { email, name } = await response.json();
      this.vendingmachineFunctionWrap.replaceChildren();
      this.vendingmachineFunctionWrap.insertAdjacentHTML("beforeend", editMemberInfoTemplate(email, name));
    } catch ({ message }) {
      showSnackbar(message);
      return;
    }

    this.bindEditDom();
  }

  getUserId() {
    return JSON.parse(localStorage.getItem("USER_ID")) || 0;
  }
}

export default EditMember;
