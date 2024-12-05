import { IJob, IJobCreate } from "../../../types/jobs";
import { Api } from "../axios-config";

export interface IFilterJobs {
  page?: number;
  limit?: number;
  filter?: string;
}

const createMany = async (body: IJobCreate[]): Promise<number[] | Error> => {
  try {
    const { data } = await Api.post<number[]>("/jobs/many", { jobs: body });
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

const getAll = async ({
  page,
  limit,
  filter,
}: IFilterJobs): Promise<IJob[] | Error> => {
  try {
    const { data } = await Api.get(
      `/jobs?page=${page ?? 1}&limit=${limit ?? 20}&filter=${filter ?? ""}`,
    );
    if (data && Array.isArray(data)) {
      return data;
    }
    return new Error("Erro ao buscar os jobs");
  } catch (error) {
    console.error("UserServices.getAll", error);
    return new Error(
      (error as { message: string }).message || "Erro ao buscar usuários",
    );
  }
};

const finishJob = async (
  id: number,
  data: Partial<IJob>,
): Promise<void | Error> => {
  try {
    await Api.patch(`/jobs/${id}`, data);
  } catch (error) {
    console.error("UserServices.getAll", error);
    return new Error(
      (error as { message: string }).message || "Erro ao buscar usuários",
    );
  }
};

export const JobsServices = {
  createMany,
  getAll,
  finishJob,
};
