import { FC, useState } from "react";
import { JobsServices } from "../../../../services/api/jobs/JobsServices";
import { Box, Button, Dialog, Grid2, Typography } from "@mui/material";
import { IUser } from "../../../../types/users";
import { IJob } from "../../../../types/jobs";

interface IDialogUpdateResponsibleProps {
  job: IJob;
  open: boolean;
  onClose: (update: boolean) => void;
  users: IUser[];
}

export const DialogUpdateResponsible: FC<IDialogUpdateResponsibleProps> = ({
  job,
  open,
  onClose,
  users,
}) => {
  const [selectedResponsibleId, setSelectedResponsibleId] = useState<number>(
    job.responsibleId,
  );

  const handleSelectResponsible = (responsibleId: number) => {
    setSelectedResponsibleId(responsibleId);
  };

  const handleSave = async () => {
    if (!job) {
      onClose(false);
      return;
    }

    JobsServices.updateResponsible(job.id, selectedResponsibleId).then(
      (response) => {
        if (response instanceof Error) {
          console.error(response);
          return;
        }
        onClose(true);
      },
    );
  };

  return (
    <Dialog open={open} onClose={() => onClose(false)} maxWidth="xs" fullWidth>
      <Box
        sx={{
          bgcolor: "primary.main",
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" textAlign="center" color="text.secondary">
          Alterar Responsável
        </Typography>
        <Typography variant="caption" textAlign="center" color="text.secondary">
          Selecione o novo responsável pelo job escolhido
        </Typography>
      </Box>
      <Box sx={{ p: 4 }}>
        {users.map((user) => (
          <Button
            key={user.id}
            fullWidth
            size="large"
            variant={
              selectedResponsibleId === user.id ? "contained" : "outlined"
            }
            sx={{ my: 1 }}
            onClick={() => handleSelectResponsible(user.id)}
          >
            {user.nomeCompleto}
          </Button>
        ))}
      </Box>
      <Grid2 container spacing={2} sx={{ px: 4, pb: 4 }}>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            disableElevation
            onClick={handleSave}
          >
            Salvar
          </Button>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Button
            fullWidth
            variant="contained"
            color="error"
            disableElevation
            onClick={() => onClose(false)}
          >
            Cancelar
          </Button>
        </Grid2>
      </Grid2>
    </Dialog>
  );
};
