import { Box, Grid2, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import {
  AnalyticsService,
  IUserJobStats,
} from "../../../../services/api/analytics/AnalyticsService";
import { GaugeComponent } from "./GaugeComponent";

interface IJobsByResponsibleProps {
  filter: {
    startDate: string;
    endDate: string;
  };
}

export const JobsByResponsible: FC<IJobsByResponsibleProps> = ({ filter }) => {
  const [userJobStats, setUserJobStats] = useState<IUserJobStats[]>([]);
  const [totalJobs, setTotalJobs] = useState<{
    totalJobs: number;
    totalCompletedJobs: number;
  }>({ totalJobs: 0, totalCompletedJobs: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    AnalyticsService.getUsersJobsStats(filter).then((response) => {
      if (response instanceof Error) {
        console.error("JobsByResponsible", response);
        setIsError(true);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      setIsError(false);
      setUserJobStats(response.users);
      setTotalJobs({
        totalJobs: response.totalJobs,
        totalCompletedJobs: response.totalCompletedJobs,
      });
    });
  }, [filter]);

  if (isLoading) {
    return <Typography>Carregando...</Typography>;
  }

  if (isError) {
    return <Typography>Erro ao carregar os dados</Typography>;
  }

  if (!userJobStats.length) {
    return <Typography>Nenhum dado encontrado</Typography>;
  }

  return (
    <Box mt={4}>
      <Typography variant="h5">Jobs por responsável</Typography>
      <Grid2 mt={2} container spacing={2}>
        {totalJobs.totalJobs > 0 && (
          <GaugeComponent
            userName="Total"
            totalCompletedJobs={totalJobs.totalCompletedJobs}
            totalJobs={totalJobs.totalJobs}
          />
        )}
        {userJobStats.map((user) => (
          <GaugeComponent
            key={user.userId}
            userName={user.nomeCompleto}
            totalCompletedJobs={user.totalCompletedJobs}
            totalJobs={user.totalJobs}
          />
        ))}
      </Grid2>
    </Box>
  );
};
