import axios, { AxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';

export default function useAsync<T, R>(
  asyncFunction: (params: T) => Promise<R | null>,
) {
  const [data, setData] = useState<R | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorStatus, setErrorStatus] = useState<number | null>(null);

  const excute = useCallback(
    async (params: T) => {
      try {
        setLoading(true);
        setError(null);
        const response = await asyncFunction(params);
        setData(response);
      } catch (err) {
        setError(err as AxiosError);
      } finally {
        setLoading(false);
      }
    },
    [asyncFunction],
  );

  const clear = useCallback(() => setData(null), []);

  useEffect(() => {
    if (axios.isAxiosError(error)) {
      const { message } = error.response?.data as {
        message: string;
      };
      setErrorMessage(message || 'Error Occured');
      setErrorStatus(error.status || null);
    } else {
      setErrorMessage(null);
      setErrorStatus(null);
    }
  }, [error]);

  return { data, excute, loading, error, errorMessage, errorStatus, clear };
}
