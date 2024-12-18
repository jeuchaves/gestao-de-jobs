import { IJob, IJobCreate } from "../../../types/jobs";
import { Api } from "../axios-config";

export interface IFilterJobs {
  page?: number;
  limit?: number;
  filter?: string;
  completed?: boolean;
}

const create = async (body: IJobCreate): Promise<number | Error> => {
  try {
    const { data } = await Api.post<number>("/jobs", body);
    if (data && typeof data === "number") {
      return data;
    }
    return new Error("Erro ao criar o job");
  } catch (error) {
    console.error("UserServices.getAll", error);
    return new Error(
      (error as { message: string }).message || "Erro ao buscar usuários",
    );
  }
};

export type TResultCreateMany = {
  insertedIds: number[];
  duplicates: IJobCreate[];
};
const createMany = async (
  body: IJobCreate[],
): Promise<TResultCreateMany | Error> => {
  try {
    const { data } = await Api.post<TResultCreateMany>("/jobs/many", {
      jobs: body,
    });
    if (data) {
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
  completed,
}: IFilterJobs): Promise<IJob[] | Error> => {
  try {
    const { data } = await Api.get(
      `/jobs?page=${page ?? 1}&limit=${limit ?? 20}&filter=${filter ?? ""}&${completed ? "completed=true" : ""}`,
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

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/jobs/${id}`);
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
  create,
  deleteById,
};
