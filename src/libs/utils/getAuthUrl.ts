import { nanoid } from 'nanoid';

/**
 * Spotify認証で利用するURLを動的に生成する
 * see: https://developer.spotify.com/documentation/general/guides/authorization/code-flow/
 */
const getAuthUrl = () => {
  const endpoint = 'https://accounts.spotify.com/authorize';
  const scopes = ['user-read-private'];
  const params = new URLSearchParams();
  params.append('client_id', process.env.SPOTIFY_CLIENT_ID);
  params.append('response_type', 'code');
  // memo: dashboard側で設定したRedirect URIと同じものを指定すること
  params.append('redirect_uri', process.env.SPOTIFY_REDIRECT_URI);
  params.append('scope', scopes.join(' '));
  // CSRF対策
  // memo: getStaticPropsだとランダム値が固定になってしまう?
  params.append('state', nanoid());

  return `${endpoint}?${params.toString()}`;
};

export default getAuthUrl;
