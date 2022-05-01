import { NextApiHandler } from 'next';
import axios from 'axios';
import withSession from 'lib/middlewares/withSession';
import { SpotifyAuthApiResponse } from 'lib/types/spotify';

/**
 * Spotifyの認証APIから返却されたパラメータに基づき、アクセストークンの発行を要求
 */
const handler: NextApiHandler = async (req, res) => {
  try {
    // memo: 設定値の詳細は全部公式に載っているから読めばわかる
    const endpoint = 'https://accounts.spotify.com/api/token';
    const { code } = req.query;
    const contentType = 'application/x-www-form-urlencoded';
    const authorization = `Basic ${Buffer.from(
      `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
      'utf-8',
    ).toString('base64')}`;
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code as string);
    params.append('redirect_uri', process.env.SPOTIFY_REDIRECT_URI);
    const response = await axios.post<SpotifyAuthApiResponse>(
      endpoint,
      params,
      {
        headers: { 'Content-type': contentType, Authorization: authorization },
      },
    );

    // トークンをCookieに保存
    req.session.user = {
      accessToken: response.data.access_token,
    };
    await req.session.save();

    // リダイレクト
    res.status(200).redirect('/');
  } catch (e) {
    if (e instanceof Error) res.status(500).send(e.message);
  }
};

export default withSession(handler);
