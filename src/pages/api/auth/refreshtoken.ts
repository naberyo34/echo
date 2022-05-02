import { NextApiHandler } from 'next';
import axios from 'axios';
import withSession from 'libs/middlewares/withSession';
import refreshAccessToken from 'libs/utils/refreshAccessToken';

/**
 * アクセストークンの状態を確認し、期限切れの場合は更新する
 * 成功時はアクセストークンをstringとして返却する
 */
// todo: 型が弱い
// see: https://zenn.dev/takepepe/articles/nextjs-typesafe-api-routes
const handler: NextApiHandler = async (req, res) => {
  if (!req.session.user) {
    res.status(200).end();
    return;
  }

  const { accessToken, refreshToken } = req.session.user;

  try {
    // プロフィールにアクセスし、接続できるかを試す
    await axios.get(`https://api.spotify.com/v1/me`, {
      headers: {
        Authorization: `Bearer ${req.session.user.accessToken}`,
      },
    });
    res.status(200).json(accessToken);
  } catch {
    // プロフィールに接続できなかった場合、トークンを再発行する
    if (refreshToken) {
      const response = await refreshAccessToken(refreshToken);
      req.session.user = {
        accessToken: response.data.access_token,
      };
      await req.session.save();
      res.status(200).json(response.data.access_token);
    } else {
      // リフレッシュトークンがない場合はエラーを返す(これが出たら何かしらおかしい)
      res.status(401).send('unauthorized');
    }
  }
};

export default withSession(handler);
