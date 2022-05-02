import axios from 'axios';
import { SpotifyAudioFeaturesApiResponse } from 'libs/types/spotify';

/**
 * Spotify APIで楽曲の分析情報を取得する
 * see: https://developer.spotify.com/documentation/web-api/reference/#/operations/get-several-audio-features
 * @param ids 分析したい楽曲のID (配列)
 * @param accessToken
 */
const getTracksAudioFeatures = async (ids: string[], accessToken: string) => {
  const endpoint = 'https://api.spotify.com/v1/audio-features';
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Bearer ${accessToken}`,
  };
  const params = new URLSearchParams();
  params.append('ids', ids.join(','));
  const response = await axios.get<SpotifyAudioFeaturesApiResponse>(
    `${endpoint}?${params.toString()}`,
    { headers },
  );

  return response;
};

export default getTracksAudioFeatures;
