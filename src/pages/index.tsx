import { useState } from 'react';
import type {
  NextPage,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { getAuthUrl } from 'lib/utils';
import axios from 'axios';
import useSearchTracks from 'lib/hooks/useSearchTracks';

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  // アクセストークンが保存されている場合はトークンをpropsとして渡す
  // TODO: 再認証のロジックが入っていないので一時間くらいで認証が死ぬ
  if (context.req.cookies['spotify/echo']) {
    const token = context.req.cookies['spotify/echo'];

    return {
      props: {
        authPath: getAuthUrl(),
        token,
      },
    };
  }

  return {
    props: {
      authPath: getAuthUrl(),
    },
  };
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Home: NextPage<Props> = ({ authPath, token }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data } = useSearchTracks(searchQuery);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQuery(value);
  };

  return (
    <div>
      <h1>echo (alpha)</h1>
      {token ? (
        <>
          <p>logged in</p>
          <button type="button" onClick={() => axios.post('/api/auth/logout')}>
            log out
          </button>
          <input type="text" onChange={handleChange} />
          {data?.tracks.map((track) => {
            return <p key={track.id}>{track.name}</p>;
          })}
        </>
      ) : (
        <a href={authPath}>log in</a>
      )}
    </div>
  );
};

export default Home;
