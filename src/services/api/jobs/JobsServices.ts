import { IJob } from "../../../types/jobs";
import { Api } from "../axios-config";

const createMany = async (body: IJob[]): Promise<number[] | Error> => {
  try {
    const { data } = await Api.post<number[]>("/jobs/many", body);
    if (data && Array.isArray(data)) {
      return data;
    }
    return new Error("Erro ao criar os jobs");
  } catch (error) {
    console.error("UserServices.getAll", error);
    return new Error(
      (error as { message: string }).message || "Erro ao buscar usuários",
    );
  }
};

export const JobsServices = {
  createMany,
};
