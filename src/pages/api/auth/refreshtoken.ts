import { NextApiHandler } from 'next';
import axios from 'axios';
import withSession from 'lib/middlewares/withSession';
import { SpotifyAuthApiResponse } from 'lib/types/spotify';
import { BFFAuthResponse } from 'lib/types/bff';

/**
 * アクセストークンの状態を確認し、期限切れの場合は更新する
 */
// todo: 型が弱い
// see: https://zenn.dev/takepepe/articles/nextjs-typesafe-api-routes
const handler: NextApiHandler = async (req, res) => {
  if (req.session.user) {
    const { accessToken, refreshToken } = req.session.user;

    try {
      // プロフィールにアクセスし、接続できるかを試す
      await axios.get(`https://api.spotify.com/v1/me`, {
        headers: {
          Authorization: `Bearer ${req.session.user.accessToken}`,
        },
      });
    } catch {
      if (refreshToken) {
        // refreshTokenを使って新しいaccessTokenをもらいにいく
        // see: https://developer.spotify.com/documentation/general/guides/authorization/code-flow/
        const endpoint = 'https://accounts.spotify.com/api/token';
        const contentType = 'application/x-www-form-urlencoded';
        const authorization = `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
          'utf-8',
        ).toString('base64')}`;
        const params = new URLSearchParams();
        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', refreshToken);
        const response = await axios.post<SpotifyAuthApiResponse>(
          endpoint,
          params,
          {
            headers: {
              'Content-type': contentType,
              Authorization: authorization,
            },
          },
        );

        req.session.user = {
          accessToken: response.data.access_token,
        };
      } else {
        res.status(401).send('unauthorized');
      }
    }
    const result: BFFAuthResponse = { accessToken };
    res.status(200).json(result);

    return;
  }

  res.status(200).end();
};

export default withSession(handler);
