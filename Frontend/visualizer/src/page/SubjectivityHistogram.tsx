import { Box, Paper, Typography } from "@mui/material";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useMemo } from "react";
import { useDataContext } from "src/contexts/data-context";
import useHighchartsDefaultConfig from "src/hooks/useHighchartsDefaultConfig";

export default function SubjectivityHistogram() {
  const { data } = useDataContext();
  const steps = useMemo(() => ["< -0.6", "< -0.2", "< 0", "< 0.2", "< 0.6", "<= 1"], []);
  const histograms = useMemo(() => {
    const presort: Array<number> = data?.map((item: any) =>
      parseFloat(item?.subjectivity)
    );
    const sorted = presort.sort((a: number, b: number) => a - b);
    const step = [-1.1, -0.6, -0.2, 0, 0.2, 0.6, 1.1];
    const histograms = [0, 0, 0, 0, 0, 0];
    for (let i = 0; i < histograms.length; i++) {
      histograms[i] = sorted.filter(
        (n) => n >= step[i] && n < step[i + 1]
      ).length;
    }
    return histograms;
  }, [data]);
  const defaultConfig = useHighchartsDefaultConfig();
  const options = useMemo<Highcharts.Options>(() => {
    return Highcharts.merge(defaultConfig, {
      chart: {
        zoomType: "x",
        height: "300",
        type: "column",
      },
      title: {
        text: undefined,
      },
      tooltip: {
        shared: true,
        crosshairs: false,
        valueDecimals: 2,
      },
      legend: {
        enabled: false,
      },
      xAxis: {
        min: 0.5,
        gridLineWidth: 0,
        title: {
          enabled: false,
        },
        categories: steps,
      },

      yAxis: {
        ...defaultConfig.yAxis,
        gridLineWidth: 2,
        title: {
          text: "Subjectivity",
        },
        min: 0,
        endOnTick: false,
        showFirstLabel: false,
      },
      plotOptions: {
        column: {
          borderWidth: 0,
          pointPlacement: 0.25,
        },
      },
      series: [
        {
          name: "Subjectivity",
          type: "column",
          data: histograms,
        },
      ],
    });
  }, [defaultConfig, histograms, steps]);
  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Typography variant="h5" whiteSpace="nowrap" gutterBottom>
        Subjectivities Histogram
      </Typography>

      <Paper sx={{ px: { md: 3, xs: 1 }, py: 2, flexGrow: 1 }}>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </Paper>
    </Box>
  );
}
