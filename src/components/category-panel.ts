import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { sharedStyles } from "../styles/sharedStyles";
import { map } from "lit/directives/map.js";

interface IntegrationSummary {
  title: string;
  description: string;
  smallLogo: string; // image Url string
  logo: string; // full size image url string
}

interface CategoryPanelData {
  title: string;
  description: string;
  integrationList: IntegrationSummary[];
}

@customElement("category-panel")
export class CategoryPanel extends LitElement {
  @property({ reflect: true }) categoryData?: CategoryPanelData;
  render() {
    return html` <div class="category-panel-wrapper">
            <h4 class="category-panel-title">${
              this.categoryData?.title || "Category Title"
            }</h4>
            < div class="divider-h"></div>
            <div class="integrations-logos d-flex">
            
            ${map(
              this.categoryData?.integrationList,
              (item, idx) => html`
                <div class="integration-logo" key=${idx}>
                  ${item?.smallLogo
                    ? html`<img
                        src=${item.smallLogo}
                        alt=${item.title || "Integrayion Lgo"}
                      />`
                    : null}
                  <div></div>
                </div>
              `
            )}</div>
    
    </div> `;
  }
  static styles = [
    sharedStyles,
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
