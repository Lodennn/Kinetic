export const resetDate = (date) => new Date(date).setHours(0, 0, 0, 0);

export const timestampToDate = (timestamp) => timestamp.toDate();

export const formatDate = (date) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("en-US", options);
};
