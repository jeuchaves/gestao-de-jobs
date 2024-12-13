import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

interface IDialogAddUserProps {
  open: boolean;
  onClose: (updated: boolean) => void;
}

interface IFormValues {
  nomeCompleto: string;
  email: string;
  senha: string;
  role: string;
  sector: string;
}

const dialogAddUserSchema: yup.ObjectSchema<IFormValues> = yup.object({
  nomeCompleto: yup.string().required(),
  email: yup.string().required(),
  senha: yup.string().required(),
  role: yup.string().required(),
  sector: yup.string().required(),
});

export const DialogAddUser: FC<IDialogAddUserProps> = ({ open, onClose }) => {
  const roleOptions = [
    { value: "admin", label: "Administrador" },
    { value: "collaborator", label: "Colaborador" },
  ];

  const sectorOptions = [
    { value: "digital", label: "Digital" },
    { value: "creative", label: "Criativo" },
    { value: "finance", label: "Financeiro" },
    { value: "customer_service", label: "Atendimento" },
  ];

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<IFormValues>({
    resolver: yupResolver(dialogAddUserSchema),
    defaultValues: {
      role: "collaborator",
    },
  });

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    console.log(data);
    onClose(true);
  };

  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Adicionar usuário</DialogTitle>
        <DialogContent>
          <Grid2 container spacing={2} mt={2}>
            <Grid2 size={12}>
              <TextField
                {...register("nomeCompleto")}
                label="Nome completo"
                fullWidth
                error={!!errors.nomeCompleto}
                helperText={errors.nomeCompleto?.message}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                {...register("email")}
                label="E-mail"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                {...register("senha")}
                label="Senha"
                fullWidth
                error={!!errors.senha}
                helperText={errors.senha?.message}
              />
            </Grid2>
            <Grid2 size={12}>
              <Box mt={2}>
                <Typography>Função</Typography>
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <ToggleButtonGroup
                      {...field}
                      exclusive
                      fullWidth
                      color="primary"
                      onChange={(_, value) => field.onChange(value)}
                      value={field.value}
                    >
                      {roleOptions.map((option) => (
                        <ToggleButton key={option.value} value={option.value}>
                          {option.label}
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                  )}
                />
                {errors.role && (
                  <Box color="error.main" mt={1}>
                    <Typography variant="caption">
                      {errors.role.message}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid2>
            <Grid2 size={12}>
              <Box mt={2}>
                <Typography>Setor</Typography>
                <Controller
                  name="sector"
                  control={control}
                  render={({ field }) => (
                    <ToggleButtonGroup
                      {...field}
                      exclusive
                      fullWidth
                      color="primary"
                      onChange={(_, value) => field.onChange(value)}
                      value={field.value}
                    >
                      {sectorOptions.map((option) => (
                        <ToggleButton key={option.value} value={option.value}>
                          {option.label}
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                  )}
                />
                {errors.sector && (
                  <Box color="error.main" mt={1}>
                    <Typography variant="caption">
                      {errors.sector.message}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose(false)}>Cancelar</Button>
          <Button type="submit" variant="contained">
            Adicionar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
