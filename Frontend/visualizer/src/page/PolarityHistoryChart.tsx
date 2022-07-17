import { Box, Paper, Typography } from "@mui/material";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";
import { useMemo } from "react";
import { useDataContext } from "src/contexts/data-context";
import useHighchartsDefaultConfig from "src/hooks/useHighchartsDefaultConfig";
import { formatNumber } from "src/utils";

export default function PolarityHistoryChart() {
  const { data } = useDataContext();
  const history = useMemo<Array<{ timestamp: number; polarity: number }>>(() => {
    let hist: Array<{ timestamp: number; polarity: number }> = data?.map(
      (item: any) => {
        const date = new Date(item?.created_at);
        const timestamp = date.getTime();
        return { timestamp, polarity: parseFloat(item?.polarity) };
      }
    );
    hist = hist.sort((h1, h2) => h1.timestamp - h2.timestamp)
    return hist
  }, [data]);
  const defaultConfig = useHighchartsDefaultConfig();
  const options = useMemo<Highcharts.Options>(() => {
    const time = new Highcharts.Time({});

    return Highcharts.merge(defaultConfig, {
      chart: {
        type: 'line',
        zoomType: 'x',
        height: '500',
      },
      title: {
        text: undefined,
      },
      tooltip: {
        xDateFormat: '%Y-%m-%d %I:%M:%S %p',
        shared: true,
        crosshairs: false,
        valueDecimals: 2,
        formatter: function (this: Highcharts.TooltipFormatterContextObject): string {
          if (!this.points) return '';
          return `<span style="font-size:11px">${moment(this.x).format('Y-MM-DD hh:MM:SS A')}</span>
            <br/><span style="color:${this.points[0].color}">\u25CF</span>
            ${this.points[0].series.name}:
            <b>
              ${formatNumber(this.points[0].y, {
                fractionDigits: 4,
                delimiter: ',',
              })}
            </b>`;
        },
      },
      legend: {
        enabled: false,
      },
      xAxis: {
        gridLineWidth: 0,
        type: 'datetime',
        categories: history.map(h => h.timestamp),
        labels: {
          // eslint-disable-next-line no-unused-vars
          formatter: function (this: Highcharts.AxisLabelsFormatterContextObject): string {
            // eslint-disable-next-line quotes
            return time.dateFormat("%d %b '%y", Number(this.value));
          },
          y: 25,
        },
        tickInterval: history.length / 10
      },
      yAxis: {
        ...defaultConfig.yAxis,
        gridLineWidth: 2,
        title: {
          text: undefined,
        },
        endOnTick: false,
        showFirstLabel: false,
        min: -1,
        max: 1
      },
      plotOptions: {
        line: {
          
          marker: {
            radius: 0,
            symbol: 'circle',
            states: {
              hover: {
                radius: 5,
              },
            },
          },
          lineWidth: 1,
          states: {
            hover: {
              lineWidth: 2,
            },
          },
          threshold: null,
        },
      },
      series: [
        {
          name: 'Polarity',
          data: history.map(h => h.polarity),
          yAxis: 0,
        },
      ],
    });
  }, [defaultConfig, history]);
  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Typography variant="h5" whiteSpace="nowrap" gutterBottom>
        Polarity History
      </Typography>

      <Paper sx={{ px: { md: 3, xs: 1 }, py: 2, flexGrow: 1 }}>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </Paper>
    </Box>
  );
}
