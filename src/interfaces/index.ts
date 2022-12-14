export interface IntegrationSummary {
  title: string;
  description: string;
  smallLogo: string; // image Url string
  logo: string; // full size image url string
}

export interface IntegrationData {
  title?: string; // just for testing
  category: string[];
  appId: string;
  label: string;
  logo: string;
  oAuthUrl?: string;
  authType: string;
  setupDetails?: setupDetailItem[];
}

export interface CategoryPanelsObject {
  [key: string]: IntegrationData[];
}
export interface setupDetailItem {
  label: string;
  id: string;
  uiElementType: string;
  uiElementDataType: string;
  description?: string;
  isRequired: boolean;
  optionData?: string; // incorrect
  default?: string;
  tip?: string;
  isProtected: boolean;
}
