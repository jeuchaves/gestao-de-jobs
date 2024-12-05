import { differenceInDays, format, isToday, isTomorrow } from "date-fns";
import { ptBR } from "date-fns/locale";

export const timeSinceDate = (
  targetDate: string,
): { text: string; isLate: boolean } => {
  const today = new Date();
  const target = new Date(targetDate);

  if (isToday(target)) {
    return { text: "Hoje", isLate: false };
  }

  if (isTomorrow(target)) {
    return { text: "Amanhã", isLate: false };
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
