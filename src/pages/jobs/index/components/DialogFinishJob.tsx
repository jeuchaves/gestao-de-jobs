import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  FormControlLabel,
  Grid2,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { JobsServices } from "../../../../services/api/jobs/JobsServices";

interface IDialogFinishJobProps {
  open: boolean;
  onClose: (updated: boolean) => void;
  jobId: number | null;
}

interface IFormValues {
  estimatedComplexity: string;
  actualComplexity: string;
  contingencies?: string;
  timeSheet: number;
  isChangeRequest: boolean;
}

const dialogSchema: yup.ObjectSchema<IFormValues> = yup.object({
  estimatedComplexity: yup.string().required("Campo obrigatório"),
  actualComplexity: yup.string().required("Campo obrigatório"),
  contingencies: yup.string().max(500, "Máximo de 500 caracteres"),
  timeSheet: yup
    .number()
    .typeError("Deve ser um número")
    .positive("Deve ser maior que zero")
    .required("Campo obrigatório"),
  isChangeRequest: yup.boolean().required(),
});

export const DialogFinishJob: React.FC<IDialogFinishJobProps> = ({
  open,
  onClose,
  jobId,
}) => {
  const theme = useTheme();

  const complexityOptions = [
    {
      value: "simple",
      label: "Simples",
      color: theme.palette.text.primary,
      bgcolor: theme.palette.secondary.main,
    },
    {
      value: "regular",
      label: "Regular",
      color: theme.palette.common.white,
      bgcolor: theme.palette.error.main,
    },
    {
      value: "complex",
      label: "Complexo",
      color: theme.palette.common.white,
      bgcolor: theme.palette.primary.main,
    },
  ];

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<IFormValues>({
    resolver: yupResolver(dialogSchema),
    defaultValues: {
      estimatedComplexity: "simple",
      actualComplexity: "simple",
      contingencies: "",
      timeSheet: 0,
      isChangeRequest: false,
    },
  });

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    if (!jobId) {
      console.error("Job ID not found");
      return;
    }
    JobsServices.finishJob(jobId, data).then((response) => {
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
          bgcolor: "secondary.main",
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" textAlign="center">
          Concluir Job
        </Typography>
        <Typography variant="caption" textAlign="center">
          Preencha as informações abaixo para conclusão de job.
        </Typography>
      </Box>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 4 }}>
        {/* Complexidade estimada */}
        <Box mt={2}>
          <Typography gutterBottom>Complexidade estimada</Typography>
          <Controller
            name="estimatedComplexity"
            control={control}
            render={({ field }) => (
              <ToggleButtonGroup
                {...field}
                exclusive
                fullWidth
                color="primary"
                onChange={(_, value) => field.onChange(value)}
                value={field.value}
                sx={{
                  borderRadius: "50px",
                  overflow: "hidden",
                }}
              >
                {complexityOptions.map((option) => (
                  <ToggleButton
                    key={option.value}
                    value={option.value}
                    sx={{
                      borderRadius: "50px",
                      "&.Mui-selected": {
                        backgroundColor: option.bgcolor,
                        color: option.color,
                      },
                    }}
                  >
                    {option.label}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            )}
          />
          {errors.estimatedComplexity && (
            <Box color="error.main" mt={1}>
              <Typography variant="caption">
                {errors.estimatedComplexity.message}
              </Typography>
            </Box>
          )}
        </Box>
        {/* Complexidade real */}
        <Box mt={2}>
          <Typography gutterBottom>Complexidade real</Typography>
          <Controller
            name="actualComplexity"
            control={control}
            render={({ field }) => (
              <ToggleButtonGroup
                {...field}
                exclusive
                fullWidth
                color="primary"
                onChange={(_, value) => field.onChange(value)}
                value={field.value}
                sx={{
                  borderRadius: "50px",
                  overflow: "hidden",
                }}
              >
                {complexityOptions.map((option) => (
                  <ToggleButton
                    key={option.value}
                    value={option.value}
                    sx={{
                      borderRadius: "50px",
                      "&.Mui-selected": {
                        backgroundColor: option.bgcolor,
                        color: option.color,
                      },
                    }}
                  >
                    {option.label}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            )}
          />
          {errors.actualComplexity && (
            <Box color="error.main" mt={1}>
              <Typography variant="caption">
                {errors.actualComplexity.message}
              </Typography>
            </Box>
          )}
        </Box>
        {/* Minutos trabalhados */}
        <Box mt={2}>
          <Typography>Minutos trabalhados</Typography>
          <TextField
            {...register("timeSheet")}
            type="number"
            fullWidth
            error={!!errors.timeSheet}
            helperText={errors.timeSheet?.message}
          />
        </Box>
        {/* Alteração */}
        <Box mt={2}>
          <FormControlLabel
            control={
              <Controller
                name="isChangeRequest"
                control={control}
                render={({ field }) => (
                  <Checkbox {...field} checked={field.value} />
                )}
              />
            }
            label="Esse job é uma alteração"
          />
        </Box>
        {/* Observações */}
        <Box mt={2}>
          <Typography>Observações</Typography>
          <TextField
            {...register("contingencies")}
            multiline
            rows={4}
            fullWidth
            error={!!errors.contingencies}
            helperText={errors.contingencies?.message}
          />
        </Box>
      </Box>
      <Grid2 container spacing={2} sx={{ px: 4, pb: 4 }}>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            disableElevation
            onClick={handleSubmit(onSubmit)}
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
