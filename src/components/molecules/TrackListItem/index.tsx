import Image from 'next/image';
import { css } from '@emotion/react';
import { BFFTrackFullData } from 'libs/types/bff';
import { key } from 'libs/utils/constants';
import getMinutes from 'libs/utils/getMinutes';
import AudioFeaturesRadar from 'components/molecules/AudioFeaturesRadar';

type Props = {
  track: BFFTrackFullData;
};

const wrapperStyles = css`
  display: flex;
  align-items: flex-start;
  gap: 20px;
`;

const radarStyles = css`
  height: 100px;
  aspect-ratio: 3 / 2;
`;

const informationStyles = css`
  h2 {
    font-size: 20px;
  }
`;

const TrackListItem: React.FC<Props> = ({ track }) => {
  // アルバムイメージはサイズ別で3種類用意されており、[1]は中サイズ
  const albumImage = track.album.images[1];
  const artistsName = track.artists.map((artist) => artist.name).join(', ');

  return (
    <li css={wrapperStyles}>
      {track.audio_features && (
        <div css={radarStyles}>
          <AudioFeaturesRadar audioFeatures={track.audio_features} />
        </div>
      )}
      <Image src={albumImage.url} width={100} height={100} alt={track.name} />
      <div css={informationStyles}>
        <h2>{track.name}</h2>
        <p>{artistsName}</p>
        {track.audio_features && (
          <p>
            {getMinutes(track.audio_features.duration_ms)}
            <br />
            BPM: {Math.round(track.audio_features.tempo)} Key:{' '}
            {key[track.audio_features.key]} Mode:{' '}
            {track.audio_features.mode === 1 ? 'Maj' : 'min'}
          </p>
        )}
      </div>
    </li>
  );
};

export default TrackListItem;
