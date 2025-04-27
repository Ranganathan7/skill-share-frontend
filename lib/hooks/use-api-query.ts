import { CustomApiException } from "@/api-calls/types";
import { QueryKey, UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

type QueryFunction<T> = () => Promise<AxiosResponse<T>>;

export default function useApiQuery<T>(
  queryKey: QueryKey,
  queryFunction: QueryFunction<T>,
  options?: Partial<UseQueryOptions<AxiosResponse<T>, CustomApiException>>,
) {
  const query = useQuery<AxiosResponse<T>, CustomApiException>({
    retry: false,
    ...options,
    queryKey,
    queryFn: queryFunction
  })
  return query;
}