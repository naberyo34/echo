import { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { BFFSearchTracksResponse } from 'lib/types/bff';

const endpoint = '/api/search/tracks';
const fetcher = (url: string, query: string) =>
  axios.post(url, { query }).then((res) => res.data);
const config = {
  shouldRetryOnError: false,
};

/**
 * 楽曲検索
 * @param init 検索クエリの初期値 (特に理由がなければ空文字でOK)
 * @returns data, error: SWRの返却値 / setQuery: 検索クエリの更新メソッド
 */
const useSearchTracks = (init: string) => {
  const [query, setQuery] = useState(init);
  const searchQuery = query ? [endpoint, query] : null;
  const { data, error } = useSWR<BFFSearchTracksResponse>(
    searchQuery,
    fetcher,
    config,
  );

  return { data, error, setQuery };
};

export default useSearchTracks;
