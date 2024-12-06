import { IUser } from "../../../types/users";
import { Api } from "../axios-config";

interface ILoginResponse {
  accessToken: string;
  usuario: IUser;
}

export const AUTH_TOKEN = "authToken";
export const AUTH_USER = "usuario";

const login = async (
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
    console.error("Login falhou: ", error);
    throw error;
  }
};

export const authServices = {
  login,
};
