interface ISidebarMenuItem {
  icon?: string;
  name: string;
  path: string;
  childTabs?: ISidebarMenuItem[];
  disabled: boolean;
}

interface IAutoCompleteOption {
  id: string;
  name: string;
  label: string;
}

interface IBasicSelect {
  value: number;
  label: string;
}

interface IBarDataItem {
  name: string,
  y: number,
}

interface IBarChartData {
  type: string,
  name: string,
  data: IBarDataItem[],
}

export type {
  ISidebarMenuItem,
  IAutoCompleteOption,
  IBasicSelect,
  IBarChartData,
};
