import "../components/changes-input";
import "../components/changes-table";

class ChangesManage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <changes-input></changes-input>
      <changes-table></changes-table>
    `;
  }
}

customElements.define("changes-manage", ChangesManage);
