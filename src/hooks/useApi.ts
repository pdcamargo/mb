import { AxiosRequestConfig } from 'axios'
import useSWR from 'swr'
import { mutateCallback } from 'swr/dist/types'

import fetcher from '@/config/fetcher'
import { useAuth } from '@/contexts/auth/AuthContainer'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UseApiResponseType<DataT = any, ErrorT = any> = {
  data: DataT
  isValidating: boolean
  mutate: (
    data?: DataT | Promise<DataT> | mutateCallback<DataT>,
    shouldRevalidate?: boolean
  ) => Promise<DataT>
  revalidate: () => Promise<boolean>
  error: ErrorT
}

export function useApi<DataT = unknown, ErrorT = unknown>(
  url: string,
  config: AxiosRequestConfig = {}
): UseApiResponseType {
  const { isLoading, token } = useAuth()

  async function fetch(
    url: string,
    token: string,
    config: AxiosRequestConfig = {}
  ) {
    const { data } = await fetcher({
      ...config,
      url,
      headers: {
        ...config?.headers,
        Authorization: `Bearer ${token}`
      }
    })

    return data?.data as DataT
  }

  const { data, isValidating, mutate, revalidate, error } = useSWR<
    DataT,
    ErrorT
  >(!isLoading ? [url, token, config] : null, fetch)

  return { data, isValidating, mutate, revalidate, error }
}
