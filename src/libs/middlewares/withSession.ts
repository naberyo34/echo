import { NextApiHandler } from 'next';
import { IronSessionOptions } from 'iron-session';
import { withIronSessionApiRoute } from 'iron-session/next';

const ironOptions: IronSessionOptions = {
  cookieName: 'spotify/echo',
  password: process.env.SESSION_PASSWORD,
};

const withSession = (handler: NextApiHandler) => {
  return withIronSessionApiRoute(handler, ironOptions);
};

export default withSession;
