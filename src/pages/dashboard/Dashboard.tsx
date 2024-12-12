import { Typography } from "@mui/material";
import { BaseLayout } from "../../layouts/BaseLayout";
import { endOfMonth, startOfMonth, subMonths } from "date-fns";
import { GeneralInfo } from "./components/general-info/GeneralInfo";

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

export const Dashboard = () => {
  return (
    <BaseLayout>
      <Typography variant="h3">Dashboard</Typography>
      <GeneralInfo filter={props} />
    </BaseLayout>
  );
};
