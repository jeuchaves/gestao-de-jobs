import { startOfDay, subDays } from "date-fns";
import { useState } from "react";

export type TPeriodOption =
  | "today"
  | "yesterday"
  | "last7days"
  | "last28days"
  | "previousPeriod"
  | "custom";

interface IFilterData {
  startDate: string;
  endDate: string;
  startDateComparison: string;
  endDateComparison: string;
}

const defaultPeriod = {
  startDate: startOfDay(new Date()).toISOString().split("T")[0],
  endDate: startOfDay(new Date()).toISOString().split("T")[0],
};

const defaultPeriodComparison = {
  startDateComparison: startOfDay(subDays(new Date(), 1))
    .toISOString()
    .split("T")[0],
  endDateComparison: startOfDay(subDays(new Date(), 1))
    .toISOString()
    .split("T")[0],
};

export const usePeriodSelection = () => {
  const [period, setPeriod] =
    useState<Pick<IFilterData, "startDate" | "endDate">>(defaultPeriod);
  const [comparisonPeriod, setComparisonPeriod] = useState<
    Pick<IFilterData, "startDateComparison" | "endDateComparison">
  >(defaultPeriodComparison);

  const [keyPeriod, setKeyPeriod] = useState<TPeriodOption>("today");
  const [keyComparisonPeriod, setKeyComparisonPeriod] =
    useState<TPeriodOption>("yesterday");

  const selectPeriod = (
    selectedPeriod: TPeriodOption,
    customDate?: { start: Date; end: Date },
  ) => {
    let newPeriod;

    // TO DO - Refactor this to use a single function
    if (selectedPeriod === "custom" && customDate) {
      const start = customDate.start;
      const end = customDate.end;

      // Calcula a diferença em dias entre start e end
      const diffDays = Math.ceil(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
      );

      setPeriod({
        startDate: startOfDay(customDate.start).toISOString().split("T")[0],
        endDate: startOfDay(customDate.end).toISOString().split("T")[0],
      });

      // Gera o período de comparação com a mesma duração, imediatamente anterior
      setComparisonPeriod({
        startDateComparison: startOfDay(subDays(start, diffDays + 1))
          .toISOString()
          .split("T")[0],
        endDateComparison: startOfDay(subDays(start, 1))
          .toISOString()
          .split("T")[0],
      });

      setKeyPeriod("custom");
      setKeyComparisonPeriod("previousPeriod");
      return;
    }

    switch (selectedPeriod) {
      case "last28days":
        newPeriod = {
          startDate: startOfDay(subDays(new Date(), 28)),
          endDate: startOfDay(new Date()),
        };
        setComparisonPeriod({
          startDateComparison: startOfDay(subDays(newPeriod.startDate, 28))
            .toISOString()
            .split("T")[0],
          endDateComparison: startOfDay(subDays(newPeriod.startDate, 1))
            .toISOString()
            .split("T")[0],
        });
        setPeriod({
          startDate: newPeriod.startDate.toISOString().split("T")[0],
          endDate: newPeriod.endDate.toISOString().split("T")[0],
        });
        setKeyPeriod("last28days");
        setKeyComparisonPeriod("previousPeriod");
        break;
      case "last7days":
        newPeriod = {
          startDate: startOfDay(subDays(new Date(), 7)),
          endDate: startOfDay(new Date()),
        };
        setComparisonPeriod({
          startDateComparison: startOfDay(subDays(newPeriod.startDate, 7))
            .toISOString()
            .split("T")[0],
          endDateComparison: startOfDay(subDays(newPeriod.startDate, 1))
            .toISOString()
            .split("T")[0],
        });
        setPeriod({
          startDate: newPeriod.startDate.toISOString().split("T")[0],
          endDate: newPeriod.endDate.toISOString().split("T")[0],
        });
        setKeyPeriod("last7days");
        setKeyComparisonPeriod("previousPeriod");
        break;
      case "yesterday":
        newPeriod = {
          startDate: startOfDay(subDays(new Date(), 1)),
          endDate: startOfDay(subDays(new Date(), 1)),
        };
        setComparisonPeriod({
          startDateComparison: startOfDay(subDays(newPeriod.startDate, 1))
            .toISOString()
            .split("T")[0],
          endDateComparison: startOfDay(subDays(newPeriod.startDate, 1))
            .toISOString()
            .split("T")[0],
        });
        setPeriod({
          startDate: newPeriod.startDate.toISOString().split("T")[0],
          endDate: newPeriod.endDate.toISOString().split("T")[0],
        });
        setKeyPeriod("yesterday");
        setKeyComparisonPeriod("previousPeriod");
        break;
      default:
        setPeriod(defaultPeriod);
        setComparisonPeriod(defaultPeriodComparison);
        setKeyPeriod("today");
    }
  };

  const selectPeriodComparison = (selectedComparisonPeriod: TPeriodOption) => {
    switch (selectedComparisonPeriod) {
      case "last28days":
        setComparisonPeriod({
          startDateComparison: startOfDay(subDays(new Date(), 28))
            .toISOString()
            .split("T")[0],
          endDateComparison: startOfDay(new Date()).toISOString().split("T")[0],
        });
        setKeyComparisonPeriod("last28days");
        break;
      case "last7days":
        setComparisonPeriod({
          startDateComparison: startOfDay(subDays(new Date(), 7))
            .toISOString()
            .split("T")[0],
          endDateComparison: startOfDay(new Date()).toISOString().split("T")[0],
        });
        setKeyComparisonPeriod("last7days");
        break;
      case "previousPeriod":
        console.log("Período anterior selecionado.");
        break;
      default:
        setKeyComparisonPeriod("yesterday");
        setComparisonPeriod(defaultPeriodComparison);
    }
  };

  const periodOptions: { label: string; value: TPeriodOption }[] = [
    { label: "Hoje", value: "today" },
    { label: "Ontem", value: "yesterday" },
    { label: "Últimos 7 dias", value: "last7days" },
    { label: "Últimos 28 dias", value: "last28days" },
    { label: "Personalizado", value: "custom" },
  ];

  const comparisonPeriodOptions: { label: string; value: TPeriodOption }[] = [
    { label: "Ontem", value: "yesterday" },
    { label: "Últimos 7 dias", value: "last7days" },
    { label: "Últimos 28 dias", value: "last28days" },
    { label: "Período anterior", value: "previousPeriod" },
  ];

  return {
    period,
    comparisonPeriod,
    keyPeriod,
    keyComparisonPeriod,
    selectPeriod,
    selectPeriodComparison,
    periodOptions,
    comparisonPeriodOptions,
  };
};
