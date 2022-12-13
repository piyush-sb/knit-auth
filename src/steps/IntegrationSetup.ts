import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { IntegrationData } from "../interfaces";
// import { sharedStyles } from "../styles/sharedStyles";
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
        </div>
      </div>
    `;
  }

  protected createRenderRoot(): Element | ShadowRoot {
    return this;
  }

  //   protected _onQueryChange(e: InputEvent): void {

  //     console.log("query changed called");
  //     if ((e.target as HTMLInputElement).value?.length > 0)
  //       this.filteredList = this.integrationsList.filter((item) =>
  //         item.label
  //           .toLowerCase()
  //           .includes((e.target as HTMLInputElement).value.toLowerCase())
  //       );
  //     else {
  //       this.filteredList = this.integrationsList;
  //     }
  //   }
  //   private _onIntegrationSelect(appId: string) {
  //     const newCustomEvent = new CustomEvent("onIntegrationSelect", {
  //       bubbles: true,
  //       detail: {
  //         appId: appId,
  //       },
  //     });
  //     this.dispatchEvent(newCustomEvent);
  //   }
  //   protected updated(
  //     _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  //   ): void {
  //     if (_changedProperties.has("integrationsList")) {
  //       this.filteredList = this.integrationsList;
  //     }
  //     if (_changedProperties.has("filteredList")) {
  //       console.log;
  //     }
  //   }
  static styles = [
    // sharedStyles,
    css`
      integration-setup-step-header {
        padding: 1rem 0;
      }
      .integration-setup-title {
        font-size: 2.5rem;
        padding: 1rem 0;
      }

      .integration-setup-search {
        margin: 2 rem;
      }
      .integrations-wrapper {
        flex-wrap: wrap;
        padding: 1rem;
      }
      .integration-box {
        margin: 1rem;
        padding: 1rem;
        border: 1px solid lightgrey;
        border-radius: 5px;
      }
      .integration-box h5 {
        margin: 0;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "integration-setup": IntegrationSetup;
  }
}
