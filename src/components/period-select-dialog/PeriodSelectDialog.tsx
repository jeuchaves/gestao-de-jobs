import { forwardRef, useImperativeHandle, useState } from "react";
import { Box, Button, Dialog, Grid2, Stack, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";

export interface IPeriodSelectDialogHandles {
  openDialog: (initialValues: IPeriodSelectValues) => void;
  closeDialog: () => void;
}

export interface IPeriodSelectValues {
  startDate?: Date | null;
  endDate?: Date | null;
}

interface IPeriodSelectDialogProps {
  title?: string;
  onConfirm: (values: IPeriodSelectValues) => void;
  minDate?: Date;
  maxDate?: Date;
}

export const PeriodSelectDialog = forwardRef<
  IPeriodSelectDialogHandles,
  IPeriodSelectDialogProps
>(({ title = "Selecione um período", onConfirm, minDate, maxDate }, ref) => {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<IPeriodSelectValues>({
    startDate: null,
    endDate: null,
  });

  useImperativeHandle(ref, () => ({
    openDialog: (initialValues: IPeriodSelectValues) => {
      setValues({
        startDate: initialValues.startDate || null,
        endDate: initialValues.endDate || null,
      });
      setOpen(true);
    },
    closeDialog: () => {
      setOpen(false);
    },
  }));

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    onConfirm(values);
    handleClose();
  };

  const handleDateChange =
    (field: keyof IPeriodSelectValues) => (newValue: Date | null) => {
      setValues((prev) => ({
        ...prev,
        [field]: newValue,
      }));
    };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
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
            {title}
          </Typography>
        </Box>
        <Box sx={{ p: 4 }}>
          <Stack spacing={3} my={2}>
            <DatePicker
              label="Data Inicial"
              value={values.startDate}
              onChange={handleDateChange("startDate")}
              minDate={minDate}
              maxDate={values.endDate || maxDate}
              sx={datePickerStyles}
            />
            <DatePicker
              label="Data Final"
              value={values.endDate}
              onChange={handleDateChange("endDate")}
              minDate={values.startDate || minDate}
              maxDate={maxDate}
              sx={datePickerStyles}
            />
          </Stack>
        </Box>
        <Grid2 container spacing={2} sx={{ px: 4, pb: 4 }}>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              disableElevation
              disabled={!values.startDate || !values.endDate}
              onClick={handleConfirm}
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
              onClick={handleClose}
            >
              Cancelar
            </Button>
          </Grid2>
        </Grid2>
      </Dialog>
    </LocalizationProvider>
  );
});

const datePickerStyles = {
  "& .MuiInputLabel-root": {
    color: "text.primary",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "text.primary",
  },
  "& .MuiSvgIcon-root": {
    color: "primary.main",
  },
};
