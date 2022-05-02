import axios from 'axios';
import { SpotifyAuthApiResponse } from 'libs/types/spotify';

/**
 * refreshTokenを使って、新しいaccessTokenを取得する
 * see: https://developer.spotify.com/documentation/general/guides/authorization/code-flow/
 * @param refreshToken
 * @returns 新しいアクセストークンを含む返却値
 */
const refreshAccessToken = async (refreshToken: string) => {
  const endpoint = 'https://accounts.spotify.com/api/token';
  const headers = {
    'Content-type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${Buffer.from(
      `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
      'utf-8',
    ).toString('base64')}`,
  };
  const params = new URLSearchParams();
  params.append('grant_type', 'refresh_token');
  params.append('refresh_token', refreshToken);
  const response = await axios.post<SpotifyAuthApiResponse>(endpoint, params, {
    headers,
  });

  return response;
};

export default refreshAccessToken;
