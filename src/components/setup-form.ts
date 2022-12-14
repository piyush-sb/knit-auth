import { LitElement, html, css, PropertyValueMap } from "lit";
import { customElement, property } from "lit/decorators.js";
import { setupDetailItem } from "../interfaces";
import { map } from "lit/directives/map.js";
import { choose } from "lit-html/directives/choose.js";
import { sharedStyles } from "../styles/sharedStyles";

@customElement("setup-form")
export class SetupForm extends LitElement {
  @property() setupDetails: setupDetailItem[] = [];
  @property() formData: Record<string, string> = {};
  @property({ type: String }) appId = "";

  //   connectedCallback(): void {
  //     let formId: string = "#knit_form_" + this.appId;
  //   }

  static styles = [
    sharedStyles,
    css`
      .knit-form-ele {
        padding: 1rem 0.5rem;
      }

      .knit-form-ele label,
      knit-form-ele input {
        width: 100%;
      }
      .knit-form-ele label {
        font-size: 1.1rem;
      }
      .knit-form-ele input {
        font-size: 1.2rem;
      }
    `,
  ];
  render() {
    return html`
      <div class="setup-form-wrapper">
        <form
          @submit=${(e: any) => {
            e.preventDefault();
            console.log("form", e?.target);
            let myform = e.target;
            let formObj: Record<string, any> = {};
            this.setupDetails.forEach((item) => {
              formObj[item.label] = myform[item.label].value;
            });
            let formData = new FormData(e?.target);
            console.log("data", formData, formData.entries());
          }}
          id="knit_form_${this.appId}"
        >
          ${map(this.setupDetails, (item) =>
            choose(item.uiElementType, [
              [
                "TEXTBOX",
                () => html`
                  <div class="knit-form-ele">
                    <label class="text-left d-block" for=${item.label}
                      >${item.label}</label
                    >
                    <input
                      class="d-block"
                      id="${item.label}"
                      name="${item.label}"
                      required=${!!item.isRequired}
                      type=${item.isProtected ? "password" : "text"}
                      placeholder="Enter ${item.label}"
                      autocomplete="off"
                    />
                  </div>
                `,
              ],
            ])
          )}
          <button type="submit">Submit</button>
        </form>
      </div>
    `;
  }
}
