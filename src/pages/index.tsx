import type { NextPage, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import { css } from '@emotion/react';
import getAuthUrl from 'libs/utils/getAuthUrl';
import axios from 'axios';
import useAccessToken from 'libs/hooks/useAccessToken';
import useSearchTracks from 'libs/hooks/useSearchTracks';
import TrackList from 'components/organisms/TrackList';

// todo: 全部仮スタイル 後で消す
const buttonStyles = css`
  display: inline-block;
  padding: 8px;
  border: 1px solid #fff;
`;

const inputStyles = css`
  padding: 4px;
  margin-left: 20px;
  border: 1px solid #fff;
`;

const controllerStyles = css`
  margin-top: 20px;
`;

export const getServerSideProps = async () => {
  return {
    props: {
      authPath: getAuthUrl(),
    },
  };
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Home: NextPage<Props> = ({ authPath }) => {
  const { data: tokenData, mutate: tokenMutate } = useAccessToken();
  const { data: tracksData, setQuery } = useSearchTracks('');
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
  };
  const handleLogout = async () => {
    await axios.post('/api/auth/logout');
    tokenMutate();
  };

  return (
    <div>
      <h1>
        <Image src="/logo.svg" width={110} height={136} alt="echo" />
      </h1>
      <div css={controllerStyles}>
        {tokenData ? (
          <>
            <button type="button" onClick={handleLogout} css={buttonStyles}>
              ログアウト
            </button>
            <input
              type="text"
              onChange={handleSearch}
              css={inputStyles}
              placeholder="検索"
            />
            {tracksData && <TrackList tracks={tracksData} />}
          </>
        ) : (
          <a href={authPath} css={buttonStyles}>
            ログイン
          </a>
        )}
      </div>
    </div>
  );
};

export default Home;
