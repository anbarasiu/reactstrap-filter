import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

export const formatDate = (dateString: string, formatStyle = 'MM/dd/yyyy') => {
  return format(parseISO(dateString), formatStyle, {
    locale: require(`date-fns/locale/en-US/index.js`),
  });
};

export const dateToFormattedString = (
  date: Date,
  formatStyle = 'MM/dd/yyyy'
): string => {
  return format(date, formatStyle);
};

export const formatFilterDate = (
  dateString?: string,
  formatStyle = 'MM/dd/yyyy'
) => {
  const date = dateString ? parseISO(dateString) : new Date();
  return format(date, formatStyle);
};
