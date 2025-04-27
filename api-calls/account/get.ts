import { Headers } from "@/store/slices/headers"
import { ApiSuccessResponse } from "../types"
import { AxiosResponse } from "axios"
import { apiEndpoints } from "../endpoints"
import { apiPostHandler } from "../api-handler"
import useApiMutation from "@/lib/hooks/use-api-mutation"
import { queryKeys } from "../query-keys"
import { AccountRoles, AccountType, NatureOfWork, RateCurrency, SkillCategory } from "@/lib/enums"

export type GetAccountRequest = {}

export type Address = {
  streetNumber: string;
  streetName: string;
  city: string;
  state: string;
  postCode: string;
};

export type IndividualAccount = {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  address: Address;
};

export type CompanyAccount = {
  companyName: string;
  representativeFirstName: string;
  representativeLastName: string;
  phoneNumber: string;
  businessTaxNumber: string;
  address?: Address;
};

export type Skill = {
  id: number;
  category: SkillCategory;
  experience: number;
  natureOfWork: NatureOfWork;
  hourlyRate: number;
  rateCurrency: RateCurrency;
};

export type Account = {
  id: number;
  email: string;
  role: AccountRoles;
  type: AccountType;
  individualAccount?: IndividualAccount;
  companyAccount?: CompanyAccount;
  skills?: Skill[];
};


export type GetAccountResponse = ApiSuccessResponse<Account>

function getAccount(data: GetAccountRequest, headers: Headers): Promise<AxiosResponse<GetAccountResponse>> {
  return apiPostHandler<GetAccountRequest, GetAccountResponse>({
    url: apiEndpoints.account.get,
    requestBody: data,
    headers
  })
}

export function useGetAccount() {
  return useApiMutation<GetAccountRequest, GetAccountResponse>(
    [queryKeys.getAccount],
    getAccount,
  )
}