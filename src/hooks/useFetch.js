import { useState } from 'react';

const useFetch = (
  path,
  params,
  { data = null, headers: customHeaders = {}, ...customConfig } = {}
) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const url = new URL('/', document.location.origin);
  url.pathname = path;

  if (params) {
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );
  }

  const contentType = data ? { 'Content-Type': 'application/json' } : null;
  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      ...contentType,
      ...customHeaders,
    },
    ...customConfig,
  };

  const fetchData = async () => {
    const result = await window.fetch(url.href, config);

    if (result.ok) {
      const resultAsText = await result.text();

      try {
        const restultAsJson = JSON.parse(resultAsText);
        return setResponse(restultAsJson);
      } catch (e) {
        return setResponse(resultAsText);
      }
    }

    return setError({
      status: result.status,
      message: `An error has occurred: ${result.status}`,
    });
  };

  return { response, error, fetchData };
};

export default useFetch;
