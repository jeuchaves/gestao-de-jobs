import { Grid2, Paper, Typography } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts";
import { FC } from "react";

interface IGaugeComponentProps {
  userName: string;
  totalJobs: number;
  totalCompletedJobs: number;
}

export const GaugeComponent: FC<IGaugeComponentProps> = ({
  userName,
  totalJobs,
  totalCompletedJobs,
}) => {
  return (
    <Grid2 size={{ xs: 12, md: 6, lg: 4 }} component={Paper} sx={{ p: 4 }}>
      <Typography variant="h6" textAlign="center">
        {userName}
      </Typography>
      <Gauge
        height={200}
        value={totalCompletedJobs}
        valueMax={totalJobs}
        sx={{
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 32,
            fontFamily: "Roboto",
            transform: "translate(0px, 0px)",
          },
        }}
        text={({ value, valueMax }) => `${value} / ${valueMax}`}
      />
    </Grid2>
  );
};
