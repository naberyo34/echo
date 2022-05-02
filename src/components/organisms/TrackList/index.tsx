import { css } from '@emotion/react';
import { BFFTrackFullData } from 'libs/types/bff';
import TrackListItem from 'components/molecules/TrackListItem';

type Props = {
  tracks: BFFTrackFullData[];
};

const wrapperStyles = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;
`;

const TrackList: React.FC<Props> = ({ tracks }) => {
  return (
    <ul css={wrapperStyles}>
      {tracks.map((track) => {
        return <TrackListItem key={track.id} track={track} />;
      })}
    </ul>
  );
};

export default TrackList;
