import { LitElement, css, html, PropertyValueMap, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import axios from "axios";
import sharedStyles from "./styles/sharedStyles.scss";
import "./components/knit-popup";
import { CategoryPanelsObject, IntegrationData } from "./interfaces";
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */

const customConvertor = (str: string) => JSON.parse(str);
@customElement("knit-auth")
export  default class KnitAuth extends LitElement {
  /**
   * Copy for the read the docs hint.
   */
  @property()
  docsHint = "Click on the Vite and Lit logos to learn more";

  @property({ type: Boolean, state: true })
  protected isReady = false;
  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number, state: true })
  count = 0;

  @property({ type: customConvertor }) onRefreshKnit = function () {};

  @property({ type: String })
  knitKey = "";

  @property({ type: Boolean, state: true })
  protected popupEnabled = false;

  @property({ type: Boolean, state: true })
  appsDataLoaded = false;

  @property({ state: true }) appsData: CategoryPanelsObject = {};
  @property({ type: Boolean, state: true }) protected appsApiError = false;

  render() {
    return html`
      <div class="component-wrapper">
        ${this.popupEnabled
          ? html`
              <knit-popup
                .appsDataLoaded=${this.appsDataLoaded}
                .appsApiError=${this.appsApiError}
                .appsData=${this.appsData}
                @togglePopup=${this._togglePopup}
                @refreshAccess=${this._refreshAccess}
              ></knit-popup>
            `
          : ""}
        ${html`<slot name="initiator" @click=${this._onInitiatorClick}></slot>`}
      </div>
    `;
  }

  private _onInitiatorClick(e?: Event): void {
    e?.preventDefault;
    console.log("clicked", this.isReady, "key", this.knitKey);
    if (this.isReady) {
      this._togglePopup();
    }
  }
  private _togglePopup(e?: Event): void {
    e?.preventDefault();
    this.popupEnabled = !this.popupEnabled;
  }

  private _refreshAccess(e?: Event): void {
    e?.preventDefault();
    console.log("refresh event called ");
    this.onRefreshKnit();
  }

  private _SuccessFetchData(): void {
    const newCustomEvent = new CustomEvent("successFetchData", {
      bubbles: true,
      detail: {
        id: "Piyush",
      },
    });
    this.dispatchEvent(newCustomEvent);
  }

  protected updated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    console.log("updated called in knit auth element", _changedProperties);

    if (_changedProperties.has("knitKey")) {
      console.log("knitKey", this.knitKey);
      if (this.knitKey.length > 0 && !this.isReady) {
        this.isReady = true;
      }
    }
    if (_changedProperties.has("popupEnabled")) {
      if (this.popupEnabled) {
        this._fetchAppsData();
      }
    }

    if (_changedProperties.has("onRefreshKnit")) {
      console.log("knit", this.onRefreshKnit);
    }
    if (_changedProperties.has("appsApiError")) {
      console.log(
        "error state changed in parent",
        _changedProperties,
        this.appsApiError
      );
    }
  }

  private _fetchAppsData(): void {
    if (this.appsDataLoaded) {
      this.appsDataLoaded = !this.appsDataLoaded;
    }
    console.log("Fetching Apps Data");
    console.log("Apps api hit");
    axios
      .get(`https://run.mocky.io/v3/2390030a-d531-48ca-a690-81601a2b2e28`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res?.data);
        let integrationsArray = res?.data?.msg;
        this._SuccessFetchData();
        let categoryIntegrationsMap: CategoryPanelsObject = {};
        integrationsArray.forEach((integration: IntegrationData) => {
          integration.category.forEach((category: string) => {
            if (categoryIntegrationsMap[category]) {
              categoryIntegrationsMap[category] = [
                ...categoryIntegrationsMap[category],
                integration,
              ];
            } else {
              categoryIntegrationsMap[category] = [integration];
            }
            console.log(categoryIntegrationsMap);
            this.appsData = categoryIntegrationsMap;
          });
        });
      })
      .catch((err) => {
        console.log("err", err);
        console.error(err);
      })
      .finally(() => {
        this.appsDataLoaded = true;
      });
  }
  static styles = [
    unsafeCSS(sharedStyles),
    css`
      slot[name="initiator"]::slotted(*) {
        background: blue;
        color: green;
      }
      .logo {
        height: 6em;
        padding: 1.5em;
        will-change: filter;
      }
      .logo:hover {
        filter: drop-shadow(0 0 2em #646cffaa);
      }
      .logo.lit:hover {
        filter: drop-shadow(0 0 2em #325cffaa);
      }

      .card {
        padding: 2em;
      }

      .read-the-docs {
        color: #888;
      }

      h3 {
        font-size: 3.2em;
        line-height: 1.1;
      }

      a {
        font-weight: 500;
        color: #646cff;
        text-decoration: inherit;
      }
      a:hover {
        color: #535bf2;
      }

      button {
        border-radius: 8px;
        border: 1px solid transparent;
        padding: 0.6em 1.2em;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        background-color: #1a1a1a;
        cursor: pointer;
        transition: border-color 0.25s;
      }
      button:hover {
        border-color: #646cff;
      }
      button:focus,
      button:focus-visible {
        outline: 4px auto -webkit-focus-ring-color;
      }

      @media (prefers-color-scheme: light) {
        a:hover {
          color: #747bff;
        }
        button {
          background-color: #f9f9f9;
        }
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "knit-auth": KnitAuth;
  }
}
