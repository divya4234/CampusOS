import { useState, useEffect, useCallback } from 'react';

export function useApiRequest(apiFunction, initialParams = null) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const execute = useCallback(async (params = initialParams) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction(params);
      setData(result);
      return result;
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction, initialParams]);

  useEffect(() => {
    if (initialParams) {
      execute(initialParams);
    }
  }, [execute, initialParams]);

  return { data, error, loading, execute, setData };
}
