import { LitElement, html, css, PropertyValueMap } from "lit";
import { customElement, property } from "lit/decorators.js";
import { map } from "lit/directives/map.js";
import { IntegrationData } from "../interfaces";
import { sharedStyles } from "../styles/sharedStyles";
import { CATEGORY_MAP } from "../utils/constants";
import { debounce } from "../utils/helpers";
@customElement("integration-selection")
export class IntegrationSelection extends LitElement {
  @property({ state: true }) searchQuery: string = "";
  @property() categoryKey: string = "";
  @property() integrationsList: IntegrationData[] = [];
  @property() filteredList: IntegrationData[] = [];
  protected render(): unknown {
    return html`
      <div class="integration-selection-step">
        <div class="integration-selection-step-header">
          <h3 class="integration-selection-title text-center w-100">
            Select Integration
          </h3>
        </div>

        <input
          class="integration-selection-search"
          @input=${(e: InputEvent) => {
            let ref = this;
            debounce(ref._onQueryChange(e), 2000);
          }}
          placeholder="Search in ${CATEGORY_MAP[this.categoryKey]}"
        />

        <div class="integrations-wrapper d-flex flex-wrap">
          ${map(
            this.filteredList,
            (item) => html` <div
                class="integration-box cursor-pointer"
                key=${item.appId}
                @click=${(e: PointerEvent) =>
                  this._onIntegrationSelect(e, item.appId)}
              >
                <img src=${item.logo} alt=${item.appId} />
                <h5 class="text-center w-100">${item.label}</h5>
              </div>
              <div></div>`
          )}
        </div>
      </div>
    `;
  }

  protected _onQueryChange(e: InputEvent): any {
    console.log("query changed called");
    if ((e.target as HTMLInputElement).value?.length > 0)
      this.filteredList = this.integrationsList.filter((item) =>
        item?.label
          .toLowerCase()
          .includes((e.target as HTMLInputElement).value.toLowerCase())
      );
    else {
      this.filteredList = this.integrationsList;
    }
  }
  // private _debouncedQueryChange(e: InputEvent): void {
  //   let ref = this;
  //   debounce(ref._onQueryChange(e), 2000);
  // }
  private _onIntegrationSelect(e: PointerEvent, appId: string) {
    e?.preventDefault();
    const newCustomEvent = new CustomEvent("onIntegrationSelect", {
      bubbles: true,
      detail: {
        appId: appId,
      },
    });
    this.dispatchEvent(newCustomEvent);
  }

  // protected createRenderRoot(): Element | ShadowRoot {
  //   return this;
  // }

  protected updated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    if (_changedProperties.has("integrationsList")) {
      console.log("integrationLis changed", this.integrationsList);
      this.filteredList = this.integrationsList;
    }
  }
  static styles = [
     sharedStyles,
    css`
      integration-selection-step-header {
        padding: 1rem 0;
      }
      .integration-selection-title {
        font-size: 2.5rem;
        padding: 1rem 0;
      }

      .integration-selection-search {
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
    "integration-selection": IntegrationSelection;
  }
}
