import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
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
    <Dialog open={open} onClose={() => onClose(false)}>
      <DialogTitle>Excluir job?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Você está prestes a excluir um job. Deseja continuar?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)}>Cancelar</Button>
        <Button onClick={handleDelete} color="error">
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
};
