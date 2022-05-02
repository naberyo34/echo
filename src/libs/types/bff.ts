import { SpotifyTrack, SpotifyAudioFeatures } from 'libs/types/spotify';

// Next.js API Routesで取得できるデータの型定義
// memo: Spotify APIのデータをクライアントサイド用に加工して返している
type BFFAccessTokenResponse = string;

type BFFTrackFullData = SpotifyTrack & {
  audio_features?: SpotifyAudioFeatures;
};

type BFFSearchTracksResponse = BFFTrackFullData[];

export type {
  BFFAccessTokenResponse,
  BFFTrackFullData,
  BFFSearchTracksResponse,
};
