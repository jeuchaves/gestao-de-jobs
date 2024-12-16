import { IUser } from "../../../types/users";
import { Api } from "../axios-config";

type TGetAllProps = {
  page?: number;
  limit?: number;
  filter?: string;
};
const getAll = async ({
  page,
  limit,
  filter,
}: TGetAllProps): Promise<IUser[] | Error> => {
  try {
    const urlRelativa = `/usuarios?page=${page ?? 1}&limit=${limit ?? 10}&filter=${filter ?? ""}`;
    const { data } = await Api.get<IUser[]>(urlRelativa);
    if (data && Array.isArray(data)) {
      return data;
    }
    return new Error("Erro ao buscar usuários");
  } catch (error) {
    console.error("UserServices.getAll", error);
    return new Error(
      (error as { message: string }).message || "Erro ao buscar usuários",
    );
  }
};

export type TUserCreate = {
  nomeCompleto: string;
  email: string;
  senha: string;
  role: string;
  sector: string;
};

const create = async (user: TUserCreate): Promise<number | Error> => {
  try {
    const { data } = await Api.post<number>("/auth/signup", user);
    if (data && typeof data === "number") {
      return data;
    }
    return new Error("Erro ao criar usuário");
  } catch (error) {
    console.error("UserServices.create", error);
    return new Error(
      (error as { message: string }).message || "Erro ao criar usuário",
    );
  }
};

export const UserServices = {
  getAll,
  create,
};
