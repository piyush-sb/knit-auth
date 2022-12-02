import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { sharedStyles } from "../styles/sharedStyles";

@customElement("integration-selection")
export class IntegrationSelection extends LitElement {
  protected render(): unknown {
    return html` <div class="integration-selection-step"></div> `;
  }

  static styles = [sharedStyles, css``];
}

declare global {
  interface HTMLElementTagNameMap {
    "integration-selection": IntegrationSelection;
  }
}
