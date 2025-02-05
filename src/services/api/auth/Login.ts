import { AxiosError } from "axios";
import { IUser } from "../../../types/users";
import { Api } from "../axios-config";

interface ILoginResponse {
  accessToken: string;
  usuario: IUser;
}

export const AUTH_TOKEN = "authToken";
export const AUTH_USER = "usuario";

export const login = async (
  email: string,
  senha: string,
): Promise<ILoginResponse | Error> => {
  try {
    const { data } = await Api.post<ILoginResponse>("/auth/login", {
      email,
      senha,
    });
    if (data.accessToken || data.usuario) {
      const { accessToken, usuario } = data;
      localStorage.setItem(AUTH_TOKEN, accessToken);
      localStorage.setItem(AUTH_USER, JSON.stringify(usuario));
      return { accessToken, usuario };
    }
    return new Error("Erro ao fazer login");
  } catch (error) {
    const err = error as AxiosError;
    if (err.response?.status === 401) {
      return new Error("Usuário ou senha inválidos");
    }
    return new Error("Erro ao fazer login");
  }
};
