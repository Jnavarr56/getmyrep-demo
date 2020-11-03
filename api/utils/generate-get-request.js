import axios from "axios";
import queryString from "query-string";

export default async (baseUrl, queryParams) => {
  const requestUrl = queryString.stringifyUrl({
    url: baseUrl,
    query: { ...queryParams },
  });
  const request = axios.get(requestUrl).then(({ data }) => data);
  return request;
};
