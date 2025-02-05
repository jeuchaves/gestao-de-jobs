import { Box, Button, Dialog, Grid2, Typography } from "@mui/material";
import { FC } from "react";
import { JobsServices } from "../../../../services/api/jobs/JobsServices";

interface IDialogConfirmDelete {
  id: number | null;
  open: boolean;
  onClose: (update: boolean) => void;
}

export const DialogConfirmDelete: FC<IDialogConfirmDelete> = ({
  id,
  open,
  onClose,
}) => {
  const handleDelete = async () => {
    if (!id) {
      onClose(false);
      return;
    }

    JobsServices.deleteById(id).then((response) => {
      if (response instanceof Error) {
        console.error(response);
        return;
      }
      onClose(true);
    });
  };
  return (
    <Dialog open={open} onClose={() => onClose(false)} maxWidth="xs" fullWidth>
      <Box
        sx={{
          bgcolor: "error.main",
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" textAlign="center" color="text.secondary">
          Excluir Job
        </Typography>
      </Box>
      <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
        <Typography textAlign="center">
          Você está prestes a excluir um job da lista de tarefas, deseja
          continuar?
        </Typography>
      </Box>
      <Grid2 container spacing={2} sx={{ px: 4, pb: 4 }}>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            disableElevation
            onClick={() => onClose(false)}
          >
            Cancelar
          </Button>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Button
            fullWidth
            variant="contained"
            color="error"
            disableElevation
            onClick={handleDelete}
          >
            Excluir
          </Button>
        </Grid2>
      </Grid2>
    </Dialog>
  );
};
