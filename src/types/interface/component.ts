interface ISidebarMenuItem {
  icon?: string;
  name: string;
  path: string;
  childTabs?: ISidebarMenuItem[];
  disabled: boolean;
}

export default ISidebarMenuItem;
