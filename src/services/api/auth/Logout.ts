import { AUTH_TOKEN, AUTH_USER } from "./Login";

export const logout = () => {
  localStorage.removeItem(AUTH_TOKEN);
  localStorage.removeItem(AUTH_USER);
  window.location.href = "/";
};
