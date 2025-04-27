import { Headers } from "@/store/slices/headers"
import { ApiSuccessResponse } from "../types"
import { AxiosResponse } from "axios"
import { apiEndpoints } from "../endpoints"
import { apiPostHandler } from "../api-handler"
import useApiMutation from "@/lib/hooks/use-api-mutation"
import { queryKeys } from "../query-keys"

export type AuthenticateAccountRequest = {
  email: string,
  password: string,
}

export type AuthenticateAccountResponse = ApiSuccessResponse<{
  accessToken: string,
  accountId: number,
  name: string,
  email: string,
}>

function authenticateAccount(data: AuthenticateAccountRequest, headers: Headers): Promise<AxiosResponse<AuthenticateAccountResponse>> {
  return apiPostHandler<AuthenticateAccountRequest, AuthenticateAccountResponse>({
    url: apiEndpoints.account.authenticate,
    requestBody: data,
    headers
  })
}

export function useAuthenticateAccount() {
  return useApiMutation<AuthenticateAccountRequest, AuthenticateAccountResponse>(
    [queryKeys.authenticate],
    authenticateAccount,
  )
}