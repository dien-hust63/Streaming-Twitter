import { alpha, useTheme } from '@mui/material';
import { useMemo } from 'react';

export default function useHighchartsDefaultConfig(): Highcharts.Options {
  const theme = useTheme();

  return useMemo<Highcharts.Options>(
    () => ({
      title: {
        style: {
          color: theme.palette.text.primary,
          fontSize: '16px',
        },
      },
      yAxis: {
        gridLineColor: alpha(theme.palette.secondary.main, 0.1),
        lineColor: alpha(theme.palette.secondary.main, 0.1),
        tickColor: alpha(theme.palette.secondary.main, 0.1),
        title: {
          style: {
            color: theme.palette.secondary.main,
          },
        },
        labels: {
          style: {
            color: theme.palette.secondary.main,
          },
        },
      },
      xAxis: {
        gridLineColor: alpha(theme.palette.secondary.main, 0.1),
        tickColor: alpha(theme.palette.secondary.main, 0.1),
        lineColor: alpha(theme.palette.secondary.main, 0.1),
        title: {
          style: {
            color: theme.palette.secondary.main,
          },
        },
        labels: {
          style: {
            color: theme.palette.secondary.main,
          },
        },
      },
      legend: {
        itemStyle: {
          color: theme.palette.text.primary,
        },
        itemHoverStyle: {
          color: theme.palette.primary.main,
        },
        itemHiddenStyle: {
          color: theme.palette.mode === 'dark' ? '#7a7a7a' : '#cccccc',
        },
      },
      plotOptions: {
        series: {
          pointPlacement: 'on',
        },
        bar: {
          dataLabels: {
            style: {
              color: theme.palette.text.primary,
              textOutline: 'none',
            },
          },
        },
      },
      loading: {
        style: {
          backgroundColor: theme.palette.mode === 'dark' ? '#000' : '#fff',
        },
      },
      chart: {
        backgroundColor: undefined
      },
      credits: {
        enabled: false
      }
    }),
    [theme]
  );
}
