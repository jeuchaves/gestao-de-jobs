import { IUser } from "../../../types/users";
import { Api } from "../axios-config";

interface ILoginResponse {
  accessToken: string;
  usuario: IUser;
}

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
      localStorage.setItem("authToken", accessToken);
      localStorage.setItem("usuario", JSON.stringify(usuario));
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
