import { Headers } from "@/store/slices/headers";
import { AxiosResponse } from "axios";
import { api } from "./axios";
import { ApiErrorResponse, ApiResponse, CustomApiException, CustomAxiosError, requestIdHeaderKey } from "./types";

type ApiPostRequestParams<T> = {
  requestBody: T,
  params?: Record<string, string>;
}

type ApiHandlerParams<T> = {
  url: string;
  headers: Headers;
} & (ApiPostRequestParams<T>)

export async function apiPostHandler<T, R>(config: ApiHandlerParams<T>): Promise<AxiosResponse<R>> {
  const paramString = new URLSearchParams(config.params).toString();
  return api.post(config.url, config.requestBody, { headers: config.headers, params: paramString }).then(res => {
    const data = res.data as ApiResponse<T>;
    if (data && data.statusCode <= 201) {
      return res;
    }
    throw new CustomApiException(data as ApiErrorResponse)
  }).catch(err => {
    if (err.response.data.error) {
      throw new CustomApiException(err.response.data)
    }
    throw new CustomAxiosError(config.headers[requestIdHeaderKey], err.response.status)
  })
} 