interface IStockItemInfo {
  industry_category: string,
  stock_id: string,
  stock_name: string,
  type: string,
  date: string
}

interface IMonthlyRevenue {
  date: string,
  stock_id: string,
  country: string,
  revenue: number,
  revenue_month: number,
  revenue_year: number
}

interface IGetMonthlyRevenueRequest {
  dataId: string,
  startDate: string,
}

export type {
  IStockItemInfo,
  IMonthlyRevenue,
  IGetMonthlyRevenueRequest,
};
