import { $ } from '../utils';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    .toast {
    visibility: hidden;
    min-width: 250px;
    margin: 0;
    color: #fff;
    text-align: center;
    padding: 16px;
    position: fixed;
    z-index: 1;
    left: 50%;
    transform: translateX(-50%);
    bottom: 30px;
    font-size: 17px;
    border-radius: 5px;
    }

    .toast--visible {
      visibility: visible;
      -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
      animation: fadein 0.5s, fadeout 0.5s 2.5s;
    }

    .success {
      background-color: #61d688;
    }

    .error {
      background-color: #f08383;
    }

    @-webkit-keyframes fadein {
      from {
        bottom: 0;
        opacity: 0;
      }
      to {
        bottom: 30px;
        opacity: 1;
      }
    }

    @keyframes fadein {
      from {
        bottom: 0;
        opacity: 0;
      }
      to {
        bottom: 30px;
        opacity: 1;
      }
    }

    @-webkit-keyframes fadeout {
      from {
        bottom: 30px;
        opacity: 1;
      }
      to {
        bottom: 0;
        opacity: 0;
      }
    }

    @keyframes fadeout {
      from {
        bottom: 30px;
        opacity: 1;
      }
      to {
        bottom: 0;
        opacity: 0;
      }
    }
  </style>
  <div class="toast toast--visible">
  </div>
`;

export default class ToastNotification extends HTMLElement {
  static get observedAttributes() {
    return ['state', 'message'];
  }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (!oldValue) {
      return;
    }
    const toastDiv = this.shadowRoot.querySelector('div');
    toastDiv.classList.add('toast--visible');
    if (name === 'state') {
      toastDiv.classList.add(newValue);
      if (newValue !== oldValue) {
        toastDiv.classList.remove(oldValue);
      }
    }
    if (name === 'message') {
      toastDiv.textContent = newValue;
      hideToast(toastDiv);
    }
  }
}

customElements.define('toast-modal', ToastNotification);

let hideTimeout = null;

function hideToast(toastDiv: HTMLDivElement) {
  clearTimeout(hideTimeout);

  hideTimeout = setTimeout(() => {
    toastDiv.classList.remove('toast--visible');
  }, 2000);
}

const $toastModal = $('toast-modal');

export const renderToastModal = (state: string, message: string) => {
  $toastModal.setAttribute('state', state);
  $toastModal.setAttribute('message', message);
};
