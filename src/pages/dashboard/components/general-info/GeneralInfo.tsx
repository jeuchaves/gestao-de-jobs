import { FC, useEffect, useState } from "react";
import {
  Box,
  Divider,
  Grid2,
  Paper,
  styled,
  Typography,
  useTheme,
} from "@mui/material";

import {
  AnalyticsService,
  TGetJobsAverageTime,
  TGetTotalJobs,
  TJobsChangePercentage,
} from "../../../../services/api/analytics/AnalyticsService";
import { convertMinutesToHoursAndMinutes } from "../../../../utils/dateUtils";
import { TrendingDownRounded, TrendingUpRounded } from "@mui/icons-material";

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

const NumberText = styled(Typography, {
  shouldForwardProp: (prop) =>
    prop !== "aboveValueColor" && prop !== "belowOrEqualValueColor",
})<INumberTextProps>(
  ({ theme, value, aboveValueColor, belowOrEqualValueColor }) => ({
    fontSize: "3rem",
    fontWeight: 900,
    color:
      value === undefined || value > 0
        ? aboveValueColor || theme.palette.primary.light
        : belowOrEqualValueColor || theme.palette.error.light,
  }),
);

interface IFullWidthChipProps {
  leftText: string;
  rightText: string;
}
const FullWidthChip: FC<IFullWidthChipProps> = ({ leftText, rightText }) => {
  return (
    <Box
      sx={{
        bgcolor: "secondary.main",
        borderRadius: 8,
        px: "12px",
        py: "6px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="body2">{leftText}</Typography>
      <Typography variant="body2">{rightText}</Typography>
    </Box>
  );
};

export const GeneralInfo: FC<IGeneralInfoProps> = ({ filter }) => {
  const theme = useTheme();

  const [totalJobs, setTotalJobs] = useState<TGetTotalJobs>();
  const [totalCompletedJobs, setTotalCompletedJobs] = useState<TGetTotalJobs>();
  const [averageTime, setAverageTime] = useState<TGetJobsAverageTime>();
  const [changePercent, setChangePercent] = useState<TJobsChangePercentage>();

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
          setChangePercent(changePercentageData);
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
    !changePercent ||
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
        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
          <Box component={Paper} sx={{ height: "100%" }}>
            <Box sx={{ px: 4, py: 2 }}>
              <Typography variant="h3">Jobs restantes</Typography>
              <NumberText value={totalJobs.total}>{totalJobs.total}</NumberText>
              <FullWidthChip
                leftText="média time"
                rightText={`${totalJobs.total}`}
              />
            </Box>
            <Divider />
            <Box
              sx={{
                px: 4,
                py: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              {totalJobs.comparison > totalJobs.total ? (
                <TrendingDownRounded sx={{ color: "error.light" }} />
              ) : (
                <TrendingUpRounded sx={{ color: "primary.light" }} />
              )}
              <Typography
                sx={{
                  color:
                    totalJobs.comparison > totalJobs.total
                      ? "error.light"
                      : "primary.light",
                }}
              >
                {((1 - totalJobs.comparison / totalJobs.total) * 100).toFixed(
                  2,
                )}
                %
              </Typography>
            </Box>
          </Box>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
          <Box component={Paper} sx={{ height: "100%" }}>
            <Box sx={{ px: 4, py: 2 }}>
              <Typography variant="h3">Tempo médio</Typography>
              <NumberText value={averageTime.averageTime}>
                {averageTimeHours.toFixed(0)}h {averageTimeMinutes.toFixed(0)}m
              </NumberText>
              <FullWidthChip
                leftText="média time"
                rightText={`${averageTimeHours.toFixed(0)}h ${averageTimeMinutes.toFixed(0)}m`}
              />
            </Box>
            <Divider />
            <Box
              sx={{
                px: 4,
                py: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              {averageTime.comparisonAverageTime > averageTime.averageTime ? (
                <TrendingDownRounded sx={{ color: "primary.light" }} />
              ) : (
                <TrendingUpRounded sx={{ color: "error.light" }} />
              )}
              <Typography
                sx={{
                  color:
                    averageTime.comparisonAverageTime < averageTime.averageTime
                      ? "error.light"
                      : "primary.light",
                }}
              >
                {comparisonAverageTimeHours.toFixed(0)}h{" "}
                {comparisonAverageTimeMinutes.toFixed(0)}m
              </Typography>
            </Box>
          </Box>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
          <Box component={Paper} sx={{ height: "100%" }}>
            <Box sx={{ px: 4, py: 2 }}>
              <Typography variant="h3">Taxa de Alterações</Typography>
              <NumberText value={changePercent.changePercentage}>
                {changePercent.changePercentage.toFixed(2)} %
              </NumberText>
              <FullWidthChip leftText="média time" rightText={`25%`} />
            </Box>
            <Divider />
            <Box
              sx={{
                px: 4,
                py: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              {changePercent.comparisonChangePercentage >
              changePercent.changePercentage ? (
                <TrendingDownRounded sx={{ color: "primary.light" }} />
              ) : (
                <TrendingUpRounded sx={{ color: "error.light" }} />
              )}
              <Typography
                sx={{
                  color:
                    changePercent.comparisonChangePercentage <
                    changePercent.changePercentage
                      ? "error.light"
                      : "primary.light",
                }}
              >
                {changePercent.comparisonChangePercentage.toFixed(2)} %
              </Typography>
            </Box>
          </Box>
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
