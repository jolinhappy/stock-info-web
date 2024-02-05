import { ReactNode, createContext, useContext, useState, useMemo, useCallback } from 'react';

export interface IStockInfoData {
  currentSelectedStockId: string;
  currentSelectedStockName: string;
}
export interface IStockInfoDataContextValue {
  currentSelectedStockInfo: IStockInfoData;
  handleStockInfoChange: (info: IStockInfoData) => void;
}

interface INodeChildrenProps {
  children: ReactNode;
}
const defaultStockInfoDataValue: IStockInfoDataContextValue = {
  // default value
  currentSelectedStockInfo: {
    currentSelectedStockId: '2331',
    currentSelectedStockName: '台積電',
  },
  handleStockInfoChange: () => {},
};

const StockInfoDataContext = createContext<IStockInfoDataContextValue>(defaultStockInfoDataValue);

export const useStockInfoDataContext = () => useContext(StockInfoDataContext);

export const StockInfoDataProvider = ({ children }: INodeChildrenProps) => {
  const [selectedStockInfo, setSelectedStockInfo] = useState<IStockInfoData>({
    currentSelectedStockId: '2331',
    currentSelectedStockName: '台積電',
  });
  const handleStockInfoChange = useCallback((info: IStockInfoData) => {
    setSelectedStockInfo(info);
  }, []);

  const StockInfoDataContextValue = useMemo(() => ({
    currentSelectedStockInfo: selectedStockInfo,
    handleStockInfoChange,
  }), [handleStockInfoChange, selectedStockInfo]);
  return (
    <StockInfoDataContext.Provider value={StockInfoDataContextValue}>
      {children}
    </StockInfoDataContext.Provider>
  );
};
