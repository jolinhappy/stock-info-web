/* eslint-disable @typescript-eslint/no-unused-vars */
import { useTheme } from '@emotion/react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const BarAndLineChart = ({ barChartData, lineData, categories }: any) => {
  const theme: any = useTheme();
  const options = {
    title: {
      text: '',
    },
    xAxis: {
      categories,
    },
    yAxis: [
      {
        title: {
          text: '千元',
        },
      },
      // {
      //   title: {
      //     text: '%',
      //   },
      //   labels: {
      //     formatter: (value: number) => `${value} %`,
      //   },
      //   opposite: true,
      // },
    ],
    tooltip: {
      valueSuffix: ' 千元',
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        borderRadius: '15%',
      },
      line: {
        marker: {
          enabled: false,
        },
      },
      column: {
        color: theme.customColors.orange,
      },
    },
    series: [
      ...barChartData,
      // {
      //   type: 'line',
      //   name: 'Rate',
      //   data: [77],
      //   color: theme.customColors.red,
      //   marker: {
      //     lineWidth: 1,
      //   },
      // },
    ],
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  );
};

export default BarAndLineChart;
