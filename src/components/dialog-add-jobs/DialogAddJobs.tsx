import { FC, useEffect, useState } from "react";

import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  TextField,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker";
import { yupResolver } from "@hookform/resolvers/yup";
import { IUser } from "../../types/users";
import { ptBR } from "date-fns/locale";
import * as yup from "yup";

import { UserServices } from "../../services/api/users/UserServices";
import { JobsServices } from "../../services/api/jobs/JobsServices";

registerLocale("pt-BR", ptBR);

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
  deadline: Date | null;
  responsibleId: number;
}

const dialogAddJobSchema: yup.ObjectSchema<IFormValues> = yup.object({
  nDoc: yup.string().required(),
  title: yup.string().required(),
  project: yup.string().required(),
  status: yup.string().required(),
  jobSituation: yup.string().required(),
  deadline: yup
    .date()
    .typeError("Informe uma data válida")
    .required("Prazo é obrigatório"),
  responsibleId: yup.number().required(),
});

export const DialogAddJobs: FC<IDialogAddJobsProps> = ({ open, onClose }) => {
  const [usersOptions, setUsersOptions] = useState<IUser[]>([]);

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<IFormValues>({
    resolver: yupResolver(dialogAddJobSchema),
    defaultValues: {
      deadline: null,
    },
  });

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    const formattedData = {
      ...data,
      deadline: data.deadline ? data.deadline.toISOString().split("T")[0] : "",
    };

    JobsServices.create(formattedData).then((response) => {
      if (response instanceof Error) {
        console.error(response);
        return;
      }
      onClose();
    });
  };

  useEffect(() => {
    UserServices.getAll({}).then((response) => {
      if (response instanceof Error) {
        console.error(response);
        return;
      }
      setUsersOptions(response);
    });
  }, []);

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Adicionar Job</DialogTitle>
        <DialogContent>
          <Grid2 container spacing={2} mt={2}>
            <Grid2 size={{ xs: 12, md: 3 }}>
              <TextField
                {...register("nDoc")}
                label="Nº do documento"
                fullWidth
                error={!!errors.nDoc}
                helperText={errors.nDoc?.message}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 9 }}>
              <TextField
                {...register("title")}
                label="Título"
                fullWidth
                error={!!errors.nDoc}
                helperText={errors.nDoc?.message}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                {...register("project")}
                label="Projeto"
                fullWidth
                error={!!errors.nDoc}
                helperText={errors.nDoc?.message}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField
                {...register("status")}
                label="Status"
                fullWidth
                error={!!errors.nDoc}
                helperText={errors.nDoc?.message}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField
                {...register("jobSituation")}
                label="Situação do job"
                fullWidth
                error={!!errors.nDoc}
                helperText={errors.nDoc?.message}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Controller
                control={control}
                name="deadline"
                render={({ field }) => (
                  <DatePicker
                    placeholderText="Prazo"
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    locale="pt-BR"
                    dateFormat="dd/MM/yyyy"
                    customInput={
                      <TextField
                        label="Prazo"
                        fullWidth
                        error={!!errors.deadline}
                        helperText={errors.deadline?.message}
                      />
                    }
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Controller
                control={control}
                name="responsibleId"
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    options={usersOptions}
                    getOptionLabel={(option) => option.nomeCompleto || ""}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    onChange={(_, value) => field.onChange(value?.id)}
                    renderOption={(props, option) => (
                      <li {...props} key={option.id}>
                        {option.nomeCompleto}
                      </li>
                    )}
                    value={
                      usersOptions.find((user) => user.id === field.value) ||
                      null
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Responsável"
                        error={!!errors.responsibleId}
                        helperText={errors.responsibleId?.message}
                        fullWidth
                      />
                    )}
                  />
                )}
              />
            </Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="outlined">
            Cancelar
          </Button>
          <Button type="submit" variant="contained">
            Adicionar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
