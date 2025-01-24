import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(customParseFormat);

/**
 * Парсит строку в формате `DD-MM-YYYY` и возвращает объект Day.js.
 * @param dateString Строка даты в формате `DD-MM-YYYY`.
 * @returns Объект Day.js или `null`, если дата невалидна.
 */
export function parseDate(dateString: string | null | undefined) {
  if (!dateString) {
    return null;
  }
  const parsedDate = dayjs(dateString, 'DD-MM-YYYY', true); // Строгая проверка формата
  return parsedDate.isValid() ? parsedDate : null;
}

/**
 * Форматирует дату в ISO-формат с UTC.
 * @param date Дата в виде строки или объекта Day.js.
 * @returns Отформатированная дата или пустая строка.
 */
export function formatDateToUTC(date: dayjs.Dayjs | null) {
  return date ? date.utc(true).format() : '';
}

export function customDateFormat(
  date: string | Date | dayjs.Dayjs | null | undefined
): string {
  if (!date || !dayjs(date).isValid()) {
    return '';
  }
  return dayjs(date).format('DD-MM-YYYY');
}
