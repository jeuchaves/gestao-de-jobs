import React from "react";
import { IJob } from "../../../types/jobs";
import { Card, CardContent, Grid2 } from "@mui/material";

interface IJobGridProps {
  jobs: IJob[];
}

export const JobGrid: React.FC<IJobGridProps> = ({ jobs }) => {
  return (
    <Grid2 container spacing={2}>
      {jobs.map((job) => (
        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={job.id}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <div>{job.title}</div>
              <div>{job.project}</div>
              <div>{job.deadline}</div>
            </CardContent>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );
};
