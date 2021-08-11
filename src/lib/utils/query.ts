const QUERY = {
  build: (params: Record<string, unknown>) => {
    const queryString = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join('&');
    return queryString;
  },
};

export default QUERY;
