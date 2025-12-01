export type SuccessResponse<T> = {
  success: true
  data: {
    data: T,
    statusCode: number,
    message: string[],
    errors?: string[],
    status: number
  }
}

export type ErrorResponse = {
  success: false
  data: string
}

export type ApiEnvelope<T> = SuccessResponse<T> | ErrorResponse