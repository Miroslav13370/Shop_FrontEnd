export const formatDateRu = (date: string) => {
  const formatDate = new Date(date);

  return formatDate.toLocaleDateString('ru-RU');
};
