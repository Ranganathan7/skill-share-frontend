import { Headers } from "@/store/slices/headers"
import { ApiSuccessResponse, requestIdHeaderKey } from "../types"
import { AxiosResponse } from "axios"
import { apiEndpoints } from "../endpoints"
import { apiPostHandler } from "../api-handler"
import { queryKeys } from "../query-keys"
import useApiQuery from "@/lib/hooks/use-api-query"
import { useAppSelector } from "@/lib/hooks/redux-toolkit"
import { v4 as uuidv4 } from 'uuid';
import { SkillCategory, RateCurrency, TaskStatus } from "@/lib/enums"
import { Account } from "../account/get"

export type GetTasksRequest = {}

// Progress type
export type ProgressType = {
  description: string;
  timestamp: string; // ISO string format for date
};

// Task Type
export type TaskType = {
  id: number;
  category: SkillCategory;
  name: string;
  description: string;
  expectedStartDate: string; // ISO string format for date
  expectedWorkingHours: number;
  hourlyRate: number;
  rateCurrency: RateCurrency;
  status: TaskStatus;
  progress: ProgressType[];
  provider?: Account;
  user: Account;
};

export type GetTasksResponse = ApiSuccessResponse<Array<TaskType>>

function getTasks(data: GetTasksRequest, headers: Headers): Promise<AxiosResponse<GetTasksResponse>> {
  return apiPostHandler<GetTasksRequest, GetTasksResponse>({
    url: apiEndpoints.task.get,
    requestBody: data,
    headers
  })
}

export function useGetTasks(accountId: number, queryOptions: { enabled: boolean }) {
  const headers = useAppSelector(state => state.headers)
  return useApiQuery<GetTasksResponse>(
    [queryKeys.getTasks, accountId],
    async () => {
      return await getTasks({}, { ...headers, [requestIdHeaderKey]: uuidv4() })
    },
    queryOptions,
  )
}