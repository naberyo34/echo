import { SpotifyTrack } from 'lib/types/spotify';

// Next.js API Routesで取得できるデータの型定義
// memo: Spotify APIのデータをクライアントサイドで使いやすいように加工している

type BFFAuthResponse = {
  accessToken?: string;
};

type BFFTrackSearchResponse = {
  tracks: SpotifyTrack[];
};

export type { BFFAuthResponse, BFFTrackSearchResponse };
