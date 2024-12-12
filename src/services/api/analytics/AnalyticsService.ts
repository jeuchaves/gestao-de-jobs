import { Api } from "../axios-config";

interface IAnalyticsProps {
  startDate: string;
  endDate: string;
  startDateComparison: string;
  endDateComparison: string;
}

type TGetTotalJobs = {
  total: number;
  comparison: number;
};

type TGetJobsAverageTime = {
  averageTime: number;
  comparisonAverageTime: number;
};

type TJobsChangePercentage = {
  changePercentage: number;
  comparisonChangePercentage: number;
};

const getTotalJobs = async ({
  startDate,
  endDate,
  startDateComparison,
  endDateComparison,
}: IAnalyticsProps): Promise<TGetTotalJobs | Error> => {
  try {
    const urlRelativa = `/analytics/jobs-comparison?startDate=${startDate}&endDate=${endDate}&startDateComparison=${startDateComparison}&endDateComparison=${endDateComparison}`;
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
}: IAnalyticsProps): Promise<TGetJobsAverageTime | Error> => {
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
}: IAnalyticsProps): Promise<TJobsChangePercentage | Error> => {
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

export const AnalyticsService = {
  getTotalJobs,
  getJobsAverageTime,
  getJobsChangePercentage,
};
