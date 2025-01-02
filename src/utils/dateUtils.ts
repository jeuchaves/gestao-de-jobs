import {
  differenceInDays,
  format,
  isToday,
  isTomorrow,
  isYesterday,
  parseISO,
  startOfDay,
} from "date-fns";
import { ptBR } from "date-fns/locale";

export const timeSinceDate = (
  targetDate: string,
): { text: string; isLate: boolean } => {
  const parsedDate = parseISO(targetDate);

  if (isNaN(parsedDate.getTime())) {
    return { text: "Data inválida", isLate: false };
  }

  const today = startOfDay(new Date());
  const target = startOfDay(parsedDate);

  if (isToday(target)) {
    return { text: "Hoje", isLate: false };
  }

  if (isTomorrow(target)) {
    return { text: "Amanhã", isLate: false };
  }

  if (isYesterday(target)) {
    return { text: "Ontem", isLate: true };
  }

  const difference = differenceInDays(target, today);

  if (difference > 0) {
    return {
      text: `${difference} dia${difference > 1 ? "s" : ""} restante${difference > 1 ? "s" : ""}`,
      isLate: false,
    };
  }

  if (difference < 0) {
    const lateDays = Math.abs(difference);
    return {
      text: `${lateDays} dia${lateDays > 1 ? "s" : ""} em atraso`,
      isLate: true,
    };
  }

  return {
    text: format(target, "dd/MM/yyyy", { locale: ptBR }),
    isLate: false,
  };
};

export const convertMinutesToHoursAndMinutes = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return { hours, minutes: remainingMinutes };
};
