import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { authServices } from "../../../services/api/auth/Login";
import { useNavigate } from "react-router-dom";

type TLoginFormData = {
  email: string;
  senha: string;
};

const loginSchema: yup.ObjectSchema<TLoginFormData> = yup.object({
  email: yup.string().email().required(),
  senha: yup.string().required(),
});

export const PageLogin = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<TLoginFormData> = (data) => {
    authServices.login(data.email, data.senha).then((response) => {
      if (response instanceof Error) {
        console.error(response);
        return;
      }
      navigate("/");
    });
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>
        Fazer login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          component={Paper}
          sx={{ p: 4, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="E-mail"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
          <Controller
            name="senha"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Senha"
                error={!!errors.senha}
                helperText={errors.senha?.message}
                type="password"
              />
            )}
          />
          <Button variant="contained" type="submit">
            Entrar
          </Button>
        </Box>
      </form>
    </Container>
  );
};
