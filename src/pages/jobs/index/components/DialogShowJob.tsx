import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid2,
  Typography,
} from "@mui/material";
import { IJob } from "../../../../types/jobs";
import { FC } from "react";
import { grey } from "@mui/material/colors";
import { convertMinutesToHoursAndMinutes } from "../../../../utils/dateUtils";
import { format } from "date-fns";
import { jobComplexity } from "../../../../utils/recordUtils";

interface IDialogShowJobProps {
  job: IJob | null;
  open: boolean;
  onClose: () => void;
}

export const DialogShowJob: FC<IDialogShowJobProps> = ({
  job,
  open,
  onClose,
}) => {
  if (!job) {
    return null;
  }

  const renderInfo = (title: string, text: string) => (
    <Grid2 container spacing={2}>
      <Grid2 size={6}>
        <Typography color={grey[600]}>{title}</Typography>
      </Grid2>
      <Grid2 size={6}>
        <Typography>{text}</Typography>
      </Grid2>
    </Grid2>
  );

  const { hours: estimatedHours, minutes: estimatedMinutes } =
    convertMinutesToHoursAndMinutes(job?.timeSheet || 0);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{job.title}</DialogTitle>
      <DialogContent>
        <Box>
          <Typography variant="h6" sx={{ my: 2 }}>
            Informações do job
          </Typography>
          {renderInfo("Projeto", job.project)}
          <Divider sx={{ my: 2 }} />
          {renderInfo("Status", job.status)}
          <Divider sx={{ my: 2 }} />
          {renderInfo("Tipo", job.typeDoc)}
          <Divider sx={{ my: 2 }} />
          {renderInfo("Prazo", format(new Date(job.deadline), "dd/MM/yyyy"))}
          {job.timeSheet > 0 ? (
            <>
              <Typography variant="h6" sx={{ my: 2 }}>
                Informações da conclusão
              </Typography>
              {renderInfo("Responsável", job.responsibleName)}
              <Divider sx={{ my: 2 }} />
              {job.estimatedComplexity
                ? renderInfo(
                    "Complexidade estimada",
                    jobComplexity[job.estimatedComplexity],
                  )
                : null}
              <Divider sx={{ my: 2 }} />
              {job.actualComplexity
                ? renderInfo(
                    "Complexidade atual",
                    jobComplexity[job.actualComplexity],
                  )
                : null}
              <Divider sx={{ my: 2 }} />
              {renderInfo("É alteração?", job.isChangeRequest ? "Sim" : "Não")}
              <Divider sx={{ my: 2 }} />
              {renderInfo(
                "Horas trabalhadas",
                `${estimatedHours}h ${estimatedMinutes}m`,
              )}
              <Divider sx={{ my: 2 }} />
              {job.contingencies
                ? renderInfo("Contingências", job.contingencies)
                : null}
            </>
          ) : null}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Voltar</Button>
      </DialogActions>
    </Dialog>
  );
};
