import { NextApiHandler } from 'next';
import withSession from 'libs/middlewares/withSession';

/**
 * ログアウト
 */
const handler: NextApiHandler = async (req, res) => {
  try {
    req.session.destroy();
    res.status(200).end();
  } catch (e) {
    if (e instanceof Error) res.status(500).send(e.message);
  }
};

export default withSession(handler);
