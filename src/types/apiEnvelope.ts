export type SuccessResponse<T> = {
  success: true
  data: {
    data: T,
    statusCode: number,
    message: string[],
  }
}

export type ErrorResponse = {
  success: false
  data: string
}

export type ApiEnvolepe<T> = SuccessResponse<T> | ErrorResponse