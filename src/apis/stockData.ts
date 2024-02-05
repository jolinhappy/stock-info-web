import apiHandler from '../utils/apiHandler';
import { IMonthlyRevenue, IStockItemInfo, IGetMonthlyRevenueRequest } from '../types/api/stockData';
import IApiResponse from '../types/common';

export default {
  getAllStockList(): Promise<IApiResponse<IStockItemInfo>> {
    return apiHandler.get('data?dataset=TaiwanStockInfo');
  },
  getOneStockMonthlyRevenue({ dataId, startDate }: IGetMonthlyRevenueRequest): Promise<IApiResponse<IMonthlyRevenue[]>> {
    return apiHandler.get(`data?dataset=TaiwanStockMonthRevenue&data_id=${dataId}&start_date=${startDate}`);
  },
};
