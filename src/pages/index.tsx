import type { NextPage, InferGetServerSidePropsType } from 'next';
import getAuthUrl from 'libs/utils/getAuthUrl';
import axios from 'axios';
import useAccessToken from 'libs/hooks/useAccessToken';
import useSearchTracks from 'libs/hooks/useSearchTracks';

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
      <h1>echo (alpha)</h1>
      {tokenData ? (
        <>
          <p>logged in</p>
          <button type="button" onClick={handleLogout}>
            log out
          </button>
          <input type="text" onChange={handleSearch} />
          {tracksData?.map((track) => {
            return <p key={track.id}>{track.name} {track.audio_features?.danceability}</p>;
          })}
        </>
      ) : (
        <a href={authPath}>log in</a>
      )}
    </div>
  );
};

export default Home;
