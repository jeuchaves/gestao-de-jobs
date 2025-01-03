import { differenceInDays, parseISO, startOfDay } from "date-fns";

export const timeSinceDate = (
  targetDate: string,
): { text: string; isLate: boolean } => {
  const parsedDate = parseISO(targetDate);

  if (isNaN(parsedDate.getTime())) {
    return { text: "Data inválida", isLate: false };
  }

  const today = startOfDay(new Date());
  const target = startOfDay(parsedDate);

  const difference = differenceInDays(target, today);

  if (difference === 0) {
    // Today
    return { text: "Hoje", isLate: false };
  } else if (difference === -1) {
    // Yesterday
    return { text: "Ontem", isLate: true };
  } else if (difference === 1) {
    // Tomorrow
    return { text: "Amanhã", isLate: false };
  } else if (difference > 1) {
    // Future
    return {
      text: `${difference} dia${difference > 1 ? "s" : ""} restante${difference > 1 ? "s" : ""}`,
      isLate: false,
    };
  } else {
    // Past
    const lateDays = Math.abs(difference);
    return {
      text: `${lateDays} dia${lateDays > 1 ? "s" : ""} em atraso`,
      isLate: true,
    };
  }
};

export const convertMinutesToHoursAndMinutes = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return { hours, minutes: remainingMinutes };
};
