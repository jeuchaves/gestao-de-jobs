import { Box, Button, Typography } from "@mui/material";
import { BaseLayout } from "../../layouts/BaseLayout";
import { endOfMonth, startOfMonth, subMonths } from "date-fns";
import { GeneralInfo } from "./components/general-info/GeneralInfo";
import { JobsByResponsible } from "./components/jobs-by-responsible/JobsByResponsible";
import { PersonOutline } from "@mui/icons-material";
import { Progression } from "./components/progression/Progression";

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
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Box>
          <Typography variant="h1" sx={{ color: "text.secondary" }}>
            Dashboard
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Acompanhe aqui suas evoluções tanto individual quanto em equipe.
          </Typography>
        </Box>
        <Button
          size="large"
          variant="contained"
          color="secondary"
          endIcon={<PersonOutline />}
        >
          Progresso Individual
        </Button>
      </Box>
      <GeneralInfo />
      <Progression />
      <JobsByResponsible filter={props} />
    </BaseLayout>
  );
};
