import { TrendingDownRounded, TrendingUpRounded } from "@mui/icons-material";
import { Box, Skeleton, Typography } from "@mui/material";
import { FC } from "react";

interface IComparisonInfoProps {
  comparison?: number;
  current?: number;
  isLoading?: boolean;
  invertTrend?: boolean;
  formatComparison?: (value: number) => string;
}

export const ComparisonInfo: FC<IComparisonInfoProps> = ({
  comparison = 0,
  current = 0,
  isLoading = false,
  invertTrend = false,
  formatComparison,
}) => {
  comparison = 1000;

  const hasIncreased = invertTrend
    ? current - comparison <= 0
    : current - comparison > 0;
  const dynamicColor = hasIncreased ? "primary.light" : "error.light";

  const formattedComparison = formatComparison
    ? formatComparison(current - comparison)
    : current - comparison;

  return (
    <Box sx={{ px: 4, py: 2 }}>
      {!isLoading ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {hasIncreased ? (
            <TrendingUpRounded sx={{ color: dynamicColor }} />
          ) : (
            <TrendingDownRounded sx={{ color: dynamicColor }} />
          )}
          <Typography sx={{ color: dynamicColor }}>
            {formattedComparison}
          </Typography>
        </Box>
      ) : (
        <Skeleton />
      )}
    </Box>
  );
};
