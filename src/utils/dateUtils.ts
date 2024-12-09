import {
  differenceInDays,
  format,
  isToday,
  isTomorrow,
  isYesterday,
  parse,
  startOfDay,
} from "date-fns";
import { ptBR } from "date-fns/locale";

export const timeSinceDate = (
  targetDate: string,
): { text: string; isLate: boolean } => {
  const parsedDate = parse(targetDate, "yyyy-MM-dd", new Date());

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
    return { text: `${difference} dias restantes`, isLate: false };
  }

  if (difference < 0) {
    return { text: `${Math.abs(difference)} dias em atraso`, isLate: true };
  }

  return {
    text: format(target, "dd/MM/yyyy", { locale: ptBR }),
    isLate: false,
  };
};
