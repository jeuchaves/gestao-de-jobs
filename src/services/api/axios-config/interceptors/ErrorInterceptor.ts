import { AxiosError } from "axios";
import { authServices } from "../../auth";

export const errorInterceptor = (error: AxiosError) => {
  // Se houver erro de autenticação
  if (error.status === 401) {
    // Verifica se o usuário está na página de login
    if (window.location.pathname !== "/auth") {
      authServices.logout();
      window.location.href = `/auth?redirect=${window.location.pathname}`;
    }
  }

  return Promise.reject(error);
};
