import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { sharedStyles } from "../styles/sharedStyles";
import { map } from "lit/directives/map.js";
import "../components/category-panel";
import { CategoryPanelData } from "../interfaces";

@customElement("category-selection")
export class CategorySelection extends LitElement {
  @property() categoryList: CategoryPanelData[] = [];
  protected render(): unknown {
    return html`
      <div class="category-selection-step">
        <div class="category-selection-step-header">
          <h3 class="category-selection-title text-center w-100">
            Select Category
          </h3>
          <h6 class="category-selection-description w-100 text-center">
            Click to see available integration options
          </h6>
        </div>
        <div class="category-panel-list">
          ${map(
            this.categoryList,
            (item, idx) => html`
              <category-panel
                @click=${this._setSelectedCategory(item.title)}
                categoryData=${item}
                key=${idx}
              ></category-panel>
            `
          )}
        </div>
      </div>
    `;
  }
  private _setSelectedCategory(titleStr: string) {
    const newCustomEvent = new CustomEvent("selectCategory", {
      bubbles: true,
      detail: {
        categoryTitle: titleStr,
      },
    });
    this.dispatchEvent(newCustomEvent);
  }

  static styles = [
    sharedStyles,
    css`
      category-selection-step-header {
        padding: 1rem 0;
      }
      .category-selection-title {
        font-size: 2.5rem;
        padding: 1rem 0;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "category-selection": CategorySelection;
  }
}
