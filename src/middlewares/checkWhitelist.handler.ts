export const checkWhitelist = (
  data: Record<string, any>,
  allowedFields: string[]
) => {
  return Object.keys(data)
    .filter((key) => allowedFields.includes(key))
    .reduce((filteredData: any, key: any) => {
      filteredData[key] = data[key];
      return filteredData;
    }, {});
};
