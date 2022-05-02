import type { NextPage, InferGetServerSidePropsType } from 'next';
import { getAuthUrl } from 'lib/utils';
import axios from 'axios';
import useAccessToken from 'lib/hooks/useAccessToken';
import useSearchTracks from 'lib/hooks/useSearchTracks';

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
  const handleLogout = () => {
    axios.post('/api/auth/logout');
    tokenMutate();
  };

  return (
    <div>
      <h1>echo (alpha)</h1>
      {tokenData ? (
        <>
          <p>logged in</p>
          <button type="button" onClick={handleLogout}>
            log out
          </button>
          <input type="text" onChange={handleSearch} />
          {tracksData?.tracks.map((track) => {
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
