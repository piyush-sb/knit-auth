export interface IntegrationSummary {
  title: string;
  description: string;
  smallLogo: string; // image Url string
  logo: string; // full size image url string
}

export interface CategoryPanelData {
  title: string;
  description: string;
  integrationList: IntegrationSummary[];
}
