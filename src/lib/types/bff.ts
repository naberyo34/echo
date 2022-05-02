import { SpotifyTrack } from 'lib/types/spotify';

// Next.js API Routesで取得できるデータの型定義
// memo: Spotify APIのデータをクライアントサイド用に加工して返している
type BFFAccessTokenResponse = string;

type BFFSearchTracksResponse = {
  tracks: SpotifyTrack[];
};

export type { BFFAccessTokenResponse, BFFSearchTracksResponse };
