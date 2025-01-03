import { Box, Grid2, Paper, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { AnalyticsService } from "../../../../services/api/analytics/AnalyticsService";
import { convertMinutesToHoursAndMinutes } from "../../../../utils/dateUtils";

interface IGeneralInfoProps {
  filter: {
    startDate: string;
    endDate: string;
    startDateComparison: string;
    endDateComparison: string;
  };
}

export const GeneralInfo: FC<IGeneralInfoProps> = ({ filter }) => {
  const [totalJobs, setTotalJobs] = useState<{
    total: number;
    comparison: number;
  } | null>(null);
  const [totalCompletedJobs, setTotalCompletedJobs] = useState<{
    total: number;
    comparison: number;
  } | null>(null);
  const [averageTime, setAverageTime] = useState<{
    averageTime: number;
    comparisonAverageTime: number;
  } | null>(null);
  const [changePercentage, setChangePercentage] = useState<{
    changePercentage: number;
    comparisonChangePercentage: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    Promise.all([
      AnalyticsService.getTotalJobs(filter),
      AnalyticsService.getJobsAverageTime(filter),
      AnalyticsService.getJobsChangePercentage(filter),
      AnalyticsService.getTotalCompletedJobs(filter),
    ])
      .then(
        ([
          totalJobsData,
          averageTimeData,
          changePercentageData,
          completedJobsData,
        ]) => {
          if (totalJobsData instanceof Error) throw totalJobsData;
          if (averageTimeData instanceof Error) throw averageTimeData;
          if (changePercentageData instanceof Error) throw changePercentageData;
          if (completedJobsData instanceof Error) throw completedJobsData;

          setTotalJobs(totalJobsData);
          setTotalCompletedJobs(completedJobsData);
          setAverageTime(averageTimeData);
          setChangePercentage(changePercentageData);
        },
      )
      .catch((err) => {
        console.error(err);
        setError("Erro ao carregar os dados de análise.");
      })
      .finally(() => setLoading(false));
  }, [filter]);

  if (
    loading ||
    !totalJobs ||
    !averageTime ||
    !changePercentage ||
    !totalCompletedJobs
  ) {
    return <Typography>Carregando...</Typography>;
  }

  if (error) {
    return <Typography>{error}</Typography>;
  }

  const { hours: averageTimeHours, minutes: averageTimeMinutes } =
    convertMinutesToHoursAndMinutes(averageTime?.averageTime || 0);
  const {
    hours: comparisonAverageTimeHours,
    minutes: comparisonAverageTimeMinutes,
  } = convertMinutesToHoursAndMinutes(averageTime?.comparisonAverageTime || 0);

  return (
    <Box mt={4}>
      <Typography variant="h5">Visão Geral</Typography>
      <Grid2 container spacing={2} mt={2}>
        <Grid2 component={Paper} size={{ xs: 12, md: 3 }} sx={{ p: 4 }}>
          <Typography>Total de Jobs</Typography>
          <Typography variant="h4">{totalJobs.total}</Typography>
          <Typography>{totalJobs.comparison}</Typography>
        </Grid2>
        <Grid2 component={Paper} size={{ xs: 12, md: 3 }} sx={{ p: 4 }}>
          <Typography>Tempo médio de resolução</Typography>
          <Typography variant="h4">
            {averageTimeHours.toFixed(0)}h {averageTimeMinutes.toFixed(0)}m
          </Typography>
          <Typography>
            {comparisonAverageTimeHours.toFixed(0)}h{" "}
            {comparisonAverageTimeMinutes.toFixed(0)}m
          </Typography>
        </Grid2>
        <Grid2 component={Paper} size={{ xs: 12, md: 3 }} sx={{ p: 4 }}>
          <Typography>Alterações (%)</Typography>
          <Typography variant="h4">
            {changePercentage.changePercentage.toFixed(2)} %
          </Typography>
          <Typography>
            {changePercentage.comparisonChangePercentage.toFixed(2)} %
          </Typography>
        </Grid2>
        <Grid2 component={Paper} size={{ xs: 12, md: 3 }} sx={{ p: 4 }}>
          <Typography>Jobs concluídos</Typography>
          <Typography variant="h4">{totalCompletedJobs.total}</Typography>
          <Typography>{totalCompletedJobs.comparison}</Typography>
        </Grid2>
      </Grid2>
    </Box>
  );
};
