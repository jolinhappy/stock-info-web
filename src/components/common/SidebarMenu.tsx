import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import ISidebarMenuItem from '../../types/interface/component';

const StyledTabs = styled(Tabs)(() => ({
  '& .MuiTabs-indicator': {
    left: 0,
  },
}));

interface ISidebarMenuProps {
  menuData: ISidebarMenuItem[];
}

const SidebarMenu = ({ menuData }:ISidebarMenuProps) => {
  const [currentParentTab, setCurrentParentTab] = useState(0);
  const [currentChildTab, setCurrentChildTab] = useState(0);
  const handleChangeTab = (options: { isParent: boolean } = { isParent: false }) => (event: React.SyntheticEvent, newValue: number) => {
    const { isParent } = options;
    if (isParent) {
      setCurrentParentTab(newValue);
      setCurrentChildTab(0);
    } else {
      setCurrentChildTab(newValue);
    }
  };
  return (
    <>
      <StyledTabs
        orientation="vertical"
        variant="scrollable"
        value={currentParentTab}
        onChange={handleChangeTab({ isParent: true })}
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        {
          menuData.map((tab: any) => (
            <Tab
              icon={<div>{tab.icon}</div>}
              key={tab.name}
              label={tab.name}
              component={Link}
              to={tab.path}
              disabled={tab.disabled}
              sx={{ minHeight: '40px' }}
            />
          ))
        }
      </StyledTabs>
      {menuData[currentParentTab]?.childTabs && (menuData[currentParentTab]?.childTabs as ISidebarMenuItem[]).length > 0 && (
        <div>
          <StyledTabs value={currentChildTab} orientation="vertical" onChange={handleChangeTab({ isParent: false })}>
            {
              (menuData[currentParentTab]?.childTabs as ISidebarMenuItem[]).map((tab: any) => (
                <Tab
                  key={tab.name}
                  label={tab.name}
                  component={Link}
                  to={tab.path}
                  disabled={tab.disabled}
                />
              ))
            }
          </StyledTabs>
        </div>
      )}
    </>
  );
};

export default SidebarMenu;
