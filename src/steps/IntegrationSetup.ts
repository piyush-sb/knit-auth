import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { IntegrationData } from "../interfaces";
// import { sharedStyles } from "../styles/sharedStyles";
import "../components/setup-form";
import { choose } from "lit-html/directives/choose.js";
@customElement("integration-setup")
export class IntegrationSetup extends LitElement {
  @property() appData: IntegrationData = {
    category: ["HRIS"],
    appId: "knit",
    label: "Knit",
    logo: "",
    authType: "",
  };

  protected render(): unknown {
    return html`
      <div class="integration-setup-step">
        <div class="integration-setup-step-header">
          <h4 class="integration-setup-title text-center w-100">
            ${this.appData?.label}
          </h4>
          <div class="integration-setup-logo">
            <img src=${this.appData.logo} alt=${this.appData.label} />
          </div>
          ${choose(this.appData.authType, [
            [
              "FORM",
              () =>
                html`<setup-form
                  .setupDetails=${this.appData.setupDetails}
                  .appId=${this.appData.appId}
                ></setup-form>`,
            ],
          ])}
        </div>
      </div>
    `;
  }

  protected createRenderRoot(): Element | ShadowRoot {
    return this;
  }

  static styles = [
    // sharedStyles,
    // css`
    //   integration-setup-step-header {
    //     padding: 1rem 0;
    //   }
    //   .integration-setup-title {
    //     font-size: 2rem;
    //     padding: 0.5rem 0;
    //   }
    //   .integration-setup-logo img {
    //     width: 80px;
    //   }
    //   .integration-setup-search {
    //     margin: 2 rem;
    //   }
    //   .integrations-wrapper {
    //     flex-wrap: wrap;
    //     padding: 1rem;
    //   }
    //   .integration-box {
    //     margin: 1rem;
    //     padding: 1rem;
    //     border: 1px solid lightgrey;
    //     border-radius: 5px;
    //   }
    //   .integration-box h5 {
    //     margin: 0;
    //   }
    // `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "integration-setup": IntegrationSetup;
  }
}
