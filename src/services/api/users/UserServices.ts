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

export const UserServices = {
  getAll,
};
