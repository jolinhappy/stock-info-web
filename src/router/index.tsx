import { lazy, Suspense } from 'react';
import { createHashRouter, Navigate } from 'react-router-dom';
import { MainRoutePath, AnalysisReportChildPath } from './routerConstants';
import NotFoundPage from '../pages/NotFoundPage';
import NewInfoPage from '../pages/NewInfoPage';
import MainLayout from '../components/layouts/MainLayout';

const SuspenseComponent = ({ Component, props }: any) => (
  <Suspense>
    <Component {...props} />
  </Suspense>
);

const MonthlyRevenue = lazy(() => import('../pages/analysisReport/MonthlyRevenue'));
const EarningsPerShare = lazy(() => import('../pages/analysisReport/EarningsPerShare'));

export const routeSetting = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <NewInfoPage />,
      },
    ],
  },
  {
    path: `/${MainRoutePath.ANALYSIS_REPORT}`,
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <Navigate to={{ pathname: `${AnalysisReportChildPath.MONTHLY_REVENUE}` }} />,
      },
      {
        path: `${AnalysisReportChildPath.MONTHLY_REVENUE}`,
        element: <SuspenseComponent Component={MonthlyRevenue} />,
      },
      {
        path: `${AnalysisReportChildPath.EARNINGS_PER_SHARE}`,
        element: <SuspenseComponent Component={EarningsPerShare} />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

const router = createHashRouter(routeSetting);

export default router;
