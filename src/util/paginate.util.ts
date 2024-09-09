export const paginate = (page: any, take: any, totalItems: number) => {
  const pageVal = Number(page) || 1;
  const takeVal = Number(take) || 5;
  const skipVal = (Number(pageVal) - 1) * takeVal;
  const totalPages = Math.ceil(totalItems / takeVal);

  return {
    pageVal,
    takeVal,
    skipVal,
    totalPages,
  };
};
