import {
  Autocomplete,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { UserServices } from "../../../../services/api/users/UserServices";
import { IUser } from "../../../../types/users";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  JobsServices,
  TResultCreateMany,
} from "../../../../services/api/jobs/JobsServices";
import { IJobCreate } from "../../../../types/jobs";

export interface ISelectResponsibleProps {
  handleNext: () => void;
  handleBack: () => void;
  getData: () => Partial<IJobCreate>[];
  saveMessage: (message: TResultCreateMany) => void;
}

interface IFormValues {
  responsibleId: number[];
}

export const SelectResponsible: React.FC<ISelectResponsibleProps> = ({
  handleBack,
  handleNext,
  getData,
  saveMessage,
}) => {
  const [usersOptions, setUsersOptions] = useState<IUser[]>([]);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>({
    defaultValues: {
      responsibleId: [],
    },
  });

  useEffect(() => {
    UserServices.getAll({}).then((response) => {
      if (response instanceof Error) {
        console.error(response);
        return;
      }
      setUsersOptions(response);
    });
  }, []);

  const data = getData();

  const onSubmit: SubmitHandler<IFormValues> = (formData) => {
    const hasEmptyFields = formData.responsibleId.some((item) => !item);
    if (hasEmptyFields) {
      alert("Preencha todos os campos");
      return;
    }

    const jobData = data.map((item, index) => ({
      ...item,
      responsibleId: formData.responsibleId[index],
    })) as IJobCreate[];

    JobsServices.createMany(jobData).then((response) => {
      if (response instanceof Error) {
        console.error(response);
        return;
      }
      saveMessage(response);
      handleNext();
    });
  };

  const renderTableRows = useMemo(
    () =>
      data.map((row, index) => (
        <TableRow key={index}>
          <TableCell>{row.nDoc}</TableCell>
          <TableCell>{row.title}</TableCell>
          <TableCell>{row.project}</TableCell>
          <TableCell>
            <Controller
              control={control}
              name={`responsibleId.${index}`}
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
                    usersOptions.find((user) => user.id === field.value) || null
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Responsável"
                      sx={{ width: 200 }}
                      error={!!errors.responsibleId?.[index]}
                      helperText={errors.responsibleId?.[index]?.message}
                    />
                  )}
                />
              )}
            />
          </TableCell>
        </TableRow>
      )),
    [data, usersOptions, control, errors.responsibleId],
  );

  return (
    <>
      <Typography variant="h3" gutterBottom>
        Selecionar responsáveis
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>N° Doc</TableCell>
                <TableCell>Título</TableCell>
                <TableCell>Projeto</TableCell>
                <TableCell>Responsável</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderTableRows}</TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: "flex", justifyContent: "end", mt: 4, gap: 2 }}>
          <Button onClick={handleBack}>Voltar</Button>
          <Button variant="contained" type="submit">
            Enviar
          </Button>
        </Box>
      </Box>
    </>
  );
};
