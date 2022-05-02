import {
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarAngleAxis,
} from 'recharts';
import { SpotifyAudioFeatures } from 'libs/types/spotify';

type Props = {
  audioFeatures: SpotifyAudioFeatures;
};

const AudioFeaturesRadar: React.FC<Props> = ({ audioFeatures }) => {
  const audioFeaturesData = [
    {
      subject: '生楽器',
      value: audioFeatures.acousticness,
      fullMark: 1,
    },
    {
      subject: '踊れる',
      value: audioFeatures.danceability,
      fullMark: 1,
    },
    {
      subject: '激しい',
      value: audioFeatures.energy,
      fullMark: 1,
    },
    {
      subject: '明るい',
      value: audioFeatures.valence,
      fullMark: 1,
    },
    {
      subject: 'ライブ',
      value: audioFeatures.liveness,
      fullMark: 1,
    },
    {
      subject: '声なし',
      value: audioFeatures.instrumentalness,
      fullMark: 1,
    },
    {
      subject: 'スピーチ',
      value: audioFeatures.speechiness,
      fullMark: 1,
    },
  ];

  return (
    <ResponsiveContainer>
      <RadarChart data={audioFeaturesData} cy="55%">
        <Radar dataKey="value" fill="#fff" />
        <PolarAngleAxis
          dataKey="subject"
          stroke="#fff"
          fontSize={10}
          tickLine={false}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default AudioFeaturesRadar;
