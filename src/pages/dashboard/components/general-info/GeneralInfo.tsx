import { FC, useEffect, useState } from "react";
import { Box, Grid2, Paper, styled, Typography, useTheme } from "@mui/material";

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

interface INumberTextProps {
  value?: number;
  aboveValueColor?: string;
  belowOrEqualValueColor?: string;
}

const NumberText = styled(Typography)<INumberTextProps>(
  ({ theme, value, aboveValueColor, belowOrEqualValueColor }) => ({
    fontSize: "3rem",
    fontWeight: 900,
    color:
      value === undefined || value > 0
        ? aboveValueColor || theme.palette.primary.light
        : belowOrEqualValueColor || theme.palette.error.light,
  }),
);

export const GeneralInfo: FC<IGeneralInfoProps> = ({ filter }) => {
  const theme = useTheme();

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
      <Typography variant="h2" sx={{ color: "text.secondary" }}>
        Visão Geral
      </Typography>
      <Grid2 container spacing={2} mt={2}>
        <Grid2 component={Paper} size={{ xs: 12, sm: 6, md: 3 }} sx={{ p: 4 }}>
          <Typography variant="h3">Jobs restantes</Typography>
          <NumberText value={totalJobs.total}>{totalJobs.total}</NumberText>
          <Typography>{totalJobs.comparison}</Typography>
        </Grid2>
        <Grid2 component={Paper} size={{ xs: 12, sm: 6, md: 3 }} sx={{ p: 4 }}>
          <Typography variant="h3">Tempo médio</Typography>
          <NumberText value={averageTime.averageTime}>
            {averageTimeHours.toFixed(0)}h {averageTimeMinutes.toFixed(0)}m
          </NumberText>
          <Typography>
            {comparisonAverageTimeHours.toFixed(0)}h{" "}
            {comparisonAverageTimeMinutes.toFixed(0)}m
          </Typography>
        </Grid2>
        <Grid2 component={Paper} size={{ xs: 12, sm: 6, md: 3 }} sx={{ p: 4 }}>
          <Typography variant="h3">Taxa de Alterações</Typography>
          <NumberText value={changePercentage.changePercentage}>
            {changePercentage.changePercentage.toFixed(2)} %
          </NumberText>
          <Typography>
            {changePercentage.comparisonChangePercentage.toFixed(2)} %
          </Typography>
        </Grid2>
        <Grid2
          component={Paper}
          size={{ xs: 12, sm: 6, md: 3 }}
          sx={{ p: 4, bgcolor: "primary.light" }}
        >
          <Typography variant="h3" sx={{ color: "text.secondary" }}>
            Total de Jobs
          </Typography>
          <NumberText aboveValueColor={theme.palette.text.secondary}>
            {totalCompletedJobs.total}
          </NumberText>
          <Typography sx={{ color: "text.secondary" }}>
            {totalCompletedJobs.comparison}
          </Typography>
        </Grid2>
      </Grid2>
    </Box>
  );
};
