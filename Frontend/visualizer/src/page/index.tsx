import { Grid } from "@mui/material";
import PolarityHistogram from "./PolarityHistogram";
import PolarityHistoryChart from "./PolarityHistoryChart";
import SensitivityPieChart from "./SensitivityPieChart";
import SubjectivityHistogram from "./SubjectivityHistogram";

export default function Page() {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        mt: 5,
      }}
    >
      <Grid item md={6} xs={12}>
        <PolarityHistogram />
      </Grid>
      <Grid item md={6} xs={12}>
        <SubjectivityHistogram />
      </Grid>
      <Grid item md={6} xs={12}>
        <SensitivityPieChart />
      </Grid>
      <Grid item md={6} xs={12}>
        <PolarityHistoryChart />
      </Grid>
    </Grid>
  );
}
