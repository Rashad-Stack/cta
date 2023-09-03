export const dateFormate = (date: string) => {
  const originalDate = new Date(date);
  return `${originalDate.getDate()}-${
    originalDate.getMonth() + 1
  }-${originalDate.getFullYear()}, ${originalDate.getHours()}:${originalDate
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
};
