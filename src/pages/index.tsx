import { useState } from 'react';
import type { NextPage, InferGetServerSidePropsType } from 'next';
import { getAuthUrl } from 'lib/utils';
import axios from 'axios';
import useAuth from 'lib/hooks/useAuth';
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
  const [searchQuery, setSearchQuery] = useState('');
  const { data: authData, mutate: authMutate } = useAuth();
  const { data: tracksData } = useSearchTracks(searchQuery);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQuery(value);
  };
  const handleLogout = () => {
    axios.post('/api/auth/logout');
    authMutate();
  };

  return (
    <div>
      <h1>echo (alpha)</h1>
      {authData?.accessToken ? (
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
