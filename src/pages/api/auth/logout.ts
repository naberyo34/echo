import { NextApiHandler } from 'next';
import withSession from 'lib/middlewares/withSession';

const handler: NextApiHandler = async (req, res) => {
  try {
    req.session.destroy();
    // リダイレクト
    res.status(200).redirect('/');
  } catch (e) {
    if (e instanceof Error) res.status(500).send(e.message);
  }
};

export default withSession(handler);
