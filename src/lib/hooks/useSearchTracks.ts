import useSWR from 'swr';
import axios from 'axios';
import { BFFTrackSearchResponse } from 'lib/types/bff';

/**
 * 楽曲検索
 * @param query 検索クエリ
 */
const useSearchTracks = (query: string) => {
  const endpoint = '/api/search/tracks';
  const searchQuery = query ? [endpoint, query] : null;
  const fetcher = (url: string, query: string) =>
    axios.post(url, { query }).then((res) => res.data);
  const config = {
    shouldRetryOnError: false,
  };
  const { data, error } = useSWR<BFFTrackSearchResponse>(
    searchQuery,
    fetcher,
    config,
  );

  return { data, error };
};

export default useSearchTracks;
