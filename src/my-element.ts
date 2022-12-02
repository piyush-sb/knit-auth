import { LitElement, css, html, PropertyValueMap } from "lit";
import { customElement, property } from "lit/decorators.js";
import axios from "axios";
import { sharedStyles } from "./styles/sharedStyles";
import "./components/knit-popup";
import { CategoryPanelData } from "./interfaces";
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement("my-element")
export class MyElement extends LitElement {
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

  @property({ type: String })
  knitKey = "";

  @property({ type: Boolean, state: true })
  protected popupEnabled = false;

  @property({ type: Boolean, state: true })
  appsDataLoaded = false;

  @property() appsData: CategoryPanelData[] = [];
  @property({ type: Boolean, state: true }) appsApiError = false;

  render() {
    return html`
      <div class="component-wrapper">
        ${this.popupEnabled
          ? html`
              <knit-popup
                appsDataLoaded=${this.appsDataLoaded}
                appsApiError=${this.appsApiError}
                @togglePopup=${this._togglePopup}
                @refreshAccess=${this._refreshAccess}
              ></knit-popup>
            `
          : ""}
        Hi
        ${html`<slot name="initiator" @click=${this._onInitiatorClick}></slot>`}
      </div>
    `;
  }

  private _onInitiatorClick(e: Event): void {
    e.preventDefault;
    console.log("clicked", this.isReady);
    if (this.isReady) {
      this._togglePopup(null);
    }
  }
  private _togglePopup(e: Event | null): void {
    e?.preventDefault();
    this.popupEnabled = !this.popupEnabled;
  }

  private _refreshAccess(e: Event | null): void {
    e?.preventDefault();
    const newCustomEvent = new CustomEvent("onRefreshKnitCall", {
      bubbles: true,
    });
    this.dispatchEvent(newCustomEvent);
  }
  protected updated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    if (_changedProperties.has("knitKey")) {
      if (this.knitKey.length > 0) {
        this.isReady = true;
      }
    }
    if (_changedProperties.has("popupEnabled")) {
      if (this.popupEnabled) {
        this._fetchAppsData();
      }
    }

    if (_changedProperties.has("isReady")) {
      console.log("isready Changed", this.isReady);
    }
  }

  private _fetchAppsData(): void {
    console.log("Fetching Apps Data");
    axios
      .get("apiCall")
      .then((res) => {
        console.log(res?.data);
        this.appsData = res?.data?.apps || [];
      })
      .catch((err) => {
        console.error(err);
        this.appsApiError = true;
      })
      .finally(() => {
        this.appsDataLoaded = true;
      });
  }
  static styles = [
    sharedStyles,
    css`
      :host {
        max-width: 1280px;
        margin: 0 auto;
        padding: 2rem;
        text-align: center;
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
    "my-element": MyElement;
  }
}
