import { NextApiRequest } from 'next';
import axios from 'axios';
import { SpotifyAuthApiResponse } from 'libs/types/spotify';

/**
 * Spotify APIからアクセストークンを取得する
 * see: https://developer.spotify.com/documentation/general/guides/authorization/code-flow/
 * @param req
 * @returns トークンを含む返却値
 */
const getAccessToken = async (req: NextApiRequest) => {
  const endpoint = 'https://accounts.spotify.com/api/token';
  const { code } = req.query;
  const headers = {
    'Content-type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${Buffer.from(
      `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
      'utf-8',
    ).toString('base64')}`,
  };
  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('code', code as string);
  params.append('redirect_uri', process.env.SPOTIFY_REDIRECT_URI);
  const response = await axios.post<SpotifyAuthApiResponse>(endpoint, params, {
    headers,
  });

  return response;
};

export default getAccessToken;
