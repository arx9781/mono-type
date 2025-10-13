export const formatDate = (date) => {
  return date.toLocaleDateString("en-UK", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
