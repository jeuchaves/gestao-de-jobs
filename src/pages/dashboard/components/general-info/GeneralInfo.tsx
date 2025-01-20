import { FC, useEffect, useState } from "react";
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
import { startOfDay, subDays } from "date-fns";

import {
  AnalyticsService,
  TGetJobsAverageTime,
  TGetTotalJobs,
  TJobsChangePercentage,
} from "../../../../services/api/analytics/AnalyticsService";
import { convertMinutesToHoursAndMinutes } from "../../../../utils/dateUtils";
import { ComparisonInfo } from "./ComparisonInfo";

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

interface IFilterData {
  startDate: string;
  endDate: string;
  startDateComparison: string;
  endDateComparison: string;
}

const defaultPeriod = {
  startDate: startOfDay(new Date()).toISOString().split("T")[0],
  endDate: startOfDay(new Date()).toISOString().split("T")[0],
};

const defaultPeriodComparison = {
  startDateComparison: startOfDay(subDays(new Date(), 1))
    .toISOString()
    .split("T")[0],
  endDateComparison: startOfDay(subDays(new Date(), 1))
    .toISOString()
    .split("T")[0],
};

type TPeriodOption =
  | "today"
  | "yesterday"
  | "last7days"
  | "last28days"
  | "previousPeriod";

const periodOptions: { label: string; value: TPeriodOption }[] = [
  { label: "Hoje", value: "today" },
  { label: "Ontem", value: "yesterday" },
  { label: "Últimos 7 dias", value: "last7days" },
  { label: "Últimos 28 dias", value: "last28days" },
];

const comparisonPeriodOptions: { label: string; value: TPeriodOption }[] = [
  { label: "Ontem", value: "yesterday" },
  { label: "Últimos 7 dias", value: "last7days" },
  { label: "Últimos 28 dias", value: "last28days" },
  { label: "Período anterior", value: "previousPeriod" },
];

