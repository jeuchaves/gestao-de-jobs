import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
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
  const complexityOptions = [
    { value: "simple", label: "Simples" },
    { value: "regular", label: "Regular" },
    { value: "complex", label: "Complexo" },
  ];

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<IFormValues>({
    resolver: yupResolver(dialogSchema),
    defaultValues: {
      estimatedComplexity: "",
      actualComplexity: "",
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
    <Dialog open={open} onClose={() => onClose(false)}>
      <DialogTitle>Concluir job?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Preencha as informações abaixo para concluir o job e bom trabalho!
        </DialogContentText>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Box mt={2}>
            <Typography>Complexidade estimada</Typography>
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
                >
                  {complexityOptions.map((option) => (
                    <ToggleButton key={option.value} value={option.value}>
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
          <Box mt={2}>
            <Typography>Complexidade real</Typography>
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
                >
                  {complexityOptions.map((option) => (
                    <ToggleButton key={option.value} value={option.value}>
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
          <Box mt={2}>
            <Typography>Horas trabalhadas (em minutos)</Typography>
            <TextField
              {...register("timeSheet")}
              type="number"
              fullWidth
              error={!!errors.timeSheet}
              helperText={errors.timeSheet?.message}
            />
          </Box>
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
              label="Solicitação de mudança"
            />
          </Box>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)}>Cancelar</Button>
        <Button
          type="submit"
          variant="contained"
          onClick={handleSubmit(onSubmit)}
        >
          Finalizar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
