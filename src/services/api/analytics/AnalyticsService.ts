import { Api } from "../axios-config";

/**
 * Tipos e Interfaces
 */
export type TGetTotalJobs = {
  total: number;
};

export type TGetJobsAverageTime = {
  averageTime: number;
  comparisonAverageTime: number;
};

export type TJobsChangePercentage = {
  changePercentage: number;
  comparisonChangePercentage: number;
};

export interface IUserJobStats {
  userId: number;
  nomeCompleto: string;
  totalJobs: number;
  totalCompletedJobs: number;
}

interface IUserJobsStats {
  users: IUserJobStats[];
  totalJobs: number;
  totalCompletedJobs: number;
}

interface IAnalyticsDateRange {
  startDate: string;
  endDate: string;
}

export interface IAnalyticsComparisonDateRange extends IAnalyticsDateRange {
  startDateComparison: string;
  endDateComparison: string;
}

const getRemainingJobs = async (): Promise<TGetTotalJobs | Error> => {
  try {
    const urlRelativa = "/analytics/remaining-jobs";
    const { data } = await Api.get<TGetTotalJobs>(urlRelativa);
    return data ? data : new Error("Erro ao buscar os registros");
  } catch (error) {
    console.error("AnalyticsService.getTotalJobs", error);
    return new Error(
      (error as { message: string }).message || "Erro ao buscar os registros",
    );
  }
};

const getTotalCompletedJobs = async ({
  startDate,
  endDate,
  startDateComparison,
  endDateComparison,
}: IAnalyticsComparisonDateRange): Promise<TGetTotalJobs | Error> => {
  try {
    const urlRelativa = `/analytics/completed-jobs?startDate=${startDate}&endDate=${endDate}&startDateComparison=${startDateComparison}&endDateComparison=${endDateComparison}`;
    const { data } = await Api.get<TGetTotalJobs>(urlRelativa);
    return data ? data : new Error("Erro ao buscar os registros");
  } catch (error) {
    console.error("AnalyticsService.getTotalJobs", error);
    return new Error(
      (error as { message: string }).message || "Erro ao buscar os registros",
    );
  }
};

const getJobsAverageTime = async ({
  startDate,
  endDate,
  startDateComparison,
  endDateComparison,
}: IAnalyticsComparisonDateRange): Promise<TGetJobsAverageTime | Error> => {
  try {
    const urlRelativa = `/analytics/jobs-average-time?startDate=${startDate}&endDate=${endDate}&startDateComparison=${startDateComparison}&endDateComparison=${endDateComparison}`;
    const { data } = await Api.get<TGetJobsAverageTime>(urlRelativa);
    return data ? data : new Error("Erro ao buscar os registros");
  } catch (error) {
    console.error("AnalyticsService.getTotalJobs", error);
    return new Error(
      (error as { message: string }).message || "Erro ao buscar os registros",
    );
  }
};

const getJobsChangePercentage = async ({
  startDate,
  endDate,
  startDateComparison,
  endDateComparison,
}: IAnalyticsComparisonDateRange): Promise<TJobsChangePercentage | Error> => {
  try {
    const urlRelativa = `/analytics/jobs-change-percentage?startDate=${startDate}&endDate=${endDate}&startDateComparison=${startDateComparison}&endDateComparison=${endDateComparison}`;
    const { data } = await Api.get<TJobsChangePercentage>(urlRelativa);
    return data ? data : new Error("Erro ao buscar os registros");
  } catch (error) {
    console.error("AnalyticsService.getTotalJobs", error);
    return new Error(
      (error as { message: string }).message || "Erro ao buscar os registros",
    );
  }
};

const getUsersJobsStats = async ({
  startDate,
  endDate,
}: IAnalyticsDateRange): Promise<IUserJobsStats | Error> => {
  try {
    const urlRelativa = `/analytics/user-jobs-stats?startDate=${startDate}&endDate=${endDate}`;
    const { data } = await Api.get<IUserJobsStats>(urlRelativa);
    return data ? data : new Error("Erro ao buscar os registros");
  } catch (error) {
    console.error("AnalyticsService.getUsersJobsStats", error);
    return new Error(
      (error as { message: string }).message || "Erro ao buscar os registros",
    );
  }
};

export const AnalyticsService = {
  getRemainingJobs,
  getJobsAverageTime,
  getJobsChangePercentage,
  getUsersJobsStats,
  getTotalCompletedJobs,
};
