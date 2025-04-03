import React, { FC, useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid2,
  Menu,
  MenuItem,
  Paper,
  Skeleton,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import {
  AnalyticsService,
  TGetJobsAverageTime,
  TGetTotalJobs,
  TJobsChangePercentage,
} from "../../../../services/api/analytics/AnalyticsService";
import { convertMinutesToHoursAndMinutes } from "../../../../utils/dateUtils";
import { ComparisonInfo } from "./ComparisonInfo";
import {
  TPeriodOption,
  usePeriodSelection,
} from "../../../../hooks/usePeriodSelection";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

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

interface IGeneralInfoProps {
  responsibleId?: number;
}

export const GeneralInfo: React.FC<IGeneralInfoProps> = ({ responsibleId }) => {
  const theme = useTheme();

  const [remainingJobs, setRemainingJobs] = useState<TGetTotalJobs>();
  const [totalCompletedJobs, setTotalCompletedJobs] = useState<TGetTotalJobs>();
  const [averageTime, setAverageTime] = useState<TGetJobsAverageTime>();
  const [changePercent, setChangePercent] = useState<TJobsChangePercentage>();

  // TO DO - Refactor this to use a single function
  const [customStartDate, setCustomStartDate] = useState<Date | null>(null);
  const [customEndDate, setCustomEndDate] = useState<Date | null>(null);
  const [showCustomPicker, setShowCustomPicker] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { hours: averageTimeHours, minutes: averageTimeMinutes } =
    convertMinutesToHoursAndMinutes(averageTime?.averageTime || 0);

  const { period, comparisonPeriod, keyPeriod, selectPeriod, periodOptions } =
    usePeriodSelection();

  // INÍCIO MENU PERÍODO
  const [periodAnchorEl, setPeriodAnchorEl] = useState<null | HTMLElement>(
    null,
  );
  const openPeriodMenu = Boolean(periodAnchorEl);
  const handleOpenPeriodMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPeriodAnchorEl(event.currentTarget);
  };
  const handleClosePeriodMenu = () => {
    setPeriodAnchorEl(null);
  };
  const handleSelectPeriod = (selectedPeriod: TPeriodOption) => {
    // TO DO - Refactor this to use a single function
    if (selectedPeriod === "custom") {
      setShowCustomPicker(true);
      return;
    }
    selectPeriod(selectedPeriod);
    handleClosePeriodMenu();
  };

  // TO DO - Refactor this to use a single function
  const handleApplyCustomPeriod = () => {
    if (customStartDate && customEndDate) {
      selectPeriod("custom", {
        start: customStartDate,
        end: customEndDate,
      });
      setShowCustomPicker(false);
      handleClosePeriodMenu();
    }
  };
  // FIM MENU PERÍODO

  useEffect(() => {
    setLoading(true);
    setError(null);

    Promise.all([
      AnalyticsService.getRemainingJobs({ responsibleId }),
      AnalyticsService.getJobsAverageTime({
        ...period,
        ...comparisonPeriod,
        responsibleId,
      }),
      AnalyticsService.getJobsChangePercentage({
        ...period,
        ...comparisonPeriod,
        responsibleId,
      }),
      AnalyticsService.getTotalCompletedJobs({
        ...period,
        ...comparisonPeriod,
        responsibleId,
      }),
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

          setRemainingJobs(totalJobsData);
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
  }, [period, comparisonPeriod, responsibleId]);

  if (error) {
    return <Typography>{error}</Typography>;
  }

  return (
    <Box mt={4}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h2" sx={{ color: "text.secondary" }}>
          Visão Geral
        </Typography>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Typography sx={{ color: "text.secondary" }}>Período:</Typography>
            <Button
              color="secondary"
              size="large"
              endIcon={<KeyboardArrowDown />}
              onClick={handleOpenPeriodMenu}
            >
              {periodOptions.find((option) => option.value === keyPeriod)
                ?.label || "Período"}
            </Button>
          </Box>
          <Menu
            onClose={handleClosePeriodMenu}
            open={openPeriodMenu}
            anchorEl={periodAnchorEl}
          >
            {periodOptions.map((option) => (
              <MenuItem
                key={option.value}
                onClick={() => handleSelectPeriod(option.value)}
              >
                {option.label}
              </MenuItem>
            ))}
          </Menu>
          {showCustomPicker && (
            <Paper sx={{ p: 2, position: "absolute", zIndex: 1, mt: 1 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box display="flex" gap={2} alignItems="center">
                  <DatePicker
                    label="Data Inicial"
                    value={customStartDate}
                    onChange={(newValue) => setCustomStartDate(newValue)}
                  />
                  <DatePicker
                    label="Data Final"
                    value={customEndDate}
                    onChange={(newValue) => setCustomEndDate(newValue)}
                  />
                  <Button
                    variant="contained"
                    onClick={handleApplyCustomPeriod}
                    disabled={!customStartDate || !customEndDate}
                  >
                    Aplicar
                  </Button>
                </Box>
              </LocalizationProvider>
            </Paper>
          )}
        </Box>
      </Box>
      <Grid2 container spacing={2} mt={2}>
        {/* Jobs restantes */}
        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
          <Box component={Paper} sx={{ height: "100%" }}>
            <Box sx={{ px: 4, py: 2 }}>
              <Typography variant="h3">Jobs restantes</Typography>
              <NumberText value={remainingJobs?.total ?? 0}>
                {loading || !remainingJobs ? <Skeleton /> : remainingJobs.total}
              </NumberText>
              {!loading && remainingJobs && (
                <FullWidthChip
                  leftText="média time"
                  rightText={`${remainingJobs.total}`}
                />
              )}
            </Box>
            <Divider />
          </Box>
        </Grid2>
        {/* Tempo médio */}
        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
          <Box component={Paper} sx={{ height: "100%" }}>
            <Box sx={{ px: 4, py: 2 }}>
              <Typography variant="h3">Tempo médio</Typography>
              <NumberText value={averageTime?.averageTime ?? 0}>
                {loading || !averageTime ? (
                  <Skeleton />
                ) : (
                  `${averageTimeHours.toFixed(0)}h ${averageTimeMinutes.toFixed(
                    0,
                  )}m`
                )}
              </NumberText>
              {!loading && averageTime && (
                <FullWidthChip
                  leftText="média time"
                  rightText={`${averageTimeHours.toFixed(0)}h ${averageTimeMinutes.toFixed(0)}m`}
                />
              )}
            </Box>
            <Divider />
            <ComparisonInfo
              isLoading={loading}
              comparison={averageTime?.comparisonAverageTime}
              current={averageTime?.averageTime}
              invertTrend
              formatComparison={(value) => {
                const { hours, minutes } =
                  convertMinutesToHoursAndMinutes(value);
                return `${hours.toFixed(0)}h ${minutes.toFixed(0)}m`;
              }}
            />
          </Box>
        </Grid2>
        {/* Taxa de alterações */}
        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
          <Box component={Paper} sx={{ height: "100%" }}>
            <Box sx={{ px: 4, py: 2 }}>
              <Typography variant="h3">Taxa de Alterações</Typography>
              <NumberText value={changePercent?.changePercentage ?? 0}>
                {loading || !changePercent ? (
                  <Skeleton />
                ) : (
                  changePercent.changePercentage.toFixed(2) + "%"
                )}
              </NumberText>
              {!loading && changePercent && (
                <FullWidthChip leftText="média time" rightText={`25%`} />
              )}
            </Box>
            <Divider />
            <ComparisonInfo
              isLoading={loading}
              comparison={changePercent?.comparisonChangePercentage}
              current={changePercent?.changePercentage}
              invertTrend
              formatComparison={(value) => `${value.toFixed(2)}%`}
            />
          </Box>
        </Grid2>
        {/* Total de jobs */}
        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
          <Box
            component={Paper}
            sx={{ height: "100%", bgcolor: "primary.light" }}
          >
            <Box sx={{ px: 4, py: 2 }}>
              <Typography variant="h3" sx={{ color: "text.secondary" }}>
                Jobs Concluídos
              </Typography>
              <NumberText aboveValueColor={theme.palette.text.secondary}>
                {loading || !totalCompletedJobs ? (
                  <Skeleton />
                ) : (
                  totalCompletedJobs.total
                )}
              </NumberText>
            </Box>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};
