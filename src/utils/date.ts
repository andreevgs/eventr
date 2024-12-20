import {
  addDays,
  differenceInMinutes,
  format,
  formatRelative,
  isAfter,
  isToday,
} from "date-fns";
import { ru } from "date-fns/locale";

const isAnyDayAfterTomorrow = (date: string): boolean => {
  const now = new Date();
  const dayAfterTomorrow = addDays(now, 1);

  return isAfter(date, dayAfterTomorrow);
};

export const formatLocalizedDate = (date?: string): string => {
  if (!date) return "";
  const now = new Date();

  const minutesDifference = differenceInMinutes(date, now);
  if (isToday(date) && minutesDifference > 0 && minutesDifference < 60) {
    return `через ${minutesDifference} минут`;
  }

  if (isAnyDayAfterTomorrow(date)) {
    return format(date, "Pp", { locale: ru });
  }
  return formatRelative(date, now, { locale: ru });
};

export const getMinDate = (date?: string | Date) => {
  return format(date || new Date(), "yyyy-MM-dd'T'HH:mm");
};

export const formatDateForICS = (date: string) =>
  new Date(date).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

export const isDateValid = (startDate?: string): boolean => {
  return startDate ? isAfter(startDate, new Date()) : true;
};

export const isDateAfterValid = (
  firstDate?: string,
  secondDate?: string
): boolean => {
  return firstDate && secondDate ? isAfter(secondDate, firstDate) : true;
};
