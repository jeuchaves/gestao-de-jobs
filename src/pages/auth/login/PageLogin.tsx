import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  keyframes,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import * as yup from "yup";

import { authServices } from "../../../services/api/auth";

import logo from "../../../assets/logos/rise_logo_estendida.svg";
import {
  ArrowForwardRounded,
  VisibilityOffRounded,
  VisibilityRounded,
} from "@mui/icons-material";
import { useState } from "react";

type TLoginFormData = {
  email: string;
  senha: string;
};

const loginSchema: yup.ObjectSchema<TLoginFormData> = yup.object({
  email: yup.string().email().required(),
  senha: yup.string().required(),
});

const initialValues: TLoginFormData = {
  email: "",
  senha: "",
};

const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;

export const PageLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath =
    new URLSearchParams(location.search).get("redirect") || "/";

  const [shakeFields, setShakeFields] = useState(false);
  const [message, setMessage] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<TLoginFormData> = (data) => {
    setLoading(true);
    authServices.login(data.email, data.senha).then((response) => {
      setLoading(false);
      if (response instanceof Error) {
        onError(response);
        return;
      }
      navigate(redirectPath);
    });
  };

  const onError = (error: Error) => {
    setMessage(error.message);
    setShakeFields(true);
    setTimeout(() => {
      setShakeFields(false);
    }, 500);
    setTimeout(() => {
      setMessage(undefined);
    }, 5000);
    reset(initialValues);
  };

  return (
    <Container sx={{ p: 4 }} maxWidth="sm">
      <Box
        component={Paper}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          overflow: "hidden",
        }}
      >
        <Box sx={{ p: 4 }}>
          <Typography variant="h2" textAlign="center">
            Entra aí,{" "}
            <Typography
              variant="inherit"
              component="span"
              sx={{ fontWeight: 800 }}
            >
              criativo
            </Typography>
          </Typography>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: "column",
              px: 4,
              animation: shakeFields ? `${shake} 0.5s` : "none",
            }}
          >
            {message && <Alert severity="error">{message}</Alert>}
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
                  variant="standard"
                  slotProps={{
                    inputLabel: {
                      sx: { color: "text.primary" },
                    },
                  }}
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
                  type={showPassword ? "text" : "password"}
                  variant="standard"
                  slotProps={{
                    input: {
                      endAdornment: (
                        <IconButton
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOffRounded />
                          ) : (
                            <VisibilityRounded />
                          )}
                        </IconButton>
                      ),
                    },
                    inputLabel: {
                      sx: { color: "text.primary" },
                    },
                  }}
                />
              )}
            />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                type="submit"
                endIcon={
                  loading ? (
                    <CircularProgress color="inherit" size="20px" />
                  ) : (
                    <ArrowForwardRounded />
                  )
                }
                size="large"
                sx={{ textTransform: "none" }}
                disabled={loading}
              >
                {loading ? "entrando..." : "entrar"}
              </Button>
            </Box>
          </Box>
        </form>
        <Box sx={{ p: 4, bgcolor: "primary.main" }}>
          <Typography color="text.secondary" textAlign="center">
            powered by{" "}
            <img
              src={logo}
              alt="Rise Logo"
              style={{ height: "20px", verticalAlign: "sub", marginLeft: 2 }}
            />
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};
