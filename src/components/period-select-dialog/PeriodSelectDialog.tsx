import { forwardRef, useImperativeHandle, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
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
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Stack spacing={3} my={2}>
            <DatePicker
              label="Data Inicial"
              value={values.startDate}
              onChange={handleDateChange("startDate")}
              minDate={minDate}
              maxDate={values.endDate || maxDate}
            />
            <DatePicker
              label="Data Final"
              value={values.endDate}
              onChange={handleDateChange("endDate")}
              minDate={values.startDate || minDate}
              maxDate={maxDate}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            disabled={!values.startDate || !values.endDate}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
});
