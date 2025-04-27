import { MutationKey, useMutation, UseMutationOptions } from "@tanstack/react-query";
import { Headers } from '../../store/slices/headers';
import { AxiosResponse } from "axios";
import { CustomApiException, requestIdHeaderKey } from "@/api-calls/types";
import { useAppSelector } from "./redux-toolkit";
import { v4 as uuidv4 } from 'uuid';

type MutationFunction<R, T> = (data: R, headers: Headers) => Promise<AxiosResponse<T>>;

export default function useApiMutation<R, T>(
  mutationKey: MutationKey,
  mutationFunction: MutationFunction<R, T>,
  options?: UseMutationOptions<AxiosResponse<T>, CustomApiException, R>,
) {
  const headers = useAppSelector(state => state.headers)
  const mutation = useMutation<AxiosResponse<T>, CustomApiException, R>({
    ...options,
    mutationKey,
    mutationFn: async (data: R) => mutationFunction(data, { ...headers, [requestIdHeaderKey]: uuidv4() })
  })
  return mutation
}