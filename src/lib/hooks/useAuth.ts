import useSWR from 'swr';
import axios from 'axios';
import { BFFAuthResponse } from 'lib/types/bff';

/**
 * 定期的に認証状態を確認してアクセストークンを返す
 */
const useAuth = () => {
  const endpoint = '/api/auth/refreshtoken';
  const fetcher = (url: string) => axios.post(url).then((res) => res.data);
  // 10分
  const interval = 600000;
  const config = {
    refreshInterval: interval,
    shouldRetryOnError: false,
  };
  const { data, error, mutate } = useSWR<BFFAuthResponse>(
    endpoint,
    fetcher,
    config,
  );

  return { data, error, mutate };
};

export default useAuth;
