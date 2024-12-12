import { Box, Grid2, Paper, Typography } from "@mui/material";
import { BaseLayout } from "../../layouts/BaseLayout";
import { endOfMonth, startOfMonth, subMonths } from "date-fns";
import { useEffect, useState } from "react";
import { AnalyticsService } from "../../services/api/analytics/AnalyticsService";
import { convertMinutesToHoursAndMinutes } from "../../utils/dateUtils";

export const Dashboard = () => {
  const [totalJobs, setTotalJobs] = useState<{
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
    const props = {
      startDate: startOfMonth(new Date()).toISOString().split("T")[0],
      endDate: endOfMonth(new Date()).toISOString().split("T")[0],
      startDateComparison: startOfMonth(subMonths(new Date(), 1))
        .toISOString()
        .split("T")[0],
      endDateComparison: endOfMonth(subMonths(new Date(), 1))
        .toISOString()
        .split("T")[0],
    };

    setLoading(true);
    setError(null);

    Promise.all([
      AnalyticsService.getTotalJobs(props),
      AnalyticsService.getJobsAverageTime(props),
      AnalyticsService.getJobsChangePercentage(props),
    ])
      .then(([totalJobsData, averageTimeData, changePercentageData]) => {
        if (totalJobsData instanceof Error) throw totalJobsData;
        if (averageTimeData instanceof Error) throw averageTimeData;
        if (changePercentageData instanceof Error) throw changePercentageData;

        setTotalJobs(totalJobsData);
        setAverageTime(averageTimeData);
        setChangePercentage(changePercentageData);
      })
      .catch((err) => {
        console.error(err);
        setError("Erro ao carregar os dados de análise.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || !totalJobs || !averageTime || !changePercentage) {
    return <BaseLayout>Carregando...</BaseLayout>;
  }

  if (error) {
    return <BaseLayout>{error}</BaseLayout>;
  }

  const { hours: averageTimeHours, minutes: averageTimeMinutes } =
    convertMinutesToHoursAndMinutes(averageTime?.averageTime || 0);
  const {
    hours: comparisonAverageTimeHours,
    minutes: comparisonAverageTimeMinutes,
  } = convertMinutesToHoursAndMinutes(averageTime?.comparisonAverageTime || 0);

  return (
    <BaseLayout>
      <Typography variant="h3">Dashboard</Typography>
      <Box mt={4}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            mb: 2,
          }}
        >
          <Box>
            <Typography variant="h5">Visão Geral</Typography>
          </Box>
        </Box>
        <Grid2 container spacing={2}>
          <Grid2 component={Paper} size={{ xs: 12, md: 4 }} sx={{ p: 4 }}>
            <Typography>Total de Jobs</Typography>
            <Typography variant="h4">{totalJobs.total}</Typography>
            <Typography>{totalJobs.comparison}</Typography>
          </Grid2>
          <Grid2 component={Paper} size={{ xs: 12, md: 4 }} sx={{ p: 4 }}>
            <Typography>Tempo médio de resolução</Typography>
            <Typography variant="h4">
              {averageTimeHours}h {averageTimeMinutes}m
            </Typography>
            <Typography>
              {comparisonAverageTimeHours}h {comparisonAverageTimeMinutes}m
            </Typography>
          </Grid2>
          <Grid2 component={Paper} size={{ xs: 12, md: 4 }} sx={{ p: 4 }}>
            <Typography>Alterações (%)</Typography>
            <Typography variant="h4">
              {changePercentage.changePercentage.toFixed(2)} %
            </Typography>
            <Typography>
              {changePercentage.comparisonChangePercentage.toFixed(2)} %
            </Typography>
          </Grid2>
        </Grid2>
      </Box>
    </BaseLayout>
  );
};
