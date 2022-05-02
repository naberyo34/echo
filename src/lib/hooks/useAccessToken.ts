import useSWR from 'swr';
import axios from 'axios';
import { BFFAccessTokenResponse } from 'lib/types/bff';

const endpoint = '/api/auth/refreshtoken';
const fetcher = (url: string) => axios.post(url).then((res) => res.data);
const interval = 600000;
const config = {
  refreshInterval: interval,
  shouldRetryOnError: false,
};

/**
 * 定期的に認証状況を確認し、現在の / 更新されたアクセストークンを返す
 * @returns data, error, mutate: SWRの返却値
 */
const useAccessToken = () => {
  const { data, error, mutate } = useSWR<BFFAccessTokenResponse>(
    endpoint,
    fetcher,
    config,
  );

  return { data, error, mutate };
};

export default useAccessToken;
