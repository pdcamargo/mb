// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BaseResponse<DataT = any> = {
  error: boolean
  message?: string
  data?: DataT
}
