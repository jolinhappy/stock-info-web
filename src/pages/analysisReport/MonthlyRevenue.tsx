/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useMemo, useCallback } from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { SelectChangeEvent } from '@mui/material/Select';
import { subMonths, subYears, format } from 'date-fns';
import CustomTable from '../../components/common/CustomTable';
import stockDataApi from '../../apis/stockData';
import formatNumber from '../../utils/formatNumber';
import { MONTHLY_REVENUE_TABLE_KEY } from '../../constants/common';
import { useStockInfoDataContext, IStockInfoDataContextValue } from '../../provider/StockInfoDataProvider';
import BarAndLineChart from '../../components/common/BarAndLineChart';
import BasicSelect from '../../components/common/BasicSelect';
import { IBasicSelect, IBarChartData } from '../../types/interface/component';
import { IMonthlyRevenue } from '../../types/api/stockData';

const StyledStockNamePaper = styled(Paper)(({ theme }: any) => ({
  width: '100%',
  height: 'auto',
  padding: theme.spacing(2),
}));

const StyledStockDataPaper = styled(Paper)(() => ({
  width: '100%',
}));

const selectOptions: IBasicSelect[] = [
  {
    value: 3,
    label: '近三年',
  },
  {
    value: 5,
    label: '近五年',
  },
  {
    value: 10,
    label: '近十年',
  },
];

