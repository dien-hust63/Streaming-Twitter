import { Box, Paper, Typography } from "@mui/material";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useMemo } from "react";
import { useDataContext } from "src/contexts/data-context";
import useHighchartsDefaultConfig from "src/hooks/useHighchartsDefaultConfig";
import { formatNumber } from "src/utils";

export default function SensitivityPieChart() {
  const { data } = useDataContext();
  const pieces = useMemo<Array<{ name: string; y: number }>>(() => {
    const sensitivities: Array<string> = data?.map(
      (item: any) => item?.sentiment
    );
    const total = sensitivities.length;
    if (total === 0) return [];
    const pos = sensitivities.filter((n) => n === "Positive").length / total;
    const neg = sensitivities.filter((n) => n === "Negative").length / total;
    const neu = (total - pos - neg) / total;

    return [
      { name: "Positive", y: pos },
      { name: "Negative", y: neg },
      { name: "Neutral", y: neu },
    ];
  }, [data]);
  const defaultConfig = useHighchartsDefaultConfig();
  const options = useMemo<Highcharts.Options>(() => {
    return Highcharts.merge(defaultConfig, {
      chart: {
        type: "pie",
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
      },
      title: {
        text: undefined,
      },

      legend: {
        enabled: false,
      },
      xAxis: {
        enabled: false,
      },
      yAxis: {
        enabled: false,
      },
      tooltip: {
        pointFormat: "<b>{point.percentage:.1f}%</b>",
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          borderColor: null,
          cursor: "pointer",
          dataLabels: {
            enabled: false,
          },
        },
      },
      series: [
        {
          name: "Sentiment",
          data: pieces,
          colorByPoint: true,
        },
      ],
    });
  }, [defaultConfig, pieces]);
  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Typography variant="h5" whiteSpace="nowrap" gutterBottom>
        Sensitivities
      </Typography>

      <Paper sx={{ px: { md: 3, xs: 1 }, py: 2, flexGrow: 1 }}>
        <HighchartsReact highcharts={Highcharts} options={options} />
        <Box display="flex" justifyContent="space-around" width="100%">
          {pieces.length > 0 &&
            pieces.map((piece, idx) => (
              <Box
                key={idx}
                display="flex"
                alignItems="center"
                marginY="20px"
              >
                <Box>
                  <Typography color="text.secondary">{piece.name}</Typography>
                  <Typography color="text.primary">
                    <b
                      style={{
                        fontSize: "20px",
                      }}
                    >
                      {formatNumber(piece.y, { fractionDigits: 2 })}
                    </b>{" "}
                    %
                  </Typography>
                </Box>
              </Box>
            ))}
        </Box>
      </Paper>
    </Box>
  );
}
