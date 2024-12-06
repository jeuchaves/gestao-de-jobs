import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

interface IDialogAddJobsProps {
  open: boolean;
  onClose: () => void;
}

interface IFormValues {
  nDoc: string;
  title: string;
  project: string;
  status: string;
  jobSituation: string;
  deadline: string;
  responsibleId: number;
}

const dialogAddJobSchema: yup.ObjectSchema<IFormValues> = yup.object({
  nDoc: yup.string().required(),
  title: yup.string().required(),
  project: yup.string().required(),
  status: yup.string().required(),
  jobSituation: yup.string().required(),
  deadline: yup.string().required(),
  responsibleId: yup.number().required(),
});

export const DialogAddJobs: FC<IDialogAddJobsProps> = ({ open, onClose }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormValues>({
    resolver: yupResolver(dialogAddJobSchema),
  });

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    console.log(data);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Adicionar Job</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Box mt={2}>
            <TextField
              {...register("nDoc")}
              label="Nº do documento"
              fullWidth
              error={!!errors.nDoc}
              helperText={errors.nDoc?.message}
            />
          </Box>
          <Box mt={2}>
            <TextField
              {...register("title")}
              label="Título"
              fullWidth
              error={!!errors.nDoc}
              helperText={errors.nDoc?.message}
            />
          </Box>
          <Box mt={2}>
            <TextField
              {...register("project")}
              label="Projeto"
              fullWidth
              error={!!errors.nDoc}
              helperText={errors.nDoc?.message}
            />
          </Box>
          <Box mt={2}>
            <TextField
              {...register("status")}
              label="Status"
              fullWidth
              error={!!errors.nDoc}
              helperText={errors.nDoc?.message}
            />
          </Box>
          <Box mt={2}>
            <TextField
              {...register("jobSituation")}
              label="Situação do job"
              fullWidth
              error={!!errors.nDoc}
              helperText={errors.nDoc?.message}
            />
          </Box>
          <Box mt={2}>
            <TextField
              {...register("deadline")}
              label="Prazo"
              fullWidth
              error={!!errors.nDoc}
              helperText={errors.nDoc?.message}
            />
          </Box>
          <Box mt={2}>
            <TextField
              {...register("responsibleId")}
              label="Responsável"
              fullWidth
              error={!!errors.nDoc}
              helperText={errors.nDoc?.message}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancelar
        </Button>
        <Button type="submit" variant="contained">
          Adicionar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
