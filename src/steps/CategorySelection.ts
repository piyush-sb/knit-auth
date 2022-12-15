import { LitElement, html, css , PropertyValueMap} from "lit";
import { customElement, property } from "lit/decorators.js";
// import { sharedStyles } from "../styles/sharedStyles";
import { map } from "lit/directives/map.js";
import "../components/category-panel";
import { CategoryPanelsObject } from "../interfaces";
@customElement("category-selection")
export class CategorySelection extends LitElement {
  @property() categoryList: CategoryPanelsObject = {};
  protected render(): unknown {
    console.log("catetgoryList", this.categoryList);
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
            Object.keys(this.categoryList),
            (item) => html`
              <category-panel
                @onCategorySelect=${this._setSelectedCategory}
                .categoryData=${this.categoryList[item]}
                .categoryKey=${item}
                .key=${item}
              ></category-panel>
            `
          )}
        </div>
      </div>
    `;
  }

  protected createRenderRoot(): Element | ShadowRoot {
    return this;
  }

  protected updated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    console.log("updated called in catgory selctiom", _changedProperties);
    if (_changedProperties.has("categoryList")) {
      console.log("appsData  state", this.categoryList);
    }
  }
  private _setSelectedCategory(e?: CustomEvent) {
    e?.preventDefault();
    const newCustomEvent = new CustomEvent("selectCategory", {
      bubbles: true,
      detail: {
        categoryTitle: e?.detail.categoryKey,
      },
    });
    this.dispatchEvent(newCustomEvent);
  }

  static styles = [
    // sharedStyles,
    // css`
    //   category-selection-step-header {
    //     padding: 1rem 0;
    //   }
    //   .category-selection-title {
    //     font-size: 2.5rem;
    //     padding: 1rem 0;
    //   }
    // `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "category-selection": CategorySelection;
  }
}
