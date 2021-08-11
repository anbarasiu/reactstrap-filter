const joinWithoutTrailingDelimiter = (
  input: string[],
  delimiter = ','
): string => {
  let queryString = input.join(delimiter);
  if (queryString.charAt(queryString.length - 1) === delimiter) {
    queryString = queryString.slice(0, -1);
  }
  return queryString;
};

const STRING = {
  joinWithoutTrailingDelimiter,
};

export default STRING;
