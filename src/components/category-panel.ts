import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
// import { sharedStyles } from "../styles/sharedStyles";
import { map } from "lit/directives/map.js";
import { IntegrationData } from "../interfaces";
import { CATEGORY_MAP } from "../utils/constants";

// interface IntegrationSummary {
//   title: string;
//   description: string;
//   smallLogo: string; // image Url string
//   logo: string; // full size image url string
// }

// interface CategoryPanelData {
//   title: string;
//   description: string;
//   integrationList: IntegrationSummary[];
// }

@customElement("category-panel")
export class CategoryPanel extends LitElement {
  @property({ reflect: true }) categoryData?: IntegrationData[];
  @property({ type: String }) categoryKey = "";
  render() {
    return html`
      <div class="category-panel-wrapper cursor-pointer" @click=${this._onCategorySelect}>
        <h4 class="category-panel-title">
          ${this.categoryKey.length
            ? CATEGORY_MAP[this.categoryKey]
            : "Category Title"}
        </h4>
        <div class="divider-h"></div>
        <div class="integrations-logos d-flex">
          ${map(
            this.categoryData,
            (item) => html`
              <div class="integration-logo" key=${item.appId}>
                ${item?.logo
                  ? html`<img
                      src=${item.logo}
                      alt=${item.label || "Integrayion Logo"}
                    />`
                  : null}
                <div></div>
              </div>
            `
          )}
        </div>
      </div>
    `;
  }
  private _onCategorySelect(): void {
    console.log('category sle called in panel')
    const newCustomEvent = new CustomEvent("onCategorySelect", {
      bubbles: true,
      detail: {
        categoryKey: this.categoryKey,
      },
    });
    this.dispatchEvent(newCustomEvent);
  }
  protected createRenderRoot(): Element | ShadowRoot {
    return this;
  }
  static styles = [
    // sharedStyles,
    css`
      .category-panel-wrapper {
        border: 1px solid lightgrey;
        border-radius: 5px;
        width: 100%;

      }

      .integrations-logos {
        padding: 0.5rem 0.3rem;
      }
      .integration-logo {
        border: 1px solid lightgrey;
        border-raidus: 5px;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "category-panel": CategoryPanel;
  }
}