const MonthlyRevenue = () => {
  const { currentSelectedStockInfo } = useStockInfoDataContext() as IStockInfoDataContextValue;
  const { currentSelectedStockId, currentSelectedStockName } = currentSelectedStockInfo;
  const [currentRevenueData, setCurrentRevenueData] = useState<any>([]);
  const [monthData, setMonthData] = useState<any>([]);
  const [originalMonthlyRevenueData, setOriginalMonthlyRevenueData] = useState<any>([]);
  const [originalLastSixMonthsData, setOriginalLastSixMonthsData] = useState<any>([]);
  const [monthlyProfitsRate, setMonthlyProfitsRate] = useState<any>({});
  const currentDate = useMemo(() => new Date(), []); // 現在的日期
  const sixMonthsAgo = subMonths(currentDate, 7);
  const formattedDate = useMemo(() => format(sixMonthsAgo, 'yyyy-MM-dd'), [sixMonthsAgo]);

  // Monthly Revenue bar chart
  const [selectedOption, setSelectedOption] = useState<number>(3);
  const [barChartData, setBarChartData] = useState<IBarChartData[]>([]);
  const [uniqueYearsArray, setUniqueYearsArray] = useState<string[]>([]);
  const [currentPeriodRevenueData, setCurrentPeriodRevenueData] = useState<IMonthlyRevenue[]>([]);
  const [periodRevenueProfitRateData, setPeriodRevenueProfitRateData] = useState<string[]>([]);
  const onSelectChange = (event: SelectChangeEvent) => {
    setSelectedOption(Number(event.target.value));
  };
  const specificLastDate = useMemo(() => format(subYears(currentDate, selectedOption), 'yyyy-MM-dd'), [currentDate, selectedOption]);
  const previousDate = useMemo(() => format(subMonths(specificLastDate, 13), 'yyyy-MM-dd'), [specificLastDate]);

  useEffect(() => {
    const getMonthlyData = async () => {
      if (currentSelectedStockId) {
        const response = await stockDataApi.getOneStockMonthlyRevenue({
          dataId: currentSelectedStockId,
          startDate: specificLastDate,
        });
        if (response.msg === 'success') {
          const { data } = response;
          setCurrentPeriodRevenueData(data);
          const uniqueYears = Array.from(new Set(data.map((item) => item.revenue_year.toString())));
          setUniqueYearsArray(uniqueYears);
          const months = Array.from({ length: 12 }, (_, monthIndex) => (monthIndex + 1));
          const formattedData = months.map((month) => ({
            type: 'column',
            name: month.toString(),
            data: uniqueYears.map((year) => {
              const matchingData = data.find((item) => item.revenue_year.toString() === year && item.revenue_month === month);
              return {
                name: matchingData ? `${year}-${month.toString().padStart(2, '0')}` : '',
                y: matchingData ? matchingData.revenue / 1000 : 0,
              };
            }),
          }));
          setBarChartData(formattedData);
        }
      }
    };
    getMonthlyData();
  }, [currentSelectedStockId, specificLastDate]);

  // useEffect(() => {
  //   const getPeriodRevenueProfitRate = async () => {
  //     const response = await stockDataApi.getOneStockMonthlyRevenue({
  //       dataId: currentSelectedStockId,
  //       startDate: previousDate,
  //     });
  //     if (response.msg === 'success') {
  //       const lastPeriodRevenue: IMonthlyRevenue[] = response.data.slice(0, selectedOption * 12 - 1);
  //       const periodRevenueProfitRate: string[] = currentPeriodRevenueData
  //         .map((date: IMonthlyRevenue, index: number) => ((date.revenue / lastPeriodRevenue[index].revenue - 1) * 100).toFixed(2) || '0');
  //       setPeriodRevenueProfitRateData(periodRevenueProfitRate);
  //     }
  //   };
  //   getPeriodRevenueProfitRate();
  // }, [currentPeriodRevenueData, currentSelectedStockId, previousDate, selectedOption]);

  const lastYearStartMonth = useMemo(() => {
    let result;
    if (monthData[0]) {
      const date = new Date(monthData[0]);
      const lastYearDate = subMonths(date, 12);
      result = format(lastYearDate, 'yyyy-MM-dd');
    }
    return result;
  }, [monthData]);

  const getMonthData = (data: any) => {
    const months = data.map((item: any) => format(item.date, 'yyyy-MM'));
    setMonthData([...months]);
  };

  const formatData = (data: any, keyName: string, currentName: string) => {
    let formattedData;
    if (data.length > 0) {
      const transformMonthlyRevenueData = data.reduce((result: any, currentItem: any) => {
        const key = format(currentItem.date, 'yyyy-MM');
        return {
          ...result,
          [key]: keyName === 'revenue' ? formatNumber(currentItem[keyName], 1000) : currentItem[keyName],
        };
      }, {});
      const formattedMonthlyRevenueData: any = {
        ...(transformMonthlyRevenueData as any),
        name: currentName,
      };
      formattedData = formattedMonthlyRevenueData;
    }
    return formattedData;
  };

  useEffect(() => {
    const getStockInfo = async () => {
      if (!formattedDate) return;
      const request = {
        dataId: currentSelectedStockId,
        startDate: formattedDate,
      };
      const res = await stockDataApi.getOneStockMonthlyRevenue(request);
      if (res.msg === 'success') {
        setOriginalMonthlyRevenueData(res.data);
        getMonthData(res.data);
        formatData(res.data, 'revenue', MONTHLY_REVENUE_TABLE_KEY.MONTHLY_REVENUE);
      }
    };
    getStockInfo();
  }, [currentSelectedStockId, formattedDate]);

  useEffect(() => {
    const getLastYearStockInfo = async () => {
      if (!lastYearStartMonth) return;
      const request = {
        dataId: currentSelectedStockId,
        startDate: lastYearStartMonth,
      };
      const res = await stockDataApi.getOneStockMonthlyRevenue(request);
      if (res.msg === 'success') {
        setOriginalLastSixMonthsData(res.data.slice(0, 6));
      }
    };

    getLastYearStockInfo();
  }, [currentSelectedStockId, lastYearStartMonth]);

  useEffect(() => {
    const getMonthlyProfitsRate = async () => {
      if (originalMonthlyRevenueData.length > 0 && originalLastSixMonthsData.length > 0) {
        const result = originalMonthlyRevenueData.map((monthlyRevenue: any, index: number) => {
          const { date, revenue } = monthlyRevenue;
          const lastYearMonthRevenue = originalLastSixMonthsData[index].revenue || 0;
          const profitsRate = ((revenue / lastYearMonthRevenue - 1) * 100).toFixed(2) || 0;
          return {
            date,
            profitsRate,
          };
        });
        setMonthlyProfitsRate(result);
      }
    };
    getMonthlyProfitsRate();
  }, [originalLastSixMonthsData, originalMonthlyRevenueData]);

  useEffect(() => {
    const mergeData = () => {
      if (!originalMonthlyRevenueData && !monthlyProfitsRate) return;
      const monthlyRevenues = formatData(originalMonthlyRevenueData, 'revenue', MONTHLY_REVENUE_TABLE_KEY.MONTHLY_REVENUE);
      const monthlyProfits = formatData(monthlyProfitsRate, 'profitsRate', MONTHLY_REVENUE_TABLE_KEY.PER_MONTH_REVENUE_GROWTH_RATE);
      setCurrentRevenueData([
        monthlyRevenues,
        monthlyProfits,
      ]);
    };
    mergeData();
  }, [monthlyProfitsRate, originalMonthlyRevenueData]);
  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <StyledStockNamePaper variant="outlined">
        <Typography variant="h6">{`${currentSelectedStockName} (${currentSelectedStockId})`}</Typography>
      </StyledStockNamePaper>
      <StyledStockDataPaper variant="outlined">
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1" p={2}>每月營收</Typography>
          <BasicSelect selectOptions={selectOptions} value={selectedOption} onSelectChange={onSelectChange} />
        </Box>
        <BarAndLineChart barChartData={barChartData} lineData={periodRevenueProfitRateData} categories={uniqueYearsArray} />
      </StyledStockDataPaper>
      <StyledStockDataPaper variant="outlined">
        <Typography variant="subtitle1" p={2}>詳細數據</Typography>
        <CustomTable rows={currentRevenueData} columns={monthData} />
      </StyledStockDataPaper>
    </Box>
  );
};

export default MonthlyRevenue;
