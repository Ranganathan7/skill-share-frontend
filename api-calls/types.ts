import { apiErrorCodes } from "./error-codes";

export type ApiSuccessResponse<T> = {
  statusCode: number;
  requestId: string;
  timestamp: string;
  data: T;
}

export type ApiErrorResponse = {
  statusCode: number;
  requestId: string;
  timestamp: string;
  error: {
    errorCode: string;
    description: string;
  }
}

export type ApiResponse<T> = ApiErrorResponse | ApiSuccessResponse<T>;

export class CustomApiException extends Error {
  errorCode: string;
  description: string;
  requestId: string;
  statusCode: number;
  timestamp: string;

  constructor(errorResponse: ApiErrorResponse) {
    super(errorResponse.error.errorCode);
    this.errorCode = errorResponse.error.errorCode
    this.description = errorResponse.error.description;
    this.requestId = errorResponse.requestId
    this.statusCode = errorResponse.statusCode
    this.timestamp = errorResponse.timestamp
  }
}

export class CustomAxiosError extends CustomApiException {
  constructor(requestId: string, statusCode: number) {
    super({
      statusCode,
      requestId,
      timestamp: new Date().toString(),
      error: {
        errorCode: apiErrorCodes.axiosError,
        description: "An error occured while calling the API"
      }
    })
  }
}

export const requestIdHeaderKey = 'request-id'