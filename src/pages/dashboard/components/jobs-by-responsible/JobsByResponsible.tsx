import { Box, Grid2, Paper, Typography } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts";
import { FC } from "react";

interface IJobsByResponsibleProps {
  filter: {
    startDate: string;
    endDate: string;
    startDateComparison: string;
    endDateComparison: string;
  };
}

interface IUserJobStats {
  userId: number;
  userName: string;
  totalJobs: number;
  totalCompletedJobs: number;
}

const userJobStats: IUserJobStats[] = [
  {
    userId: 1,
    userName: "John Doe",
    totalCompletedJobs: 5,
    totalJobs: 8,
  },
  {
    userId: 2,
    userName: "Jane Smith",
    totalCompletedJobs: 8,
    totalJobs: 10,
  },
  {
    userId: 3,
    userName: "Alice Johnson",
    totalCompletedJobs: 10,
    totalJobs: 11,
  },
];

export const JobsByResponsible: FC<IJobsByResponsibleProps> = ({ filter }) => {
  console.log(filter);

  return (
    <Box mt={4}>
      <Typography variant="h5">Jobs por responsável</Typography>
      <Grid2 mt={2} container spacing={2}>
        {userJobStats.map((user) => (
          <Grid2
            size={{ xs: 12, md: 4 }}
            component={Paper}
            sx={{ p: 4 }}
            key={user.userId}
          >
            <Typography variant="h6" textAlign="center">
              {user.userName}
            </Typography>
            <Gauge
              height={200}
              value={user.totalCompletedJobs}
              valueMax={user.totalJobs}
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
        ))}
      </Grid2>
    </Box>
  );
};