export const GeneralInfo = () => {
  const theme = useTheme();

  const [totalJobs, setTotalJobs] = useState<TGetTotalJobs>();
  const [totalCompletedJobs, setTotalCompletedJobs] = useState<TGetTotalJobs>();
  const [averageTime, setAverageTime] = useState<TGetJobsAverageTime>();
  const [changePercent, setChangePercent] = useState<TJobsChangePercentage>();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { hours: averageTimeHours, minutes: averageTimeMinutes } =
    convertMinutesToHoursAndMinutes(averageTime?.averageTime || 0);

  // INÍCIO MENU PERÍODO
  const [period, setPeriod] =
    useState<Pick<IFilterData, "startDate" | "endDate">>(defaultPeriod);
  const [keyPeriod, setKeyPeriod] = useState<TPeriodOption>("today");

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

  const handleSelectPeriod = (period: TPeriodOption) => {
    let newPeriod;
    switch (period) {
      case "last28days":
        newPeriod = {
          startDate: startOfDay(subDays(new Date(), 28)),
          endDate: startOfDay(new Date()),
        };
        setComparisonPeriod({
          startDateComparison: startOfDay(subDays(newPeriod.startDate, 28))
            .toISOString()
            .split("T")[0],
          endDateComparison: startOfDay(subDays(newPeriod.startDate, 1))
            .toISOString()
            .split("T")[0],
        });
        setPeriod({
          startDate: newPeriod.startDate.toISOString().split("T")[0],
          endDate: newPeriod.endDate.toISOString().split("T")[0],
        });
        setKeyPeriod("last28days");
        setKeyComparisonPeriod("previousPeriod");
        break;
      case "last7days":
        newPeriod = {
          startDate: startOfDay(subDays(new Date(), 7)),
          endDate: startOfDay(new Date()),
        };
        setComparisonPeriod({
          startDateComparison: startOfDay(subDays(newPeriod.startDate, 7))
            .toISOString()
            .split("T")[0],
          endDateComparison: startOfDay(subDays(newPeriod.startDate, 1))
            .toISOString()
            .split("T")[0],
        });
        setPeriod({
          startDate: newPeriod.startDate.toISOString().split("T")[0],
          endDate: newPeriod.endDate.toISOString().split("T")[0],
        });
        setKeyPeriod("last7days");
        setKeyComparisonPeriod("previousPeriod");
        break;
      case "yesterday":
        newPeriod = {
          startDate: startOfDay(subDays(new Date(), 1)),
          endDate: startOfDay(subDays(new Date(), 1)),
        };
        setComparisonPeriod({
          startDateComparison: startOfDay(subDays(newPeriod.startDate, 1))
            .toISOString()
            .split("T")[0],
          endDateComparison: startOfDay(subDays(newPeriod.startDate, 1))
            .toISOString()
            .split("T")[0],
        });
        setPeriod({
          startDate: newPeriod.startDate.toISOString().split("T")[0],
          endDate: newPeriod.endDate.toISOString().split("T")[0],
        });
        setKeyPeriod("yesterday");
        setKeyComparisonPeriod("previousPeriod");
        break;
      default:
        setPeriod(defaultPeriod);
        setComparisonPeriod(defaultPeriodComparison);
        setKeyPeriod("today");
    }
    handleClosePeriodMenu();
  };
  // FIM MENU PERÍODO

  // INÍCIO MENU PERÍODO COMPARAÇÃO
  const [comparisonPeriod, setComparisonPeriod] = useState<
    Pick<IFilterData, "startDateComparison" | "endDateComparison">
  >(defaultPeriodComparison);
  const [keyComparisonPeriod, setKeyComparisonPeriod] =
    useState<TPeriodOption>("yesterday");

  const [comparisonPeriodAnchorEl, setComparisonPeriodAnchorEl] =
    useState<null | HTMLElement>(null);
  const openComparisonPeriodMenu = Boolean(comparisonPeriodAnchorEl);

  const handleOpenComparisonPeriodMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setComparisonPeriodAnchorEl(event.currentTarget);
  };

  const handleCloseComparisonPeriodMenu = () => {
    setComparisonPeriodAnchorEl(null);
  };

  const handleSelectPeriodComparison = (period: TPeriodOption) => {
    switch (period) {
      case "last28days":
        setComparisonPeriod({
          startDateComparison: startOfDay(subDays(new Date(), 28))
            .toISOString()
            .split("T")[0],
          endDateComparison: startOfDay(new Date()).toISOString().split("T")[0],
        });
        setKeyComparisonPeriod("last28days");
        break;
      case "last7days":
        setComparisonPeriod({
          startDateComparison: startOfDay(subDays(new Date(), 7))
            .toISOString()
            .split("T")[0],
          endDateComparison: startOfDay(new Date()).toISOString().split("T")[0],
        });
        setKeyComparisonPeriod("last7days");
        break;
      case "previousPeriod":
        console.log("período anterior");
        break;
      default:
        setKeyComparisonPeriod("yesterday");
        setComparisonPeriod(defaultPeriodComparison);
    }
    handleCloseComparisonPeriodMenu();
  };
  // FIM MENU PERÍODO COMPARAÇÃO

  useEffect(() => {
    setLoading(true);
    setError(null);

    Promise.all([
      AnalyticsService.getTotalJobs({ ...period, ...comparisonPeriod }),
      AnalyticsService.getJobsAverageTime({ ...period, ...comparisonPeriod }),
      AnalyticsService.getJobsChangePercentage({
        ...period,
        ...comparisonPeriod,
      }),
      AnalyticsService.getTotalCompletedJobs({
        ...period,
        ...comparisonPeriod,
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
  }, [period, comparisonPeriod]);

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
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Typography sx={{ color: "text.secondary" }}>
              Comparar com:
            </Typography>
            <Button
              onClick={handleOpenComparisonPeriodMenu}
              color="secondary"
              size="large"
              endIcon={<KeyboardArrowDown />}
            >
              {comparisonPeriodOptions.find(
                (option) => option.value === keyComparisonPeriod,
              )?.label || "Comparação"}
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
          <Menu
            onClose={handleCloseComparisonPeriodMenu}
            open={openComparisonPeriodMenu}
            anchorEl={comparisonPeriodAnchorEl}
          >
            {comparisonPeriodOptions.map((option) => (
              <MenuItem
                key={option.value}
                onClick={() => handleSelectPeriodComparison(option.value)}
                disabled
              >
                {option.label}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>
      <Grid2 container spacing={2} mt={2}>
        {/* Jobs restantes */}
        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
          <Box component={Paper} sx={{ height: "100%" }}>
            <Box sx={{ px: 4, py: 2 }}>
              <Typography variant="h3">Jobs restantes</Typography>
              <NumberText value={totalJobs?.total ?? 0}>
                {loading || !totalJobs ? <Skeleton /> : totalJobs.total}
              </NumberText>
              {!loading && totalJobs && (
                <FullWidthChip
                  leftText="média time"
                  rightText={`${totalJobs.total}`}
                />
              )}
            </Box>
            <Divider />
            <ComparisonInfo
              comparison={totalJobs?.comparison}
              current={totalJobs?.total}
              isLoading={loading}
            />
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
                Total de Jobs
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
