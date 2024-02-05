import { useState, useCallback } from 'react';
import stockDataApi from '../apis/stockData';
import { IAutoCompleteOption } from '../types/interface/component';

const useStockListData = () => {
  const [originalStockList, setOriginalStockList] = useState<IAutoCompleteOption[]>([]);
  const [allFormattedStockList, setAllFormattedStockList] = useState<IAutoCompleteOption[]>([]);

  const getFormattedStockList = useCallback(async (data: any) => {
    const formattedData: IAutoCompleteOption[] = data.map((item: any) => ({
      id: item.stock_id,
      name: item.stock_name,
      label: `${item.stock_id} ${item.stock_name}`,
    }));
    const filterDuplicatedData = formattedData.reduce((result: IAutoCompleteOption[], current: IAutoCompleteOption) => {
      const isDuplicate = result.some((item: any) => item.id === current.id) && result.some((item: any) => item.name === current.name);
      if (!isDuplicate) {
        result.push(current);
      }
      return result;
    }, []);
    return filterDuplicatedData;
  }, []);

  const getAllStockList = useCallback(async () => {
    const res = await stockDataApi.getAllStockList();
    if (res.msg === 'success') {
      const formattedData = await getFormattedStockList(res.data);
      setOriginalStockList(formattedData);
      setAllFormattedStockList(formattedData);
    }
  }, [getFormattedStockList]);

  const filterStockData = useCallback(async (condition: string) => {
    const filteredData = originalStockList.filter((item: IAutoCompleteOption) => item.label.includes(condition));
    setAllFormattedStockList([...filteredData]);
  }, [originalStockList]);

  return {
    allFormattedStockList,
    originalStockList,
    getAllStockList,
    getFormattedStockList,
    filterStockData,
  };
};

export default useStockListData;
