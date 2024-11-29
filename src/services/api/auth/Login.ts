import { Api } from "../axios-config";

export const login = async (email: string, senha: string) => {
  try {
    const response = await Api.post("/auth/login", {
      email,
      senha,
    });
    const { accessToken, usuario } = response.data;
    localStorage.setItem("authToken", accessToken);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    return { accessToken, usuario };
  } catch (error) {
    console.error("Login falhou: ", error);
    throw error;
  }
};
