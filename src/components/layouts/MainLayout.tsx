import { Outlet } from 'react-router-dom';
import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import { MainRoutePath, AnalysisReportChildPath } from '../../router/routerConstants';
import TopBar from '../common/TopBar';
import SidebarMenu from '../common/SidebarMenu';
import ISidebarMenuItem from '../../types/interface/component';

const StyledMainContentWrapper = styled('div', {
  shouldForwardProp: (prop) => isPropValid(prop),
})(({ theme }: any) => ({
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  overflow: 'hidden',
  backgroundColor: theme.customColors.background,
  paddingTop: theme.spacing(8),
}));

const StyledMainSection = styled('section', {
  shouldForwardProp: (prop) => isPropValid(prop),
})(({ theme }: any) => ({
  padding: theme.spacing(3, 0),
  display: 'flex',
  flex: '1',
  overflowY: 'auto',
  maxWidth: '80%',
}));

const StyledContentWrapper = styled('div', {
  shouldForwardProp: (prop) => isPropValid(prop),
})(({ theme }: any) => ({
  padding: theme.spacing(3),
  flex: 1,
}));

const sidebarMenuData: ISidebarMenuItem[] = [
  {
    icon: 'B',
    name: '最新動態',
    path: '/',
    disabled: false,
  },
  {
    icon: 'F',
    name: '股票健診',
    path: '/',
    disabled: true,
  },
  {
    icon: 'C',
    name: '財務報表',
    path: `/${MainRoutePath.ANALYSIS_REPORT}`,
    disabled: false,
    childTabs: [
      {
        name: '每月營收',
        path: `${AnalysisReportChildPath.MONTHLY_REVENUE}`,
        disabled: false,
      },
      {
        name: '每股盈餘',
        path: `${AnalysisReportChildPath.EARNINGS_PER_SHARE}`,
        disabled: false,
      },
      {
        name: '每股淨值',
        path: `${AnalysisReportChildPath.NET_ASSET_VALUE}`,
        disabled: true,
      },
      {
        name: '損益表',
        path: `${AnalysisReportChildPath.INCOME_STATEMENT}`,
        disabled: true,
      },
      {
        name: '總資產',
        path: `${AnalysisReportChildPath.ASSETS}`,
        disabled: true,
      },
      {
        name: '負債與股東權益',
        path: `${AnalysisReportChildPath.LIABILITIES_AND_EQUITY}`,
        disabled: true,
      },
      {
        name: '現金流量表',
        path: `${AnalysisReportChildPath.CASH_FLOW_STATEMENT}`,
        disabled: true,
      },
      {
        name: '股利政策',
        path: `${AnalysisReportChildPath.DIVIDEND_POLICY}`,
        disabled: true,
      },
      {
        name: '電子書',
        path: `${AnalysisReportChildPath.E_REPORT}`,
        disabled: true,
      },
    ],
  },
  {
    icon: 'D',
    name: '獲利能力',
    path: '/',
    disabled: true,
  },
  {
    icon: 'E',
    name: '安全性分析',
    path: '/',
    disabled: true,
  },
  {
    icon: 'Q',
    name: '成長力分析',
    path: '/',
    disabled: true,
  },
  {
    icon: 'J',
    name: '價值評估',
    path: '/',
    disabled: true,
  },
  {
    icon: 'G',
    name: '董監與籌碼',
    path: '/',
    disabled: true,
  },
  {
    icon: 'H',
    name: '關鍵指標',
    path: '/',
    disabled: true,
  },
  {
    icon: 'I',
    name: '產品組合',
    path: '/',
    disabled: true,
  },
];

const MainLayout = () => (
  <Box height="100vh" display="flex" flexDirection="column">
    <TopBar />
    <StyledMainContentWrapper>
      <StyledMainSection>
        <SidebarMenu menuData={sidebarMenuData} />
        <StyledContentWrapper>
          <Outlet />
        </StyledContentWrapper>
      </StyledMainSection>
    </StyledMainContentWrapper>
  </Box>
);

export default MainLayout;
