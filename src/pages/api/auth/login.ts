import { NextApiHandler } from 'next';
import getAccessToken from 'libs/utils/getAccessToken';
import withSession from 'libs/middlewares/withSession';

/**
 * Spotify APIにアクセストークンの発行を要求し、Cookieに格納する
 */
const handler: NextApiHandler = async (req, res) => {
  try {
    const response = await getAccessToken(req);
    // トークンをCookieに保存
    req.session.user = {
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
    };
    await req.session.save();

    // リダイレクト
    res.status(200).redirect('/');
  } catch (e) {
    if (e instanceof Error) res.status(500).send(e.message);
  }
};

export default withSession(handler);
