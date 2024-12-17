import { useCallback, useState } from 'react';

export default function useAsync<T, R>(
  asyncFunction: (params: T) => Promise<R | null>,
) {
  const [data, setData] = useState<R | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const excute = useCallback(
    async (params: T) => {
      try {
        setLoading(true);
        setError(null);
        const response = await asyncFunction(params);
        setData(response);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    },
    [asyncFunction],
  );

  return { data, excute, loading, error };
}
