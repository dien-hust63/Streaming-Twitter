import { useCallback } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { createContext, ReactNode, useMemo, useState } from "react";
import { dataClient } from "src/configs/api";

interface DataContextProps {
  loading: boolean;
  data: any;
  error: Error | undefined;
  fetchData?: () => void;
}

const DataContext = createContext<DataContextProps>({
  loading: false,
  data: {},
  error: undefined,
});

export function DataProvider({ children }: { children: ReactNode }) {
  const client = dataClient;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [data, setData] = useState<any>([]);
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await client.get("/");
      setData(result.data);
    } catch (err) {
      console.error(err);
      setError(err as Error);
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const contextData = useMemo(() => {
    return {
      loading,
      error,
      data,
      fetchData,
    };
  }, [loading, error, data, fetchData]);
  return (
    <DataContext.Provider value={contextData}>{children}</DataContext.Provider>
  );
}
export const useDataContext = () => useContext(DataContext);
