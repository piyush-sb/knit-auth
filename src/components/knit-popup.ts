import { LitElement, html, css, PropertyValueMap } from "lit";
import { customElement, property } from "lit/decorators.js";
import { CategoryPanelsObject } from "../interfaces";
import { sharedStyles } from "../styles/sharedStyles";
import { choose } from "lit/directives/choose.js";
import "../steps/CategorySelection";
import "../steps/IntegrationSelection";
import "../steps/IntegrationSetup";
@customElement("knit-popup")
export class KnitPopup extends LitElement {
  @property({ type: Number, state: true }) step = 0;
  @property({ type: Boolean }) appsDataLoaded = false;
  @property() appsData: CategoryPanelsObject = {};
  @property({ type: Boolean }) appsApiError = false;
  @property({ type: String }) selectedCategory = "";
  @property({ type: String }) selectedApp = "";

  @property({})
  render() {
    return html`
      <div class="dialog-wrapper" role="dialog">
        <div class="popup-container">
          ${this.appsDataLoaded
            ? // appsData Api loaded
              this.appsApiError
              ? html`
                  <div class="h-80 d-flex align-items-center w-100">
                    <h4 class="w-inherit text-center">
                      There is some issue with token
                    </h4>
                  </div>

                  <div
                    @click="${this._forceExit}"
                    class="exit-btn-wrapper fixed-bottom cursor-pointer w-inherit align-items-center justify-content-center d-flex "
                  >
                    <button class="base-btn color-grey">Exit</button>
                  </div>
                `
              : html`
                  <div class="popup-header d-flex">
                    <div class="header-left w-50  text-left">
                      ${this.step == 0
                        ? html``
                        : html`<button
                            class="header-btn bg-transparent color-grey back-btn"
                            @click="${this._back}"
                          >
                            < Back
                          </button>`}
                    </div>
                    <div class="header-right w-50 text-right">
                      <div
                        class="header-btn close-btn "
                        @click="${this._togglePopup}"
                      >
                        X
                      </div>
                    </div>
                  </div>
                  ${choose(this.step, [
                    [
                      0,
                      () =>
                        html`<category-selection
                          .categoryList="${this.appsData}"
                          @nextStep=${this._nextStep}
                          @selectCategory=${this._setSelectedCategory}
                        ></category-selection>`,
                    ],
                    [
                      1,
                      () =>
                        html`<integration-selection
                          @nextStep=${this._nextStep}
                          .integrationsList=${this.appsData[
                            this.selectedCategory
                          ]}
                          @onIntegrationSelect=${this._setSelectedApp}
                          .categoryKey=${this.selectedCategory}
                        ></integration-selection>`,
                    ],
                    [
                      2,
                      () =>
                        html`<integration-setup
                          .appData=${this.appsData[this.selectedCategory].find(
                            (item) => item.appId == this.selectedApp
                          )}
                        ></integration-setup>`,
                    ],
                  ])}
                `
            : html`<div class="full-page-wrapper  align-items-center">
                <h4 class="w-100 text-center">Loading...</h4>
              </div>`}
        </div>
      </div>
    `;
  }

  protected updated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    console.log("updated called in popup", _changedProperties);
    if (_changedProperties.has("step")) {
      console.log("setp changed to", this.step);
    }
  }
  private _togglePopup(e?: Event) {
    e?.preventDefault();
    const newCustomEvent = new CustomEvent("togglePopup", {
      bubbles: true,
    });
    this.dispatchEvent(newCustomEvent);
  }
  private _setSelectedCategory(e?: CustomEvent): void {
    console.log("Setting selected category", e?.detail.categoryTitle);
    e?.preventDefault();
    console.log(e?.detail?.categoryTitle);
    this.selectedCategory = e?.detail.categoryTitle;
    this._nextStep();
  }

  private _setSelectedApp(e?: CustomEvent): void {
    console.log("Setting selected app", e?.detail.appId);

    e?.preventDefault();
    this.selectedApp = e?.detail.appId;
    this._nextStep();
  }
  private _nextStep(e?: Event): void {
    e?.preventDefault();
    this.step = this.step + 1;
  }

  private _prevStep(e?: Event): void {
    e?.preventDefault();
    this.step = this.step - 1;
  }

  private _refreshAccess(e?: Event): void {
    e?.preventDefault();
    const newCustomEvent = new CustomEvent("refreshAccess", {
      bubbles: true,
    });
    this.dispatchEvent(newCustomEvent);
  }
  private _forceExit(e?: Event): void {
    this._togglePopup(e);
    this._refreshAccess(e);
  }

  private _back(e?: Event): void {
    e?.preventDefault();
    if (this.step > 0) this._prevStep();
  }

  static styles = [
    sharedStyles,
    css`
      .dialog-wrapper {
        height: 100vh;
        width: 100vw;
        z-index: 200;
        position: absolute;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 0;

        background-color: rgba(33, 33, 33, 0.46);
        border-color: rgb(33, 33, 33);
      }
      .popup-container {
        background: white;
        padding: 1rem;
        position: relative;
        min-height: 400px;
        height: 100%;
        max-height: 720px;
        width: 375px;
        border-radius: 12px;
        box-shadow: rgb(0 0 0 / 15%) 0px 2px 20px, rgb(0 0 0 / 10%) 0px 2px 5px;
      }
      .close-btn {
        float: right;
        color: grey;
        cursor: pointer;
        padding: 0.2rem;
      }
      .full-page-wrapper {
        height: 100%;
      }

      .exit-btn-wrapper {
        padding: 1rem 0;
        border: 2px solid transparent;
        border-radius: 5px;
      }
      .exit-btn-wrapper:hover {
        border-color: lightgrey;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "knit-popup": KnitPopup;
  }
}
